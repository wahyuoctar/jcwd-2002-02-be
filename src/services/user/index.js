const { User } = require("../../lib/sequelize");
const Service = require("../service");

class UserService extends Service {
static getUserById = async (userId) => {
    try {
        const findUser = await User.findOne({
            where: {
                id: userId
            }
        })

        if(!findUser){
            return this.handleError({
                message: "Wrong User ID!",
                statusCode: 400
            })
        }

        delete findUser.dataValues.password
        
        return this.handleSuccess({
            message: `You Found User ID: ${userId}`,
            data: findUser,
            statusCode: 200
        })
    } catch (err) {
        console.log(err);
      return this.handleError({
        statusCode: 500,
        message: "Can't reach user server"
      })
    }
}
}

module.exports = UserService