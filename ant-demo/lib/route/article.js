var express = require('express');
var router = express.Router();

var Article = require("../schemas/article");


router.get('/list',function(req, res, next){
    Article.find({}).select("_id title type date")
    .exec(function(err, result){
        if(err){
            next(err);
        }else{
            res.json(result);
            res.end();
        }
    });
});


router.param('id', function(req, res, next, id) {
    Article.findOne({_id:id},function(err,result){
        if(err){
            next(err);
        }else{
            req.article = result; 
            next();
        }
    });
  });

router.route("/:id")
.get(function(req, res, next) {
     res.json(req.article)
     res.end();
  });
  
router.route("/")
.all(function(req, res, next){
    next();
})
.post(function(req, res, next){
    Article.findOneAndUpdate({_id:req.body._id},req.body,function(err,result){
        if(err){
            next(err);
        }else{
            res.json({isok:true});
            res.end();
        }
    });    
})
.put(function(req,res,next){
    var article=new Article(req.body);
    article.save(function(err,result){
        if(err){
            next(err);
        }else{
            res.json({isok:true});
            res.end();
        }
    });
})
.delete(function(req, res, next){
    var _id = req.body._id;
    Article.findByIdAndRemove(_id,function(err,result){
        if(err){
            next(err);
        }else{
            res.json({isok:true});
            res.end();
        }
    });
});

module.exports = router;
