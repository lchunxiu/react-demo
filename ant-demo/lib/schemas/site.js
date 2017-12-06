var mongoose = require("../model/db");
var Schema = mongoose.Schema;

var categorySchema = new Schema({
    title:String,
    url:String,
    icon:String,
    des:String,
    type:String
});

module.exports = mongoose.connection.model("Site",categorySchema,"sites");