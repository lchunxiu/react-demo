var mongoose = require('../model/db');
var Schema = mongoose.Schema;

var articleSchema = new Schema({
    title:  String,
    type: String,
    tags:[String],
    content:String,
    author:{id:Schema.Types.ObjectId,name:String},
    date:{type:Date,default:Date.now()}
  });

  module.exports = mongoose.connection.model('Article', articleSchema,"articles");