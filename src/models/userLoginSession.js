const { DataTypes } = require("sequelize");

const UserLoginSession = (sequelize) => {
  return sequelize.define("User_login_session", {
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_valid: {
      type: DataTypes.BOOLEAN,
    },
    valid_until: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });
};

module.exports = UserLoginSession;
