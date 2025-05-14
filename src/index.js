const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const createError = require("http-errors");
const { errorResponse } = require("./helper/responseHandler");

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

//routing
app.get("/", (req, res) => {
  res
    .status(200)
    .send({ message: "welcome to e-commerce api - node", status: true });
});
const authRoute = require('./modules/auth/authRoute')
app.use("/api/auth", authRoute);

const userRoute = require("./modules/user/userRoute");
app.use("/api/user", userRoute);

const productRouter = require("./modules/product/productRoutes"); 
app.use("/api/product", productRouter);

const cartRouter = require("./modules/product/cartRoutes");
app.use("/api/cart", cartRouter);

const orderRouter = require("./modules/product/orderRoutes");
app.use("/api/order", orderRouter);

//client error handle
app.use((req, res, next) => {
  next(createError(404, "Route not found"));
});

//server error handle|global error handle
app.use((err, req, res, next) => {
 console.log(err.stack);
  return errorResponse(res, { statusCode: err.status, message: err.message });
});

module.exports = app;
