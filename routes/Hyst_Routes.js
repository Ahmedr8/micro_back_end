
module.exports = app => {
    const authJwt = require("../middleware/verifyAcces.js");
      const Hystorique = require("../controllers/Hyst_controllers.js");
    
      
      var router = require("express").Router();
    
      // Create a new Hystorique
      router.post("/",[authJwt.verifyToken], Hystorique.rent);
  

    
      // Retrieve all Hystorique
      router.get("/",[authJwt.verifyToken], Hystorique.findAll);
    
    
      // Retrieve a single Hystorique with id
      router.get("/:id",[authJwt.verifyToken], Hystorique.findOne);
    
      // Update a Hystorique with id
      router.put("/:id",[authJwt.verifyToken], Hystorique.return);
    
      // Delete a Hystorique with id
      router.delete("/:id",[authJwt.verifyToken,authJwt.isAdmin], Hystorique.delete);
    
      // Delete all Hystorique
      router.delete("/",[authJwt.verifyToken,authJwt.isAdmin], Hystorique.deleteAll);
    
      app.use('/api/Hystoriques', router);
    };