import 'dotenv/config';

const smtpConfig = {
  host: 'smtp.gmail.com',
  port: 587,
  user: process.env.SMTP_USER,
  pass: process.env.SMTP_PASS
};

export { smtpConfig };
