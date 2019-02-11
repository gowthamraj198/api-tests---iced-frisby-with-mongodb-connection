var yaml = require("js-yaml");
var fs   = require('fs');


exports.yml = function()
{
    var yml = yaml.load(fs.readFileSync("api-tests/config/api-config.yml"));
    return yml;
};

exports.read_config= function(file) {
    var data = read_json(file);
    return data;
};

read_json=function(file)
{
    var data=fs.readFileSync(file, 'utf8');
    var json=JSON.parse(data);
    return json;
};