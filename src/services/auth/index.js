const { Op } = require("sequelize");
const {
  User,
  AccountVerificationToken,
  Admin,
  AdminLoginSession,
} = require("../../lib/sequelize");
const Service = require("../service");
const mailer = require("../../lib/mailer");
const { nanoid } = require("nanoid");
const moment = require("moment");
const fs = require("fs");
const mustache = require("mustache");
const bcrypt = require("bcrypt");
// const { generateToken } = require("../../lib/jwt");

class AuthService extends Service {
  static registerUser = async (username, email, name, hashedPassword) => {
    try {
      const isUsernameOrEmailTaken = await User.findOne({
        where: {
          [Op.or]: [{ username }, { email }],
        },
      });

      if (isUsernameOrEmailTaken) {
        return this.handleError({
          statusCode: 400,
          message: "Username or email has been taken!",
        });
      }

      const registerUser = await User.create({
        username,
        nama: name,
        email,
        password: hashedPassword,
      });

      const verifyAccountToken = nanoid(40);

      await AccountVerificationToken.create({
        token: verifyAccountToken,
        is_valid: true,
        valid_until: moment().add(1, "hour"),
        userId: registerUser.id,
      });

      const verifyUserLink = `http://localhost:2000/auth/verify/${verifyAccountToken}`;

      const emailTemplate = fs
        .readFileSync(__dirname + "/../../templates/verifyAccount.html")
        .toString();

      const renderedTemplate = mustache.render(emailTemplate, {
        name,
        verify_url: verifyUserLink,
      });

      await mailer({
        subject: "Verfiy your account!",
        to: email,
        html: renderedTemplate,
      });

      return this.handleSuccess({
        statusCode: 201,
        message:
          "User Registered, please check your email to verify your account!",
        data: registerUser,
      });
    } catch (err) {
      console.log(err);
      return this.handleError({
        statusCode: 500,
        message: "Server error!",
      });
    }
  };

  static registerAdmin = async (username, email, name, hashedPassword) => {
    try {
      const isUsernameOrEmailTaken = await Admin.findOne({
        where: {
          [Op.or]: [{ username }, { email }],
        },
      });

      if (isUsernameOrEmailTaken) {
        return this.handleError({
          statusCode: 400,
          message: "Username or email has been taken!",
        });
      }

      const registerUser = await Admin.create({
        username,
        nama: name,
        email,
        password: hashedPassword,
      });
      return this.handleSuccess({
        statusCode: 201,
        message: "Admin Registered",
        data: registerUser,
      });
    } catch (err) {
      console.log(err);
      return this.handleError({
        statusCode: 500,
        message: "Server error!",
      });
    }
  };

  static loginAdmin = async (username, password) => {
    try {
      const findUser = await Admin.findOne({
        where: {
          [Op.or]: [{ username }, { email: username }],
        },
      });
      if (!findUser) {
        return this.handleError({
          statusCode: 400,
          message: "Login credentials doesn't match!",
        });
      }
      const isPasswordCorrect = bcrypt.compareSync(password, findUser.password);
      if (!isPasswordCorrect) {
        return this.handleError({
          statusCode: 400,
          message: "Login credentials doesn't match!",
        });
      }
      delete findUser.dataValues.password;

      await AdminLoginSession.update(
        {
          is_valid: false,
        },
        {
          where: {
            admin_id: findUser.id,
            is_valid: true,
          },
        }
      );

      const sessionToken = nanoid(64);

      // Create new session for logged in user
      await AdminLoginSession.create({
        admin_id: findUser.id,
        is_valid: true,
        token: sessionToken,
        valid_until: moment().add(1, "day"),
      });

      findUser.last_login = moment();
      findUser.save();

      return this.handleSuccess({
        statusCode: 200,
        message: "Welcome",
        data: {
          user: findUser,
          token: sessionToken,
        },
      });
    } catch (err) {
      console.log(err);
      return this.handleError({
        statusCode: 500,
        message: "Server error!",
      });
    }
  };

  static keepLoginAdmin = async (token) => {
    try {
      const renewedToken = nanoid(64);

      const findUser = await Admin.findByPk(token.admin_id);

      delete findUser.dataValues.password;

      await AdminLoginSession.update(
        {
          token: renewedToken,
          valid_until: moment().add(1, "day"),
        },
        {
          where: {
            id: token.id,
          },
        }
      );

      return this.handleSuccess({
        statusCode: 200,
        message: "Renewed user token",
        data: {
          user: findUser,
          token: renewedToken,
        },
      });
    } catch (err) {
      console.log(err);
      return this.handleError({
        statusCode: 500,
        message: "Server error!",
      });
    }
  };
}

module.exports = AuthService;
