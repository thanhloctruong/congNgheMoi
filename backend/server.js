import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import userRouter from "./routers/userRouter.js";
import productRouter from "./routers/productRouter.js";


dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
// const uri = 'mongodb://localhost/websitecnm';
// eslint-disable-next-line no-undef
mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost/websitecnm", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
// main().catch(err => console.log(err));

// async function main() {
//   await mongoose.connect('mongodb://localhost:27017/test');
// }

// mongoose.set('useNewUrlParser', true);
// mongoose.set('useUnifiedTopology', true);
// mongoose.connect(uri);
// mongoose.createConnection(uri, { useNewUrlParser: true });

app.use("/api/users", userRouter);
app.use("/api/products",productRouter);
app.get("/", (req, res) => {
  res.send("server is already");
});
// err catch 

// eslint-disable-next-line no-unused-vars
app.use((err,req,res,next) => {
  res.status(500).send(({message: err.message}))
});


// eslint-disable-next-line no-undef
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server at http://localhost:${port}`);
});
