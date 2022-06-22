const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const fs = require("fs");
const moment = require("moment");
const app = express();

dotenv.config();

const { sequelize } = require("./lib/sequelize");
sequelize.sync({ alter: true });

const PORT = 2000;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  const loggingFormat = `${req.method} ${req.path} ${moment().format("LLL")}`;

  fs.appendFileSync(`${__dirname}/../.log`, loggingFormat + "\n");

  next();
});

const { authRoutes, productRoutes } = require("./routes");

app.use("/auth", authRoutes);
app.use("/product", productRoutes);

app.listen(PORT, () => {
  console.log("Listening in Port: ", PORT);
});
