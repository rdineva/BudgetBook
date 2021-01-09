import * as express from 'express';
import { createConnection } from 'typeorm';
import "reflect-metadata";
import budget from './routes/budget';
import user from './routes/user';

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/users', user);
app.use('/budgets', budget);

createConnection().then(() => {
  console.log('database connection successful');
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});