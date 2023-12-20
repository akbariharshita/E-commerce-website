const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();
const port = process.env.PORT;
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");
const cors = require('cors');

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("DBConnection Successfull");
    }).catch((err) => {
        console.log(err);
    });

    app.use(cors());
    app.use(express.json());
    app.use("/api/users", userRoute);
    app.use("/api/auth", authRoute);
    app.use("/api/products", productRoute);
    app.use("/api/carts", cartRoute);
    app.use("/api/orders", orderRoute);
    app.use("/api/checkout", stripeRoute);

app.listen(port, () => {
    console.log(`server is running at port no ${port}`)
})
