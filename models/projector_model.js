const db = require("../db.config");

    const Proj = db.sequelize.define("Projector", {
      brand: {
        type: db.Sequelize.STRING
      },
      serialNumber: {
        type:  db.Sequelize.BIGINT
      },
      nbrCables: {
        type:  db.Sequelize.INTEGER
      },
      comment: {
        type:  db.Sequelize.STRING
      },
      status: {
        type:  db.Sequelize.INTEGER
      }
    });
  
    module.exports = Proj;