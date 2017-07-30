var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");


//Schema setup**
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var campground = mongoose.model("campground", campgroundSchema);

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        }
        else{
            res.render("index", {campgrounds:allCampgrounds});
        }
    });
   
});

app.post("/campgrounds", function(req, res){
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

app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs");
});

app.get("/campgrounds/:id", function(req,res){
    campground.findById(req.params.id, function(err, foundCampground){
       if(err) {
           console.log(err);
       }
       else{
           res.render("show", {campground:foundCampground});
       }
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Yelp Camp Has Started!!");
});