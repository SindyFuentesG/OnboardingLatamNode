const express = require("express");
const cors = require("cors");
const server = express();
server.use(cors());
server.use(express.json());

const {
  getProduct,
  createProduct,
  validateProductData,
} = require("../services/productService");

server.listen(3001, (req, res) => console.log("listening port 3001"));

server.get("/api/v1/products/", getProduct, (req, res) => {
  const { products } = req;
  res.status(200).json(products);
});

server.post(
  "/api/v1/products/",
  validateProductData,
  createProduct,
  (req, res) => {
    const { product } = req;
    res.status(200).json(product);
  }
);
