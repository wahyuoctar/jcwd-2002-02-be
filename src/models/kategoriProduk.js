const { DataTypes } = require("sequelize");

const KategoriProduk = (sequelize) => {
  return sequelize.define("Kategori_produk", {
    kategori: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};

module.exports = KategoriProduk;
