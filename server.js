const express = require('express');
const app = express();

const PORT = 3000;

//Middleware
app.use(express.json());

const products = [];

//API
app.post('/products', (req, res) => {
    const product = {
        id: products.length + 1,
        name: req.body.name,
        price: req.body.price,
        stock: req.body.stock
    };

    products.push(product);

    res.status(201).json({
       message: " Product created successfully",
       data: product
    });
});


//SERVER
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});