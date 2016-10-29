var express = require('express');
var bodyParser = require('body-parser');
var mongo = require('./mongo');
var app = express();

var appPort = 8080;
var dbUrl = 'mongodb://localhost:27017/gitHubExplorer';
var collectionName = 'history';

app.set('port', appPort);

// payload limit
// for parsing application/json
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));


// the root directory contains the "index.html" file
app.use(express.static(__dirname+'/public'));

// start the server
app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});

// Set new custom search as JSON into mongodb
app.post('/api/gitHubExplorer/new', function (req, res) {
    var storeData = req.body;
    storeData.date = new Date();
    mongo.saveOne(dbUrl, collectionName, storeData);
    res.send('OK');
});

// Answer client for the last 10 custom searches as JSON
app.get('/api/gitHubExplorer/lasts', function (req, res) {
    mongo.fetchLast10(dbUrl, collectionName).then(function (ret) {
        res.send(ret.DATA);
    });
});