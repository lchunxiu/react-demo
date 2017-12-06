var mongoose = require("../model/db");
var Schema = mongoose.Schema;

var categorySchema = new Schema({
    title:String
});

module.exports = mongoose.connection.model("Category",categorySchema,"categorys");