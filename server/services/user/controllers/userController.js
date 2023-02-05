const User = require("../models/users");

class userController {
  static async findAllUser(req, res, next) {
    try {
      const dataUsers = await User.findAllUser();
      const response = dataUsers.map(user => {
        return {
          ...user,

          created_at: undefined,
          createdAt: user.created_at,
          updatedAt: user.updatedAt || null
        }
      })

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async createUser(req, res, next) {
    try {
      const { email, password, phoneNumber, address, name, dateOfBirth } = req.body;
      const data = await User.createUser({
        name,
        email,
        password,
        phoneNumber,
        dateOfBirth,
        address,
      });

      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async findUserByPk(req, res, next) {
    try {

      const  {id}  = req.params;
      const dataUsers = await User.findUserByPk(id);
      res.status(200).json(dataUsers);
    } catch (error) {
      next(error);
    }
  }

  static async deleteUser(req, res, next) {
    try {
    const  {id}  = req.params;
    const dataUsers = await User.findUserByPk(id);
    if(!dataUsers) {
        throw {
            name:"notFound"
        }
    }
    const data = await User.deleteUser(id)
    res.status(200).json({message:" Successfully Deleted"})
      
    } catch (error) {
        nest(error)
    }
    
}
}

module.exports = userController;
