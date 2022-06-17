const { DataTypes } = require("sequelize");

const Stok = (sequelize) => {
  return sequelize.define("stok", {
    exp_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    jumlah_stok: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};

module.exports = Stok;
