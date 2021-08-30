import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Product from '../models/productmodels.js';
import { isAdmin, isAuth } from '../utils.js';

const productRouters = express.Router();

productRouters.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.send(products);
  })
);

productRouters.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    // await Product.remove({});
    const createdProducts = await Product.insertMany(data.products);
    res.send({ createdProducts });
  })
);

productRouters.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  })
);

productRouters.post('/', isAuth, isAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = new Product({
      name: 'sample name ' + Date.now(),
      category: 'sample category',
      image: '/images/11.jpeg',
      price: 0,
      countInStock: 0,
      brand: 'sample brand',
      rating: 0,
      numReviews: 0,
      description: 'sample description',
    });
    const createdProduct = await product.save();
    if(createdProduct){
      return res.status(201).send({ message: 'Product Created', product: createdProduct });
    }else{
      return res.status(404).send({ message: 'Product Not create' });

    }
  })
);

productRouters.post(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
      product.name = req.body.name;
      product.category = req.body.category;
      product.image = req.body.image;
      product.price = req.body.price;
      product.countInStock = req.body.countInStock;
      product.brand = req.body.brand; 
      product.description = req.body.description;
      const updatedProduct = await product.save();
      res.send({ message: 'Product Updated', product: updatedProduct });
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  })
);
productRouters.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const productIdd = req.params.id;
    const product = await Product.findById(productIdd)
    console.log("ecco id "+product);
    if (product) {
      const deleteProduct = await product.remove();
      if(deleteProduct){
        return res.status(201).res.send({ message: 'Product Deleted',  deleteProduct });
      }
    } else {
      res.status(404).send({ message: 'ERROR to delection' });
    }
  })
);
export default productRouters;