var express = require('express');
var bodyParser = require('body-parser');
var nodemailer = require("nodemailer");
var app = express();
var port = process.env.PORT || 3000;

app.use(express.static("./assets"));
app.use(bodyParser.json());

var smtpTransport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
        user: "hannajartist@gmail.com",
        pass: "INSERT HANNAS PASSWORD HERE"
    }
});

/*--SMTP Over--*/

/*--Routing Started--*/

app.get('/',function(req,res){
    res.sendfile('index.html');
});
app.post('/send',function(req,res){
    var mailOptions={
        to: "hannajartist@gmail.com",
        subject : `Contact Form Submission - ${req.body.name}`,
        text : 'From: ' + req.body.from + '\n\n' + req.body.text
    }
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function(error, response){
     if(error){
            console.log(error);
        res.end("error");
     }else{
            console.log("Message sent: " + response.message);
        res.end("sent");
         }
});
});

/*--Routing Over--*/

app.listen(port, function() {
    console.log("Express Started on Port", port);
});