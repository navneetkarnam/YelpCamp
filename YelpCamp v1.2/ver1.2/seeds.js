var mongoose = require("mongoose");
var campground = require("./models/campground");
var Comment = require("./models/comment");


var data = [
    {   name: "Clouds Rest", 
        image:"https://farm9.staticflickr.com/8471/8137270056_21d5be6f52.jpg",
        description: "blah blah blah"
    },
    
     {   name: "Desert Mesa", 
        image: "https://farm5.staticflickr.com/4176/34533122526_13d698e62a.jpg",
        description: "blah blah blah"
    },
    
     {   name: "Dummy Camp", 
        image: "https://farm6.staticflickr.com/5059/5518252117_d232831997.jpg",
        description: "blah blah blah"
    }
    ]


function seedDB(){
    //Remove all campgrounds!
        campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("Removed campgrounds");
        //Add a few campgrounds
        data.forEach(function(seed){
            campground.create(seed, function(err, campgrounds){
                if(err){
                    console.log(err);
                }
                else{
                    console.log("added a campground");
                    //add a few comments
                    Comment.create(
                        {
                            text:"This place is great! but I wish there was internet",
                            author: "Homer"
                        },function(err, comment){
                            if(err){
                                console.log(err);
                            } else{
                                campgrounds.comments.push(comment);
                                campgrounds.save();
                                console.log("created a new comment");
                            }
                            
                        });
                }
            });    
        });
    });

    
    
    
    
    
}

module.exports = seedDB;