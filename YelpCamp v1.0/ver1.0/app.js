var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

var campgrounds = [
            {name: "Salmon Creek", image: "https://farm9.staticflickr.com/8471/8137270056_21d5be6f52.jpg"},
            {name: "Granite Hill", image: "https://farm8.staticflickr.com/7168/6670258309_2e52bdbc6c.jpg"},
            {name: "Mountain Goat's Rest", image: "https://farm6.staticflickr.com/5059/5518252117_d232831997.jpg"},
            {name: "Salmon Creek", image: "https://farm9.staticflickr.com/8471/8137270056_21d5be6f52.jpg"},
            {name: "Granite Hill", image: "https://farm8.staticflickr.com/7168/6670258309_2e52bdbc6c.jpg"},
            {name: "Mountain Goat's Rest", image: "https://farm6.staticflickr.com/5059/5518252117_d232831997.jpg"},
            {name: "Salmon Creek", image: "https://farm9.staticflickr.com/8471/8137270056_21d5be6f52.jpg"},
            {name: "Granite Hill", image: "https://farm8.staticflickr.com/7168/6670258309_2e52bdbc6c.jpg"},
            {name: "Mountain Goat's Rest", image: "https://farm6.staticflickr.com/5059/5518252117_d232831997.jpg"}
        ];
        

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
   
    res.render("campgrounds", {campgrounds:campgrounds});
});

app.post("/campgrounds", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
    campgrounds.push(newCampground);
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Yelp Camp Has Started!!");
});