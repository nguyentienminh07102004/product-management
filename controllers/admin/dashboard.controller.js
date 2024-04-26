const dashboard = (req, res) => {
  res.render("admin/pages/dashboard/index.pug", {
    title: "Dashboard"
  });
}
// [GET] /admin/dashboard
module.exports = { dashboard };