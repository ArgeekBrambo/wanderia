"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Business extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Business.belongsTo(models.Category, {
                foreignKey: "CategoryId",
                as: "category",
            });
            Business.belongsTo(models.Partner, {
                foreignKey: "PartnerId",
                as: "author",
            });
            Business.hasMany(models.Post, {
                foreignKey: "BusinessId",
                as: "posts",
            });
        }
    }
    Business.init(
        { // category id valid, name, valid, mapurl valid,
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull:{
                        msg: "Name is Required"
                    },
                    notEmpty:{
                        msg: "Name is Required"
                    }
                }
            },
            latitude: DataTypes.FLOAT,
            longitude: DataTypes.FLOAT,
            description: DataTypes.TEXT,
            mapUrl: {
                type:DataTypes.STRING,
                allowNull: false,
                validate:{
                    notNull:{
                        msg: "Location is Required"
                    },
                    notEmpty:{
                        msg: "Location is Required"
                    },
                    isUrl:{
                        msg: "Location must be URL from maps location"
                    }
                }
            },
            CategoryId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate:{
                    notNull: {
                        msg: "Category is Required"
                    },
                    notEmpty: {
                        msg: "Category is Required"
                    }
                }
            },
            PartnerId: DataTypes.INTEGER,
            status: DataTypes.STRING,
            imageUrl: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Business",
        }
    );
    Business.beforeCreate(function (business) {
        let checkLatitude = business.mapUrl.split("/");
        let check;
        checkLatitude.map(function (el) {
            if (el.includes("@")) {
                check = el.slice(1).split(",");
            }
        });
        business.latitude = check[0];
        business.longitude = check[1];
    });
    Business.beforeUpdate(function (business) {
        let checkLatitude = business.mapUrl.split("/");
        let check;
        checkLatitude.map(function (el) {
            if (el.includes("@")) {
                check = el.slice(1).split(",");
            }
        });
        business.latitude = check[0];
        business.longitude = check[1];
    });
    return Business;
};
