import express, { Request, Response } from "express";
import dotenv from "dotenv";
import notFound from "./middleware/not-found";
import errorHandler from "./middleware/error-handler";
import connectDB from "./db/connect";
import router from "./routes/products";
import "express-async-errors";
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
const uri = process.env.connection_string!;
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("store-api setup");
});

app.use("/api/v1/products", router);

app.use(notFound);
app.use(errorHandler);

const start = async () => {
  try {
    await connectDB(uri);
    app.listen(port, () => console.log(`server is listening on port ${port}`));
  } catch (err) {
    console.log(err);
  }
};

start();
