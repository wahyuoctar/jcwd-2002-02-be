const Service = require("../service");
const {
  DaftarTransaksi,
  StatusTransaksi,
  DetailTransaksi,
  Produk,
  MetodePembayaran,
  Cart,
  BuktiPembayaran,
  User,
  Alamat,
} = require("../../lib/sequelize");
const { nanoid } = require("nanoid");
const { Op } = require("sequelize");

class TransactionService extends Service {
  static getAllTransaction = async (query) => {
    try {
      const {
        _limit = 100,
        _page = 1,
        _sortBy = "",
        _sortDir = "",
        statusTerpilih,
        username,
        userId = undefined,
      } = query;

      delete query._limit;
      delete query._page;
      delete query._sortBy;
      delete query._sortDir;
      delete query.statusTerpilih;
      delete query.username;
      delete query.userId;

      const statusClause = {};
      const userClause = {};

      if (statusTerpilih) {
        statusClause.paymentStatusId = statusTerpilih;
      }

      if (username) {
        userClause = {
          username: { [Op.like]: `%${username}` },
        };

        const findUser = await User.findOne({
          where: {
            ...userClause,
          },
        });

        if (!findUser) {
          return this.handleError({
            message: "User not found",
          });
        }

        query.userId = findUser.id;
      }
      if (userId) {
        userClause.userId = userId;
      }

      const findTransactions = await DaftarTransaksi.findAndCountAll({
        where: {
          ...query,
          ...statusClause,
          ...userClause,
        },
        include: [
          { model: BuktiPembayaran },
          {
            model: StatusTransaksi,
          },
          {
            model: DetailTransaksi,
            include: Produk,
          },
          {
            model: User,
          },
          {
            model: Alamat,
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

  static createTransaction = async (
    total_price,
    userId,
    cartId = [],
    paymentMethodId,
    addressId
  ) => {
    try {
      const newTransaction = await DaftarTransaksi.create({
        total_price,
        userId,
        is_resep: false,
        paymentStatusId: 1,
        resep_image_url: null,
        nomor_resep: null,
        paymentMethodId,
        addressId,
      });

      const findCart = await Cart.findAll({
        where: {
          id: {
            [Op.in]: cartId,
          },
        },
        include: Produk,
      });

      const data = () => {
        return findCart.map((val) => {
          return {
            transactionListId: newTransaction.id,
            price_when_sold:
              val.product.harga_jual -
              val.product.harga_jual * (val.product.diskon / 100),
            productId: val.product.id,
            quantity: val.quantity,
          };
        });
      };

      await DetailTransaksi.bulkCreate(data(), {
        individualHooks: true,
      });

      const deleteCart = await Cart.destroy({
        where: {
          id: cartId,
        },
      });

      return this.handleSuccess({
        statusCode: 200,
        message: "Transaction created!",
        data: newTransaction,
      });
    } catch (err) {
      console.log(err);
      return this.handleError({
        message: "Server Error",
        statusCode: 500,
      });
    }
  };

  static uploadResepDokter = async (file, userId, addressId) => {
    try {
      const uploadFileDomain = process.env.UPLOAD_FILE_DOMAIN;
      const filePath = "resep";
      const { filename } = file;
      const nomorResep = nanoid(5);
      const newResep = `${uploadFileDomain}/${filePath}/${filename}`;
      const resep = await DaftarTransaksi.create({
        // KASIH TAU KE TEMEN" INI DI TABEL GANTI NAMA
        total_price: 0,
        resep_image_url: newResep,
        is_resep: true,
        userId,
        paymentStatusId: 1,
        nomor_resep: `NO.RESEP#${nomorResep}`,
        addressId,
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

  static getAllPaymentMethod = async () => {
    try {
      const findPaymentMethod = await MetodePembayaran.findAndCountAll();
      if (!findPaymentMethod) {
        return this.handleError({
          message: "No methods found!",
          statusCode: 500,
        });
      }
      return this.handleSuccess({
        message: "Methods found",
        statusCode: 200,
        data: findPaymentMethod,
      });
    } catch (err) {
      console.log(err);
      return this.handleError({
        message: "Server Error",
        statusCode: 500,
      });
    }
  };

  static getPaymentMethodById = async (methodId) => {
    try {
      const findPaymentMethod = await MetodePembayaran.findOne({
        where: {
          id: methodId,
        },
      });

      if (!findPaymentMethod) {
        return this.handleError({
          message: `No method with id: ${id} found!`,
        });
      }

      return this.handleSuccess({
        message: "Method found",
        statusCode: 200,
        data: findPaymentMethod,
      });
    } catch (err) {
      console.log(err);
      return this.handleError({
        message: "Server Error",
        statusCode: 500,
      });
    }
  };

  static uploadProofOfPayment = async (body, file) => {
    try {
      const uploadFileDomain = process.env.UPLOAD_FILE_DOMAIN;
      const filePath = "payment";
      const { filename } = file;

      const findTransaction = await DaftarTransaksi.findOne({
        where: {
          id: body.transactionListId,
        },
      });

      if (!findTransaction) {
        return this.handleError({
          message: `Can't find Transaction with ID: ${body.transactionListId}`,
          statusCode: 404,
        });
      }

      const uploadImage = await BuktiPembayaran.create({
        bukti_transfer: `${uploadFileDomain}/${filePath}/${filename}`,
        transactionListId: body.transactionListId,
        total_payment: body.totalPrice,
        paymentMethodId: body.paymentMethodId,
        is_approved: false,
      });

      return this.handleSuccess({
        message: "Proof of Payment Added",
        statusCode: 201,
        data: uploadImage,
      });
    } catch (err) {
      console.log(err);
      return this.handleError({
        message: "Server for Upload Proof of Payment Error!",
        statusCode: 500,
      });
    }
  };

  static getTransactionById = async (transactionId) => {
    try {
      const findTransactionData = await DaftarTransaksi.findOne({
        where: {
          id: transactionId,
        },
        include: [
          {
            model: BuktiPembayaran,
          },
          {
            model: MetodePembayaran,
          },
        ],
      });

      if (!findTransactionData) {
        return this.handleError({
          message: `Can't find transaction with ID: ${transactionId}`,
        });
      }

      const findTransactionDetail = await DetailTransaksi.findAll({
        where: {
          transactionListId: transactionId,
        },
        include: {
          model: Produk,
        },
      });

      return this.handleSuccess({
        message: "Find Transaction!",
        data: {
          transaksi: findTransactionData,
          detailTransaksi: findTransactionDetail,
        },
        statusCode: 200,
      });
    } catch (err) {
      console.log(err);
      return this.handleError({
        message: "Server Transaction Data Error!",
        statusCode: 500,
      });
    }
  };
}

module.exports = TransactionService;
