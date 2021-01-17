import * as express from 'express';

const root = express.Router();

root.get('/', (req, res) => {
  res.send('root');
});

export default root;