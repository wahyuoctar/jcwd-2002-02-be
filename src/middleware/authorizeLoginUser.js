const { Op } = require("sequelize");
const { UserLoginSession } = require("../lib/sequelize");
const moment = require("moment");

const authorizedLoginUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    const validateToken = await UserLoginSession.findOne({
      where: {
        token,
        is_valid: true,
        valid_until: {
          [Op.gt]: moment().utc(),
        },
      },
    });

    if (!validateToken) {
      return res.status(401).json({
        message: "Token is not valid",
      });
    }

    req.token = { id: validateToken.userId };

    next();
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Server error!",
    });
  }
};

module.exports = { authorizedLoginUser };
