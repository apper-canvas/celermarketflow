import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";

const ProductForm = ({ product, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    originalPrice: "",
    category: "",
    stock: "",
    image: "",
    brand: "",
    rating: "4.5",
    reviews: "0"
  });

  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title || "",
        description: product.description || "",
        price: product.price?.toString() || "",
        originalPrice: product.originalPrice?.toString() || "",
        category: product.category || "",
        stock: product.stock?.toString() || "",
        image: product.image || "",
        brand: product.brand || "",
        rating: product.rating?.toString() || "4.5",
        reviews: product.reviews?.toString() || "0"
      });
    }
  }, [product]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Product title is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Product description is required";
    }

    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = "Valid price is required";
    }

    if (!formData.category.trim()) {
      newErrors.category = "Category is required";
    }

    if (!formData.stock || parseInt(formData.stock) < 0) {
      newErrors.stock = "Valid stock quantity is required";
    }

    if (!formData.image.trim()) {
      newErrors.image = "Product image URL is required";
    }

    if (!formData.brand.trim()) {
      newErrors.brand = "Brand is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setSaving(true);
    try {
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : undefined,
        stock: parseInt(formData.stock),
        rating: parseFloat(formData.rating),
        reviews: parseInt(formData.reviews)
      };

      await onSave(productData);
    } catch (err) {
      console.error("Error saving product:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              {product ? "Edit Product" : "Add New Product"}
            </h2>
            <button
              onClick={onCancel}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <ApperIcon name="X" size={24} />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Product Title"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              error={errors.title}
              placeholder="Enter product title"
            />
            
            <Input
              label="Brand"
              value={formData.brand}
              onChange={(e) => handleChange("brand", e.target.value)}
              error={errors.brand}
              placeholder="Enter brand name"
            />
          </div>

          <Input
            label="Description"
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            error={errors.description}
            placeholder="Enter product description"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Price ($)"
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) => handleChange("price", e.target.value)}
              error={errors.price}
              placeholder="0.00"
            />
            
            <Input
              label="Original Price ($)"
              type="number"
              step="0.01"
              value={formData.originalPrice}
              onChange={(e) => handleChange("originalPrice", e.target.value)}
              placeholder="0.00"
            />
            
            <Input
              label="Stock"
              type="number"
              value={formData.stock}
              onChange={(e) => handleChange("stock", e.target.value)}
              error={errors.stock}
              placeholder="0"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Category"
              value={formData.category}
              onChange={(e) => handleChange("category", e.target.value)}
              error={errors.category}
              placeholder="Enter category"
            />
            
            <Input
              label="Rating"
              type="number"
              step="0.1"
              min="0"
              max="5"
              value={formData.rating}
              onChange={(e) => handleChange("rating", e.target.value)}
              placeholder="4.5"
            />
          </div>

          <Input
            label="Image URL"
            value={formData.image}
            onChange={(e) => handleChange("image", e.target.value)}
            error={errors.image}
            placeholder="https://example.com/image.jpg"
          />

          <Input
            label="Number of Reviews"
            type="number"
            value={formData.reviews}
            onChange={(e) => handleChange("reviews", e.target.value)}
            placeholder="0"
          />

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="ghost"
              onClick={onCancel}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={saving}
              className="flex-1"
            >
              {saving ? (
                <>
                  <ApperIcon name="Loader2" size={16} className="animate-spin mr-2" />
                  Saving...
                </>
              ) : (
                <>
                  <ApperIcon name="Save" size={16} className="mr-2" />
                  {product ? "Update Product" : "Create Product"}
                </>
              )}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ProductForm;