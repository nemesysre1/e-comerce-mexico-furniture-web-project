import { X, MapPin, Phone, ShoppingCart } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Product } from "../contexts/CartContext";

interface ProductDetailProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export function ProductDetail({ product, onClose, onAddToCart }: ProductDetailProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleContactBranch = () => {
    const message = `Halo, saya tertarik dengan ${product.name}. Apakah masih tersedia?`;
    window.open(
      `https://wa.me/${product.branchPhone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-20 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
          <h2 className="text-gray-900">Detail Produk</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Image */}
            <div className="rounded-xl overflow-hidden">
              <ImageWithFallback
                src={product.image}
                alt={product.name}
                className="w-full h-96 object-cover"
              />
            </div>

            {/* Info */}
            <div className="space-y-6">
              <div>
                <div className="inline-block px-3 py-1 bg-amber-100 text-amber-800 rounded-full mb-3">
                  {product.category}
                </div>
                <h3 className="text-gray-900 mb-2">{product.name}</h3>
                <p className="text-gray-600">{product.description}</p>
              </div>

              <div className="text-amber-600">{formatPrice(product.price)}</div>

              {/* Branch Info */}
              <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                <h4 className="text-gray-900">Informasi Cabang</h4>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-5 h-5 text-amber-600" />
                  <span>Tersedia di cabang {product.branch}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="w-5 h-5 text-amber-600" />
                  <span>{product.branchPhone}</span>
                </div>
                <button
                  onClick={handleContactBranch}
                  className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  Hubungi Cabang via WhatsApp
                </button>
              </div>

              {/* Stock */}
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
                <span className="text-gray-700">Stok Tersedia:</span>
                <span className="text-blue-600">{product.stock} unit</span>
              </div>

              {/* Details */}
              <div>
                <h4 className="text-gray-900 mb-2">Detail Produk</h4>
                <p className="text-gray-600 leading-relaxed">{product.details}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => {
                    onAddToCart(product);
                    onClose();
                  }}
                  disabled={product.stock === 0}
                  className="flex-1 bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Tambah ke Keranjang
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}