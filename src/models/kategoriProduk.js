const { DataTypes } = require("sequelize");

const KategoriProduk = (sequelize) => {
  return sequelize.define("product_category", {
    kategori: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};

module.exports = KategoriProduk;
