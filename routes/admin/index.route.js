const dashboardRoute = require("./dashboard.route.js");
const productsRoute = require("./product.route.js");
const systemVariable = require("../../config/system.js");
let route = (app) => {
  app.use(systemVariable.prefixAdmin + "/dashboard", dashboardRoute);
  app.use(systemVariable.prefixAdmin + "/products", productsRoute);
}

module.exports = route;