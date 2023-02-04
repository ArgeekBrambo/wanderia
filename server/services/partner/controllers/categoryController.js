const { Category } = require("../models/index");
class CategoryController {
    static async readCategory(req, res, next) {
        try {
            const data = await Category.findAll();
            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = CategoryController;
