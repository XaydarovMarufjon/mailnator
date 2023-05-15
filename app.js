const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');
const ejs = require('ejs');
const fs = require('fs');

const app = express();

// Ejs ni togirlab olamiz

app.set('view engine', 'ejs');
console.log(__dirname);

app.use(bodyParser.urlencoded({ extended: false }));

let comments = [];
app.get('/', (req, res) => {
    res.render('main');
});

app.get('/email', (req, res) => {
    res.render('index' , { comments });
});

app.post('/email/send-email', (req, res) => {
    const { to, subject, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'marufjankhaydarov@gmail.com',
            pass: 'gepdhixmtyksmqvt'
        }
    });

    const mailOptions = {
        from: 'marufjankhaydarov@gmail.com',
        to,
        subject,
        text: message
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent: ' + info.response);
            res.render('success');
        }
    });
    
});

///comments


  
  // Handle comment submission
  app.post('/email', (req, res) => {
    const { name, comment,url } = req.body;
  
    // Create a new comment object
    const newComment = {
      name,
      comment,
      url,
    };
  
    // Add the new comment to the comments array
    comments.push(newComment);
  
    // Redirect back to the comments page
    res.redirect('/email');
   
  });
  








// Start server
const PORT =  3003;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});




