const router = require("express").Router();

const orderController = require("./orderController");
const isAdmin = require("../../middleware/isAdmin");
const { isLoggedIn } = require("../../middleware/isLogin");

router.post("/", isLoggedIn, orderController.createOrder);//done
router.get("/user", isLoggedIn, orderController.orderHistory);
router.get("/:id", isLoggedIn, orderController.findOrderById);
router.get("/admin", isLoggedIn,isAdmin, orderController.getAllOrders);//done
router.get("/admin/:id", isLoggedIn,isAdmin, orderController.findOrderById);//done
router.put("/admin/:orderId/confirmed", isLoggedIn,isAdmin, orderController.confirmedOrder);
router.put("/admin/:orderId/ship", isLoggedIn,isAdmin, orderController.shipOrder);
router.put("/admin/:orderId/deliver", isLoggedIn,isAdmin, orderController.deliverOrder);
router.put("/admin/:orderId/cancel", isLoggedIn,isAdmin, orderController.cancelledOrder);
router.put("/admin/:orderId/delete", isLoggedIn,isAdmin, orderController.deleteOrder);

module.exports = router;
