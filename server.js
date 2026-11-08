const express = require('express');
const app = express();

const sequelize = require('./config/database');

const Product = require('./models/Product');

const PORT = 3000;

// Middleware
app.use(express.json());

// Create Product
app.post('/products', async (req, res) => {
    try {
        const product = await Product.create({
            name: req.body.name,
            price: req.body.price,
            stock: req.body.stock
        });

        res.status(201).json({
            message: 'Product created successfully',
            data: product
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error creating product',
            error: error.message
        });
    }
});

// Get All Products
app.get('/products', async (req, res) => {
    try {
        const products = await Product.findAll();

        res.status(200).json({
            message: 'Products retrieved successfully',
            data: products
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving products',
            error: error.message
        });
    }
});

// Get Product By ID
app.get('/products/:id', async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }

        res.status(200).json({
            message: 'Product retrieved successfully',
            data: product
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving product',
            error: error.message
        });
    }
});

// Update Product
app.put('/products/:id', async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }

        await product.update({
            name: req.body.name,
            price: req.body.price,
            stock: req.body.stock
        });

        res.status(200).json({
            message: 'Product updated successfully',
            data: product
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error updating product',
            error: error.message
        });
    }
});

// Delete Product
app.delete('/products/:id', async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }

        await product.destroy();

        res.status(200).json({
            message: 'Product deleted successfully'
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error deleting product',
            error: error.message
        });
    }
});

// Database Connection & Server
const startServer = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();

        console.log('Database connected successfully');

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });

    } catch (error) {
        console.error('Unable to connect to database:', error);
    }
};

startServer();