const { DataTypes } = require("sequelize");

const StokStatus = (sequelize) => {
  return sequelize.define("stock_status", {
    kategori: {
      type: DataTypes.STRING,
    },
  });
};

module.exports = StokStatus;
