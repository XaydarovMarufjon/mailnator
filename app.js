const express=require('express');
const bodyParser=require('body-parser');
const nodemailer=require('nodemailer');
const path=require('path');
const ejs=require('ejs');
const fs=require('fs');

const app=express();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
console.log(__dirname);

app.use(bodyParser.urlencoded({
        extended: false
    }));


let comments=[];

app.get('/', (req, res)=> {
        res.render('index');
});

app.get('/comments', (req, res)=> {
    res.render('comments', {comments});
});

app.post('/send-email', (req, res)=> {
        const {
            to, subject, message
        }

        =req.body;

        const transporter=nodemailer.createTransport({

            service: 'gmail',
            auth: {
                user: 'marufjankhaydarov@gmail.com',
                pass: 'gepdhixmtyksmqvt'
            }
        });

    const mailOptions= {
        from: 'marufjankhaydarov@gmail.com',
        to,
        subject,
        text: message
    }

    ;

    transporter.sendMail(mailOptions, (error, info)=> {
            if (error) {
                console.log(error);
                res.status(500).send('Error sending email');
            }

            else {
                console.log('Email sent: ' + info.response);
                res.render('success');
            }
        });

});

///comments

app.post('/comments', (req, res)=> {
        const {  name, comment } = req.body;
        console.log(req.body)
        const newComment= {
            name,
            comment
        };
         
        console.log(comments)
        comments.push(newComment);
        res.redirect('/comments');
    });





// Start server
const PORT=3003;

app.listen(PORT, ()=> {
        console.log(`Server started on port ${PORT}`);
    });