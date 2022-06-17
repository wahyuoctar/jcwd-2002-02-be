const { DataTypes } = require("sequelize");

const ForgotPasswordToken = (sequelize) => {
  return sequelize.define("Forgot_password_token", {
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

module.exports = ForgotPasswordToken;
