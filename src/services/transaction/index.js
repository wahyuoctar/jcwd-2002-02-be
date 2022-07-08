const Service = require("../service");
const {
  DaftarTransaksi,
  StatusTransaksi,
  DetailTransaksi,
  Produk,
} = require("../../lib/sequelize");
const { nanoid } = require("nanoid");

class TransactionService extends Service {
  static getAllTransaction = async (query) => {
    try {
      const {
        _limit = 30,
        _page = 1,
        _sortBy = "",
        _sortDir = "",
        statusTerpilih,
      } = query;

      delete query._limit;
      delete query._page;
      delete query._sortBy;
      delete query._sortDir;
      delete query.statusTerpilih;

      const statusClause = {};

      if (statusTerpilih) {
        statusClause.paymentStatusId = statusTerpilih;
      }

      const findTransactions = await DaftarTransaksi.findAndCountAll({
        where: {
          ...query,
          ...statusClause,
        },
        include: [
          {
            model: StatusTransaksi,
          },
          {
            model: DetailTransaksi,
            include: Produk,
          },
        ],
        limit: _limit ? parseInt(_limit) : undefined,
        offset: (_page - 1) * _limit,
        distinct: true,
        order: _sortBy ? [[_sortBy, _sortDir]] : undefined,
      });

      if (!findTransactions) {
        return this.handleError({
          message: "No transaction found, server error",
          statusCode: 500,
        });
      }
      return this.handleSuccess({
        message: "Transactions found",
        statusCode: 200,
        data: findTransactions,
      });
    } catch (err) {
      console.log(err);
      return this.handleError({
        message: "Server Error",
        statusCode: 500,
      });
    }
  };

  static uploadResepDokter = async (file, userId) => {
    try {
      const uploadFileDomain = process.env.UPLOAD_FILE_DOMAIN;
      const filePath = "resep";
      const { filename } = file;
      const nomorResep = nanoid(5);
      const newResep = `${uploadFileDomain}/${filePath}/${filename}`;
      const resep = await DaftarTransaksi.create({
        // KASIH TAU KE TEMEN" INI DI TABEL GANTI NAMA
        total_price: 10000,
        resep_image_url: newResep,
        is_resep: true,
        userId,
        paymentStatusId: 1,
        nomor_resep: `NO.RESEP#${nomorResep}`,
      });

      return this.handleSuccess({
        statusCode: 200,
        message: "Resep uploaded successfully!",
        data: resep,
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

module.exports = TransactionService;
