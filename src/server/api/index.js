import path from 'path';
import { Router } from 'express';
import auth from './auth';

export default () => {
  let api = Router();

  // Router ======================================================================
  api.get('/', function(req, res) {
    res.sendFile(path.resolve(__dirname, '../../public/index.html'));
  });

  api.use('/auth', auth());

  return api;
};
