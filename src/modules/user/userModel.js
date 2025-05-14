const { Schema,model } = require("mongoose");

const userSchema = new Schema({

  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: "customer",
  },
  status:{
  type:String,
  required:true,
  default:"pending"
  },
  phone: {
    type: String,
  },
  address: [
    {
      type: Schema.Types.ObjectId,
      ref: "Address",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const User = model("users",userSchema)
module.exports=User