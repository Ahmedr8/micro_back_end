const db = require("../db.config");

    const User = db.sequelize.define("User", {
      FirstName: {
        type: db.Sequelize.STRING
      },
      LastName: {
        type:  db.Sequelize.STRING
      },
      CIN: {
        type:  db.Sequelize.BIGINT
      },
      Email: {
        type:  db.Sequelize.STRING
      },
      PSW: {
        type:  db.Sequelize.STRING
      }
    });
  
    module.exports = User;