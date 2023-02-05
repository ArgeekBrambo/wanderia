const { Partner, Business, Post, Category } = require("../models/index");
class BusinessController {
    static async createBusiness(req, res, next) {
        try {
            const {
                name,
                description,
                CategoryId,
                mapUrl,
                PartnerId,
                imageUrl,
            } = req.body;
            const data = await Business.create({
                name,
                description,
                CategoryId,
                mapUrl,
                PartnerId,
                imageUrl,
                status: "pending",
            });

            res.status(201).json(data);
        } catch (error) {
            next(error);
        }
    }

    static async editBusiness(req, res, next) {
        try {
            const id = req.params.id;
            const { name, description, CategoryId, mapUrl, imageUrl } =
                req.body;
            const data = await Business.update(
                {
                    name,
                    description,
                    CategoryId,
                    mapUrl,
                    imageUrl,
                },
                {
                    where: {
                        id,
                    },
                }
            );
            res.status(201).json("data berhasil di update");
        } catch (error) {
            next(error);
        }
    }

    static async getAllBusinesses(req, res, next) {
        try {
            const data = await Business.findAll({
                include: [
                    {
                        model: Partner,
                        as: "author",
                        attributes: { exclude: ["password"] },
                    },
                    {
                        model: Category,
                        as: "category",
                    },
                    {
                        model: Post,
                        as: "posts",
                    },
                ],
                order: [["name", "ASC"]],
            });
            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    }

    static async getOneBusiness(req, res, next) {
        try {
            const { id } = req.params;

            const data = await Business.findByPk(id, {
                include: [
                    {
                        model: Partner,
                        as: "author",
                        attributes: { exclude: ["password"] },
                    },
                    {
                        model: Category,
                        as: "category",
                    },
                    {
                        model: Post,
                        as: "posts",
                    },
                ],
                order: [["name", "ASC"]],
            });
            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = BusinessController;
