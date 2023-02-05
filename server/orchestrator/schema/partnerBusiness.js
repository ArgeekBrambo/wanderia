const axios = require("axios");
const redis = require("../configs/ioredis");

const partnerBusinessTypeDefs = `#graphql
    type PartnerBusiness {
        id: ID,
        name: String,
        latitude: Int,
        longitude: Int,
        description: String,
        mapUrl: String,
        CategoryId: Int,
        PartnerId: Int,
        status: String,
        imageUrl: String
    }

    type Query {
        allPartnerBusiness: [PartnerBusiness]
    }
`;

const partnerBusinessResolver = {
    Query: {
        allPartnerBusiness: async () => {
            try {
                const cache = await redis.get("partnerBusiness")
                if (cache) {
                    const data = await JSON.parse(cache)
                    return data
                } else {
                    // const { data } = await axios.get(`${process.env.PARTNER_URL}/business`)
                    const { data } = await axios({
                        method: "GET",
                        url: `${process.env.PARTNER_URL}/business`,
                        headers: {
                            access_token: localStorage.getItem('access_token')
                        }
                    })
                    await redis.set("partnerBusiness", JSON.stringify(data))
                    return data
                }
            } catch (error) {
                throw error.response.data
            }
        }
    }
}

module.exports = { partnerBusinessTypeDefs, partnerBusinessResolver }