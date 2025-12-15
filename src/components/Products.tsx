import { useState } from "react";
import { ProductCard } from "./ProductCard";
import { ProductDetail } from "./ProductDetail";
import { useCart } from "../contexts/CartContext";
import { useProducts } from "../contexts/ProductContext";
import { Product } from "../contexts/CartContext";

export function Products() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { addToCart } = useCart();
  const { products } = useProducts();

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    // Show toast notification (optional)
    alert(`${product.name} berhasil ditambahkan ke keranjang!`);
  };

  return (
    <section id="produk" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-gray-900 mb-4">Produk & Layanan</h2>
          <p className="text-gray-600">
            Berbagai pilihan furniture berkualitas dengan desain custom sesuai kebutuhan Anda
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
              onViewDetails={setSelectedProduct}
            />
          ))}
        </div>
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}
    </section>
  );
}