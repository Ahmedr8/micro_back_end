
module.exports = app => {
  const authJwt = require("../middleware/verifyAcces.js");
    const user = require("../controllers/User_controller.js");
  
    
    var router = require("express").Router();
  
    // Create a new user
    router.post("/",[authJwt.verifyToken], user.create);

    // Create a new user
    router.post("/login", user.Login);
  
    // Retrieve all user
    router.get("/",[authJwt.verifyToken], user.findAll);
  
  
    // Retrieve a single user with id
    router.get("/:id",[authJwt.verifyToken], user.findOne);
  
    // Update a user with id
    router.put("/:id",[authJwt.verifyToken], user.update);
  
    // Delete a user with id
    router.delete("/:id",[authJwt.verifyToken,authJwt.isAdmin], user.delete);
  
    // Delete all user
    router.delete("/",[authJwt.verifyToken,authJwt.isAdmin], user.deleteAll);
  
    app.use('/api/users', router);
  };