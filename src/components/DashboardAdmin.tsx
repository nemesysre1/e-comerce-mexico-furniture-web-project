import { useState, useEffect } from "react";
import { X, Plus, Edit2, Trash2, Save, Check, Package, Clock, XCircle, Image as ImageIcon } from "lucide-react";
import { usePayment, PaymentMethod } from "../contexts/PaymentContext";
import { useAuth } from "../contexts/AuthContext";

interface Order {
  id: string;
  date: string;
  customer: any;
  items: any[];
  total: number;
  paymentMethod: any;
  paymentProof: string;
  status: "pending" | "processing" | "completed" | "cancelled";
  branch: string;
}

interface DashboardAdminProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DashboardAdmin({ isOpen, onClose }: DashboardAdminProps) {
  const { paymentMethods, updatePaymentMethod, deletePaymentMethod, addPaymentMethod } = usePayment();
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState<"orders" | "payments">("orders");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<PaymentMethod | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState<string>("Semua");
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedProof, setSelectedProof] = useState<string | null>(null);
  const [newMethod, setNewMethod] = useState<Partial<PaymentMethod>>({
    type: "bank",
    name: "",
    accountNumber: "",
    accountName: "",
    isActive: true,
    branch: "Medan",
  });

  const branches = ["Semua", "Medan", "Batam", "Balige", "Samosir"];

  useEffect(() => {
    const loadOrders = () => {
      const savedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
      setOrders(savedOrders);
    };

    if (isOpen) {
      loadOrders();
    }
  }, [isOpen]);

  const handleEdit = (method: PaymentMethod) => {
    setEditingId(method.id);
    setEditForm({ ...method });
  };

  const handleSave = () => {
    if (editForm) {
      updatePaymentMethod(editForm);
      setEditingId(null);
      setEditForm(null);
    }
  };

  const handleAdd = () => {
    if (newMethod.name && newMethod.branch && (newMethod.accountNumber || newMethod.qrCodeUrl)) {
      addPaymentMethod({
        id: `${newMethod.branch?.toLowerCase()}-${Date.now()}`,
        ...newMethod,
      } as PaymentMethod);
      setNewMethod({
        type: "bank",
        name: "",
        accountNumber: "",
        accountName: "",
        isActive: true,
        branch: "Medan",
      });
      setShowAddForm(false);
    }
  };

  const handleStatusChange = (orderId: string, newStatus: Order["status"]) => {
    const updatedOrders = orders.map((order) =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  };

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
        return { icon: <Clock className="w-4 h-4" />, text: "Menunggu", className: "bg-yellow-100 text-yellow-700" };
      case "processing":
        return { icon: <Package className="w-4 h-4" />, text: "Diproses", className: "bg-blue-100 text-blue-700" };
      case "completed":
        return { icon: <Check className="w-4 h-4" />, text: "Selesai", className: "bg-green-100 text-green-700" };
      case "cancelled":
        return { icon: <XCircle className="w-4 h-4" />, text: "Dibatalkan", className: "bg-red-100 text-red-700" };
      default:
        return { icon: <Clock className="w-4 h-4" />, text: status, className: "bg-gray-100 text-gray-700" };
    }
  };

  const filteredPayments = selectedBranch === "Semua"
    ? paymentMethods
    : paymentMethods.filter((m) => m.branch === selectedBranch);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-20 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
          <h2 className="text-gray-900">Dashboard Admin</h2>
          <div className="flex items-center gap-3">
            <button
              onClick={logout}
              className="text-red-600 hover:text-red-700 text-sm"
            >
              Logout
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 px-6">
          <div className="flex gap-6">
            <button
              onClick={() => setActiveTab("orders")}
              className={`py-4 border-b-2 transition-colors ${
                activeTab === "orders"
                  ? "border-amber-600 text-amber-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              Kelola Pesanan
            </button>
            <button
              onClick={() => setActiveTab("payments")}
              className={`py-4 border-b-2 transition-colors ${
                activeTab === "payments"
                  ? "border-amber-600 text-amber-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              Metode Pembayaran
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Orders Tab */}
          {activeTab === "orders" && (
            <div className="space-y-4">
              <h3 className="text-gray-900">Manajemen Pesanan</h3>
              {orders.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <Package className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p>Belum ada pesanan</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {orders
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
                              <div className="flex items-center gap-2 mb-1">
                                <p className="text-gray-900">Order #{order.id}</p>
                                <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded">
                                  {order.branch}
                                </span>
                              </div>
                              <p className="text-gray-500 text-sm">
                                {new Date(order.date).toLocaleString("id-ID")}
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
                              <strong>Nama:</strong> {order.customer.name}
                            </p>
                            <p className="text-gray-700 text-sm">
                              <strong>Telepon:</strong> {order.customer.phone}
                            </p>
                            <p className="text-gray-700 text-sm">
                              <strong>Item:</strong>{" "}
                              {order.items.map((item) => item.name).join(", ")}
                            </p>
                            <p className="text-gray-700 text-sm">
                              <strong>Total:</strong> {formatPrice(order.total)}
                            </p>
                            {order.paymentMethod && (
                              <p className="text-gray-700 text-sm">
                                <strong>Pembayaran:</strong>{" "}
                                {order.paymentMethod.name}
                              </p>
                            )}
                          </div>

                          {order.paymentProof && (
                            <div className="mb-3">
                              <button
                                onClick={() => setSelectedProof(order.paymentProof)}
                                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm"
                              >
                                <ImageIcon className="w-4 h-4" />
                                Lihat Bukti Transfer
                              </button>
                            </div>
                          )}

                          <div className="flex gap-2">
                            <select
                              value={order.status}
                              onChange={(e) =>
                                handleStatusChange(
                                  order.id,
                                  e.target.value as Order["status"]
                                )
                              }
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                            >
                              <option value="pending">Menunggu Verifikasi</option>
                              <option value="processing">Sedang Diproses</option>
                              <option value="completed">Selesai</option>
                              <option value="cancelled">Dibatalkan</option>
                            </select>
                          </div>
                        </div>
                      );
                    })}
                </div>
              )}
            </div>
          )}

          {/* Payments Tab */}
          {activeTab === "payments" && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-gray-900">Metode Pembayaran per Cabang</h3>
                <button
                  onClick={() => setShowAddForm(true)}
                  className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Tambah Metode
                </button>
              </div>

              {/* Branch Filter */}
              <div className="flex flex-wrap gap-2 mb-6">
                {branches.map((branch) => (
                  <button
                    key={branch}
                    onClick={() => setSelectedBranch(branch)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      selectedBranch === branch
                        ? "bg-amber-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {branch}
                  </button>
                ))}
              </div>

              {/* Add Form */}
              {showAddForm && (
                <div className="bg-gray-50 rounded-xl p-4 mb-4 space-y-3">
                  <h4 className="text-gray-900">Tambah Metode Pembayaran Baru</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-gray-700 mb-1 text-sm">
                        Cabang *
                      </label>
                      <select
                        value={newMethod.branch}
                        onChange={(e) =>
                          setNewMethod({ ...newMethod, branch: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      >
                        <option value="Medan">Medan</option>
                        <option value="Batam">Batam</option>
                        <option value="Balige">Balige</option>
                        <option value="Samosir">Samosir</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-1 text-sm">Tipe</label>
                      <select
                        value={newMethod.type}
                        onChange={(e) =>
                          setNewMethod({ ...newMethod, type: e.target.value as any })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      >
                        <option value="bank">Bank</option>
                        <option value="dana">DANA</option>
                        <option value="ovo">OVO</option>
                        <option value="qr">QR Code</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-1 text-sm">Nama *</label>
                      <input
                        type="text"
                        value={newMethod.name}
                        onChange={(e) =>
                          setNewMethod({ ...newMethod, name: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    {newMethod.type !== "qr" ? (
                      <>
                        <div>
                          <label className="block text-gray-700 mb-1 text-sm">
                            Nomor Rekening/HP *
                          </label>
                          <input
                            type="text"
                            value={newMethod.accountNumber}
                            onChange={(e) =>
                              setNewMethod({
                                ...newMethod,
                                accountNumber: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-700 mb-1 text-sm">
                            Atas Nama *
                          </label>
                          <input
                            type="text"
                            value={newMethod.accountName}
                            onChange={(e) =>
                              setNewMethod({
                                ...newMethod,
                                accountName: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                          />
                        </div>
                      </>
                    ) : (
                      <div className="col-span-2">
                        <label className="block text-gray-700 mb-1 text-sm">
                          URL QR Code *
                        </label>
                        <input
                          type="text"
                          value={newMethod.qrCodeUrl}
                          onChange={(e) =>
                            setNewMethod({ ...newMethod, qrCodeUrl: e.target.value })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleAdd}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                    >
                      Simpan
                    </button>
                    <button
                      onClick={() => setShowAddForm(false)}
                      className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50"
                    >
                      Batal
                    </button>
                  </div>
                </div>
              )}

              {/* Payment Methods List */}
              <div className="space-y-3">
                {filteredPayments.map((method) => (
                  <div
                    key={method.id}
                    className="border border-gray-200 rounded-xl p-4"
                  >
                    {editingId === method.id && editForm ? (
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-gray-700 mb-1 text-sm">
                              Nama
                            </label>
                            <input
                              type="text"
                              value={editForm.name}
                              onChange={(e) =>
                                setEditForm({ ...editForm, name: e.target.value })
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            />
                          </div>
                          {method.type !== "qr" && (
                            <>
                              <div>
                                <label className="block text-gray-700 mb-1 text-sm">
                                  Nomor Rekening/HP
                                </label>
                                <input
                                  type="text"
                                  value={editForm.accountNumber}
                                  onChange={(e) =>
                                    setEditForm({
                                      ...editForm,
                                      accountNumber: e.target.value,
                                    })
                                  }
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                />
                              </div>
                              <div>
                                <label className="block text-gray-700 mb-1 text-sm">
                                  Atas Nama
                                </label>
                                <input
                                  type="text"
                                  value={editForm.accountName}
                                  onChange={(e) =>
                                    setEditForm({
                                      ...editForm,
                                      accountName: e.target.value,
                                    })
                                  }
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                />
                              </div>
                            </>
                          )}
                          <div>
                            <label className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={editForm.isActive}
                                onChange={(e) =>
                                  setEditForm({
                                    ...editForm,
                                    isActive: e.target.checked,
                                  })
                                }
                                className="rounded"
                              />
                              <span className="text-gray-700">Aktif</span>
                            </label>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={handleSave}
                            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
                          >
                            <Save className="w-4 h-4" />
                            Simpan
                          </button>
                          <button
                            onClick={() => {
                              setEditingId(null);
                              setEditForm(null);
                            }}
                            className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50"
                          >
                            Batal
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-gray-900">{method.name}</span>
                            <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded">
                              {method.branch}
                            </span>
                            <span
                              className={`px-2 py-0.5 rounded text-xs ${
                                method.isActive
                                  ? "bg-green-100 text-green-700"
                                  : "bg-gray-100 text-gray-600"
                              }`}
                            >
                              {method.isActive ? "Aktif" : "Nonaktif"}
                            </span>
                          </div>
                          {method.accountNumber && (
                            <p className="text-gray-600 text-sm">
                              {method.accountNumber} - {method.accountName}
                            </p>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(method)}
                            className="text-blue-600 hover:text-blue-700"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deletePaymentMethod(method.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Payment Proof Modal */}
      {selectedProof && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 z-[60] flex items-center justify-center p-4"
          onClick={() => setSelectedProof(null)}
        >
          <div className="relative max-w-3xl">
            <button
              onClick={() => setSelectedProof(null)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300"
            >
              <X className="w-8 h-8" />
            </button>
            <img
              src={selectedProof}
              alt="Payment Proof"
              className="max-w-full max-h-[80vh] rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
}