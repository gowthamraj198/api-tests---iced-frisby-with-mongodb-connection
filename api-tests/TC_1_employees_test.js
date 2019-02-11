var frisby = require('icedfrisby');
var base = require('./base_class.js');
var migration = require('./db_migration/migration_tag.js');


var URL = base.yml().employees;
var create = base.yml().create;
var json_data = base.read_config("api-tests/test_data/TC_1_employees_test.json");

describe("Get details", function () {
    this.timeout(20000);
    frisby.create('verify response is 200 and get the details')
        .before(function (done) {
            // migration.insert_tag(done)    --insert data
            setImmediate(done)
        })
        .get(URL)
        .expectStatus(200)
        .inspectJSON()
        .expectContainsJSON(json_data[0])
        // .after (function(done) {
        //     // migration.delete_tag(done)    --remove data
        //     setImmediate(done)
        // })
        .toss()
});


describe("Post details", function () {
    this.timeout(20000);
    frisby.create('create record')
        .post(create, json_data[1])
        .expectStatus(200)
        .toss();
});

