const OWNER_EMAIL = 'team@sollesolutions.com'
const FROM = 'HomeRepair.Expert <team@sollesolutions.com>'

async function sendEmail(to: string, subject: string, html: string) {
  const resendKey = process.env.RESEND_API_KEY
  if (!resendKey) return

  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ from: FROM, to, subject, html }),
  })
}

export async function notifyOwner(subject: string, fields: Record<string, string | null | undefined>) {
  const rows = Object.entries(fields)
    .filter(([, v]) => v != null && v !== '')
    .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#666;white-space:nowrap">${k}</td><td style="padding:4px 0">${v}</td></tr>`)
    .join('')

  const html = `
    <p style="font-family:sans-serif">New submission on <strong>HomeRepair.Expert</strong></p>
    <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">${rows}</table>
  `
  await sendEmail(OWNER_EMAIL, subject, html)
}
