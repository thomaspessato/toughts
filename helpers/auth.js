module.exports.checkAuth = (req, res, next) => {
  const userId = req.session.userId;
  console.log(userId);
  if (!userId) {
    res.redirect('/auth/login');
  } else {
    next();
  }
};