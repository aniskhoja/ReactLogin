import nodemailer from 'nodemailer'
async function mail(recipientEmail, url) {
        let testAccount = await nodemailer.createTestAccount();

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'testmak04@gmail.com',
                pass: 'Maktest04'
            }
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"mak test" <testmak04@gmail.com>', // sender address
            to: `${recipientEmail}`, // list of receivers
            subject: "verification Email ✔", // Subject line
            html: `Please click to verify you email <a href="${url}">${url}</a>` // html body
        });
    };

export default mail;