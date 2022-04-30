const isLoggedIn = (req, res, next) => {
  const { name, email } = req.session;
  if (name && email) {
    next();
  } else {
    next(new Error('The user is not logged in'));
  }
};

module.exports = isLoggedIn;
