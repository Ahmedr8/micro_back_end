
module.exports = app => {
    const authJwt = require("../middleware/verifyAcces.js");
      const Projector = require("../controllers/Proj_controllers.js");
    
      
      var router = require("express").Router();
    
      // Create a new Projector
      router.post("/",[authJwt.verifyToken], Projector.create);
  

    
      // Retrieve all Projector
      router.get("/",[authJwt.verifyToken], Projector.findAll);
    
    
      // Retrieve a single Projector with id
      router.get("/:id",[authJwt.verifyToken], Projector.findOne);
    
      // Update a Projector with id
      router.put("/:id",[authJwt.verifyToken], Projector.update);
    
      // Delete a Projector with id
      router.delete("/:id",[authJwt.verifyToken,authJwt.isAdmin], Projector.delete);
    
      // Delete all Projector
      router.delete("/",[authJwt.verifyToken,authJwt.isAdmin], Projector.deleteAll);
    
      app.use('/api/Projectors', router);
    };