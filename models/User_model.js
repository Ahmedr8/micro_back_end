const db = require("../db.config");

    const User = db.sequelize.define("Users", {
      FirstName: {
        type: db.Sequelize.STRING
      },
      LastName: {
        type:  db.Sequelize.STRING
      },
      NIC: {
        type:  db.Sequelize.BIGINT
      },
      email: {
        type:  db.Sequelize.STRING
      },
      PSW: {
        type:  db.Sequelize.STRING
      },
      status: {
        type:  db.Sequelize.INTEGER
      }
    },{
      freezeTableName: true,
      
  });
  
    module.exports = User;