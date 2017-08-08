var mongoose = require("mongoose");
var campground = require("./models/campground");
var Comment = require("./models/comment");


var data = [
    {   name: "Clouds Rest", 
        image:"https://farm9.staticflickr.com/8471/8137270056_21d5be6f52.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sollicitudin, sem vel scelerisque vestibulum, nunc massa euismod urna, at eleifend nisi arcu id erat. Maecenas eget metus dictum, eleifend sapien in, eleifend sem. Nunc at sapien eget arcu aliquam elementum. Pellentesque et neque magna. Nam gravida ex placerat est placerat, vitae viverra libero vulputate. Donec sollicitudin pretium justo in bibendum. Donec sollicitudin sem est, nec auctor nulla cursus sit amet. Proin vel sem suscipit, commodo libero in, sagittis nunc. Curabitur justo nisi, finibus non massa nec, porttitor iaculis justo. Interdum et malesuada fames ac ante ipsum primis in faucibus. Proin sodales egestas nulla eget maximus."
    },
    
     {   name: "Desert Mesa", 
        image: "https://farm5.staticflickr.com/4176/34533122526_13d698e62a.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sollicitudin, sem vel scelerisque vestibulum, nunc massa euismod urna, at eleifend nisi arcu id erat. Maecenas eget metus dictum, eleifend sapien in, eleifend sem. Nunc at sapien eget arcu aliquam elementum. Pellentesque et neque magna. Nam gravida ex placerat est placerat, vitae viverra libero vulputate. Donec sollicitudin pretium justo in bibendum. Donec sollicitudin sem est, nec auctor nulla cursus sit amet. Proin vel sem suscipit, commodo libero in, sagittis nunc. Curabitur justo nisi, finibus non massa nec, porttitor iaculis justo. Interdum et malesuada fames ac ante ipsum primis in faucibus. Proin sodales egestas nulla eget maximus."
    },
    
     {   name: "Dummy Camp", 
        image: "https://farm6.staticflickr.com/5059/5518252117_d232831997.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sollicitudin, sem vel scelerisque vestibulum, nunc massa euismod urna, at eleifend nisi arcu id erat. Maecenas eget metus dictum, eleifend sapien in, eleifend sem. Nunc at sapien eget arcu aliquam elementum. Pellentesque et neque magna. Nam gravida ex placerat est placerat, vitae viverra libero vulputate. Donec sollicitudin pretium justo in bibendum. Donec sollicitudin sem est, nec auctor nulla cursus sit amet. Proin vel sem suscipit, commodo libero in, sagittis nunc. Curabitur justo nisi, finibus non massa nec, porttitor iaculis justo. Interdum et malesuada fames ac ante ipsum primis in faucibus. Proin sodales egestas nulla eget maximus."
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