var express = require('express');
var router = express.Router();

var producer = require('../app.js').producer;

app.post('/sendMsg', function(req, res) {
    var sentMessage = JSON.stringify(req.body.message);
    payloads = [
        { topic: req.body.topic, messages: sentMessage, partition: 0 }
    ];
    producer.send(payloads, function(err, data) {
        res.json(data);
    });
})

module.exports = router;