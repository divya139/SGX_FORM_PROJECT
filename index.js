const bodyParser = require("body-parser");
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const { prototype } = require("nodemailer/lib/dkim");
const sendEmailService = require("./server/SmtpEmailService");
const STATUS = require("./server/serverConstants");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req,res) => {
  res.send("Welcome to my forma");
});

app.post("/api/form", (req, res) => {

  const response = sendEmailService.sendEmail(req);
  if(response!==STATUS.SUCCESS_RESPONSE){
    res.send(STATUS.FAILURE);
    res.status(STATUS.ERROR_RESPONSE);
  }
  else{
    res.send(STATUS.SUCCESS);
    res.status(STATUS.SUCCESS_RESPONSE);
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, ()=>{
    console.log(`server starting at port ${PORT}`);
});