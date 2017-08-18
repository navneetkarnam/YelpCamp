var express = require("express");
var router = express.Router();
var campground = require("../models/campground");
var middleware = require("../middleware");

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
router.post("/", middleware.isLoggedIn, function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var price = req.body.price;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = {name: name, price: price, image: image, description:desc, author: author};
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
router.get("/new", middleware.isLoggedIn, function(req, res){
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


//Edit campground route

router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
         campground.findById(req.params.id, function(err, foundCampground){
            res.render("campgrounds/edit",{campground:foundCampground});
         });
});


//update campground route
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    //find and update the campground and then redirect somewhere
    campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err,updatedCampground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else{
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});


//Destroy campground
router.delete("/:id", middleware.checkCampgroundOwnership, function(req,res){
    campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds");
        }else{
            res.redirect("/campgrounds");
        }
    });
});





module.exports = router;