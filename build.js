// build pipeline — v3
const fs = require('fs');
const path = require('path');

const PARTIALS_FILE = path.join(__dirname, '_partials.html');
const SRC_DIR = path.join(__dirname, 'src');
const OUT_DIR = __dirname;

function extract(name, txt) {
  const re = new RegExp(`<!--#${name}#-->([\\s\\S]*?)<!--#/${name}#-->`);
  const m = txt.match(re);
  if (!m) throw new Error(`partial ${name} not found`);
  return m[1].trim();
}

const partialsTxt = fs.readFileSync(PARTIALS_FILE, 'utf8');
const head = extract('HEAD', partialsTxt);
const header = extract('HEADER', partialsTxt);
const footer = extract('FOOTER', partialsTxt);

function build(file) {
  let html = fs.readFileSync(path.join(SRC_DIR, file), 'utf8');
  html = html
    .replace(/<!--@include head-->/g, head)
    .replace(/<!--@include header-->/g, header)
    .replace(/<!--@include footer-->/g, footer);

  const page = file.replace('.html', '');
  const navMap = {
    'index': null,
    'studio': 'studio',
    'what-to-expect': 'what-to-expect',
    'schedule': 'schedule',
    'pricing': 'pricing',
    'flowformer': 'flowformer',
    'merch': 'merch',
    'teach': 'teach',
  };
  const active = navMap[page];
  if (active) html = html.replace(new RegExp(`data-nav="${active}"`), `data-nav="${active}" aria-current="page"`);

  fs.writeFileSync(path.join(OUT_DIR, file), html);
  console.log('built', file);
}

fs.readdirSync(SRC_DIR).filter(f => f.endsWith('.html')).forEach(build);
