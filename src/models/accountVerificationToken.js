const { DataTypes } = require("sequelize");

const UserAccVerification = (sequelize) => {
  return sequelize.define("user_account_verification", {
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

module.exports = UserAccVerification;
