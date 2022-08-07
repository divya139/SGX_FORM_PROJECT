const nodemailer = require("nodemailer");
const SECRETE_PROPERTIES = require("./secreteProperties");
const STATUS = require("./serverConstants");

 module.exports ={
  sendEmail: function(req){
    let data = req.body;
    let responseStatus;
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
      if (error) {
        responseStatus = STATUS.ERROR_RESPONSE;
         return responseStatus;
      } else {
        responseStatus = STATUS.SUCCESS_RESPONSE
          return responseStatus;
      }
    });
  
    smtpTransport.close();
  }
}
