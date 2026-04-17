import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const ProductCard = ({ product }) => {
    const { addToCart } = useContext(CartContext);

    return (
        <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group"
        >
            <Link to={`/product/${product._id}`}>
                <div className="relative h-64 overflow-hidden bg-gray-100">
                    <img 
                        src={product.images && product.images.length > 0 ? product.images[0] : 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80'} 
                        alt={product.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                </div>
            </Link>
            <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                    <Link to={`/product/${product._id}`}>
                        <h3 className="text-lg font-bold text-gray-900 hover:text-primary transition-colors line-clamp-1">
                            {product.name}
                        </h3>
                    </Link>
                    <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded">
                        ★ {product.rating || '4.5'}
                    </span>
                </div>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between mt-auto">
                    <span className="text-xl font-bold text-gray-900">${product.price}</span>
                    <button 
                        onClick={() => addToCart(product)}
                        className="bg-gray-100 hover:bg-primary hover:text-white p-2 rounded-full transition-colors text-gray-700"
                    >
                        <ShoppingCart className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;
