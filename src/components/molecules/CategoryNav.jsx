import React from "react";
import { Link } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";

const CategoryNav = ({ categories, isOpen, onClose }) => {
  const mainCategories = categories.filter(cat => cat.level === 1);

  return (
    <div className={`bg-gray-800 text-white transition-all duration-300 ${isOpen ? "shadow-lg" : ""}`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center space-x-6 py-2">
          <button
            onClick={onClose}
            className="flex items-center space-x-2 hover:text-primary transition-colors"
          >
            <ApperIcon name="Menu" size={16} />
            <span className="text-sm font-medium">All Departments</span>
          </button>
          
          <div className="flex items-center space-x-6 text-sm">
            {mainCategories.slice(0, 6).map(category => (
              <Link
                key={category.Id}
                to={`/category/${category.Id}`}
                className="hover:text-primary transition-colors whitespace-nowrap"
              >
                {category.name}
              </Link>
            ))}
            <Link
              to="/deals"
              className="hover:text-primary transition-colors whitespace-nowrap"
            >
              Today's Deals
            </Link>
            <Link
              to="/customer-service"
              className="hover:text-primary transition-colors whitespace-nowrap"
            >
              Customer Service
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryNav;