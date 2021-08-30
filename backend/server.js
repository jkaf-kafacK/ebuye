import express from 'express';
import mongoose from 'mongoose'
import dotenv from 'dotenv';
import userRouters from './routers/userRouters.js';
import productRouters from './routers/productRouters.js';
import orderRouters from './routers/orderRouters.js';


dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

const URL = "mongodb+srv://jacques:SEcu1234@cluster0.cujgi.mongodb.net/myEbuya?retryWrites=true&w=majority";

mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,

 },err=>{
  if(err) throw err;
  console.log('Connection succeffull to MongoDB')
});
//pass_paypal=5D*2f)&#2UA9W*e

app.use('/api/users', userRouters);
app.use('/api/products', productRouters);
app.use('/api/orders', orderRouters);
app.get('/api/config/paypal', (req, res) => {
  res.send(process.env.PAYPAL_LIVE_ID || 'sb');
});


const PORT = process.env.PORT || 5000;  // if port not exist conet to 500
app.listen(PORT,()=>{
  console.log(`Serve at http://localhost:${PORT}`)
 // console.log('Server in running on port', PORT)
});

