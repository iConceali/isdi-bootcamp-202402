// api/utils/mailer.js

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail", // Cambia esto según tu proveedor de email
  auth: {
    user: "tu_email@gmail.com",
    pass: "tu_contraseña",
  },
});

const sendNotificationEmail = (userEmail, message) => {
  const mailOptions = {
    from: "tu_email@gmail.com",
    to: userEmail,
    subject: "Notificación de Oportunidad de Arbitraje",
    text: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error al enviar email:", error);
    } else {
      console.log("Email enviado: " + info.response);
    }
  });
};

module.exports = sendNotificationEmail;
