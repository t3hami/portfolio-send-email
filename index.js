const express = require('express');
const bodyParser = require('body-parser');
const { SENDGRID_APIKEY } = require('./config');
const sgMail = require('@sendgrid/mail');
var cors = require('cors')

sgMail.setApiKey(SENDGRID_APIKEY);
const app = express();
app.use(bodyParser.json());
app.use(cors())

app.post('/', (req, res) => {
    const {from, name, text} = req.body;
    const msg = {
    to: 't3hami@gmail.com',
    from: from,
    subject: 'New Message On Website',
    text: `From: ${name}\n Message: ${text}`,
    html: `<h3>From: ${name}</h3></br><h3>Message:</h3></br><p>${text}</p>`,
    };
    sgMail.send(msg);
    res.status(201).send()
});

app.listen(process.env.PORT, () => console.log('Express server is listening on port '+process.env.PORT));

// https://portfolio-send-email.herokuapp.com