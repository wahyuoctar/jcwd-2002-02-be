const UserService = require("../services/user")

const userControllers = {
getUserById : async (req,res) => {
try {
    const {userId} = req.params
    const serviceResult = await UserService.getUserById(userId)

    if(!serviceResult.success) throw serviceResult

    return res.status(serviceResult.statusCode || 200).json({
        message: serviceResult.message,
        result: serviceResult.data
    })
} catch (err) {
    console.log(err);
      return res.status(err.statusCode || 500).json({
        message: err.message
      })
}
}
}

module.exports = userControllers