const { ObjectId } = require('mongodb')
const { getDatabase } = require('../config/mongodb')
const userController = require('../controllers/userController')


class User {
    static async findAllUser() {
        try {
            const db = getDatabase()
            const dataUserFromDb = db.collection("Users")
            let dataUser = await dataUserFromDb.find().toArray()
            return dataUser
        } catch (error) {
            throw error
        }
    }

    static async createUser(dataUsers) {
        try {
            const data = {
                ...dataUsers,
                created_at: new Date()
            }
            const db = getDatabase()
            const dataUserFromDb = db.collection("Users")
            const result = await dataUserFromDb.insertOne(data)
            return result
        } catch (error) {
            throw error
        }
    }

    static async findUserByPk(id) {
        try {
            const db = getDatabase()
            const dataUserFromDb = db.collection("User")
            const data = await dataUserFromDb.findOne({
                _id: ObjectId(id)
            })
            return data
        } catch (error) {
            throw error
        }
    }

    static async deleteUser(id) {
        try {
            const db = getDatabase()
            const dataUserFromDb = db.collection("Users")
            const data = await dataUserFromDb.deleteOne({
                _id:ObjectId(id)
            })
            return data
        } catch (error) {
            throw error
        }
    }




}

module.exports = User