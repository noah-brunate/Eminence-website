import nodemailer from "nodemailer";
import { logger } from "./logger";

const notificationRecipient =
  process.env["CONTACT_NOTIFICATION_TO"] || "info@eminence.co.ug";

type ContactNotification = {
  name: string;
  email: string;
  company?: string | null;
  service?: string | null;
  message: string;
};

export function escapeHtml(value: string): string {
  return value.replace(
    /[&<>'"]/g,
    (character) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[
        character
      ]!,
  );
}

function getSmtpConfig() {
  const host = process.env["SMTP_HOST"];
  const user = process.env["SMTP_USER"];
  const pass = process.env["SMTP_PASS"];
  const port = Number(process.env["SMTP_PORT"] || "465");

  if (!host || !user || !pass) return null;
  if (!Number.isInteger(port) || port <= 0 || port > 65535) {
    throw new Error(`Invalid SMTP_PORT value: ${process.env["SMTP_PORT"]}`);
  }

  return { host, user, pass, port };
}

export async function sendSystemEmail(
  to: string,
  subject: string,
  htmlContent: string,
  replyTo?: string,
  requireDelivery = false,
): Promise<void> {
  const config = getSmtpConfig();
  if (!config) {
    if (requireDelivery) throw new Error("SMTP is not configured");
    logger.warn(
      { recipient: to },
      "Email skipped: SMTP_HOST, SMTP_USER, or SMTP_PASS is not configured",
    );
    return;
  }

  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.port === 465,
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 20000,
    auth: {
      user: config.user,
      pass: config.pass,
    },
  });

  const result = await transporter.sendMail({
    from: `"Eminence Services" <${config.user}>`,
    to,
    replyTo,
    subject,
    html: htmlContent,
  });
  if (requireDelivery && !result.accepted?.length)
    throw new Error("Mail server did not accept the recipient");
}

export async function sendContactNotification(
  submission: ContactNotification,
): Promise<void> {
  const subject = submission.service
    ? `New ${submission.service} enquiry from ${submission.name}`
    : `New website enquiry from ${submission.name}`;
  const fields = [
    ["Name", submission.name],
    ["Email", submission.email],
    ["Company", submission.company],
    ["Service", submission.service],
  ].filter((field): field is [string, string] => Boolean(field[1]));
  const html = `<h2>${escapeHtml(subject)}</h2>${fields
    .map(
      ([label, value]) =>
        `<p><strong>${label}:</strong> ${escapeHtml(value)}</p>`,
    )
    .join(
      "",
    )}<h3>Message</h3><p>${escapeHtml(submission.message).replace(/\n/g, "<br>")}</p>`;

  await sendSystemEmail(notificationRecipient, subject, html, submission.email);
}
