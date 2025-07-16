import React from "react";
import ProductCard from "@/components/molecules/ProductCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { useCart } from "@/hooks/useCart";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const ProductGrid = ({ products, loading, error, onRetry, admin = false, onEdit, onDelete }) => {
  const { addToCart } = useCart();

  if (loading) {
    return <Loading type="products" />;
  }

  if (error) {
    return <Error message={error} onRetry={onRetry} />;
  }

  if (!products || products.length === 0) {
    return (
      <Empty
        title="No products found"
        message="We couldn't find any products matching your criteria. Try adjusting your search or browse our categories."
        actionText="Browse All Categories"
        onAction={() => window.location.href = "/"}
        icon="Package"
      />
    );
  }

return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 p-4">
      {products.map(product => (
        <div key={product.Id} className="relative group">
          <ProductCard
            product={product}
            onAddToCart={addToCart}
          />
          {admin && (
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <div className="flex flex-col gap-1">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => onEdit(product)}
                  className="!px-2 !py-1"
                >
                  <ApperIcon name="Edit" size={14} />
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => onDelete(product.Id)}
                  className="!px-2 !py-1"
                >
                  <ApperIcon name="Trash2" size={14} />
                </Button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;