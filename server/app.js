import express from 'express';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/api/v1/placeholder', (req, res) => {
  res.status(200).send({ message: 'welcome to SendIT' });
});

app.use('*', (req, res) => {
  res.status(404).json({ message:  "Page Not Found. Please go to /api/v1/parcelOrders to use our api" });
}); 

app.listen( process.env.PORT || 5000, () => console.log( 'Server started at localhost:5000'));

console.log('man');
const man = 'jkk';







