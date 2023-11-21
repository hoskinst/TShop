import asyncHandler from "../middleware/async-handler.js"
import Product from "../models/productModel.js"

const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        return res.json(product);
    } else {
        res.status(404)
        throw new Error('Resource not found');
    }
});

// @desc Create a product
// @route POST /api/products
// @access Private/Admin
const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        name: 'Sample Name',
        price: 0,
        user: req.user._id,
        image: 'image/sample.jpg',
        brand: 'Sample brand',
        category: 'Sample category',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample Description'
    })
    const createdProduct = await product.save()
    res.status(200).json(createdProduct);
})

// @desc Update a product
// @route PUT /api/products/:id
// @access Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
    const { name, price, description, image, brand, category, countInStock } = req.body;
    
    const product = await Product.findById(req.params.id);
    
    if (product) {
        product.brand = brand;
        product.category = category;
        product.countInStock = countInStock;
        product.description = description;
        product.image = image;
        product.price = price;
        const updatedProduct = await product.save()
        res.json(updatedProduct);
    } else {
        res.status(404);
        throw new Error('Product not found.')
    }
})

export { createProduct, getProducts, getProductById, updateProduct };