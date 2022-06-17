const { DataTypes } = require("sequelize");

const Cart = (sequelize) => {
  return sequelize.define("Cart", {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};

module.exports = Cart;
