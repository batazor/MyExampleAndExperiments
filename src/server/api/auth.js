import { Router } from 'express';

import passportGitHub from '../auth/github';

export default () => {
  let auth = Router();

  auth.get('/', (req, res) => {
    res.send('Go back and register!');
  });

  // GitHub Auth ===============================================================
  auth.get('/github', passportGitHub.authenticate('github'));

  auth.get('/github/callback', passportGitHub.authenticate('github', {
    failureRedirect: '/auth'
  }), () => {
    res.redirect('/');
  });

  return auth;
};
