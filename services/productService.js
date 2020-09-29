const axios = require("axios");

const getProduct = async (req, res, next) => {
  try {
    const { data } = await axios.get("http://localhost:8080/api/v1/products");
    req.product = data;
    next();
  } catch (error) {
    res.status(500).send({
      message: error,
    });
  }
};

module.exports = { getProduct };
