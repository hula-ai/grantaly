import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail', // or use your email provider's service
  auth: {
    user: process.env.CLIENT_EMAIL, // Your email address
    pass: process.env.CLIENT_PASS, // Your email password or an app password
  },
});

const sendEmail = (to:string, subject:string, text:string, html:string) => {
  const mailOptions = {
    from: process.env.CLIENT_EMAIL,
    to,
    subject,
    text,
    html,
  };

  return transporter.sendMail(mailOptions);
};

export default sendEmail;
