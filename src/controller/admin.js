const AdminService = require("../services/admin");

const adminControllers = {
  addProduct: async (req, res) => {
    try {
      const {
        nama_produk,
        nomor_obat,
        nomor_bpom,
        harga_jual,
        diskon,
        productCategoryId,
        satuan,
      } = req.body;
      const file = req.files;

      console.log(req.files);

      const serviceResult = await AdminService.addProduct(req.body, file);
      if (!serviceResult.success) throw serviceResult;
      return res.status(serviceResult.statusCode || 201).json({
        message: serviceResult.message,
        result: serviceResult.data,
      });
    } catch (err) {
      console.log(err);
      return res.status(err.statusCode || 500).json({
        message: err.message,
      });
    }
  },
  addProductCategory: async (req, res) => {
    try {
      const { kategori } = req.body;
      const serviceResult = await AdminService.addProductCategory(kategori);

      if (!serviceResult.success) throw serviceResult;
      return res.status(serviceResult.statusCode || 201).json({
        message: serviceResult.message,
        result: serviceResult.data,
      });
    } catch (err) {
      console.log(err);
      return res.status(err.statusCode || 500).json({
        message: err.message,
      });
    }
  },
  getAllProductCategory: async (req, res) => {
    try {
      const serviceResult = await AdminService.getAllProductCategory();

      if (!serviceResult.success) throw serviceResult;
      return res.status(serviceResult.statusCode || 201).json({
        message: serviceResult.message,
        result: serviceResult.data,
      });
    } catch (err) {
      console.log(err);
      return res.status(err.statusCode || 500).json({
        message: err.message,
      });
    }
  },
};

module.exports = adminControllers;
