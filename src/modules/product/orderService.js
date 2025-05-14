const Address = require("./models/Address");
const Product = require("./models/Product");
const Order = require("./models/Order");
const OrderItem = require("./models/OrderItem");
const { getCartById } = require("./cartService");

const createOrder = async (userId, shippingAddress) => {
  let address;
  if (shippingAddress.preAddressId) {
    address = await Address.findById(shippingAddress.preAddressId);
  } else {
    address = new Address(shippingAddress);
    address.user = userId;
    await address.save();
  }
  const cart = await getCartById(userId);

  let orderItems = new Array();

  for (const item of cart.cartItems) {
    const orderItem = new OrderItem({
      price: item.price,
      product: item.product,
      quantity: item.quantity,
      size: item.size,
      userId: item.userId,
      discountedPrice: item.discountedPrice,
    });

    const createdOrderItem = await orderItem.save();
    orderItems.push(createdOrderItem);
  }

  const createOrder = new Order({
    user: userId,
    orderItems,
    totalPrice: cart.totalPrice,
    totalDiscountedPrice: cart.totalDiscountedPrice,
    discount: cart.discount,
    totalItem: cart.totalItem,
    shippingAddress: address,
  });
  const savedOrder = await createOrder.save();
  return savedOrder;
};

const findOrderById = async (orderId) => {
  const order = await Order.findById(orderId)
    .populate("User")
    .populate({ path: "orderItems", populate: { path: "Product" } })
    .populate("shippingAddress");

  return order;
};
const userOrderHistory = async (userId) => {
  try {
    const orders = await Order.find({ user: userId, orderStatus: "PLACED" })
      .populate({ path: "orderItems", populate: { path: "product" } })
      .lean();

    return orders;
  } catch (error) {
    throw new Error(error.message);
  }
};
const getAllOrders = async () => {
  return await Order.find()
    .populate("user")
    .populate({ path: "orderItems", populate: { path: "product" } })
    .lean();
};

const placedOrder = async (orderId) => {
  const order = await findOrderById(orderId);
  order.orderStatus = "PLACED";
  order.paymentDetails.status = "CONFIRMED";

  return await order.save();
};
const confirmedOrder = async (orderId) => {
  const order = await findOrderById(orderId);
  order.orderStatus = "CONFIRMED";

  return await order.save();
};
const shipOrder = async (orderId) => {
  const order = await findOrderById(orderId);
  order.orderStatus = "SHIPPED";

  return await order.save();
};
const deliverOrder = async (orderId) => {
  const order = await findOrderById(orderId);
  order.orderStatus = "DELIVERED";

  return await order.save();
};
const cancelledOrder = async (orderId) => {
  const order = await findOrderById(orderId);
  order.orderStatus = "CANCELED";

  return await order.save();
};

const deleteOrder = async (orderId) => {
  const order = await this.findOrderById(orderId);
  await Order.findByIdAndDelete(order._id);
};

module.exports = {
  placedOrder,
  confirmedOrder,
  shipOrder,
  deliverOrder,
  cancelledOrder,
  findOrderById,
  getAllOrders,
  deleteOrder,
  createOrder,
  userOrderHistory,
};
