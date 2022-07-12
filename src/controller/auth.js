const AuthService = require("../services/auth");

const authController = {
  registerUser: async (req, res) => {
    try {
      const { name, username, email, password } = req.body;

      const serviceResult = await AuthService.registerUser(
        username,
        email,
        name,
        password
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

  loginUser: async (req, res) => {
    try {
      const { credential, password } = req.body;
      const serviceResult = await AuthService.loginUser(credential, password);

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

  keepLoginUser: async (req, res) => {
    try {
      const { token, user } = req;
      const serviceResult = await AuthService.keepLoginUser(token, user);

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

  loginAdmin: async (req, res) => {
    try {
      const { username, password } = req.body;
      const serviceResult = await AuthService.loginAdmin(username, password);

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

  registerAdmin: async (req, res) => {
    try {
      const { name, username, email, password } = req.body;

      const serviceResult = await AuthService.registerAdmin(
        username,
        email,
        name,
        password
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

  keepLoginAdmin: async (req, res) => {
    try {
      const { adminToken, admin } = req;
      const serviceResult = await AuthService.keepLoginAdmin(adminToken, admin);
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

  resendVerificationEmail: async (req, res) => {
    try {
      const userId = req.user.id;
      const serviceResult = await AuthService.resendVerificationToken(userId);

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

  verifyUser: async (req, res) => {
    try {
      const { token } = req.params;

      const serviceResult = await AuthService.verifyUser(token);

      if (!serviceResult.success) throw serviceResult;

      return res.redirect(serviceResult.url);
    } catch (err) {
      console.log(err);
      return res.status(err.statusCode || 500).json({
        message: err.message,
      });
    }
  },

  changePassword: async (req, res) => {
    try {
      const { oldPassword, newPassword } = req.body;
      const userId = req.user.id;

      const serviceResult = await AuthService.changePassword(
        userId,
        oldPassword,
        newPassword
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

  sendResetPasswordEmail: async (req, res) => {
    try {
      const { email } = req.body;

      const serviceResult = await AuthService.sendResetPasswordEmail(email);

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

  resetPassword: async (req, res) => {
    try {
      const { forgotPasswordToken, newPassword } = req.body;

      const serviceResult = await AuthService.resetPassword(
        newPassword,
        forgotPasswordToken
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

  loginWithGoogle: async (req, res) => {
    try {
      const { uid, name, email, username, image_url } = req.body;

      const serviceResult = await AuthService.loginWithGoogle({
        uid,
        name,
        email,
        username,
        image_url,
      });

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
