const {Post, Business} = require('../models')

class PostControler{
    static async createPost(req, res, next){
        try {
            let {name} = req.body
            let images = req.files
            // BUKA COMMAND
            // let findBusiness = await Business.findOne({where: {id: req.user.id}})
            const postImagesData = images.map((image)=>{
                return {
                    name,
                    imageUrl:image.path,
                    BusinessId: 1
                    //INI JUGA BUKA
                    // BusinessId: findBusiness.id
                }
            })
            // console.log(postImagesData, "<<");

            const dataPost = await Post.bulkCreate(postImagesData)
            res.status(201).json(dataPost)
        } catch (error) {
            next(error)
        }
    }


    static async deletePost(req,res,next){
        try {
            const {id} = req.params
            const dataPost = await Post.findByPk(id)
            if(!dataPost){
                throw {name: "errorNotFound"}
            }
            await Post.destroy({where: {id}})
            res.status(200).json({message: "Success to Delete"})
        } catch (error) {
            next(error)
        }
    }



}




module.exports = PostControler
