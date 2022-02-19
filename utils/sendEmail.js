import nodemailer from 'nodemailer';

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_SERVICE_USER,
      pass: process.env.EMAIL_SERVICE_USER_PASSWORD,
    },
  });

  const href = `${process.env.APP_URL_PROD}/reset-password/${options.token}`;
  const message = {
    from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`, // sender address
    to: options.email, // list of receivers
    subject: options.subject, // Subject line
    text: options.message, // plain text body
    html: `<p>Hey ${options.email
      .split('@')[0]
      .toString()}, There was a request for password reset. <a href=${href}>Click this link to reset the password </a>   </p>
        <p>This token is valid for only 1 hour.</p>`,
  };

  transporter.sendMail(message, function (err, info) {
    if (err) {
      console.log('EMAIL error: ', err);
    } else {
      console.log('EMAIL info: Sent Successfully!');
    }
  });
};
export default sendEmail;
