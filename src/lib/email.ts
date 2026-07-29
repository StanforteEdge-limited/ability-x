async function sendEmail(
  to: string,
  subject: string,
  html: string,
  replyTo?: string,
) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "AbilityX Website <notifications@abilityx.projectenable.africa>",
      to,
      subject,
      html,
      ...(replyTo ? { reply_to: replyTo } : {}),
    }),
  });

  if (!res.ok) throw new Error(`Resend send failed: ${await res.text()}`);
}

export async function sendAdminNotification(
  to: string,
  subject: string,
  html: string,
) {
  await sendEmail(to, subject, html);
}

export async function sendConfirmation(
  to: string,
  name: string,
  formType: string,
  replyTo: string,
) {
  const labels: Record<string, string> = {
    partner: "Partner Inquiry",
    waitlist: "Waitlist Signup",
    exhibit: "Exhibit Interest",
  };

  const label = labels[formType] || formType;

  await sendEmail(
    to,
    `Thank you for your ${label} — AbilityX 2.0`,
    `<h2>Thank you, ${name}!</h2>
<p>We've received your ${label.toLowerCase()} submission and will get back to you shortly.</p>
<p>If you have any immediate questions, reply to this email and it will reach our team.</p>
<br>
<p>Best regards,</p>
<p>The AbilityX Team</p>`,
    replyTo,
  );
}
