
var Category = require("../schemas/category");

var express = require('express');
var router = express.Router();

router.get("/list",function(req, res,next){
    Category.find({}, function(err, result){
        if(err){
            next(err);
        }else{
            res.json(result);
            res.end();
        }
    });

});


module.exports = router;