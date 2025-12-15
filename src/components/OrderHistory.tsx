import { useState, useEffect } from "react";
import { X, Package, Clock, CheckCircle, XCircle } from "lucide-react";

interface Order {
  id: string;
  date: string;
  customer: {
    name: string;
    phone: string;
    email: string;
    address: string;
  };
  items: any[];
  total: number;
  paymentMethod: any;
  paymentProof: string;
  status: "pending" | "processing" | "completed" | "cancelled";
}

interface OrderHistoryProps {
  isOpen: boolean;
  onClose: () => void;
}

export function OrderHistory({ isOpen, onClose }: OrderHistoryProps) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    const loadOrders = () => {
      const savedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
      setOrders(savedOrders);
    };

    if (isOpen) {
      loadOrders();
    }
  }, [isOpen]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return {
          icon: <Clock className="w-4 h-4" />,
          text: "Menunggu Verifikasi",
          className: "bg-yellow-100 text-yellow-700",
        };
      case "processing":
        return {
          icon: <Package className="w-4 h-4" />,
          text: "Sedang Diproses",
          className: "bg-blue-100 text-blue-700",
        };
      case "completed":
        return {
          icon: <CheckCircle className="w-4 h-4" />,
          text: "Selesai",
          className: "bg-green-100 text-green-700",
        };
      case "cancelled":
        return {
          icon: <XCircle className="w-4 h-4" />,
          text: "Dibatalkan",
          className: "bg-red-100 text-red-700",
        };
      default:
        return {
          icon: <Clock className="w-4 h-4" />,
          text: status,
          className: "bg-gray-100 text-gray-700",
        };
    }
  };

  const filteredOrders =
    filter === "all"
      ? orders
      : orders.filter((order) => order.status === filter);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-20 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
          <h2 className="text-gray-900">Riwayat Pesanan</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === "all"
                  ? "bg-amber-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Semua
            </button>
            <button
              onClick={() => setFilter("pending")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === "pending"
                  ? "bg-amber-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Menunggu
            </button>
            <button
              onClick={() => setFilter("processing")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === "processing"
                  ? "bg-amber-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Diproses
            </button>
            <button
              onClick={() => setFilter("completed")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === "completed"
                  ? "bg-amber-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Selesai
            </button>
          </div>
        </div>

        {/* Orders List */}
        <div className="p-6 space-y-4">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Package className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p>Belum ada pesanan</p>
            </div>
          ) : (
            filteredOrders
              .slice()
              .reverse()
              .map((order) => {
                const statusBadge = getStatusBadge(order.status);
                return (
                  <div
                    key={order.id}
                    className="border border-gray-200 rounded-xl p-4"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="text-gray-900">Order #{order.id}</p>
                        <p className="text-gray-500 text-sm">
                          {new Date(order.date).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-sm flex items-center gap-1 ${statusBadge.className}`}
                      >
                        {statusBadge.icon}
                        {statusBadge.text}
                      </span>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-3 mb-3 space-y-1">
                      <p className="text-gray-700 text-sm">
                        <strong>Item:</strong>{" "}
                        {order.items.map((item) => item.name).join(", ")}
                      </p>
                      <p className="text-gray-700 text-sm">
                        <strong>Total:</strong> {formatPrice(order.total)}
                      </p>
                      {order.paymentMethod && (
                        <p className="text-gray-700 text-sm">
                          <strong>Pembayaran:</strong> {order.paymentMethod.name}
                        </p>
                      )}
                    </div>

                    {order.status === "pending" && (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-yellow-800 text-sm">
                        Pesanan Anda sedang menunggu verifikasi pembayaran. Kami
                        akan menghubungi Anda segera.
                      </div>
                    )}
                    {order.status === "processing" && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-blue-800 text-sm">
                        Pesanan Anda sedang dalam proses pengerjaan. Kami akan
                        memberikan update progress secara berkala.
                      </div>
                    )}
                    {order.status === "completed" && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-green-800 text-sm">
                        Pesanan Anda telah selesai. Terima kasih telah
                        mempercayai UD.Mexico!
                      </div>
                    )}
                  </div>
                );
              })
          )}
        </div>
      </div>
    </div>
  );
}