const { ObjectId } = require("mongodb")
const Route = require("../models")

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

class RoutesController {
    static async getAllRoutes(req, res, next) {
        try {
            let data = await Route.findAll()
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async addRoute(req, res, next) {
        try {
            const { placeOfOrigin, destination, BussinessId, UserId } = req.body

            let prompt = `tunjukkan satu rute perjalanan dari ${placeOfOrigin} ke ${destination} yang indah dan banyak tempat wisatanya dengan format nama jalan dan nama kota saja tanpa tanda baca`

            const { data } = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: prompt,
                temperature: 0,
                max_tokens: 100,
                // top_p: 1,
                // frequency_penalty: 0,
                // presence_penalty: 0,
                // stop: ["\n"],
            });

            let splitData = (data.choices[0].text).replaceAll('\n\n', '').replaceAll(' ', '').split('-')
            // console.log(splitData)
            // splitData = data.choices[0].text
            // splitData = splitData.filter((el, i) => i % 2 !== 0)
            
            const payload = splitData.map((el, index) => {
                return {
                    UserId: +UserId,
                    routeNumber: index + 1,
                    BussinessId: +BussinessId,
                    destination: el
                }
            })
            await Route.create(payload)
            res.status(201).json({ message: 'Success create new routes' })
        } catch (error) {
            next(error)
        }
    }

    static async getOneRoute(req, res) {
        try {
            const { UserId } = req.params
            let data = await Route.findOne(+UserId)
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async deleteOneRoute(req, res) {
        try {
            const { UserId } = req.params
            await Route.destroy(+UserId)
            res.status(200).json({ message: `Success delete Route with UserId: ${UserId}` })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = RoutesController