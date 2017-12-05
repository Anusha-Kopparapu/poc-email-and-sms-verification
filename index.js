var express = require('express');
  var app     = express();
  var path = require('path');
  var router = express.Router();
  // var sendgrid = require("sendgrid")("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");

  router.get('/email',function(req,res){

  var helper = require('sendgrid').mail,
sg = require('sendgrid')('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');
var emailtestfrom ='anushak.k21@gmail.com';
var emailtestto ='yogeesh222@gmail.com'

var from_email = new helper.Email(emailtestfrom);
var to_email = new helper.Email(emailtestto);
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
  router.get('/phone',function(req,res){
    var fromphone = '+14252766778';
    var tophone  ='+917200980480';
    var client = require('twilio')(
  'ACf2c829068bc38ecdc6fc9eaffba9b27e',
  'df89f2cd9bec439a4a91b5724b68928c'
);
    client.messages.create({
  from: fromphone,
  to: tophone,
  body: "Hai !! How are you?"
},function(err,data){
  if(err)
    console.log(err);
})
  });
  module.exports = router;
  // set the public folder to serve public assets
  app.use(express.static(__dirname + '/'));
  app.use('/',router);
  
 app.listen(8080);
 console.log('port is running');