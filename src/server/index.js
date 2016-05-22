import path from 'path';
import express from 'express';
import passport from 'passport';
import session from 'express-session';

import { PORT, DOMAIN, DEBUG, authConfig } from './config';
import Router from './api';

// Express =====================================================================
let app = express();

// Router
app.use(Router());

// Auth ========================================================================
app.use(session(authConfig.serverCode));
app.use(passport.initialize());
app.use(passport.session());

// Listen ======================================================================
app.listen(PORT, function() {
  console.log(`✔ Server API listening on ${ DOMAIN }, Ctrl+C to stop`)
});
