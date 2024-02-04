import nodemailer from 'nodemailer';
import { MailOptionsType } from '../type/service';
const sender = {
  email: process.env.SENDER_EMAIL,
  password: process.env.SENDER_PASS,
};

export const sendMailFunc = async (mailOptions: MailOptionsType) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAILER_HOST,
      port: 2525,
      secure: false,
      auth: {
        user: sender.email,
        pass: sender.password,
      },
    });

    const mail = await transporter.sendMail({
      from: 'no-reply@authorization.org',
      to: mailOptions.to,
      subject: mailOptions.subject,
      html: mailOptions.html,
    });

    return Promise.resolve(mail);
  } catch (e) {
    return Promise.reject(e);
  }
};
