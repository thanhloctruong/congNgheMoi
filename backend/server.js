import express from "express";
import data from "./data.js";

const app = express();

app.get("/api/product/:id", (req, res) => {
  const product = data.products.find(x => x._id === req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product not found" });
  }
});

app.get("/api/products", (req, res) => {
  res.send(data.products);
});

app.get("/", (req, res) => {
  res.send("server is already");
});
// eslint-disable-next-line no-undef
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server at http://localhost:${port}`);
});
