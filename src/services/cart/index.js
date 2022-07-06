const { Cart, Produk } = require("../../lib/sequelize");
const Service = require("../service");

class CartService extends Service {
  static addToCart = async (productId, userId, quantity = 1) => {
    try {
      const findExistingCart = await Cart.findOne({
        where: {
          productId,
          userId,
        },
      });

      if (findExistingCart) {
        const res = await Cart.update(
          {
            quantity: quantity + findExistingCart.dataValues.quantity,
          },
          {
            where: {
              productId,
              userId,
            },
          }
        );
        console.log(res, "update");
      } else {
        await Cart.create({
          productId,
          userId,
          quantity,
        });
      }

      const userCart = await Cart.findAll({
        where: {
          userId,
        },
        include: Produk,
      });

      return this.handleSuccess({
        message: "Product added to your cart!",
        statusCode: 201,
        data: userCart,
      });
    } catch (err) {
      console.log(err);
      return this.handleError({
        message: "Server Error!",
        statusCode: 500,
      });
    }
  };

  static getAllCart = async (userId) => {
    try {
      const userCart = await Cart.findAll({
        where: {
          userId,
        },
        include: Produk,
      });

      return this.handleSuccess({
        message: "Cart Found!",
        statusCode: 200,
        data: userCart,
      });
    } catch (err) {
      console.log(err);
      return this.handleError({
        message: "Server Error!",
        statusCode: 500,
      });
    }
  };
}

module.exports = CartService;
