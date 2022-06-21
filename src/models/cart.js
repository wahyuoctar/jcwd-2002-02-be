const { DataTypes } = require("sequelize");

const Cart = (sequelize) => {
  return sequelize.define("cart", {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};

module.exports = Cart;
