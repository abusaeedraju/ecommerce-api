const router = require("express").Router();

const productController = require("./productController");
const upload = require("../../middleware/fileUpload");
const isAdmin = require("../../middleware/isAdmin");
const { isLoggedIn } = require("../../middleware/isLogin");

router.get("/",isLoggedIn, productController.getAllProducts);//done
router.get("/:id", isLoggedIn, productController.findProductById);//done
router.get("/admin/product", isLoggedIn,isAdmin, productController.getAllProducts);
router.post("/admin/product", isLoggedIn,isAdmin,upload.single("image"), productController.createProduct);//done
router.post("/admin/creates", isLoggedIn,isAdmin, productController.createMultipleProduct);
router.delete("/admin/:id", isLoggedIn,isAdmin, productController.deleteProduct);
router.put("/admin/:id", isLoggedIn,isAdmin, productController.updateProduct);

module.exports = router;
 