module.exports = function(app, passport) {

  // ===========================================================================
  // HOME PAGE =================================================================
  // ===========================================================================
  app.get('/', function(req, res) {
    res.render('index');
  });

  // ===========================================================================
  // LOGIN =====================================================================
  // ===========================================================================
  // show the login form
  app.get('/login', function(req, res) {
    res.render('login', { message: req.flash('loginMessage') });
  });

  // process the login form
  app.post('/login', passport.authenticate('local-login', {
    successRedirect : '/profile',
    failureRedirect : '/login',
    failureFlash : true
  }));

  // ===========================================================================
  // SIGNUP ====================================================================
  // ===========================================================================
  // show the signup form
  app.get('/signup', function(req, res) {
    res.render('signup', { message: req.flash('signupMessage') });
  });

  // process the signup form
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/profile',
    failureRedirect : '/signup',
    failureFlash : true
  }));

  // ===========================================================================
  // LOGOUT ====================================================================
  // ===========================================================================
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  // ===========================================================================
  // PROFILE SECTION ===========================================================
  // ===========================================================================
  // show the user profile
  app.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile', {
      user : req.user
    });
  });

};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

  // if user is authentificated in the session, carry on
  if (req.isAuthenticated())
    return next();

  // if the aren't redirect them to the home page
  res.redirect('/');

}
