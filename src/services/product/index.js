const { Op } = require("sequelize");
const { Produk, KategoriProduk } = require("../../lib/sequelize");
const Service = require("../service");

class ProductService extends Service {
  static getProduct = async (req) => {
    try {
      const { productId } = req.params;

      const getProductData = await Produk.findOne({
        where: {
          id: productId,
        },
      });

      if (!getProductData) {
        return this.handleError({
          message: `Can't Find Product with ID: ${productId}`,
          statusCode: 404,
        });
      }

      return this.handleSuccess({
        message: "Product Found",
        statusCode: 200,
        data: getProductData,
      });
    } catch (err) {
      console.log(err);
      return this.handleError({
        message: "Can't Reach Product Server",
        statusCode: 500,
      });
    }
  };

  static getAllProduct = async (query) => {
    try {
      const {
        _limit = 30,
        _page = 1,
        _sortBy = "",
        _sortDir = "",
        hargaMinimum,
        hargaMaksimum,
        kategoriTerpilih,
        searchProduk,
      } = query;

      delete query._limit;
      delete query._page;
      delete query._sortBy;
      delete query._sortDir;
      delete query.hargaMinimum;
      delete query.hargaMaksimum;
      delete query.kategoriTerpilih;
      delete query.searchProduk;

      const whereCategoryClause = {};
      let searchByNameClause = {};

      if (kategoriTerpilih) {
        whereCategoryClause.productCategoryId = kategoriTerpilih;
      }

      if (searchProduk) {
        searchByNameClause = {
          nama_produk: { [Op.like]: `%${searchProduk}%` },
        };
      }

      const findProducts = await Produk.findAndCountAll({
        where: {
          ...query,
          harga_jual: {
            [Op.between]: [hargaMinimum || 0, hargaMaksimum || 9999999999],
          },
          ...searchByNameClause,
          ...whereCategoryClause,
        },
        limit: _limit ? parseInt(_limit) : undefined,
        offset: (_page - 1) * _limit,
        distinct: true,

        order: _sortBy ? [[_sortBy, _sortDir]] : undefined,
      });

      if (!findProducts) {
        return this.handleError({
          message: "No product found, server error",
          statusCode: 500,
        });
      }
      return this.handleSuccess({
        message: "Products found",
        statusCode: 200,
        data: findProducts,
      });
    } catch (err) {
      console.log(err);
      return this.handleError({
        message: "Server Error",
        statusCode: 500,
      });
    }
  };
}

module.exports = ProductService;
