const TransactionService = require("../services/transaction");

const transactionControllers = {
  getAllTransaction: async (req, res) => {
    try {
      const serviceResult = await TransactionService.getAllTransaction(
        req.query
      );
      if (!serviceResult.success) throw serviceResult;
      return res.status(serviceResult.statusCode || 200).json({
        message: serviceResult.message,
        result: serviceResult.data,
      });
    } catch (err) {
      return res.status(err.statusCode || 500).json({
        message: err.message,
      });
    }
  },
};

module.exports = transactionControllers;
