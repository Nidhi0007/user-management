const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const fs=require('fs')
const handlebars=require('handlebars')
const path=require('path')
const sendMailFunction = async (mail) => {
    try {
      const oauth2Client = new google.auth.OAuth2(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        "https://developers.google.com/oauthplayground"
      );
  
      oauth2Client.setCredentials({
        refresh_token: process.env.REFRESHTOKEN,
      });
  
      const accessToken = await oauth2Client.getAccessToken();
      const smtpTransport = nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: process.env.MAILER_EMAIL_ID,
          clientId: process.env.CLIENT_ID,
          clientSecret: process.env.CLIENT_SECRET,
          refreshToken: process.env.REFRESHTOKEN,
          accessToken: accessToken,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });
  
      const html = fs.readFileSync(
        path.join(__dirname, `../view/emailTemplate.hbs`),
        "utf8"
      );
  
      const template = handlebars.compile(html)({
        ...mail,
      });
      const mailOptions = {
        from: '"noreply@test.com "<noreply@test.com>',
        to: mail.to,
        cc: mail.cc || [],
        subject: "User Credential",
        generateTextFromHTML: true,
        html: template,
      };
  
      await smtpTransport.sendMail(mailOptions);
      smtpTransport.close();
    } catch (error) {
      console.error("error", error);
    }
  };
module.exports = { sendMailFunction};
