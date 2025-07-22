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
app.use(cors());
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