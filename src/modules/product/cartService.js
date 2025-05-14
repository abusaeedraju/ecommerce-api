const { default: mongoose } = require("mongoose");
const CartItem = require("./models/CartItem");
const { getUserById } = require("../user/userService");
const createHttpError = require("http-errors");
const Cart = require("./models/Cart")


const createCart = async (user) => {
  try {
    //const cart = await Cart.create(user)
    const cart = new Cart({ user });
    await cart.save();
    return cart;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getCartById = async (userId) => {
  try {
    const cart = await Cart.findOne({ user: userId });
    let cartItem = await CartItem.find({ cart: cart._id })
    
    cart.cartItems = cartItem;
    let totalPrice = 0;
    let totalDiscountedPrice = 0;
    let totalItem = 0;
    for (let Item of cart.cartItems) {
      totalPrice += Item.price;
      totalDiscountedPrice += Item.discountedPrice;
      totalItem += Item.quantity;
    }
    cart.totalItem = totalItem;
    cart.totalPrice = totalPrice;
    cart.totalDiscountedPrice = totalDiscountedPrice;
    cart.discount = totalPrice - totalDiscountedPrice;
    return cart;
  } catch (error) {
    throw new Error(error.message);
  }
};

const addCartItem = async (userId, req) => {
  try {
    const cart = await Cart.findOne({ user: userId });
    console.log(cart)
    const product = await Product.findById(req.productId);
    const isPresent = await CartItem.findOne({
      cart: cart._id,
      product: product._id,
    });
    if (!isPresent) {
      const cartItem = new CartItem({
        product: product._id,
        cart: cart._id,
        quantity: 1,
        userId,
        price: product.price,
        size: req.size,
        discountedPrice: product.discountedPrice,
      });

      const createdCardItem = await cartItem.save();
      cart.cartItems.push(createdCardItem);
      await cart.save();
      return "Item added to cart";
    }else{
      return "Item already added to cart";
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateCartItem = async (userId, cartItemId, cartItemData) => {
  try {
    const item = await CartItem.findById(cartItemId).populate({
      path: "product",
      select: "price discountedPrice",
    });
    if (!item) {
      throw new Error("cartItem not found", cartItemId);
    }
    const user = await getUserById(userId);
    if (!user) {
      throw new Error("user not found", userId);
    }

    if (user._id.toString() === userId.toString()) {
      item.quantity = cartItemData.quantity || item.quantity;
      item.size = cartItemData.size || item.size;
      item.price = cartItemData.quantity * item.product.price || item.price;
      item.discountedPrice =
        cartItemData.quantity * item.product.discountedPrice ||
        item.discountedPrice;
      const updatedCartItem = await item.save();
      return updatedCartItem;
    } else {
      throw new Error("you can't update this cart Item0");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

const findCartItemById = async (cartItemId) => {
  const cartItem = await CartItem.findById(cartItemId);
  if (cartItem) {
    return cartItem;
  } else {
    throw new Error("cartItem not found", cartItemId);
  }
};

const removeCardItem = async (userId, cartItemId) => {
  try {
    let cartItem = await findCartItemById(cartItemId);
    const user = await getUserById(userId);
    if (user._id.toString() === cartItem.userId.toString()) {
      await CartItem.findByIdAndDelete(cartItemId);
      return "cartItem deleted";
    } else {
      throw new Error("you cant remove another user's item");
    }
  } catch (error) {
    if(error instanceof mongoose.Error.CastError){
      throw createHttpError(400,'Invalid ID')
    }
    throw new Error(error.message);
  }
};

module.exports = {
  createCart,
  getCartById,
  addCartItem,
  updateCartItem,
  findCartItemById,
  removeCardItem,
};
