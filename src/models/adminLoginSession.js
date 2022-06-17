const { DataTypes } = require("sequelize");

const AdminLoginSession = (sequelize) => {
  return sequelize.define("Admin_login_session", {
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

module.exports = AdminLoginSession;
