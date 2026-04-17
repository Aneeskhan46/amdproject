import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { CheckCircle, ArrowLeft } from 'lucide-react';

const Checkout = () => {
    const { cartItems, clearCart } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');
    const [success, setSuccess] = useState(false);

    const total = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2);

    const handleCheckout = async (e) => {
        e.preventDefault();
        
        if (!user) {
            navigate('/login');
            return;
        }

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const orderData = {
                orderItems: cartItems,
                shippingAddress: { address, city, postalCode, country },
                paymentMethod: 'MockCard',
                totalPrice: Number(total),
            };

            await axios.post('http://localhost:5000/api/orders', orderData, config);
            
            setSuccess(true);
            clearCart();
            
            setTimeout(() => {
                navigate('/');
            }, 3000);
            
        } catch (error) {
            console.error("Checkout failed", error);
            alert("Checkout failed. Please try again.");
        }
    };

    if (success) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center bg-background px-4">
                <div className="bg-white p-10 rounded-2xl shadow-sm text-center max-w-md w-full">
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold mb-2">Order Confirmed!</h2>
                    <p className="text-gray-500 mb-6">Thank you for your purchase. We are processing your order.</p>
                    <p className="text-sm text-gray-400 animate-pulse">Redirecting to home...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <button onClick={() => navigate(-1)} className="mb-6 text-gray-500 hover:text-primary transition-colors flex items-center font-medium">
                    <ArrowLeft className="h-5 w-5 mr-1" /> Back
                </button>
                <div className="bg-white rounded-2xl shadow-sm p-8">
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Checkout</h1>
                
                <form onSubmit={handleCheckout} className="space-y-6">
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                        <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">Address</label>
                                <input type="text" required value={address} onChange={(e) => setAddress(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">City</label>
                                <input type="text" required value={city} onChange={(e) => setCity(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Postal Code</label>
                                <input type="text" required value={postalCode} onChange={(e) => setPostalCode(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary" />
                            </div>
                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">Country</label>
                                <input type="text" required value={country} onChange={(e) => setCountry(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                        <h2 className="text-xl font-semibold mb-4">Mock Payment</h2>
                        <div className="p-4 bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-md text-sm mb-4">
                            This is a demo. No real payment will be processed. Total: ${total}
                        </div>
                        <input type="text" value="**** **** **** 4242" readOnly className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-100 text-gray-500" />
                    </div>

                    <div className="pt-4">
                        <button type="submit" disabled={cartItems.length === 0} className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition-colors shadow-lg disabled:opacity-50">
                            Place Order (${total})
                        </button>
                    </div>
                </form>
            </div>
            </div>
        </div>
    );
};

export default Checkout;
