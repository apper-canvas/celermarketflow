import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import ProductGrid from "@/components/organisms/ProductGrid";
import { productService } from "@/services/api/productService";
import { categoryService } from "@/services/api/categoryService";

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [productsData, categoriesData] = await Promise.all([
        productService.getAll(),
        categoryService.getAll()
      ]);
      
      setFeaturedProducts(productsData.slice(0, 20));
      setCategories(categoriesData.filter(cat => cat.level === 1));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const heroCategories = [
    { name: "Electronics", icon: "Smartphone", color: "from-blue-500 to-purple-600" },
    { name: "Fashion", icon: "Shirt", color: "from-pink-500 to-red-600" },
    { name: "Home & Garden", icon: "Home", color: "from-green-500 to-teal-600" },
    { name: "Sports", icon: "Dumbbell", color: "from-orange-500 to-yellow-600" },
    { name: "Books", icon: "Book", color: "from-indigo-500 to-blue-600" },
    { name: "Beauty", icon: "Sparkles", color: "from-purple-500 to-pink-600" }
  ];

return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
{/* Hero Section */}
      <section className="bg-amazon-navy text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl font-bold mb-4 font-display"
>
              Welcome to <span className="text-primary">MarketFlow</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-300 mb-8"
            >
              Discover millions of products at unbeatable prices
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex justify-center"
            >
<Link
                to="/search"
                className="bg-primary text-white px-8 py-3 rounded font-semibold hover:bg-accent transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                Start Shopping
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 font-display">
              Shop by Category
            </h2>
            <p className="text-gray-600 text-lg">
              Explore our wide range of product categories
            </p>
          </div>
<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {heroCategories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <Link
                  to={`/category/${category.name.toLowerCase()}`}
                  className="block bg-white rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-100"
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <ApperIcon name={category.icon} size={32} className="text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2 font-display">
                Featured Products
              </h2>
              <p className="text-gray-600">
                Discover our most popular items
              </p>
            </div>
            <Link
              to="/search"
              className="text-primary hover:text-accent font-medium flex items-center gap-2 transition-colors"
            >
              View All
              <ApperIcon name="ArrowRight" size={16} />
            </Link>
          </div>
          
          <ProductGrid
            products={featuredProducts}
            loading={loading}
            error={error}
            onRetry={loadData}
          />
        </div>
      </section>

{/* Special Offers */}
      <section className="py-16 bg-amazon-navy">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center text-white">
            <h2 className="text-3xl font-bold mb-4 font-display">
              Special Offers Just for You
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Get up to 50% off on selected items
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white bg-opacity-20 rounded-2xl p-6 backdrop-blur-sm">
                <ApperIcon name="Truck" size={48} className="text-white mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Free Shipping</h3>
                <p className="opacity-90">On orders over $35</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded-2xl p-6 backdrop-blur-sm">
                <ApperIcon name="RotateCcw" size={48} className="text-white mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Easy Returns</h3>
                <p className="opacity-90">30-day return policy</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded-2xl p-6 backdrop-blur-sm">
                <ApperIcon name="Shield" size={48} className="text-white mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Secure Shopping</h3>
                <p className="opacity-90">100% secure payments</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;