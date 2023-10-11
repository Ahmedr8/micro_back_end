module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("User", {
      FirstName: {
        type: Sequelize.STRING
      },
      LastName: {
        type: Sequelize.STRING
      },
      CIN: {
        type: Sequelize.BIGINT
      },
      Email: {
        type: Sequelize.STRING
      },
      PSW: {
        type: Sequelize.STRING
      }
    });
  
    return User;
  };