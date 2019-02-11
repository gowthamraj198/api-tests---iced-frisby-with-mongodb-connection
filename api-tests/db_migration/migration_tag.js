const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://<username>:<pwd>@<DB>:<port>/<db_name>';

// Database Name
const dbName = 'db_name';

// Use connect method to connect to the server
exports.insert_tag = function(done) {
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
        assert.equal(null, err);
        console.log("Connected successfully to server");
        const db = client.db(dbName);
        insertMany(db,function () {
            client.close(done);
        })

    });
};

exports.delete_tag = function(done) {
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
        assert.equal(null, err);
        console.log("Connected successfully to server");
        const db = client.db(dbName);
        removeDocument(db,function () {
            client.close(done);
        })

    });
};



const findDocuments = function(db, callback) {
    const collection = db.collection('collection_name');
    collection.find({}).toArray(function(err, docs) {
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(docs);
        callback(docs);
    });
};

const removeDocument = function(db, callback) {
    const collection = db.collection('collection_name');
    collection.deleteOne({ name : 'test' }, function(err, result) {
        assert.equal(err, null);
        console.log("Removed one document with the field a equal to test");
        callback(result);
    });
};

const insertMany = function(db, callback) {
    const collection = db.collection('collection_name');
    collection.insertMany( [
        {_id: 'ObjectId("5c5d1abc906cc45d5dbtest1")',name: 'test', category: {name: 'Test','is_external': true, 'is_mandatory': true}, translations: {en: 'test-en', de: 'test-de', pt: 'test-pt', cn: 'test-cn'}},
        {_id: 'ObjectId("5c5d1abc906cc45d5dbdtest")',name: 'test1', category: {name: 'Test','is_external': true, 'is_mandatory': true}, translations: {en: 'test1-en', pt: 'test1-pt', cn: 'test1-cn'}},
        {_id: 'ObjectId("5c5d1abc906cc45d5dbtest2")',name: 'test2', category: {name: 'Test2','is_external': false, 'is_mandatory': false}, translations: {en: 'test2-en', pt: 'test2-pt', cn: 'test2-cn'}}
        ],function(err, result) {
        assert.equal(err, null);
        console.log("Inserted 3 documents into the collection");
        callback(result);
    });
};


const insertOne = function(db, callback) {
    const collection = db.collection('collection_name');
    collection.insertOne(
        {_id: 'ObjectId("5c5d1abc906cc45d5dbtest2")',name: 'test2', category: {name: 'Test2','is_external': false, 'is_mandatory': false}, translations: {en: 'test2-en', pt: 'test2-pt', cn: 'test2-cn'}}
    ,function(err, result) {
        assert.equal(err, null);
        console.log("Inserted 1 document into the collection");
        callback(result);
    });
};