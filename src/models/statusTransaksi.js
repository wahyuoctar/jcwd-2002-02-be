const { DataTypes } = require("sequelize");

const StatusTransaksi = (sequelize) => {
  return sequelize.define("Status_pembayaran", {
    status: {
      type: DataTypes.STRING,
    },
  });
};

module.exports = StatusTransaksi;
