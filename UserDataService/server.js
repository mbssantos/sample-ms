const { get } = require('lodash');
const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const async = require('async');
const LogService = require('@Services/logService');
const routes = require("./routes");

const router = express.Router();

router.use('/', routes);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  UserService.findByIdWithPermissions(id).then((user) => {
    done(null, user);
  }).catch((errors) => {
    done(errors);
  });
});

passport.use(new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, ((email, password, done) => {
  async.waterfall([
    (complete) => {
      // Check if if user exists
    },
    (user, complete) => {
      // get any complementary info if needed
    },
    (user, complete) => {
      // Do any extra checks (i.e. valid pwd)
      UserService.checkPassword(password, user.password).then((isMatch) => {
        if (isMatch) {
          // Log action
          LogService.addLog('User login', user._id, user.customer).then(() => {
            return done(null, user);
          });
        } else {
          complete(true);
        }
      }).catch((errors) => {
        done(errors);
      });
    }
  ], () => {
    return done(null, false, { message: 'Invalid email address or password' });
  });
})));

// Log out user
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You have sucessfully logged out');
  res.redirect('/');
});

module.exports = router;
