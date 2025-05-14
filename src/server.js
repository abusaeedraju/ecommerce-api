require("dotenv").config();
const app = require(".");
const { connectDb } = require("./config/db");
const { createSuperAdmin } = require("./helper/createSuperAdmin");

const PORT = process.env.SERVER_PORT || 5555;
app.listen(PORT, async () => {
  await connectDb();
 const superAdmin= await createSuperAdmin()
  console.log("app is listening on PORT : ", PORT);
});
