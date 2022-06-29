const sequelize = require("sequelize");
const {
  Produk,
  KategoriProduk,
  Stok,
  StokStatus,
} = require("../../lib/sequelize");
const Service = require("../service");

class AdminService extends Service {
  static addProduct = async (
    nama_produk,
    harga,
    diskon,
    harga_modal,
    produk_image_url,
    productCategoryId,
    file
  ) => {
    try {
      const uploadFileDomain = process.env.UPLOAD_FILE_DOMAIN;
      const filePath = "product";
      const filename = file.map((val) => {
        return `${uploadFileDomain}/${filePath}/${val.filename}`;
      });
      const addNewProduct = await Produk.create({
        nama_produk,
        harga,
        diskon,
        harga_modal,
        produk_image_url: filename,
        productCategoryId,
      });

      return this.handleSuccess({
        message: "Product Added",
        statusCode: 201,
        data: addNewProduct,
      });
    } catch (err) {
      console.log(err);
      return this.handleError({
        message: "Can't Reach Product Server",
        statusCode: 500,
      });
    }
  };
  static addProductCategory = async (kategori) => {
    try {
      const addNewProductCategory = await KategoriProduk.create({ kategori });
      return this.handleSuccess({
        message: "Product Added",
        statusCode: 201,
        data: addNewProductCategory,
      });
    } catch (err) {
      console.log(err);
      return this.handleError({
        message: "Can't Reach Product Server",
        statusCode: 500,
      });
    }
  };

  static getProductList = async (query) => {
    try {
      const { _limit = 30, _page = 0, _sortBy = "", _sortDir = "" } = query;

      delete query._limit;
      delete query._page;
      delete query._sortBy;
      delete query._sortDir;

      const findProducts = await Produk.findAndCountAll({
        where: {
          ...query,
        },
        limit: _limit ? parseInt(_limit) : undefined,
        offset: _page * _limit,
        distinct: true,
        order: _sortBy ? [[_sortBy, _sortDir]] : undefined,
        include: [
          {
            model: Stok,
          },
          {
            model: KategoriProduk,
          },
        ],
      });

      if (!findProducts) {
        return this.handleError({
          message: "No product found!",
          statusCode: 400,
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
        message: "Server Error!",
        statusCode: 500,
      });
    }
  };
}

module.exports = AdminService;
