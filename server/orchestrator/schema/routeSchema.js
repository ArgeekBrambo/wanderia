const axios = require("axios");
const redis = require("../configs/ioredis");

const routeTypeDefs = `#graphql
    type Route {
        _id: ID,
        UserId: Int,
        routeNumber: Int,
        BussinessId: Int,
        destination: String
    }

    type Message {
        message: String
    }

    input NewRoute {
        placeOfOrigin: String,
        destination: String,
        BussinessId: Int,
        UserId: Int
    }

    type Query {
        allRoutes: [Route],
        allRoutesEachOneTrip(UserId: Int): [Route]
    }

    type Mutation {
        addNewTrip(input: NewRoute): Message
    }
`;

const routeResolver = {
    Query: {
        allRoutes: async () => {
            try {
                const cache = await redis.get("routes")
                if (cache) {
                    const data = await JSON.parse(cache)
                    return data
                } else {
                    const { data } = await axios.get(`${process.env.JOURNEY_URL}/routes`)
                    await redis.set("routes", JSON.stringify(data))
                    return data
                }
            } catch (error) {
                throw error.response.data
            }
        },
        allRoutesEachOneTrip: async (_, args) => {
            try {
                const { UserId } = args
                const { data } = await axios({
                    url: `${process.env.JOURNEY_URL}/routes/${UserId}`,
                });
                return data
            } catch (error) {
                throw error.response.data;
            }
        }
    },
    Mutation: {
        addNewTrip: async (_, args) => {
            try {
                const { placeOfOrigin, destination, BussinessId, UserId } = args.input
                const response = await axios({
                    method: "POST",
                    url: `${process.env.JOURNEY_URL}/routes`,
                    data: { placeOfOrigin, destination, BussinessId, UserId },
                })
                await redis.del('routes')
                return response.data
            } catch (error) {
                throw error.response.data;
            }
        }
    }
};

module.exports = { routeTypeDefs, routeResolver }