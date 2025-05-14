const cartService = require("./cartService");

const findUserCart = async (req, res) => {
  const user = await req.user;
  const userId = user._id;
  try {
    const cart = await cartService.getCartById(userId);
    return res.status(200).send(cart);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const addItemToCart = async (req, res) => {
  const user = await req.user;
  const userId = user._id;
  try {
    const cartItem = await cartService.addCartItem(userId, req.body);
    return res.status(200).send(cartItem);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const updateCartItem = async (req, res) => {
  const user = await req.user;
  try {
    const updatedCartItem = await cartItemService.updateCartItem(
      user._id,
      req.params.id,
      req.body
    );
    return res.status(200).send(updatedCartItem);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const removeCartItem = async (req, res) => {
  const user = await req.user;
  try {
    await cartItemService.removeCardItem(user._id, req.params.id);
    return res.status(200).send({ message: "cart item removed successfully" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = {
  findUserCart,
  addItemToCart,
  updateCartItem,
  removeCartItem,
};
