const express = require("express");
const app = express();
const global = require('./global');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

app.use(bodyParser.json({
    limit: '5mb'
}));
app.use(bodyParser.urlencoded({
    limit: '5mb',
    extended: true
}));

app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));
app.set('views', path.join(__dirname, 'public/views'));


app.get('/', (req, res) => {
    res.render('index');
});

app.post('/web2img', (req, res) => {
    global.paint(req.body).then((data) => {
        var data = "data:image/png;base64," + Buffer.from(data).toString('base64');
        res.json(data);
    });
});

app.listen(8080, () => {
    console.log(`Server Up`);
});