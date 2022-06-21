const AuthService = require("../services/auth");
const bcrypt = require("bcrypt");

const authController = {
  registerUser: async (req, res) => {
    try {
      const { name, username, email, password } = req.body;

      const hashedPassword = bcrypt.hashSync(password, 5);

      const serviceResult = await AuthService.registerUser(
        username,
        email,
        name,
        hashedPassword
      );

      if (!serviceResult.success) throw serviceResult;

      return res.status(serviceResult.statusCode || 200).json({
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

module.exports = authController;
