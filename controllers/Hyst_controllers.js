const Hyst = require("../models/Hyst_model");
const Proj = require("../models/projector_model");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { key } = require("../secret.js");
// Create and Save a new Hyst
exports.rent = async (req, res) => {
  const hyst = {
    proj_id: req.body.proj_id,
    user_id: req.body.user_id,
    start_date: req.body.start_date,
    end_date:req.body.end_date,
    status:0
  };
  await Hyst.findOne({
    where: {
      user_id: req.body.user_id,
      status:'0'
    }
  })
    .then(rent => {
      if (!rent) {
        Proj.update({ status: '0' }, {
          where: { id: req.body.proj_id }
        })
          .then(num => {
            if (num == 1) {
              Hyst.create(hyst)
              .then(data => {
                res.send(data);
              })
              .catch(err => {
                res.status(500).send({
                  message:
                    err.message || "Some error occurred while creating the Hyst."
                });
              });
            } else {
              res.send({
                message: `Cannot rent Proj with id=${hyst.proj_id}. Maybe Proj was not found `
              });
            }
          })
          .catch(err => {
            res.status(500).send({
              message: "cannot rent projector!!"
            });
          });

      }else{
        return res.status(404).send({ message: "you already have a rented projector!" });
      }
    });
    
};

// Retrieve all Hysts from the database.
exports.findAll = (req, res) => {
    
    Hyst.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Hysts."
        });
      });
};

// Find a single Hyst with id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Hyst.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Hyst with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Hyst with id=" + id
        });
      });
};

// Update a Hyst by the id in the request
exports.return = async (req, res) => {
  const id = req.params.id;
  const hyst = {
    end_date:req.body.end_date,
    status:1
  };
  let user_id;
  let token = req.headers["x-access-token"];
  jwt.verify(token, key.secret, (err, decoded) => {
     user_id=decoded.id;
      });
      await Hyst.findOne({
        where: {
          user_id: user_id,
          status:'0',
           id : id

        }
      })
      .then(rent => {
        if (rent) {
      Proj.update({ status: '0' }, {
        where: { id: id }
      })
        .then(num => {
          if (num == 1) {
            Hyst.update(hyst, {
              where: { id: id }
            })
              .then(num => {
                if (num == 1) {
                  res.send({
                    message: "proj was returned successfully."
                  });
                } else {
                  res.send({
                    message: `Cannot return Proj with hyst_id=${id}. Maybe proj was not found or req.body is empty!`
                  });
                }
              })
              .catch(err => {
                res.status(500).send({
                  message: "Error returning proj with hyst_id=" + id
                });
              });
          }
        })
        .catch(err => {
          res.status(500).send({
            message: "Error returning Proj with id=" + id
          });
        });
      }else{
        return res.status(404).send({ message: "you can only return your rented projector!" });
      }
    });
    


};

// Delete a Hyst with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Hyst.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Hyst was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Hyst with id=${id}. Maybe Hyst was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Hyst with id=" + id +"Maybe Not Available!"
      });
    });
};

// Delete all Hysts from the database.
exports.deleteAll = (req, res) => {
  
};

