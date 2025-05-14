const router = require("express").Router();

const cartController = require("./cartController");
const { isLoggedIn } = require("../../middleware/isLogin");

router.put("/cartItem/:id", isLoggedIn, cartController.updateCartItem);//done
router.delete("/cartItem/:id", isLoggedIn, cartController.removeCartItem);//done
router.get("/", isLoggedIn, cartController.findUserCart);//done...
router.put("/add", isLoggedIn, cartController.addItemToCart);//done

module.exports = router;
