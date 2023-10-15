
module.exports = app => {
  const authJwt = require("../middleware/verifyAcces.js");
    const users = require("../controllers/User_controller.js");
  
    
    var router = require("express").Router();
  
    // Create a new user
    router.post("/",[authJwt.verifyToken], users.create);

    // Create a new user
    router.post("/login", users.Login);
  
    // Retrieve all users
    router.get("/",[authJwt.verifyToken], users.findAll);
  
  
    // Retrieve a single user with id
    router.get("/:id", users.findOne);
  
    // Update a user with id
    router.put("/:id", users.update);
  
    // Delete a user with id
    router.delete("/:id", users.delete);
  
    // Delete all users
    router.delete("/", users.deleteAll);
  
    app.use('/api/users', router);
  };