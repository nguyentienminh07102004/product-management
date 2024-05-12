const createPost = (req, res, next) => {
  if(!req.body.title){
    req.flash('error', 'Please enter your title');
    res.redirect('back');
    return;
  }
  if(req.body.discountPercentage){
    const discountPercentage = parseFloat(req.body.discountPercentage);
    if(!isNaN(discountPercentage) && discountPercentage < 0){
      req.flash('error', 'The discount must be 1 number greater than 0');
      res.redirect('back');
      return;
    }else if(isNaN(discountPercentage)){
      req.flash('error', 'The discount must be 1 number');
      res.redirect('back');
      return;
    }
  }
  if(req.body.price){
    const price = parseFloat(req.body.price);
    if(isNaN(price)){
      req.flash('error', 'The price must be a number');
      res.redirect('back');
      return;
    }else if(isNaN(price) == false && price < 0){
      req.flash('error', "The price must be a number greater than 0");
      res.redirect('back');
      return;
    }
  }
  next();
}

module.exports = { createPost };