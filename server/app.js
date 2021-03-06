import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import 'babel-polyfill';
import cors from 'cors';
import parcelOrdersRoutes from './routes/parcelOrders';
import userAuthRoutes from './routes/userAuth';
import userRoutes from './routes/user';


dotenv.config();
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/api/v1', (req, res) => res.status(200).send({
  status: 'connection successful',
  message: 'Welcome to SendIT!',
}));

app.use('/api/v1/parcels', parcelOrdersRoutes);
app.use('/api/v1/auth', userAuthRoutes);
app.use('/api/v1/users', userRoutes);

app.use('*', (req, res) => {
  res.status(404).json({ message: 'Page Not Found. Please go to /api/v1 to use our api' });
});

const port = 8000;
// eslint-disable-next-line no-console
app.listen(process.env.PORT || `${port}`, () => console.log(`Server started at localhost ${port}`));

export default app;
