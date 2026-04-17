const Product = require('../models/Product');

// @desc    Fetch all products with optional text search and filters
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
    try {
        const { keyword, category } = req.query;
        let query = {};

        if (keyword) {
            query.$text = { $search: keyword };
        }
        
        if (category) {
            query.category = category;
        }

        const products = await Product.find(query);
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { getProducts, getProductById, createProduct };
