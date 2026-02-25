import express from 'express';
import cors from 'cors'
import 'dotenv/config'
import connectDb from './config/db.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRouter.js';
import productRouter from './routes/productRoutes.js';
import cartRouter from './routes/cartRoutes.js';
import orderRouter from './routes/orderRoutes.js';


// APP CONFIGS
const app=express();
const PORT=process.env.PORT||3000
connectDb();
connectCloudinary();


//APP MIDDLEWARES
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'https://forever-ecommerce-store.vercel.app' 
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      var msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

app.use(express.json());



//APP API ENDPOINTS

app.use('/api/user',userRouter);
app.use('/api/product',productRouter);
app.use('/api/cart',cartRouter);
app.use('/api/order',orderRouter);

app.get('/',(req,res)=>{
  res.send('Server is Live')
})

app.listen(PORT,()=>{
  console.log('server is running');
})