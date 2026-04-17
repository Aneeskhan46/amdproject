import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/api/products');
                setProducts(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching products", error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Group products by category
    const menProducts = products.filter(p => p.category === 'Men');
    const womenProducts = products.filter(p => p.category === 'Women');
    const kidsProducts = products.filter(p => p.category === 'Kids');

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="bg-primary text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center"
                    >
                        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
                            Intelligent Shopping, <br/> Personalized for You
                        </h1>
                        <p className="text-xl md:text-2xl text-indigo-100 max-w-3xl mx-auto mb-10">
                            Discover products tailored to your preferences using our advanced AI recommendation engine.
                        </p>
                        <button className="bg-white text-primary px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg">
                            Shop Trending Now
                        </button>
                    </motion.div>
                </div>
            </section>

            {loading ? (
                <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3, 4, 5, 6].map(n => (
                            <div key={n} className="bg-white p-4 rounded-2xl shadow-sm animate-pulse">
                                <div className="bg-gray-200 h-48 rounded-xl mb-4"></div>
                                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
                    
                    {/* Men's Section */}
                    {menProducts.length > 0 && (
                        <section>
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">Men's Collection</h2>
                            <p className="text-gray-600 mb-8">Elevate your style with our premium men's clothing and accessories.</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                {menProducts.map(product => (
                                    <ProductCard key={product._id} product={product} />
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Women's Section */}
                    {womenProducts.length > 0 && (
                        <section>
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">Women's Collection</h2>
                            <p className="text-gray-600 mb-8">Discover elegant dresses, handbags, and fitness wear for women.</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                {womenProducts.map(product => (
                                    <ProductCard key={product._id} product={product} />
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Kids' Section */}
                    {kidsProducts.length > 0 && (
                        <section>
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">Kids' Collection</h2>
                            <p className="text-gray-600 mb-8">Fun, durable, and comfortable clothing and shoes for kids.</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                {kidsProducts.map(product => (
                                    <ProductCard key={product._id} product={product} />
                                ))}
                            </div>
                        </section>
                    )}

                    {products.length === 0 && (
                        <p className="text-gray-500 text-center py-10">No products found. Add some in the database!</p>
                    )}

                </div>
            )}
            
            {/* AI Banner */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl p-10 md:p-16 text-center text-white shadow-2xl relative overflow-hidden">
                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">Not sure what you're looking for?</h2>
                            <p className="text-lg md:text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
                                Chat with our AI Shopping Assistant. Just describe what you need, and we'll find the perfect match.
                            </p>
                            <button className="bg-white text-indigo-600 px-8 py-3 rounded-full font-bold hover:bg-gray-50 transition-colors">
                                Try AI Assistant
                            </button>
                        </div>
                        <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl"></div>
                        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400 opacity-20 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
