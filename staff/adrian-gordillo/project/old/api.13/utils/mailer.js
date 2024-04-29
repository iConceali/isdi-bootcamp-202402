// api/utils/mailer.js

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail", // Cambia esto según tu proveedor de email
  auth: {
    user: "conitek-tools@gmail.com",
    pass: "Anonadado41",
  },
});

const sendNotificationEmail = (userEmail, message) => {
  const mailOptions = {
    from: "conitek-tools@gmail.com",
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

export default sendNotificationEmail;
