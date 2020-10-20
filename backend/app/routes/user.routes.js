module.exports = app => {
    const users = require("../controllers/user.controller.js");

    var router = require("express").Router();

    //Create a new Tutorial
    // router.post("/",tutorials.create);

    // Retrieve all users
    router.get("/api/users",users.findAll);
    
    
    // Retrieve all friends
    router.get("/api/friends/:id",users.findFriends);
    
    // Retrieve all friend of friends
    router.get("/api/fof/:id",users.findFriendOfFriends);

    //retrieve all published tutorials
    // router.get("/",tutorials.findAllPublished);
    
    //retrieve a tutorial with id
    router.get("/api/users/:id",users.findOne);
    
    app.use('/',router);
    

};
