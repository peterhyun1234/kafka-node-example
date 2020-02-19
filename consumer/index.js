var express = require('express');
var kafka = require('kafka-node');
var app = express();

var bodyParser = require('body-parser')
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));

var Consumer = kafka.Consumer;
var Offset = kafka.Offset;
var Client = kafka.KafkaClient;
var topic = 'aa';

var client = new Client({ kafkaHost: 'localhost:9092' });
var topics = [{ topic: topic, partition: 0 }];
var options = { autoCommit: false, fetchMaxWaitMs: 1000, fetchMaxBytes: 1024 * 1024 };

var consumer = new Consumer(client, topics, options);
var offset = new Offset(client);

consumer.on('message', function(message) {
    console.log(message);
    console.log("offset: " + offset);
});

consumer.on('error', function(err) {
    console.log('error', err);
});

consumer.on('offsetOutOfRange', function(err) {
    console.log('offsetOutOfRange:', err);
})

// app.listen(4335, function() {
//     console.log('Kafka consumer running at 4335')
// })