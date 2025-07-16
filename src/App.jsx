import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { motion } from "framer-motion";
import Header from "@/components/organisms/Header";
import CategoryNav from "@/components/molecules/CategoryNav";
import Footer from "@/components/organisms/Footer";
import Home from "@/components/pages/Home";
import Search from "@/components/pages/Search";
import ProductDetail from "@/components/pages/ProductDetail";
import Cart from "@/components/pages/Cart";
import Checkout from "@/components/pages/Checkout";
import OrderConfirmation from "@/components/pages/OrderConfirmation";
import Orders from "@/components/pages/Orders";
import AdminPanel from "@/components/pages/AdminPanel";
import { categoryService } from "@/services/api/categoryService";
import { useState, useEffect } from "react";

function App() {
  const [categories, setCategories] = useState([]);
  const [categoryNavOpen, setCategoryNavOpen] = useState(false);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoriesData = await categoryService.getAll();
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error loading categories:", error);
      }
    };
    
    loadCategories();
  }, []);

return (
    <div className="min-h-screen bg-white">
      <Header />
      <CategoryNav 
        categories={categories}
        isOpen={categoryNavOpen}
        onClose={() => setCategoryNavOpen(false)}
      />
      
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
<Route path="/checkout" element={<Checkout />} />
          <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </motion.main>
      
      <Footer />
      
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ zIndex: 9999 }}
      />
    </div>
  );
}

export default App;