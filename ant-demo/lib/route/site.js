
var Site = require("../schemas/site");

var express = require('express');
var router = express.Router();

router.get("/list",function(req, res,next){
    Site.find({}, function(err, result){
        if(err){
            next(err);
        }else{
            res.json(result);
            res.end();
        }
    });
});


router.route("/")
.all(function(req, res, next){
    next();
})
.post(function(req, res, next){
    Site.findOneAndUpdate({_id:req.body._id},req.body,function(err,result){
        if(err){
            next(err);
        }else{
            res.json({isok:true});
            res.end();
        }
    });    
})
.put(function(req,res,next){
    var site=new Site(req.body);
    site.save(function(err,result){
        if(err){
            next(err);
        }else{
            res.json({isok:true,site:site});
            res.end();
        }
    });
})
.delete(function(req, res, next){
    var _id = req.body._id;
    Site.findByIdAndRemove(_id,function(err,result){
        if(err){
            next(err);
        }else{
            res.json({isok:true});
            res.end();
        }
    });
});

module.exports = router;