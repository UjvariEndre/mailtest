const express = require("express");
const ejs = require("ejs");
const nodemailer = require("nodemailer");

const app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "utradeandinvest@gmail.com", // generated ethereal user
      pass: "", // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: "info@endreujvari.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <07acb726-06c6-e820-0b56-bf4dbac8b3b2@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

app.get("/", function(req, res) {
  res.render("home");
});

app.post("/", function(req, res) {
  main().catch(console.error);
  res.redirect("/");
})

const port = parseInt(process.env.PORT) || 8080;
app.listen(port, () => {
  console.log(`portfolio: listening on port ${port}`);
});
