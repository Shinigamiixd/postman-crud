const products = require("./modules/data");
const express = require("express");
const app = express();

app.use(express.json());

app.get("/api/products", (req, res) => {
  res.send(products);
});

const PORT = 5001;

//  *  parodyti
app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (!product) res.status(404).send("Not Found");
  res.send(product);
});

// * ideti
app.post("/api/products", (req, res) => {
  const product = {
    id: products.length + 1,
    title: req.body.title,
    description: req.body.description,
  };
  products.push(product);
  res.send(product);
});

// * updatinti
app.put("/api/products/:id", (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (!product) res.status(404).send("Not Found");

  product.title = req.body.title;
  product.description = req.body.description;
  res.send(product);
});

// * istrinti
app.delete("/api/products/:id", (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (!product) res.status(404).send("Not Found");

  products.splice(products.indexOf(product), 1);
  res.send(product);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
