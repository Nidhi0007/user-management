const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const oauth2Client = new OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET, // Client Secret
  "https://developers.google.com/oauthplayground" // Redirect URL
);

async function generateUnique() {
  return (
    "#" +
    Math.floor((1 + Math.random()) * 0x100000)
      .toString(16)
      .substring(1)
      .toUpperCase()
  );
}
oauth2Client.setCredentials({
  refresh_token: process.env.REFRESHTOKEN,
});
const accessToken = oauth2Client.getAccessToken();
const sendMailFunction = async (mail) => {
  try {
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

    // const html = fs.readFileSync(
    //   path.join(__dirname, `../../views/${mail.mail_file}`),
    //   "utf8"
    // );

    // const template = handlebars.compile(html)({
    //   ...data,
    // });
    const mailOptions = {
      from: '"noreply@test.com "<noreply@test.com>',
      to: mail.to,
      cc: mail.cc || [],
      subject: "Password",
      generateTextFromHTML: true,
      html: `<h1>hi</h1>`,
    };

    await smtpTransport.sendMail(mailOptions);
    smtpTransport.close();
  } catch (error) {
    console.error("error", error);
  }
};

module.exports = { sendMailFunction };
