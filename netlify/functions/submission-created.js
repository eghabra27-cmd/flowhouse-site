// Netlify automatically calls this function on EVERY successful form submission
// (the special name "submission-created" wires it to Netlify Forms).
// It emails a clean summary of each submission to the studio inbox via Resend.
//
// Setup required (one time, in Netlify → Site settings → Environment variables):
//   RESEND_API_KEY   = your Resend API key (starts with "re_")
//   NOTIFY_TO        = info@flowhouserb.com   (optional; defaults below)
//   NOTIFY_FROM      = flowhouse <onboarding@resend.dev>  (optional; use a
//                      verified flowhouserb.com address once your domain is
//                      verified in Resend, e.g. "flowhouse <hello@flowhouserb.com>")
//
// Submissions are ALSO always stored in Netlify (Forms tab) regardless of email.

const TO = process.env.NOTIFY_TO || "info@flowhouserb.com";
const FROM = process.env.NOTIFY_FROM || "flowhouse <onboarding@resend.dev>";

const FORM_LABELS = {
  "founding-circle": "Founding Circle sign-up",
  "franchise-interest": "Franchise inquiry",
  "instructor-application": "Instructor application",
};

const FIELD_LABELS = {
  name: "Name",
  email: "Email",
  phone: "Phone",
  consent: "Marketing consent",
  market: "Market of interest",
  note: "Notes",
  background: "Movement background",
  certifications: "Certifications",
  why: "Why flowhouse",
  availability: "Availability",
};

function esc(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

exports.handler = async (event) => {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("RESEND_API_KEY not set — submission stored in Netlify but email not sent.");
      return { statusCode: 200, body: "stored (no email key configured)" };
    }

    const payload = JSON.parse(event.body || "{}");
    const sub = payload.payload || {};
    const formName = sub.form_name || "form";
    const data = sub.data || {};
    const label = FORM_LABELS[formName] || formName;

    // Build a readable rows list from whatever fields were submitted
    const skip = new Set(["bot-field", "form-name", "consent"]);
    const rows = Object.keys(data)
      .filter((k) => !skip.has(k) && String(data[k]).trim() !== "")
      .map((k) => {
        const lbl = FIELD_LABELS[k] || (k.charAt(0).toUpperCase() + k.slice(1));
        return `<tr><td style="padding:6px 14px 6px 0;color:#7a6e62;font-size:13px;white-space:nowrap;vertical-align:top">${esc(lbl)}</td><td style="padding:6px 0;color:#1a130d;font-size:14px">${esc(data[k]).replace(/\n/g, "<br>")}</td></tr>`;
      })
      .join("");

    const consentNote = data.consent
      ? `<p style="margin:14px 0 0;font-size:12px;color:#437A22">✓ Consented to marketing email/SMS.</p>`
      : "";

    const submitterEmail = data.email && /.+@.+\..+/.test(data.email) ? data.email : null;

    const html = `
      <div style="font-family:-apple-system,Segoe UI,Inter,Arial,sans-serif;max-width:560px;margin:0 auto;background:#faf3e8;border:1px solid #e6d9c6;border-radius:14px;overflow:hidden">
        <div style="background:#261810;color:#f5ecdf;padding:18px 22px">
          <div style="font-weight:700;font-size:16px;letter-spacing:-0.01em">flowhouse</div>
          <div style="font-size:12px;letter-spacing:0.16em;text-transform:uppercase;color:#e9b2a4;margin-top:4px">New ${esc(label)}</div>
        </div>
        <div style="padding:22px">
          <table style="border-collapse:collapse;width:100%">${rows}</table>
          ${consentNote}
          <p style="margin:18px 0 0;font-size:12px;color:#7a6e62">Submitted via flowhouserb.com${submitterEmail ? ` · reply to this email to respond to ${esc(submitterEmail)}` : ""}.</p>
        </div>
      </div>`;

    const text = Object.keys(data)
      .filter((k) => !skip.has(k))
      .map((k) => `${FIELD_LABELS[k] || k}: ${data[k]}`)
      .join("\n");

    const body = {
      from: FROM,
      to: [TO],
      subject: `New ${label}${data.name ? " — " + data.name : ""}`,
      html,
      text: `New ${label}\n\n${text}`,
    };
    if (submitterEmail) body.reply_to = submitterEmail;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("Resend send failed:", res.status, errText);
      return { statusCode: 200, body: "stored (email send failed; see logs)" };
    }
    return { statusCode: 200, body: "stored + emailed" };
  } catch (e) {
    console.error("submission-created error:", e);
    return { statusCode: 200, body: "stored (handler error; see logs)" };
  }
};
