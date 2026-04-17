require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const mockProducts = [
    // Men's Section
    {
        name: "Classic Men's Suit",
        description: "A tailored fit, classic navy blue suit perfect for business meetings or formal events. Made from premium wool blend.",
        price: 249.99,
        category: "Men",
        tags: ["suit", "formal", "men", "clothing"],
        images: ["https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=500&q=80"],
        stock: 20,
        rating: 4.7,
        numReviews: 42
    },
    {
        name: "Men's Casual Sneakers",
        description: "Comfortable and stylish everyday sneakers. Features a breathable mesh upper and durable rubber sole.",
        price: 89.99,
        category: "Men",
        tags: ["shoes", "sneakers", "men", "casual"],
        images: ["https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&q=80"],
        stock: 50,
        rating: 4.5,
        numReviews: 89
    },
    {
        name: "Men's Leather Jacket",
        description: "Genuine leather biker jacket with a modern slim fit and premium metal zippers.",
        price: 199.50,
        category: "Men",
        tags: ["jacket", "leather", "men", "outerwear"],
        images: ["https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&q=80"],
        stock: 15,
        rating: 4.8,
        numReviews: 105
    },
    // Women's Section
    {
        name: "Elegant Evening Gown",
        description: "A stunning floor-length gown featuring a sweetheart neckline and delicate beadwork. Perfect for galas.",
        price: 299.00,
        category: "Women",
        tags: ["dress", "gown", "women", "formal"],
        images: ["https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=500&q=80"],
        stock: 10,
        rating: 4.9,
        numReviews: 67
    },
    {
        name: "Women's Running Shoes",
        description: "Lightweight and responsive running shoes engineered for comfort and speed on long runs.",
        price: 119.99,
        category: "Women",
        tags: ["shoes", "running", "women", "fitness"],
        images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80"],
        stock: 45,
        rating: 4.6,
        numReviews: 210
    },
    {
        name: "Designer Handbag",
        description: "A chic, versatile leather handbag with gold-tone hardware and multiple interior compartments.",
        price: 149.99,
        category: "Women",
        tags: ["bag", "handbag", "women", "accessories"],
        images: ["https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=500&q=80"],
        stock: 25,
        rating: 4.7,
        numReviews: 134
    },
    // Kids' Section
    {
        name: "Kids' Denim Jacket",
        description: "A classic, durable denim jacket for kids. Features button closures and multiple pockets.",
        price: 39.99,
        category: "Kids",
        tags: ["jacket", "denim", "kids", "clothing"],
        images: ["https://images.unsplash.com/photo-1519238263530-99abad672f58?w=500&q=80"],
        stock: 60,
        rating: 4.4,
        numReviews: 32
    },
    {
        name: "Colorful Toddler Sneakers",
        description: "Fun, vibrant sneakers with velcro straps for easy on and off. Built for active play.",
        price: 34.99,
        category: "Kids",
        tags: ["shoes", "sneakers", "kids", "toddler"],
        images: ["https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=500&q=80"],
        stock: 80,
        rating: 4.5,
        numReviews: 156
    },
    {
        name: "Kids' Graphic T-Shirt",
        description: "Soft, 100% cotton t-shirt featuring a fun dinosaur graphic. Machine washable and durable.",
        price: 14.99,
        category: "Kids",
        tags: ["shirt", "tshirt", "kids", "clothing"],
        images: ["https://images.unsplash.com/photo-1519241047957-be31d7379a5d?w=500&q=80"],
        stock: 120,
        rating: 4.8,
        numReviews: 89
    }
];

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected for Seeding");

        await Product.deleteMany();
        console.log("Existing products cleared");

        await Product.insertMany(mockProducts);
        console.log("Mock products inserted successfully!");

        process.exit();
    } catch (error) {
        console.error("Error seeding data:", error);
        process.exit(1);
    }
};

seedData();
