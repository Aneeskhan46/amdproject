import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ShoppingCart, CreditCard, ArrowLeft, Star } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import { motion } from 'framer-motion';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useContext(CartContext);

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [qty, setQty] = useState(1);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
                setProduct(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching product details", error);
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        addToCart(product, qty);
        navigate('/cart');
    };

    const handleBuyNow = () => {
        addToCart(product, qty);
        navigate('/checkout');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex justify-center items-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-background flex flex-col justify-center items-center">
                <h2 className="text-2xl font-bold mb-4">Product not found</h2>
                <button onClick={() => navigate('/')} className="text-primary font-medium hover:underline flex items-center">
                    <ArrowLeft className="h-4 w-4 mr-1" /> Back to Home
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <button onClick={() => navigate(-1)} className="mb-6 text-gray-500 hover:text-primary transition-colors flex items-center font-medium">
                    <ArrowLeft className="h-5 w-5 mr-1" /> Back
                </button>

                <div className="bg-white rounded-3xl shadow-sm overflow-hidden border border-gray-100">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Image Section */}
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-gray-50 p-8 flex justify-center items-center"
                        >
                            <img 
                                src={product.images && product.images.length > 0 ? product.images[0] : 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80'} 
                                alt={product.name}
                                className="w-full max-w-md rounded-2xl object-cover shadow-lg"
                            />
                        </motion.div>

                        {/* Details Section */}
                        <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="p-8 md:p-12 flex flex-col"
                        >
                            <div className="mb-2 text-sm text-primary font-bold tracking-wider uppercase">
                                {product.category}
                            </div>
                            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">{product.name}</h1>
                            
                            <div className="flex items-center mb-6">
                                <div className="flex text-yellow-400">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star key={star} className={`h-5 w-5 ${star <= Math.round(product.rating) ? 'fill-current' : 'text-gray-300'}`} />
                                    ))}
                                </div>
                                <span className="ml-2 text-sm text-gray-500">({product.numReviews} reviews)</span>
                            </div>

                            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                                {product.description}
                            </p>

                            <div className="mb-8">
                                <span className="text-4xl font-extrabold text-gray-900">${product.price.toFixed(2)}</span>
                                {product.stock > 0 ? (
                                    <span className="ml-4 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                                        In Stock
                                    </span>
                                ) : (
                                    <span className="ml-4 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                                        Out of Stock
                                    </span>
                                )}
                            </div>

                            {product.stock > 0 && (
                                <div className="mt-auto space-y-4">
                                    <div className="flex items-center space-x-4 mb-6">
                                        <span className="text-gray-700 font-medium">Quantity:</span>
                                        <select 
                                            value={qty} 
                                            onChange={(e) => setQty(Number(e.target.value))}
                                            className="block w-24 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
                                        >
                                            {[...Array(Math.min(product.stock, 10)).keys()].map((x) => (
                                                <option key={x + 1} value={x + 1}>{x + 1}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <button 
                                            onClick={handleAddToCart}
                                            className="flex items-center justify-center bg-white border-2 border-primary text-primary px-8 py-4 rounded-xl font-bold text-lg hover:bg-indigo-50 transition-colors shadow-sm"
                                        >
                                            <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
                                        </button>
                                        <button 
                                            onClick={handleBuyNow}
                                            className="flex items-center justify-center bg-primary text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition-colors shadow-lg"
                                        >
                                            <CreditCard className="mr-2 h-5 w-5" /> Buy Now
                                        </button>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
