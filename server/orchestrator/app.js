if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { partnerBusinessTypeDefs, partnerBusinessResolver } = require("./schema/partnerBusiness");
const { partnerUserTypeDefs, partnerUserResolver } = require("./schema/partnerUserSchema");
const { routeTypeDefs, routeResolver } = require("./schema/routeSchema");

const port = process.env.PORT || 4000;

const server = new ApolloServer({
    typeDefs: [routeTypeDefs, partnerUserTypeDefs, partnerBusinessTypeDefs],
    resolvers: [routeResolver, partnerUserResolver, partnerBusinessResolver],
    introspection: true,
});

startStandaloneServer(server, { listen: { port } })
    .then(({ url }) => {
        console.log(`🚀 Server ready at ${url}`);
    })
    .catch((err) => {
        console.log(err);
    });
