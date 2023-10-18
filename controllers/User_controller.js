const User = require("../models/User_model");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { key } = require("../secret.js");
// Create and Save a new User
exports.create = (req, res) => {
  const user = {
    FirstName: req.body.FirstName,
    LastName: req.body.LastName,
    NIC: req.body.NIC,
    email: req.body.email,
    status: req.body.status,
    PSW: bcrypt.hashSync(req.body.PSW, 8)
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
    const id = req.params.id;

    User.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find User with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving User with id=" + id
        });
      });
};

// Update a User by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  const user = {
    FirstName: req.body.FirstName,
    LastName: req.body.LastName,
    NIC: req.body.NIC,
    email: req.body.email,
    status: req.body.status,
    PSW: bcrypt.hashSync(req.body.PSW, 8)
  };


  Tutorial.update(user, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with id=" + id
      });
    });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete User with id=" + id
      });
    });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
  
};

// Login for User by email.
exports.Login = async (req, res) => {
    await User.findOne({
      where: {
        email: req.body.email
      }
    })
      .then(user => {
        if (!user) {
          return res.status(404).send({ message: "User Not found." });
        }
        var passwordIsValid = bcrypt.compareSync(
          req.body.PSW,
          user.PSW
        );
        if (!passwordIsValid) {
          return res.status(401).send({
            
            message: "Invalid Password!"
          });
        }
        var token = jwt.sign({ NIC: user.NIC }, key.secret, {
          expiresIn: 259200 // 3 days
        });
        res.status(200).send({
            NIC: user.NIC,
            FirstName: user.FirstName,
            LastName: user.LastName,
            email: user.email,
            status: user.status,
            accessToken: token
          });
        
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
    }