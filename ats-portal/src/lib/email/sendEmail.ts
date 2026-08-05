import nodemailer from "nodemailer";

export async function sendEmail(to: string, subject: string, text: string) {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST!,
    port: Number(process.env.EMAIL_PORT!),
    secure: process.env.EMAIL_SECURE === "true",
    auth: {
      user: process.env.EMAIL_USER!,
      pass: process.env.EMAIL_PASS!,
    },
  });

  return transporter.sendMail({
    from: process.env.EMAIL_USER!,
    to,
    subject,
    text,
  });
}
