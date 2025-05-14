const { register, login,logout } = require("./authController")
const { isLoggedIn } = require("../../middleware/isLogin")
const { isLoggedOut } = require("../../middleware/isLogout")

const router = require("express").Router()

router.post("/signup",register)//done
router.post("/login",isLoggedOut,login)//done
router.post("/logout",isLoggedIn,logout)//done


module.exports = router