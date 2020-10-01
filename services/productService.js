const axios = require("axios");

const getProduct = async (req, res, next) => {
  try {
    const { data } = await axios.get("http://localhost:8080/api/v1/products");
    req.products = data;
    next();
  } catch (error) {
    res.status(500).send({
      message: error,
    });
  }
};

const createProduct = async (req, res, next) => {
  try {
    const { data } = await axios.post("http://localhost:8080/api/v1/products", {
      product: req.body,
    });
    req.product = data;
    next();
  } catch (error) {
    res.status(500).send({
      message: error,
    });
  }
};

const validateProductData = (req, res, next) => {
  const { price, quantity } = req.body;
  const errors = validateProductDataComplete(req.body);
  if (!errors.length) {
    if (isNaN(price)) {
      res.status(400).send({
        message: "The price of product should be a number.",
      });
    } else if (isNaN(quantity)) {
      res.status(400).send({
        message: "Quantity of product should be a number.",
      });
    } else {
      next();
    }
  } else {
    const missingParameters = errors.join(", ");
    res.status(400).send({
      message: `This parameters are required:  ${missingParameters}`,
    });
  }
};

const validateProductDataComplete = ({
  name,
  description,
  price,
  quantity,
}) => {
  let missingParameters = [];
  if (!name || !/\S/.test(name)) {
    missingParameters.push("name");
  }
  if (!description) {
    missingParameters.push("description");
  }
  if (!price) {
    missingParameters.push("price");
  }
  if (!quantity) {
    missingParameters.push("quantity");
  }
  return missingParameters;
};

module.exports = { getProduct, createProduct, validateProductData };
