const { Op } = require("sequelize");
const sequelize = require("sequelize");
const {
  Produk,
  KategoriProduk,
  Stok,
  StokStatus,
} = require("../../lib/sequelize");
const Service = require("../service");

class AdminService extends Service {
  static addProduct = async (body, file) => {
    try {
      const uploadFileDomain = process.env.UPLOAD_FILE_DOMAIN;
      const filePath = "product";
      const filename = file.map((val) => {
        return `${uploadFileDomain}/${filePath}/${val.filename}`;
      });

      const addNewProduct = await Produk.create({
        nama_produk: body.nama_produk,
        harga_jual: body.harga_jual,
        diskon: body.diskon,
        nomor_obat: body.nomor_obat,
        nomor_bpom: body.nomor_bpom,
        produk_image_url: filename,
        productCategoryId: body.productCategoryId,
        satuan: body.satuan,
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

  static getAllProductCategory = async () => {
    try {
      const findAllProductCategory = await KategoriProduk.findAll();
      return this.handleSuccess({
        message: "Products Found",
        statusCode: 200,
        data: findAllProductCategory,
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
      const {
        _limit = 30,
        _page = 0,
        _sortBy = "",
        _sortDir = "",
        filterCategory,
        searchProduk,
      } = query;

      delete query._limit;
      delete query._page;
      delete query._sortBy;
      delete query._sortDir;
      delete query.filterCategory;
      delete query.searchProduk;

      const whereCategoryClause = {};
      let searchByNameClause = {};

      if (filterCategory) {
        whereCategoryClause.productCategoryId = filterCategory;
      }

      if (searchProduk) {
        searchByNameClause = {
          nama_produk: { [Op.like]: `%${searchProduk}%` },
        };
      }

      const findProducts = await Produk.findAndCountAll({
        where: {
          ...query,
          ...searchByNameClause,
          ...whereCategoryClause,
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

  static editProduct = async (body, id) => {
    try {
      const findProducts = await Produk.findOne({
        where: {
          id,
        },
      });

      if (!findProducts) {
        return this.handleError({
          message: `Can't find Product with ID: ${id}`,
          statusCode: 404,
        });
      }

      const editProduk = await Produk.update(
        {
          nama_produk: body.nama_produk,
          nomor_obat: body.nomor_obat,
          nomor_bpom: body.nomor_bpom,
          harga_jual: body.harga_jual,
          satuan: body.satuan,
          productCategoryId: body.productCategoryId,
          diskon: body.diskon,
        },
        {
          where: {
            id,
          },
        }
      );

      return this.handleSuccess({
        message: "Product Edited!",
        statusCode: 201,
        data: editProduk,
      });
    } catch (err) {
      console.log(err);
      return this.handleError({
        message: "Server Edit Product Error!",
        statusCode: 500,
      });
    }
  };

  static editProductImages = async (id, file) => {
    try {
      const uploadFileDomain = process.env.UPLOAD_FILE_DOMAIN;
      const filePath = "product";
      const filename = file.map((val) => {
        return `${uploadFileDomain}/${filePath}/${val.filename}`;
      });

      const findProducts = await Produk.findOne({
        where: {
          id,
        },
      });

      const editProdukImages = await Produk.update(
        {
          produk_image_url: filename,
        },
        {
          where: {
            id,
          },
        }
      );

      if (!findProducts) {
        return this.handleError({
          message: `Can't find Product with ID: ${id}`,
          statusCode: 404,
        });
      }
      return this.handleSuccess({
        message: "Product Images Edited!",
        statusCode: 201,
        data: editProdukImages,
      });
    } catch (err) {
      console.log(err);
      return this.handleError({
        message: "Server Edit Product Images Error!",
        statusCode: 500,
      });
    }
  };
}

module.exports = AdminService;
