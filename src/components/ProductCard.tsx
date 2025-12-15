import { ShoppingCart, MapPin } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Product } from "../contexts/CartContext";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart, onViewDetails }: ProductCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow group">
      <div className="relative h-64 overflow-hidden">
        <ImageWithFallback
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4 bg-amber-600 text-white px-3 py-1 rounded-full">
          {product.category}
        </div>
        {product.stock < 5 && (
          <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full">
            Stock: {product.stock}
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="flex items-start gap-2 text-gray-500 mb-2">
          <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span className="text-sm">Tersedia di {product.branch}</span>
        </div>
        <h3 className="text-gray-900 mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
        <div className="text-amber-600 mb-4">{formatPrice(product.price)}</div>
        <div className="flex gap-2">
          <button
            onClick={() => onViewDetails(product)}
            className="flex-1 border-2 border-amber-600 text-amber-600 px-4 py-2 rounded-lg hover:bg-amber-50 transition-colors"
          >
            Detail
          </button>
          <button
            onClick={() => onAddToCart(product)}
            disabled={product.stock === 0}
            className="flex-1 bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ShoppingCart className="w-4 h-4" />
            Tambah
          </button>
        </div>
      </div>
    </div>
  );
}
