import * as express from 'express';

const root = express.Router();

root.get('/', (req, res) => {
  res.send('Hello root');
});

export default root;