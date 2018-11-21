import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import 'babel-polyfill';
import parcelOrdersRoutes from './routes/parcelOrders';
import userAuthRoutes from './routes/userAuth';

dotenv.config();
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/api/v1', (req, res) => res.status(200).send({
  status: 'connection successful',
  message: 'Welcome to SendIT!',
}));

app.use('/api/v1/parcels', parcelOrdersRoutes);
app.use('/api/v1/auth', userAuthRoutes);
app.use('/api/v1', userAuthRoutes);

app.use('*', (req, res) => {
  res.status(404).json({ message: 'Page Not Found. Please go to /api/v1 to use our api' });
});

// eslint-disable-next-line no-console
app.listen(process.env.PORT || 5000, () => console.log('Server started at localhost:5000'));

export default app;
