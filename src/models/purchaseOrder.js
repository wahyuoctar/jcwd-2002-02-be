const { DataTypes } = require("sequelize");

const PurchaseOrder = (sequelize) => {
  return sequelize.define("purchase_order", {
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};

module.exports = PurchaseOrder;
