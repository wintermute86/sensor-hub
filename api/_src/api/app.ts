import express from 'express';
import bodyParser from 'body-parser';
import { allRoutes } from './routes';
import { logError, handleClientError } from './misc/Error';

export const app = express();
app.use(bodyParser.json());
app.use('/api', allRoutes);

app.use(logError);
app.use(handleClientError);

app.get('/', (req, res) => {
  res.send('Welcome to my API!');
});
