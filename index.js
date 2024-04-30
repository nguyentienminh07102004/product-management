const express = require('express');
const methodOverride = require('method-override');
const bodyParse = require('body-parser');
const flash = require('express-flash');
const cookieParser = require("cookie-parser");
const session = require("express-session");

const app = express();
require("dotenv").config();
const systemVariable = require("./config/system.js");

const database = require('./config/database.js');

const port = process.env.PORT;

app.set("views", "./views");
app.set("view engine", "pug");

// Flash
app.use(cookieParser("keyboard cat"));
app.use(session({ cookie: { maxAge: 600000 } }));
app.use(flash());
// End flash

// Method Override
app.use(methodOverride('_method'));

app.locals.prefixAdmin = systemVariable.prefixAdmin; // khai baó như này thì biến prefixAdmin sẽ tồn tại trong tất cả các templates

// Sử dụng body parser cho form
app.use(bodyParse.urlencoded({extended: false}));

database.connect();

app.use(express.static("public"));

const routes = require("./routes/client/index.route.js");
const adminRoutes = require("./routes/admin/index.route.js");

routes(app);
adminRoutes(app);


app.listen(port, () => {
  console.log(`Project open in port ${port}`);
});