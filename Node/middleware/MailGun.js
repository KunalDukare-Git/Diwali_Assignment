const emailConfig = {
    apiKey: process.env.MAIL_GUN_API_KEY,
    domain: process.env.MAIL_GUN_DOMAIN
};

const mailgun = require('mailgun-js')(emailConfig);
exports.sendEmail = (from, to, subject, text) =>
    new Promise((resolve, reject) => {
        const data = {
            from: from,
            to: to,
            subject: subject,
            text: text,
        };

        mailgun.messages().send(data, (error) => {
            if (error) {
                return reject(error);
            }
            return resolve();
        });
    });