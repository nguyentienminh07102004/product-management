const createProductCategory = (req, res, next) => {
  if(!req.body.title){
    req.flash("error", "Please enter category's title");
    res.redirect("back");
    return;
  }
  next();
}

module.exports = { createProductCategory };