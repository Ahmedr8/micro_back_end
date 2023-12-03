const Proj = require("../models/projector_model");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { key } = require("../secret.js");
const db = require("../db.config");
// Create and Save a new Proj
exports.create = (req, res) => {
  const proj = {
    brand: req.body.brand,
    serialNumber: req.body.serialNumber,
    status: req.body.status,
    nbrCables:req.body.nbrCables,
    comment:req.body.comment,
  };

  Proj.create(proj)
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
    
  Proj.findAll({
      order: [['status', 'ASC']]
    })
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
// get number of projectors by status
exports.countProjectors = async (req, res) => {
  try {
    const AllProjectors = await db.sequelize.query('SELECT COUNT(*) from "Projectors"', {
      type: db.sequelize.QueryTypes.SELECT
    }
    );
    const AvialableProjectors = await db.sequelize.query('SELECT COUNT(*) from "Projectors" where status=0', {
      type: db.sequelize.QueryTypes.SELECT
    }
    );
    const UnavailableProjectors = await db.sequelize.query('SELECT COUNT(*) from "Projectors" where status=1', {
      type: db.sequelize.QueryTypes.SELECT
    }
    );
    const ToFixProjectors = await db.sequelize.query('SELECT COUNT(*) from "Projectors" where status=2', {
      type: db.sequelize.QueryTypes.SELECT
    }
    );
    res.json({
      allProjectorsCount: AllProjectors[0].count,
      availableProjectorsCount: AvialableProjectors[0].count,
      unavailableProjectorsCount: UnavailableProjectors[0].count,
      toFixProjectorsCount: ToFixProjectors[0].count
    });
  }
  catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error retrieving number of projectors"
    });
  }

}

// Find Projector with user id
exports.findAllByUser =async (req, res) => {
  const user_id = req.params.id;
  try{
    ch='1'
    const Projector_rented= await db.sequelize.query('SELECT * from "Projectors" p,"Hystorique" h where p.id=h.proj_id and h.status=? and h.user_id=? ',
    {replacements: [ch,user_id],
      type: db.sequelize.QueryTypes.SELECT
  });
  if(Projector_rented[0]){
  proj_id= +Projector_rented[0].proj_id
  Projector_rented[0].rent=true;
  Projector_rented[0].status=1;
  Projector_rented[0].id=+Projector_rented[0].id;
  const Projectors= await db.sequelize.query('SELECT * from "Projectors" p where p.id!=? order by status',
    {replacements: [proj_id],
      type: db.sequelize.QueryTypes.SELECT
  });
  Projectors.forEach((proj) => proj.rent=false);
  Projectors.push(Projector_rented[0])
  res.json(Projectors);
}else{
  const Projectors= await db.sequelize.query('SELECT * from "Projectors" p order by status ',
    {
      type: db.sequelize.QueryTypes.SELECT
  });
  Projectors.forEach((proj) => proj.rent=false);
  res.json(Projectors);
} 
  }catch (error) {        
      console.log(error);
      res.status(500).send({
        message: "Error retrieving Projector with user id=" + user_id
      });
      
    }
};

// Update a Proj by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  const proj = {
    brand: req.body.brand,
    serialNumber: req.body.serialNumber,
    status: req.body.status,
    nbrCables:req.body.nbrCables,
    comment:req.body.comment,
  };


  Proj.update(proj, {
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
    where: { id: id,
      status:'0'}
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

