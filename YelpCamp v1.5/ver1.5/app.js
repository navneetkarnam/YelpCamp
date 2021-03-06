var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    campground = require("./models/campground"),
    Comment = require("./models/comment"),
    User = require("./models/user"),
    seedDB = require("./seeds");
    
    
mongoose.connect("mongodb://localhost/yelp_camp_v15");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
seedDB();


//Passport configuration
app.use(require("express-session")({
    secret:"Rusty wins cutest dog!!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    
    campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        }
        else{
            res.render("campgrounds/index", {campgrounds:allCampgrounds});
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
    res.render("campgrounds/new");
});

app.get("/campgrounds/:id", function(req,res){
    campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
       if(err) {
           console.log(err);
       }
       else{
           res.render("campgrounds/show", {campground:foundCampground});
       }
    });
});

//=========================================
//COMMENTS ROUTES
//=========================================

app.get("/campgrounds/:id/comments/new",isLoggedIn, function(req, res){
    campground.findById(req.params.id, function(err, campground){
       if(err) {
           console.log(err);
       } else{
           res.render("comments/new", {campground: campground}); 
       }
    });
    
});

app.post("/campgrounds/:id/comments",isLoggedIn, function(req, res){
   //lookup campground using id
   campground.findById(req.params.id, function(err, campground){
      if(err) {
          console.log(err);
          res.redirect("/campgrounds");
      }else{
          //create new comment
          Comment.create(req.body.comment, function(err, comment){
              if(err){
                  console.log(err);
              }else{
                  //connect new comment to campground
                  campground.comments.push(comment);
                  campground.save();
                  //redirect to campground show page
                  res.redirect("/campgrounds/" + campground._id);
              }
          });
        
      }
   });
   
});

//=========================
// Auth Routes
//=========================

//show the register form

app.get("/register", function(req,res){
    res.render("register");
});

//signup logic

app.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req,res, function(){
            res.redirect("/campgrounds");
        })
    });
});

//show login form
app.get("/login", function(req,res){
   res.render("login");
});

//Login logic
app.post("/login",passport.authenticate("local", 
            {
                successRedirect: "/campgrounds", 
                failureRedirect: "/login"
                
            }), function(req, res){
                
});

//Logout route
app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/campgrounds");
});


function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Yelp Camp Has Started!!");
});