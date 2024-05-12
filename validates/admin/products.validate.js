const createPost = (req, res, next) => {
  if(!req.body.title){
    req.flash('error', 'Please enter your title');
    res.redirect('back');
    return;
  }

  next();
}

module.exports = { createPost };