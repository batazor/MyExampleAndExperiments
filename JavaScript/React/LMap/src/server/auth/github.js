import passport from 'passport'
import { Strategy as GitHubStrategy } from 'passport-github'

// import User from '../models/user';
import { authConfig } from '../config'

export default passport.use(new GitHubStrategy(authConfig.github, (req, accessToken, refreshToken, profile, cb) => {
  // User.findOrCreate({ githubId: profile.id }, (err, user) => {
  console.log(profile)
  return cb(profile)
  // return cb(err, user);
  // });
}))
