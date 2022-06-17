const { DataTypes } = require("sequelize");

const MutasiStok = (sequelize) => {
  return sequelize.define("Mutasi_stok", {
    aktifitas: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    jumlah: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};

module.exports = MutasiStok;
