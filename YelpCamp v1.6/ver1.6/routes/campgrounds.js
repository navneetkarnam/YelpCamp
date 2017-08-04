var express = require("express");
var router = express.Router();
var campground = require("../models/campground");


//index route
router.get("/", function(req, res){
    
    campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        }
        else{
            res.render("campgrounds/index", {campgrounds:allCampgrounds});
        }
    });
   
});

//Create route
router.post("/", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description:desc};
    campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        }
        else{
            res.redirect("/campgrounds");
        }
    });
    
});

//New Route
router.get("/new", function(req, res){
    res.render("campgrounds/new");
});

//SHOW
router.get("/:id", function(req,res){
    campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
       if(err) {
           console.log(err);
       }
       else{
           res.render("campgrounds/show", {campground:foundCampground});
       }
    });
});


module.exports = router;