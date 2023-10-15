const User = require("../models/User_model");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { key } = require("../secret.js");
// Create and Save a new User
exports.create = (req, res) => {
  const user = {
    FirstName: req.body.FirstName,
    LastName: req.body.LastName,
    CIN: req.body.cin,
    Email: req.body.Email,
    PSW: bcrypt.hashSync(req.body.psw, 8)
  };

  User.create(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
    
    User.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Users."
        });
      });
};

// Find a single User with CIN
exports.findOne = (req, res) => {
    const cin = req.params.cin;

    User.findByPk(cin)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find User with cin=${cin}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving User with cin=" + cin
        });
      });
};

// Update a User by the id in the request
exports.update = (req, res) => {
  
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
  
};

// Login for User.
exports.Login = async (req, res) => {
    await User.findOne({
      where: {
        CIN: req.body.cin
      }
    })
      .then(user => {
        if (!user) {
          return res.status(404).send({ message: "User Not found." });
        }
        var passwordIsValid = bcrypt.compareSync(
          req.body.psw,
          user.PSW
        );
        if (!passwordIsValid) {
          return res.status(401).send({
            
            message: "Invalid Password!"
          });
        }
        var token = jwt.sign({ CIN: user.CIN }, key.secret, {
          expiresIn: 86400 // 24 hours
        });
        res.status(200).send({
            cin: user.CIN,
            FirstName: user.FirstName,
            LastName: user.LastName,
            Email: user.Email,
            statut: null,
            accessToken: token
          });
        
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
    }