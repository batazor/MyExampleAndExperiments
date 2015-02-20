module.exports = function(app, passport) {
  var ChatRoom = require('./models/chatroom.js');

  // ===========================================================================
  // HOME PAGE =================================================================
  // ===========================================================================
  app.get('/', function(req, res) {
    res.render('welcome/index', {
      user : req.user,
      title: 'Welcome'
    });
  });

  // ===========================================================================
  // LOGIN =====================================================================
  // ===========================================================================
  // show the login form
  app.get('/login', function(req, res) {
    res.render('auth/login', {
      user : req.user,
      message: req.flash('loginMessage'),
      title: "Login",
      form: {
        action: '/login',
        button: 'Login',
        link: {
          name: 'Signup',
          url: '/signup'
        }
      }
    });
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
    res.render('auth/signup', {
      user : req.user,
      message: req.flash('signupMessage'),
      title: "Signup",
      form: {
        action: '/signup',
        button: 'Signup',
        link: {
          name: 'Login',
          url: '/login'
        }
      }
    });
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
    res.render('./profile/profile', {
      user : req.user,
      title: "Profile"
    });
  });

  // ===========================================================================
  // CHAT ======================================================================
  // ===========================================================================
  // show chat
  app.get('/chat', isLoggedIn, function(req, res) {
    res.render('chat/chat', {
      user : req.user,
      title: "Chat"
    });
  });

  // ===========================================================================
  // CHAT ROOM =================================================================
  // ===========================================================================
  // create chatRoom
  app.post('/chatroom', function(req, res) {
    var chatRoom = new ChatRoom({
      name: req.body.name
    });
    chatRoom.save(function(err) {
      if (err) {
        return console.log(err);
      } else {
        res.end();
        return console.log("created chatRoom");
      }
    });
  });

  // ===========================================================================
  // OTHER PAGE ================================================================
  // ===========================================================================
  app.get('/about', isLoggedIn, function(req, res) {
    res.render('other/about', {
      user : req.user,
      title: "About"
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
