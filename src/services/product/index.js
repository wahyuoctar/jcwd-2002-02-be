const { Produk, KategoriProduk } = require("../../lib/sequelize")
const Service = require("../service")

class ProductService extends Service {
    static getProduct = async (req) => {
        try {
            const {productId} = req.params

            const getProductData = await Produk.findOne({
                where: {
                    id: productId
                }
            })

            if(!getProductData) {
                return this.handleError({
                    message: `Can't Find Product with ID: ${productId}`,
                    statusCode: 404
                })
            }

            return this.handleSuccess({
                message: "Product Found",
                statusCode: 200,
                data: getProductData
            })
            
        } catch (err) {
            console.log(err);
            return this.handleError({
                message: "Can't Reach Product Server",
                statusCode: 500
            })
        }
    }
}

module.exports = ProductService