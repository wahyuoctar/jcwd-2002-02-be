const { DataTypes } = require("sequelize");

const StatusTransaksi = (sequelize) => {
  return sequelize.define("payment_status", {
    status: {
      type: DataTypes.STRING,
    },
  });
};

module.exports = StatusTransaksi;
