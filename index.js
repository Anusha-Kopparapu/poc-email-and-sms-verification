var express = require('express');
  var app     = express();
  var path = require('path');
  var router = express.Router();
   var crypto = require('crypto');
   var Sequelize=require ('sequelize');
   var pg =require('pg');
  var bodyParser = require("body-parser");
 // var SMS =require('SMS');
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
   app.use(bodyParser.json());
  app.use(express.static(__dirname + '/'));
  app.use('/',router);

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
  router.post('/phone',function(req,res){
    console.log('Anu');
    

    crypto.randomBytes(2, function(err, buffer) {
   
     var token = parseInt(buffer.toString('hex'), 16).toString().substr(0,6);
    console.log(token);
//     const RapidAPI = require('rapidapi-connect');
//     const rapid = new RapidAPI('SMS verification', 'xxPqI0E81RmshOlgA5HZCUgraGjLp1as4Kbjsn7MamogfCwrBt');
//     rapid.call('Delivery', 'sendSMS', {
//     message: 'Hello, connect!' + token,
//     to : '7200980480'
// })
//     .on('success', (res) => {
//         console.log('success');
//     })
//     .on('error', (err) => {
//         console.log(err);
//     });
    var fromphone = '+14083407701';
    var tophone  ='+917200980480';
    var client = require('twilio')(
  'ACcb539b66c8b8a0df3c03deb4b6366c11',
  'c0495e45003af0211f98d368eda3e1e0'
);

    // API Key site2SMS :xxPqI0E81RmshOlgA5HZCUgraGjLp1as4Kbjsn7MamogfCwrBt
    client.messages.create({
  from: fromphone,
  to: tophone,
  body: "Hai !! Your verification code is :"+ token
},function(err,data){
  if(err)
    console.log(err);
    
}) 
    
    sequelize.query("INSERT INTO persondetails (token) VALUES('" + token+ "') (SELECT * FROM persondetails ORDER BY name DESC LIMIT 1)",[token],{type: sequelize.QueryTypes.INSERT}).then(function(persondetails,err) {
    });
  
});

    res.sendFile(path.join(__dirname+'/sms.html'));
  });
 
  router.post('/Post',function(req,res){
 console.log('Hi');
  console.log(req.body);
    var name = req.body.name;
    var email =req.body.email;
    var phone =req.body.phone;
    //  var name = 'anushak1';
    // var email ='anusha.k5@tcs.com1';
    // var phone ='7200904801';
       // console.log(firstname);
       // console.log(req.body);
    var data = {
        "Data":""
    };
   
  if(!!name && !!email && !!phone) 
    {
//sequelize.query("INSERT INTO persondetails(firstName,lastname,pwd,confirmPwd) VALUES('" + firstName+ "','" + lastname+ "','" + pwd + "','" + confirmPwd+ "')",[firstName,lastname,pwd,confirmPwd],{type: sequelize.QueryTypes.INSERT}).then(function(persondetails,err) {
  sequelize.query("INSERT INTO persondetails (name,email,phone) VALUES('" + name+ "','" + email+ "','" + phone + "')",[name,email,phone],{type: sequelize.QueryTypes.INSERT}).then(function(persondetails,err) {
    
 if(!!err){ 
 // if(!!err){
                data.Data = "Error Adding data";
            }else{
                //data["Data"] = 0;
                data["Data"] = "Person details Added Successfully";
            }
            res.json(data);
        });
   }
    else{
        data["Data"] = "Please provide all required data of person";
        //res.json(404).data);
res.status(400).json(data);
    }
});

  // set the public folder to serve public assets

   module.exports = router;

 app.listen(8080);
 console.log('port is running on 8080');