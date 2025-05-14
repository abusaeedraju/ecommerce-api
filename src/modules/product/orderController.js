const orderService = require("./orderService");

const createOrder = async (req, res) => {
  const user = await req.user;
  try {
    let createdOrder = await orderService.createOrder(user._id, req.body);
    return res.status(200).send(createdOrder);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error.message });
  }
};

const findOrderById = async (req, res) => {
  const user = req.user;
  try {
    let createdOrder = await orderService.findOrderById(req.params.id);
    return res.status(200).send(createdOrder);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const orderHistory = async (req, res) => {
  const user = req.user;
  try {
    let createdOrder = await orderService.userOrderHistory(user._id);
    return res.status(200).send(createdOrder);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await orderService.getAllOrders();
    return res.status(200).send(orders);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const confirmedOrder = async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const orders = orderService.confirmedOrder(orderId);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const shipOrder = async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const orders = orderService.shipOrder(orderId);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const deliverOrder = async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const orders = orderService.deliverOrder(orderId);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const cancelledOrder = async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const orders = orderService.cancelledOrder(orderId);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const deleteOrder = async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const orders = orderService.deleteOrder(orderId);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = {
  getAllOrders,
  confirmedOrder,
  deliverOrder,
  shipOrder,
  cancelledOrder,
  deleteOrder,
  findOrderById,
  createOrder,
  orderHistory,
};
