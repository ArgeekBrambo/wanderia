const express = require("express");
const router = express.Router();
const adminRouter = require("./adminRouter");

router.use("/users", adminRouter);

module.exports = router;
