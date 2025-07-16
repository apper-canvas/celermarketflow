import React, { useState } from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import StarRating from "@/components/atoms/StarRating";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import { useCart } from "@/hooks/useCart";

const ProductDetails = ({ product }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  const savings = product.discountPrice ? product.price - product.discountPrice : 0;
  const savingsPercent = savings > 0 ? Math.round((savings / product.price) * 100) : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <motion.div
            key={selectedImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative overflow-hidden rounded-lg"
          >
            <img
              src={product.images[selectedImage]}
              alt={product.title}
              className="w-full h-96 object-cover"
            />
            {product.isPrime && (
              <div className="absolute top-4 left-4">
                <Badge variant="prime">
                  <ApperIcon name="Zap" size={14} className="mr-1" />
                  Prime
                </Badge>
              </div>
            )}
            {savingsPercent > 0 && (
              <div className="absolute top-4 right-4">
                <Badge variant="error">
                  {savingsPercent}% OFF
                </Badge>
              </div>
            )}
          </motion.div>
          
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`border-2 rounded-lg overflow-hidden ${
                  selectedImage === index ? "border-primary" : "border-gray-200"
                }`}
              >
                <img
                  src={image}
                  alt={`${product.title} ${index + 1}`}
                  className="w-full h-20 object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Information */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2 font-display">
              {product.title}
            </h1>
            
            <div className="flex items-center gap-4 mb-4">
              <StarRating rating={product.rating} size={16} />
              <span className="text-sm text-gray-500">
                {product.reviewCount} reviews
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-gray-900">
                ${product.discountPrice || product.price}
              </span>
              {product.discountPrice && (
                <span className="text-xl text-gray-500 line-through">
                  ${product.price}
                </span>
              )}
            </div>
            
            {savings > 0 && (
              <p className="text-green-600 font-medium">
                You save ${savings.toFixed(2)} ({savingsPercent}%)
              </p>
            )}
            
            <p className={`text-sm ${product.inStock ? "text-green-600" : "text-red-600"}`}>
              {product.inStock ? "In Stock" : "Out of Stock"}
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <div className="flex items-center border border-gray-200 rounded-lg w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 hover:bg-gray-100 transition-colors"
                >
                  <ApperIcon name="Minus" size={16} />
                </button>
                <span className="px-4 py-2 border-x border-gray-200 min-w-[60px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 hover:bg-gray-100 transition-colors"
                >
                  <ApperIcon name="Plus" size={16} />
                </button>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="flex-1"
              >
                <ApperIcon name="ShoppingCart" size={16} className="mr-2" />
                Add to Cart
              </Button>
              
              <Button variant="outline" className="flex-1">
                <ApperIcon name="Heart" size={16} className="mr-2" />
                Add to Wishlist
              </Button>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-2">Product Details</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              {product.description}
            </p>
          </div>

          {product.specifications && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">Specifications</h3>
              <div className="space-y-1 text-sm">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="text-gray-600">{key}:</span>
                    <span className="text-gray-900">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;