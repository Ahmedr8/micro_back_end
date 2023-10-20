const db = require("../db.config");

    const Hyst = db.sequelize.define("Hystorique", {
      proj_id: {
        type:  db.Sequelize.BIGINT
      },
      user_id: {
        type:  db.Sequelize.BIGINT
      },
      start_date: {
        type:  db.Sequelize.DATE
      },
      end_date: {
        type:  db.Sequelize.DATE
      },
      comment: {
        type:  db.Sequelize.STRING
      },
      status: {
        type:  db.Sequelize.INTEGER
      }
    },{
      freezeTableName: true,
      timestamps: false
      
  });
  
    module.exports = Hyst;