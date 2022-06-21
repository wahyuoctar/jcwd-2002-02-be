const nodemailer = require("nodemailer");

const userEmail = process.env.MAILER_EMAIL;
const password = process.env.MAILER_PASS;

// this is to initiate the email that will be use to send email verification
const transport = nodemailer.createTransport({
  auth: {
    user: userEmail,
    pass: password,
  },
  host: "smtp.gmail.com",
});

// this is the function to send the mail based on the parameter in the function
const mailer = async ({ subject, to, text, html }) => {
  await transport.sendMail({
    subject: subject || "Test Subject",
    to: to || "sonmychael@gmail.com",
    text: text || "Test Nodemailer",
    html: html || "<h1>This is sent from my Express API</h1>",
  });
};

module.exports = mailer;
