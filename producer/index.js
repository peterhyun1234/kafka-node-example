var express = require('express');
var kafka = require('kafka-node');
var app = express();

var bodyParser = require('body-parser')
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));

var Producer = kafka.Producer;
const client = new kafka.KafkaClient({
    kafkaHost: 'localhost:9092'
        //다른 옵션도 넣을 수 있음
});
const producer = new Producer(client);

producer.on('ready', function() {
    console.log('Producer is ready');
});

producer.on('error', function(err) {
    console.log('Producer is in error state');
    console.log(err);
})


app.get('/', function(req, res) {
    res.json({ greeting: 'Kafka Producer' })
});

app.post('/', function(req, res) {

    var recvTopic = req.body.topic;
    var sentMessage = req.body.message;

    payloads = [
        { topic: recvTopic, messages: sentMessage, partition: 0 }
    ];

    producer.send(payloads, function(err, data) {
        res.json(data);
    });

});

app.listen(3345, function() {
    console.log('Kafka producer running at 3345')
})