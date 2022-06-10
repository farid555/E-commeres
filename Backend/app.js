const express = require("express");
const mongoose = require("mongoose");
const app = express();
const morgan = require("morgan");
const productsRouter = require("./routers/products");
const categoriesRouter = require("./routers/categories");
const ordersRouter = require("./routers/orders");
const usersRouter = require("./routers/users");
const cors = require("cors");
require("dotenv/config");

const api = process.env.API_URL;

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//Routers
app.use(`/${api}/products`, productsRouter);
app.use(`/${api}/categories`, categoriesRouter);
app.use(`/${api}/users`, usersRouter);
app.use(`/${api}/orders`, ordersRouter);

mongoose
  .connect(process.env.MONGODB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database Connection is ready");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(3000, () => {
  console.log("server is running http://localhost:3000");
});
