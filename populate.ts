import dotenv from "dotenv";
import connectDB from "./db/connect";
import Product from "./models/product";
import jsonProducts from "./product.json";
dotenv.config();

const start = async () => {
  try {
    await connectDB(process.env.connection_string!);
    await Product.deleteMany();
    await Product.create(jsonProducts);
    console.log("success...");
    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

start();
