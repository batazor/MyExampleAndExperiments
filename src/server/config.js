// Set environment =============================================================
import dotenv from 'dotenv';
dotenv.config();

// Set basic configuration app =================================================
export const APP_NAME = process.env.APP_NAME || 'LMap';
export const PORT = process.env.PORT ? parseInt(process.env.PORT) : 4000;
export const DOMAIN = process.env.DAMAIN || `http://127.0.0.1:${ PORT }`;
export const ENV = process.env.NODE_ENV || 'develop';
export const DEBUG =process.env.NODE_ENV === 'develop';

// Set analytics services ======================================================
export const analytics = {
  google: {
    trackingId: process.env.GOOGLE_TRACKING_ID || 'UA-XXXXX-X'
  }
};

// Set database ================================================================
export const dbConfig = {
  MongoDB: {
    DATABASE_URL: process.env.MONGODB_DATABASE_URL || `mongodb://localhost:27017/${ APP_NAME }`
  }
};

// Set Auth ====================================================================
export const authConfig = {
  serverCode: {
    secret: 'mySecretCode',
    resave: true,
    saveUnitialized: true
  },

  facebook: {
    clientID: process.env.facebookClientID || 'get_you_own',
    clientSecret: process.env.facebookClientSecret || 'get_you_own',
    callbackURL: DOMAIN + '/auth/facebook/callback'
  },

  google: {
    clientID: process.env.googleClientID || 'get_you_own',
    clientSecret: process.env.googleClientSecret || 'get_you_own',
    callbackURL: DOMAIN + '/auth/google/callback'
  },

  github: {
    clientID: process.env.githubClientID || 'get_you_own',
    clientSecret: process.env.githubClientSecret || 'get_you_own',
    callbackURL: DOMAIN + '/auth/github/callback',
    passReqToCallback: true
  },

  linkedin: {
    clientID: process.env.linkedinClientID || 'get_you_own',
    clientSecret: process.env.linkedinClientSecret || 'get_you_own',
    callbackURL: DOMAIN + '/auth/linkedin/callback'
  },

  twitter: {
    clientID: process.env.twitterClientID || 'get_you_own',
    clientSecret: process.env.twitterClientSecret || 'get_you_own',
    callbackURL: DOMAIN + '/auth/twitter/callback'
  },

  vk: {
    clientID: process.env.vkClientID || 'get_you_own',
    clientSecret: process.env.vkClientSecret || 'get_you_own',
    callbackURL: DOMAIN + '/auth/vk/callback'
  }
};
