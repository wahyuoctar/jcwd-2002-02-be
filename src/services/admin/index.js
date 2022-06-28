const { Produk, KategoriProduk } = require("../../lib/sequelize");
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
}

module.exports = AdminService;
