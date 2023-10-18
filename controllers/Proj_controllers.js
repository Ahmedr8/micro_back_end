const Proj = require("../models/projector_model");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { key } = require("../secret.js");
// Create and Save a new Proj
exports.create = (req, res) => {
  const Proj = {
    brand: req.body.brand,
    serialNumber: req.body.serialNumber,
    status: req.body.status,
    nbrCables:req.body.nbrCables,
    comment:req.body.comment,
  };

  Proj.create(Proj)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Proj."
      });
    });
};

// Retrieve all Projs from the database.
exports.findAll = (req, res) => {
    
    Proj.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Projs."
        });
      });
};

// Find a single Proj with id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Proj.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Proj with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Proj with id=" + id
        });
      });
};

// Update a Proj by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  const Proj = {
    brand: req.body.brand,
    serialNumber: req.body.serialNumber,
    status: req.body.status,
    nbrCables:req.body.nbrCables,
    comment:req.body.comment,
  };


  Proj.update(Proj, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Proj was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Proj with id=${id}. Maybe Proj was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Proj with id=" + id
      });
    });
};

// Delete a Proj with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Proj.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Proj was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Proj with id=${id}. Maybe Proj was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Proj with id=" + id
      });
    });
};

// Delete all Projs from the database.
exports.deleteAll = (req, res) => {
  
};

