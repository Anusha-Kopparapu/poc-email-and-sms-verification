var express = require('express');
  var app     = express();
  var path = require('path');
  var router = express.Router();
   var crypto = require('crypto');
   var Sequelize=require ('sequelize');
  // var sendgrid = require("sendgrid")("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");
  var sequelize = new Sequelize('postgres', 'postgres', '1994@Anu', {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
//     dialectOptions:{
//     ssl:true
// }
    // DATABASE_URL:'postgres://fnykiielutjcbx:25236de90eda0295f5f26480a2a5686ce817d6bc8f7b3e88ac0c9809367a42cd@ec2-54-235-90-107.compute-1.amazonaws.com:5432/ddoekvsmvbt4bm'
});
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
  app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
  router.get('/email',function(req,res){


crypto.randomBytes(3, function(err, buffer) {
   
     var token = parseInt(buffer.toString('hex'), 16).toString().substr(0,6);

  var helper = require('sendgrid').mail,
sg = require('sendgrid')('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');
var emailtestfrom ='anushak.k21@gmail.com';
var emailtestto ='anushak.k21@gmail.com';

var from_email = new helper.Email(emailtestfrom);
var to_email = new helper.Email(emailtestto);
var subject = 'Subject';
var content = new helper.Content('text/html', '<html><p>Please find the default password for this website</p>'+ token +'<p>Please change it after your login<p>'+'<a href="clickhere">clickhere</a></html>');
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
 });
  router.get('/phone',function(req,res){

    crypto.randomBytes(3, function(err, buffer) {
   
     var token = parseInt(buffer.toString('hex'), 16).toString().substr(0,6);

    var fromphone = '+14252766778';
    var tophone  ='+917200980480';
    var client = require('twilio')(
  'ACf2c829068bc38ecdc6fc9eaffba9b27e',
  'df89f2cd9bec439a4a91b5724b68928c'
);
    client.messages.create({
  from: fromphone,
  to: tophone,
  body: "Hai !! This is Anusha"+ token
},function(err,data){
  if(err)
    console.log(err);
})
  });
  });
  module.exports = router;
  // set the public folder to serve public assets
  app.use(express.static(__dirname + '/'));
  app.use('/',router);
  
 app.listen(8080);
 console.log('port is running on 8080');