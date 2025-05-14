const { Schema, model } = require("mongoose");

const cartSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  cartItems: [
    {
      type: Schema.Types.ObjectId,
      ref: "cartItem",
      required: true,
    },
  ],
  totalItem: {
    type: Number,
    required: true,
    default: 0,
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  totalDiscountedPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  discount: {
    type: Number,
    required: true,
    default: 0,
  },
});

const Cart = model("carts", cartSchema);

module.exports = Cart;
