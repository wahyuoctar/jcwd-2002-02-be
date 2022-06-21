const { Op } = require("sequelize");
const { User, AccountVerificationToken } = require("../../lib/sequelize");
const Service = require("../service");
const mailer = require("../../lib/mailer");
const { nanoid } = require("nanoid");
const moment = require("moment");
const fs = require("fs");
const mustache = require("mustache");

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
}

module.exports = AuthService;
