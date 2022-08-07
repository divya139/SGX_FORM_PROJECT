const bodyParser = require("body-parser");
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const { prototype } = require("nodemailer/lib/dkim");
const SECRETE_PROPERTIES = require("./secreteProperties");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req,res) => {
  res.send("Welcome to my forma");
});

app.post("/api/forma", (req, res) => {
  let data = req.body;
  let smtpTransport = nodemailer.createTransport({
    service: "Yahoo",
    port: 465,
    auth: {
      user: SECRETE_PROPERTIES.EMAIL_USER_NAME,
      pass: SECRETE_PROPERTIES.EMAIL_PASSWORD,
    },
  });

  let mailOptions = {
    from: SECRETE_PROPERTIES.EMAIL_USER_NAME,
    to: data.email,
    subject: `Form submission confirmation`,
    html: `
        <h3>Dear ${
          data.firstname
        } your form has been submitted successfully with below details </h3>
        <ul>
        <li>First Name: ${data.firstname} </li>
        <li>last Name: ${data.lastname} </li>
        <li>Email: ${data.email} </li>
        <li>Description: ${data.description} </li>
        </ul>
        
        <h3>Message:</h3>
        <p>${data.description}</p>
        
        `,
  };

  smtpTransport.sendMail(mailOptions, (error, response) => {
    console.log(response);
    if (error) {
        res.send(error);
    } else {
        res.send("Success");
    }
  });

  smtpTransport.close();
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, ()=>{
    console.log(`server starting at port ${PORT}`);
});