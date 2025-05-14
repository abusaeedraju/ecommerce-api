const bcrypt = require("bcryptjs")
const User  = require("../modules/user/userModel")

exports.createSuperAdmin = async()=>{
    const findAdmin = await User.findOne({
        email : "admin123@gmail.com"
    })

    if (findAdmin) {
        return 
    }
    const hash =await bcrypt.hash('12345678',10)
    const createAdmin = await User.create({
        email : "admin123@gmail.com",
        password : hash,
        name : "Super Admin",
        role : 'admin',
        status : "active"
    })
    return createAdmin
}