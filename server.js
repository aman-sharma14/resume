import express from 'express';
import mysql from 'mysql2';
import path from 'path';
import nodemailer from 'nodemailer';
// require('dotenv').config();
import 'dotenv/config';

import { SentimentIntensityAnalyzer } from 'vader-sentiment';

function sen(score) {
    if (score >= 0.05) {
        return 'Positive';
    } else if (score <= -0.05) {
        return 'Negative';
    } else {
        return 'Balanced';
    }
}


const app = express();
const PORT = 3000;


app.use(express.json());
app.use(express.static(path.resolve('./')));

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: EMAIL_USER, 
        pass: EMAIL_PASS, 
    },
});

app.post('/otp',(req,res)=>{
    const {email} = req.body;
    const otp = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;

    const mailOptions = {
        from: EMAIL_USER, 
        to: email, 
        subject: 'Resume OTP',
        text: String(otp), 
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error sending email.' });
        }
        console.log('Email sent: ' + info.response);
        res.status(200).json({ message: 'Email sent successfully!', otp: otp });
    });
    
})

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rootdb',
    database: 'resumedb'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL Database');
});


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); 
});

app.post('/reviews', (req, res) => {
    const { fname, lname, email, msg } = req.body;

    const score = SentimentIntensityAnalyzer.polarity_scores(msg).compound;
    console.log(score);
    const type = sen(score);

    db.query('INSERT INTO resumeMsgs (fname, lname, email, msg, score, type) VALUES (?, ?, ?, ?, ?, ?)', [fname, lname, email, msg,score,type], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(201).json({ message: 'Review added.' });
    });
});

app.get('/reviews', (req, res) => {
    const sql = 'SELECT * FROM resumeMsgs'; 

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching reviews', err);
            return res.status(500).send('Server Error');
        }

        res.json(results);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
