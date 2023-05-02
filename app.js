const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();

// Ejs ni togirlab olamiz
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
console.log(__dirname);

// Set up body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));

// Define route to render email form
app.get('/', (req, res) => {
    res.render('index');
});

// Define route to handle email form submissions
app.post('/send-email', (req, res) => {
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
            res.send('Email sent successfully');
        }
    });
});


app.get('/send-email', (req, res) => {
    res.render('success');
});

// Start server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});





