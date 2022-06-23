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

  keepLoginAdmin: async (req, res) => {
    try {
      const { token } = req;
      const serviceResult = await AuthService.keepLoginAdmin(token);

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

  editAvatarUser: async (req, res) => {
    try {
      const { id } = req.params;

      const serviceResult = await AuthService.editAvatarUser(id, req.file);
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
      const serviceResult = await AuthService.resendVerificationToken(req);

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
};

module.exports = authController;
