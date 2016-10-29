exports.saveOne = saveOne;
exports.fetchLast10 = fetchLast10;

var MongoClient = require('mongodb');
var request = require('request-promise');

// save one data object to mongo db
function saveOne(dbUrl, collectionName, data) {
    var context = {
        DB_URL: dbUrl,
        DATA: data,
        COLLECTION: collectionName
    };
    // cascade of all needed promises
    return openDatabaseConnection(context)
        .then(saveData)
        .then(closeDatabaseConnection);
}
// fetch last 10 saved documents
function fetchLast10(dbUrl, collectionName) {
    var context = {
        DB_URL: dbUrl,
        DATA: {},
        COLLECTION: collectionName
    };
    // cascade of all needed promises
    return openDatabaseConnection(context)
    .then(getData)
    .then(closeDatabaseConnection);
}

function openDatabaseConnection(context) {

    console.log('================================================');
    console.log('opening database connection');

    return  MongoClient.connect(context.DB_URL)
        .then(function (db, error) {

            if (!error) {

                console.log('DB connected');
                //console.log(db);
                context.DB = db;
                return context;

            } else {

                console.log('Could not connect to database')
            }
        });
}

function getData(context) {

    console.log('Getting data from database');

    var collection = context.DB.collection(context.COLLECTION);

    return collection.find().sort({date: -1}).limit(10).toArray().then(function (results, error) {

        if (!error) {
            console.log('Data retrieved');
            context.DATA = results;
            return context;
        } else {

            console.log('Could not retrieve data from database');
            console.log(error);
            closeDatabaseConnection();
        }
    });
}

function saveData(context) {

    console.log('Saving data to database');

    var collection = context.DB.collection(context.COLLECTION);

    return collection.insertOne(context.DATA)
        .then(function (results, error) {

            if (!error) {

                console.log('Data saved');
                return context;
            } else {

                console.log('Could not save data to database');
                console.log(error);
                closeDatabaseConnection();
            }
        });
}

function closeDatabaseConnection(context) {

    console.log('Closing database connection');

    return context.DB.close(false)
        .then(function (ok, error) {

            if (!error) {

                console.log('Database closed');
                return context;
            } else {

                console.log('Could not close database connection');
            }
        });
}