const express = require('express');
const app = express();
require("dotenv").config();
const systemVariable = require("./config/system.js");

const database = require('./config/database.js');

const port = process.env.PORT;

app.set("views", "./views");
app.set("view engine", "pug");

app.locals.prefixAdmin = systemVariable.prefixAdmin; // khai baó như này thì biến prefixAdmin sẽ tồn tại trong tất cả các templates

database.connect();

app.use(express.static("public"));

const routes = require("./routes/client/index.route.js");
const adminRoutes = require("./routes/admin/index.route.js");

routes(app);
adminRoutes(app);


app.listen(port, () => {
  console.log(`Project open in port ${port}`);
});