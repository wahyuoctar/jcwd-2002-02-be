const { DataTypes } = require("sequelize");

const TipeMutasi = (sequelize) => {
  return sequelize.define("mutation_type", {
    tipe: {
      type: DataTypes.STRING,
    },
  });
};

module.exports = TipeMutasi;
