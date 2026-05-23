// flowhouse content build
// Reads YAML content from /content/**, injects it into HTML templates
// in /src/**, writes final HTML to the repo root.
//
// Triggered automatically by GitHub Actions on every push to main.
//
// Template syntax (Mustache-ish):
//   {{ path.to.field }}                    string substitution (HTML-escaped)
//   {{ path.to.field | raw }}              string substitution (raw HTML)
//   {{> partial-name }}                    include /src/_partials/<name>.html
//   {{#each path.to.list }}…{{/each}}      iterate over array (use this.field inside)
//   {{#if path }}…{{/if}}                  show block if value is truthy
//   {{#unless path }}…{{/unless}}          show block if value is falsy
//
// The engine compiles the template into a function, which gives us correct
// nested scope handling for free (vs. running regex over the rendered string).

import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';

const ROOT = path.resolve('.');
const CONTENT_DIR = path.join(ROOT, 'content');
const SRC_DIR = path.join(ROOT, 'src');
const PARTIALS_DIR = path.join(SRC_DIR, '_partials');

// ─────────────────────────────────────────────
// 1) Load all YAML content into a single tree:
//    content.home.hero, content.studio.main, etc.
// ─────────────────────────────────────────────
function loadContent(dir, tree = {}) {
  if (!fs.existsSync(dir)) return tree;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const sub = {};
      loadContent(full, sub);
      tree[entry.name] = sub;
    } else if (entry.name.endsWith('.yml') || entry.name.endsWith('.yaml')) {
      const key = entry.name.replace(/\.ya?ml$/, '');
      try {
        tree[key] = yaml.load(fs.readFileSync(full, 'utf8')) || {};
      } catch (e) {
        console.error(`✗ Failed to parse ${full}: ${e.message}`);
        process.exit(1);
      }
    }
  }
  return tree;
}

const content = loadContent(CONTENT_DIR);

// ─────────────────────────────────────────────
// 2) Compile a template into a render function.
//    Uses a small AST so block nesting is correct.
// ─────────────────────────────────────────────

function tokenize(src) {
  // Match any {{ ... }} tag, capture its inner content + position.
  const tokens = [];
  const re = /\{\{\s*([^}]+?)\s*\}\}/g;
  let last = 0;
  let m;
  while ((m = re.exec(src)) !== null) {
    if (m.index > last) tokens.push({ type: 'text', value: src.slice(last, m.index) });
    const tag = m[1];
    if (tag.startsWith('#each '))         tokens.push({ type: 'each-open',   path: tag.slice(6).trim() });
    else if (tag === '/each')             tokens.push({ type: 'each-close' });
    else if (tag.startsWith('#if '))      tokens.push({ type: 'if-open',     path: tag.slice(4).trim() });
    else if (tag === '/if')               tokens.push({ type: 'if-close' });
    else if (tag.startsWith('#unless '))  tokens.push({ type: 'unless-open', path: tag.slice(8).trim() });
    else if (tag === '/unless')           tokens.push({ type: 'unless-close' });
    else if (tag.startsWith('> '))        tokens.push({ type: 'partial',     name: tag.slice(2).trim() });
    else if (tag.startsWith('>'))         tokens.push({ type: 'partial',     name: tag.slice(1).trim() });
    else                                  tokens.push({ type: 'expr',        expr: tag });
    last = re.lastIndex;
  }
  if (last < src.length) tokens.push({ type: 'text', value: src.slice(last) });
  return tokens;
}

function parse(tokens) {
  // Build a tree of nodes. Stack-based to handle nesting.
  const root = { type: 'root', children: [] };
  const stack = [root];
  let i = 0;
  while (i < tokens.length) {
    const t = tokens[i];
    const parent = stack[stack.length - 1];
    if (t.type === 'text' || t.type === 'expr' || t.type === 'partial') {
      parent.children.push(t);
    } else if (t.type === 'each-open' || t.type === 'if-open' || t.type === 'unless-open') {
      const node = { type: t.type.replace('-open', ''), path: t.path, children: [] };
      parent.children.push(node);
      stack.push(node);
    } else if (t.type === 'each-close' || t.type === 'if-close' || t.type === 'unless-close') {
      stack.pop();
    }
    i++;
  }
  return root;
}

// Resolve a dotted path against the current scope chain.
//  - "foo.bar"     -> looks up foo.bar at the top of the scope chain (search downward)
//  - "this.x"      -> always reads x from the innermost scope's `this`
//  - "@index"      -> innermost scope's index
function resolveRef(ref, scopes) {
  if (ref === '@index')   return scopes[scopes.length - 1]?.__index;
  if (ref === '@index1')  return (scopes[scopes.length - 1]?.__index ?? -1) + 1;
  if (ref === '@first')   return scopes[scopes.length - 1]?.__index === 0;
  if (ref === '@last')    return scopes[scopes.length - 1]?.__last === true;
  const parts = ref.split('.');
  if (parts[0] === 'this') {
    const top = scopes[scopes.length - 1];
    return parts.slice(1).reduce((acc, k) => (acc == null ? acc : acc[k]), top.__this);
  }
  // Walk scope chain from innermost outward, looking for the first key match
  for (let i = scopes.length - 1; i >= 0; i--) {
    const obj = scopes[i].__this || scopes[i];
    if (obj && parts[0] in obj) {
      return parts.reduce((acc, k) => (acc == null ? acc : acc[k]), obj);
    }
  }
  // Final attempt: resolve against the global content tree
  const global = scopes[0].__global || scopes[0];
  return parts.reduce((acc, k) => (acc == null ? acc : acc[k]), global);
}

function esc(s) {
  if (s == null) return '';
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function loadPartial(name) {
  const p = path.join(PARTIALS_DIR, `${name}.html`);
  if (!fs.existsSync(p)) {
    console.warn(`⚠ Partial not found: ${name}`);
    return '';
  }
  return fs.readFileSync(p, 'utf8');
}

function renderNode(node, scopes) {
  if (node.type === 'root') {
    return node.children.map(c => renderNode(c, scopes)).join('');
  }
  if (node.type === 'text') return node.value;
  if (node.type === 'expr') {
    // Handle pipe filters: "path.to.x | raw"
    const [refRaw, ...filters] = node.expr.split('|').map(s => s.trim());
    const val = resolveRef(refRaw, scopes);
    if (filters.includes('raw')) return val == null ? '' : String(val);
    return esc(val);
  }
  if (node.type === 'partial') {
    // Render the partial in the current scope
    const tpl = loadPartial(node.name);
    const tree = parse(tokenize(tpl));
    return renderNode(tree, scopes);
  }
  if (node.type === 'if') {
    const val = resolveRef(node.path, scopes);
    if (val) return node.children.map(c => renderNode(c, scopes)).join('');
    return '';
  }
  if (node.type === 'unless') {
    const val = resolveRef(node.path, scopes);
    if (!val) return node.children.map(c => renderNode(c, scopes)).join('');
    return '';
  }
  if (node.type === 'each') {
    const list = resolveRef(node.path, scopes);
    if (!Array.isArray(list)) return '';
    return list.map((item, i) => {
      const newScope = {
        __this: item,
        __index: i,
        __last: i === list.length - 1,
        __global: scopes[0].__global || scopes[0],
      };
      return node.children.map(c => renderNode(c, [...scopes, newScope])).join('');
    }).join('');
  }
  return '';
}

function render(template, ctx) {
  const tree = parse(tokenize(template));
  const rootScope = { ...ctx, __global: ctx };
  return renderNode(tree, [rootScope]);
}

// ─────────────────────────────────────────────
// 3) Build each page in /src/*.html -> root
// ─────────────────────────────────────────────
function buildPages() {
  if (!fs.existsSync(SRC_DIR)) {
    console.error(`✗ No /src directory found.`);
    process.exit(1);
  }
  const built = [];
  for (const entry of fs.readdirSync(SRC_DIR, { withFileTypes: true })) {
    if (!entry.isFile() || !entry.name.endsWith('.html')) continue;
    const src = path.join(SRC_DIR, entry.name);
    const out = path.join(ROOT, entry.name);
    const template = fs.readFileSync(src, 'utf8');
    const rendered = render(template, content);
    fs.writeFileSync(out, rendered);
    built.push(entry.name);
  }
  console.log(`✓ Built ${built.length} pages: ${built.join(', ')}`);
}

buildPages();
console.log('✓ Build complete.');
