var nodemailer = require("nodemailer");
const config = require("../config");
const email = config.get(process.env.ENVIRONMENT).email;

export const SendEmail = (from, to, subject, html) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: email.username,
      pass: email.password,
    },
  });

  var mailOptions = {
    from: from,
    to: to,
    subject: subject,
    html: html,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error)
    } else {
      console.log("Email sent: " + info.response);
      return false;
    }
  });
};