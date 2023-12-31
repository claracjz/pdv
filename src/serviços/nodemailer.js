const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});

const enviarEmail = (destinatario, assunto, conteudo) => {
    const email = {
        from: process.env.MAIL_FROM,
        to: destinatario,
        subject: assunto,
        text: conteudo
    };

    transporter.sendMail(email);
}

module.exports = enviarEmail;