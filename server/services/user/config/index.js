module.exports = {
    mongodb: {
        protocol: process.env.DATABASE_PROTOCOL || "mongodb+srv",
        host: process.env.DATABASE_HOST || "cluster0.lykrd7i.mongodb.net",
        collectionName: process.env.DATABASE_NAME || "wanderia",
        username: process.env.DATABASE_USERNAME || "thisislin92",
        password: process.env.DATABASE_PASSWORD || "Indonesia86"
    }
}