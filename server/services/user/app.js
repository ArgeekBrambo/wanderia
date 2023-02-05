const express = require("express");
const cors = require("cors");
const { runConnection, getDatabase } = require("./config/mongodb");
const app = express();
const router = require("./routers");
const { errorHandler } = require("./middlewares");
const port = process.env.PORT || 4001;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", router);
app.use(errorHandler);

if (process.env.NODE_ENV !== "test") {
  runConnection()
    .then(() => {
      app.listen(port, function (err) {
        if (err) console.log("Error in Server Setup");
        console.log(`"user-service" listening on port ${port}`);
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

module.exports = app;
