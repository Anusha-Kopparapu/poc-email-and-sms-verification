var express = require('express');
  var app     = express();
  var path = require('path');
  var router = express.Router();
  // var sendgrid = require("sendgrid")("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");

  router.get('/hello',function(req,res){
   
// using SendGrid's Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs

  var helper = require('sendgrid').mail,
sg = require('sendgrid')('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');

var from_email = new helper.Email('anushak.k21@gmail.com');
var to_email = new helper.Email('anushak.k21@gmail.com');
var subject = 'Subject';
var content = new helper.Content('text/plain', 'test');
var mail = new helper.Mail(from_email, subject, to_email, content);

var request = sg.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: mail.toJSON()
});

sg.API(request, function(err, response) {
    console.log(err, response);
    if (!err) {
        res.send({
            message: 'An email has been sent to the provided email with further instructions.'
        });
    } else {
        return res.status(400).send({
            message: 'Failure sending email'
        });
    }
});
 });
  module.exports = router;
  // set the public folder to serve public assets
  app.use(express.static(__dirname + '/'));
  app.use('/',router);
  
 app.listen(8080);
 console.log('port is running');