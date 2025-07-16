import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import SearchBar from "@/components/molecules/SearchBar";
import { useCart } from "@/hooks/useCart";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { cartItems } = useCart();

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="bg-gray-900 text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
              <ApperIcon name="ShoppingBag" size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold font-display">MarketFlow</span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-white"
          >
            <ApperIcon name="Menu" size={24} />
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8 flex-1 justify-center">
            <SearchBar />
          </div>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center space-x-6">
            <Link
              to="/orders"
              className="flex items-center space-x-1 hover:text-primary transition-colors"
            >
              <ApperIcon name="Package" size={20} />
<span className="text-sm">Orders</span>
            </Link>
            
            <Link
              to="/admin"
              className="flex items-center space-x-1 hover:text-primary transition-colors"
            >
              <ApperIcon name="Settings" size={20} />
              <span className="text-sm">Admin</span>
            </Link>
            <Link
              to="/cart"
              className="flex items-center space-x-1 hover:text-primary transition-colors relative"
            >
              <ApperIcon name="ShoppingCart" size={20} />
              <span className="text-sm">Cart</span>
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-700 py-4">
            <div className="mb-4">
              <SearchBar />
            </div>
            <div className="space-y-4">
              <Link
                to="/orders"
                className="flex items-center space-x-2 hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <ApperIcon name="Package" size={20} />
<span>Orders</span>
              </Link>
              <Link
                to="/admin"
                className="flex items-center space-x-2 hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <ApperIcon name="Settings" size={20} />
                <span>Admin</span>
              </Link>
              <Link
                to="/cart"
                className="flex items-center space-x-2 hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <ApperIcon name="ShoppingCart" size={20} />
                <span>Cart ({cartItemCount})</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;