var MongoClient = require('mongodb');
var request = require('request-promise');
var dbUrl = 'mongodb://localhost:27017/trying';
var apiOptions = {
    uri: 'http://api.tvmaze.com/shows',
    json: true
};
var collectionName = 'testApiInMongo';

fetchAndSave(dbUrl, apiOptions, collectionName);

function fetchAndSave(dbUrl, apiOptions, collectionName) {
    var context = {
        DB_URL: dbUrl,
        API_OPTIONS: apiOptions,
        COLLECTION: collectionName
    };

    return openDatabaseConnection(context)
        .then(fetchApiData)
        .then(saveData)
        .then(closeDatabaseConnection);
}

function openDatabaseConnection(context) {

    console.log('opening database connection');

    return  MongoClient.connect(context.DB_URL)
        .then(function (db, error) {

            if (!error) {

                console.log('DB connected');
                //console.log(db);

                context.DB = db;

                return context;
            } else {


            }
        });
}

function fetchApiData(context) {

    console.log('Fetching Data from API url');

    return request(context.API_OPTIONS)
        .then(function(data, error) {

            if (!error) {

                console.log('Data fetched');
                //console.log(data);

                context.DATA = data;

                return context;
            } else {

                console.log('Could not get data from API');
                console.log(error);
                closeDatabaseConnection();
            }
        });
}

function saveData(context) {

    console.log('Saving data to database');

    var collection = context.DB.collection(context.COLLECTION);

    return collection.insertMany(context.DATA)
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