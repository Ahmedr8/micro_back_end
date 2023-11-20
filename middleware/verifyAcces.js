const User = require("../models/User_model");
const { key } = require("../secret.js");
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
    if (!token) {
      return res.status(403).send({
        message: "No token provided!"
      });
    }
    jwt.verify(token, key.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: "Unauthorized!"
        });
      }
      req.userId = decoded.id;
      next();
    });
  };

/* verify if the user is an admin */
const isAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
      
          if (user.status == true) {
            next();
            return;
          }
        
        res.status(403).send({
          message: "Require Admin Role!"
        });
        return;
      });
    } 


            const authJwt = {
                verifyToken: verifyToken,
                isAdmin: isAdmin,

              };

              module.exports = authJwt;