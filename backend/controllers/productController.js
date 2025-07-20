import cloudinary from 'cloudinary';
import productModel from '../models/productModel.js'

const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;
    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );

    const imagesUrl = Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploaer.upload(item.path, {
          resource_type: 'image',
        });

        return result.secure_url;
      })
    );

    const productData = {
      name,
      description,
      category,
      subCategory,
      price: Number(price),
      bestseller: bestseller === 'true' ? true : false,
      sizes:JSON.parse(sizes),
      image:imagesUrl,
      date:Date.now()
    };

    const product=new productModel(productData);
    const savedProduct=await product.save();
    res.json({
      success:true,
      message:'Product Added Successfully',
      product
    })
  } catch (error) {
    res.json({
      success:false,
      message:error.message
    })
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products=await productModel.find({});
    res.json({
      success:true,
      products
    })
    
  } catch (error) {
    res.json({
      success:false,
      message:error.message
    })
  }
};

const getProduct = async (req, res) => {
  try {
    const product =await productModel.findById(req.body.productId)
  if(!product){
    return res.json({
      success:false,
      message:"Product not found"
    })
  };
  res.json({
    success:true,
    product
  })
  } catch (error) {
    res.json({
      success:false,
      message:error.message
    })
  }

};


const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    res.json({
      success:true,
      message:'Product Deleted Successfully'
    })
  } catch (error) {
    res.json({
      success:false,
      message:error.message
    })
  }
};

export { addProduct, getAllProducts, getProduct, removeProduct };
