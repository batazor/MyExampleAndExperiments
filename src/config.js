export const app = {
  ENV: process.env.NODE_ENV || 'develop',
  DEBUG: process.env.NODE_ENV === 'develop',

  PORT: process.env.PORT ? parseInt(process.env.PORT) : 4000,
};

export const analytics = {
  google: {
    trackingId: process.env.GOOGLE_TRACKING_ID || 'UA-XXXXX-X'
  },
};

export const database = {
  DATABASE_URL: process.env.DATABASE_URL || 'sqlite:database.sqlite',
};

export const auth = {};
