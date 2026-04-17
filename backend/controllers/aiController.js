const Product = require('../models/Product');

// @desc    Get mock recommendations
// @route   GET /api/ai/recommendations
// @access  Public
const getRecommendations = async (req, res) => {
    try {
        // Dummy logic: return top 4 products or random products
        const products = await Product.aggregate([{ $sample: { size: 4 } }]);
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Mock Chatbot Response
// @route   POST /api/ai/chat
// @access  Public
const chatBot = async (req, res) => {
    try {
        const { message } = req.body;
        
        let reply = "I am a dummy AI assistant. How can I help you find products today?";
        if (message.toLowerCase().includes("budget")) {
            reply = "We have some great budget options. Check out our Electronics category for deals under $200!";
        } else if (message.toLowerCase().includes("laptop")) {
            reply = "Looking for a laptop? I recommend filtering by 'Electronics' to see our latest models.";
        }

        res.json({ reply });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { getRecommendations, chatBot };
