import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import ProductGrid from "@/components/organisms/ProductGrid";
import ProductForm from "@/components/molecules/ProductForm";
import { productService } from "@/services/api/productService";

const AdminPanel = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const productsData = await productService.getAll();
      setProducts(productsData);
    } catch (err) {
      setError(err.message);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleAddProduct = () => {
    setEditingProduct(null);
    setShowProductForm(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowProductForm(true);
  };

  const handleDeleteProduct = async (productId) => {
    if (!confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      await productService.delete(productId);
      setProducts(prev => prev.filter(p => p.Id !== productId));
      toast.success("Product deleted successfully");
    } catch (err) {
      toast.error("Failed to delete product");
    }
  };

  const handleProductSave = async (productData) => {
    try {
      if (editingProduct) {
        const updatedProduct = await productService.update(editingProduct.Id, productData);
        setProducts(prev => 
          prev.map(p => p.Id === editingProduct.Id ? updatedProduct : p)
        );
        toast.success("Product updated successfully");
      } else {
        const newProduct = await productService.create(productData);
        setProducts(prev => [...prev, newProduct]);
        toast.success("Product created successfully");
      }
      setShowProductForm(false);
      setEditingProduct(null);
    } catch (err) {
      toast.error(editingProduct ? "Failed to update product" : "Failed to create product");
    }
  };

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = [
    {
      title: "Total Products",
      value: products.length,
      icon: "Package",
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "In Stock",
      value: products.filter(p => p.stock > 0).length,
      icon: "CheckCircle",
      color: "from-green-500 to-green-600"
    },
    {
      title: "Out of Stock",
      value: products.filter(p => p.stock === 0).length,
      icon: "XCircle",
      color: "from-red-500 to-red-600"
    },
    {
      title: "Low Stock",
      value: products.filter(p => p.stock > 0 && p.stock < 10).length,
      icon: "AlertTriangle",
      color: "from-yellow-500 to-yellow-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 font-display">
            Admin Panel
          </h1>
          <p className="text-gray-600">
            Manage your products and inventory
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}>
                  <ApperIcon name={stat.icon} size={24} className="text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Actions Bar */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8 border border-gray-200">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex-1 max-w-md">
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <Button
              onClick={handleAddProduct}
              className="flex items-center gap-2"
            >
              <ApperIcon name="Plus" size={20} />
              Add Product
            </Button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Products ({filteredProducts.length})
            </h2>
          </div>
          <ProductGrid
            products={filteredProducts}
            loading={loading}
            error={error}
            onRetry={loadProducts}
            admin={true}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
          />
        </div>

        {/* Product Form Modal */}
        {showProductForm && (
          <ProductForm
            product={editingProduct}
            onSave={handleProductSave}
            onCancel={() => {
              setShowProductForm(false);
              setEditingProduct(null);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default AdminPanel;