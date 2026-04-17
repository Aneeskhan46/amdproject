import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import { CartContext } from '../context/CartContext';

const Cart = () => {
    const { cartItems, removeFromCart } = useContext(CartContext);
    const navigate = useNavigate();

    const total = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2);

    return (
        <div className="min-h-screen bg-background py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <button onClick={() => navigate(-1)} className="mb-4 text-gray-500 hover:text-primary transition-colors flex items-center font-medium">
                    <ArrowLeft className="h-5 w-5 mr-1" /> Back
                </button>
                <h1 className="text-3xl font-extrabold text-gray-900 mb-8 flex items-center">
                    <ShoppingBag className="mr-3 h-8 w-8 text-primary" /> Shopping Cart
                </h1>

                {cartItems.length === 0 ? (
                    <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="bg-white p-10 rounded-2xl shadow-sm text-center"
                    >
                        <p className="text-xl text-gray-500 mb-6">Your cart is currently empty.</p>
                        <Link to="/" className="inline-block bg-primary text-white px-6 py-3 rounded-full font-bold hover:bg-indigo-700 transition-colors">
                            Start Shopping
                        </Link>
                    </motion.div>
                ) : (
                    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                        <ul className="divide-y divide-gray-200">
                            {cartItems.map((item) => (
                                <li key={item._id} className="p-6 flex items-center hover:bg-gray-50 transition-colors">
                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                        <img
                                            src={item.images && item.images.length > 0 ? item.images[0] : 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80'}
                                            alt={item.name}
                                            className="h-full w-full object-cover object-center"
                                        />
                                    </div>

                                    <div className="ml-6 flex flex-1 flex-col">
                                        <div>
                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                                <h3>
                                                    <Link to={`/product/${item._id}`}>{item.name}</Link>
                                                </h3>
                                                <p className="ml-4">${item.price}</p>
                                            </div>
                                            <p className="mt-1 text-sm text-gray-500">{item.category}</p>
                                        </div>
                                        <div className="flex flex-1 items-end justify-between text-sm">
                                            <p className="text-gray-500">Qty {item.qty}</p>

                                            <div className="flex">
                                                <button
                                                    type="button"
                                                    onClick={() => removeFromCart(item._id)}
                                                    className="font-medium text-red-500 hover:text-red-400 flex items-center"
                                                >
                                                    <Trash2 className="h-4 w-4 mr-1" /> Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        
                        <div className="border-t border-gray-200 p-6 bg-gray-50">
                            <div className="flex justify-between text-xl font-bold text-gray-900 mb-6">
                                <p>Subtotal</p>
                                <p>${total}</p>
                            </div>
                            <div className="mt-6">
                                <Link
                                    to="/checkout"
                                    className="flex items-center justify-center rounded-md border border-transparent bg-primary px-6 py-4 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                                >
                                    Proceed to Checkout
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
