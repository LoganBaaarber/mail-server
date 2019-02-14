import express from 'express';
import mysql from 'mysql';
import utils from './utils.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import nodemailer from 'nodemailer';
const app = express()
const port = 3000

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'youremail@gmail.com',
    pass: 'yourpassword'
  }
});


var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'mail'
});

connection.connect(function(err) {
  console.log('Connected to mysql!');
});

app.use(cors())
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('Hello World!'))

app.post('/register', function (req, res) {
  var firstName = req.param('first_name');
  var lastName = req.param('last_name');
  var email = req.param('email');
  var verifyKey = utils.makeKey();

  console.log(verifyKey);

  if(!firstName || !lastName   || !email) {
       return res.send({"status": "error", "message": "Form is incomplete!"});
   } else {

     var user  = {first_name: firstName, last_name: lastName, email: email, verify_key: verifyKey, verified: false };
     var query = connection.query('INSERT INTO users SET ?', user, function(err, result)
     {
    res.send({"status": "success", "message": "Your email has been registered! Welcome to the list."});
    var mailOptions = {
  from: 'youremail@gmail.com',
  to: email,
  subject: 'Welcome to the list!',
  text: 'Thanks for registering!'
};

transporter.sendMail(mailOptions, function(error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log(`Email sent: ${info.response}`);
  }
});
    });

  }
})

app.post('/verify', function (req, res) {

})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
