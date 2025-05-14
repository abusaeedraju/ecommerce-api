const { getUserProfile, getAllUser,updatePasswordById,forgetPassword,resetPassword } = require("./userController");
const isAdmin = require("../../middleware/isAdmin");
const { isLoggedIn } = require("../../middleware/isLogin");
const router = require("express").Router();


router.get("/profile",isLoggedIn, getUserProfile);//done
router.get("/", isLoggedIn,isAdmin,getAllUser);//done
router.put("/update-password",isLoggedIn,updatePasswordById)//done
router.post("/forgot-password",forgetPassword)//done
router.put("/reset-password",resetPassword)//done
module.exports = router;
 