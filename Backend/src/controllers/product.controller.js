import Product from '../models/product.model.js';


const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error });
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching product', error });
    }
};

const reviewProductById = async (req, res) => {
    try {
        const { rating} = req.body;
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        // Cập nhật đánh giá
        product.reviews += 1;
        product.rating = (product.rating * (product.reviews - 1) + rating) / product.reviews; // Cập nhật rating trung bình
        await product.save();
        res.json({ message: 'Product reviewed successfully', product });
    } catch (error) {
        res.status(500).json({ message: 'Error reviewing product', error });
    }
};


export { getAllProducts, getProductById, reviewProductById };