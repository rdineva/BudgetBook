import * as express from 'express';
import { createConnection } from 'typeorm';
import "reflect-metadata";
import budget from './routes/budget';
import user from './routes/user';
import root from './routes/root';

import cors = require('cors');
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.use('/', root);
app.use('/users', user);
app.use('/budgets', budget);

createConnection().then(() => {
  console.log('database connection successful');
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});