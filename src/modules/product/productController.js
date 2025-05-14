const { default: mongoose } = require("mongoose");
const ApiFeatures = require("../../helper/ApiFeatures");
const productService = require("./productService");
const { errorResponse, successResponse } = require("../../helper/responseHandler");

const createProduct = async (req, res) => {
  try {
    const product = await productService.createProduct(req.body);
    return res.status(200).send(product);
  } catch (error) {
    console.log(error.stack);
    return res.status(500).send({ error: error.msg, error: error.stack });
  }
};

const deleteProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    await productService.deleteProduct(productId);
    return res.status(200).send({ message: "product deleted successfully" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const updateProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await productService.updateProduct(productId, req.body);
    return res.status(200).send(product);
  } catch (error) {
    return res.status(500).send({ error: error.msg });
  }
};

const findProductById = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await productService.findProductById(productId);
    return res.status(200).send(product);
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      return errorResponse(res, { statusCode: 400, message: "Invalid ID" });
    }
    return res.status(500).send({ error: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts(req);
    return res.status(200).send(products);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

/*const getAllProducts = async (req, res) => {
  const ApiFeature = new ApiFeatures(Product.find(), req.query).search();
  const product = await ApiFeature.query;

  res.status(200).json({
    success: true,
    product,
  });
};*/
const createMultipleProduct = async (req, res) => {
  try {
    await productService.createMultipleProduct(req.body);
    return res.status(200).send({ message: "product created successfully" });
  } catch (error) {
    return res.status(500).send({ error: error.msg });
  }
};

module.exports = {
  createProduct,
  deleteProduct,
  updateProduct,
  getAllProducts,
  findProductById,
  createMultipleProduct,
};
