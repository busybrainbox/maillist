const nodemailer = require('nodemailer')

const sendEmail = async (options) => {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_EMAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  
    try {
      const message = {
        from: `${process.env.FROM_NAME} <${process.env.USER_EMAIL}>`,
        to: options.email,
        subject: options.subject,
        text: options.message,
        html: options.message,
      };
  
      return await transporter.sendMail(message);
    } catch (error) {
      console.error(error);
      return error;
    }
  };
  
 module.exports = sendEmail;