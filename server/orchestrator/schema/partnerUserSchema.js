const axios = require("axios");
const redis = require("../configs/ioredis");

const partnerUserTypeDefs = `#graphql
    type PartnerUser {
        id: ID,
        name: String,
        email: String
    }

    type AccessToken {
        access_token: String
    }

    input NewPartnerUser {
        name: String,
        email: String,
        password: String
    }

    input InputLogin {
        email: String,
        password: String
    }

    type Mutation {
        addNewUser(input: NewPartnerUser): PartnerUser,
        login(input: InputLogin): AccessToken,
    }
`;

const partnerUserResolver = {
    Mutation: {
        addNewUser: async (_, args) => {
            try {
                const { name, email, password } = args.input
                const response = await axios({
                    method: "POST",
                    url: `${process.env.PARTNER_URL}/partner/register`,
                    data: { name, email, password },
                })
                localStorage.setItem('access_token', response.data.access_token)
                await redis.del('partnerUser')
                return response.data
            } catch (error) {
                return error.response.data
            }
        },
        login: async (_, args) => {
            try {
                const { email, password } = args.input
                const response = await axios({
                    method: "POST",
                    url: `${process.env.PARTNER_URL}/partner/login`,
                    data: { email, password },
                })
                await redis.del('partnerUser')
                return response.data
            } catch (error) {
                return error.response.data
            }
        }
    }
}

module.exports = { partnerUserTypeDefs, partnerUserResolver }