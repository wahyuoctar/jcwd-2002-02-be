const { DataTypes } = require("sequelize");

const BuktiPembayaran = (sequelize) => {
  return sequelize.define("proof_of_payment", {
    bukti_transfer: {
      type: DataTypes.STRING,
    },
    reference_id: {
      type: DataTypes.STRING,
    },
    total_payment: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    is_approved: {
      type: DataTypes.BOOLEAN,
    },
  });
};

module.exports = BuktiPembayaran;
