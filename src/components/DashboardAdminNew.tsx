import { useState, useEffect, useRef } from "react";
import { X, Plus, Edit2, Trash2, Save, Check, Package, Clock, XCircle, Image as ImageIcon, Box, Upload, MapPin } from "lucide-react";
import { usePayment, PaymentMethod } from "../contexts/PaymentContext";
import { useProducts } from "../contexts/ProductContext";
import { useBranches, Branch } from "../contexts/BranchContext";
import { useAuth } from "../contexts/AuthContext";
import { Product } from "../contexts/CartContext";

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
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const { branches, addBranch, updateBranch, deleteBranch } = useBranches();
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState<"orders" | "payments" | "products" | "branches">("orders");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<PaymentMethod | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState<string>("Semua");
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedProof, setSelectedProof] = useState<string | null>(null);
  
  // Product management states
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [editProductForm, setEditProductForm] = useState<Product | null>(null);
  const [showAddProductForm, setShowAddProductForm] = useState(false);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: "",
    description: "",
    price: 0,
    image: "",
    category: "Sofa",
    stock: 0,
    branch: "Medan",
    branchPhone: "+6281234567890",
    details: "",
  });
  
  // Branch management states
  const [editingBranchId, setEditingBranchId] = useState<string | null>(null);
  const [editBranchForm, setEditBranchForm] = useState<Branch | null>(null);
  const [showAddBranchForm, setShowAddBranchForm] = useState(false);
  const [newBranch, setNewBranch] = useState<Partial<Branch>>({
    city: "",
    address: "",
    phone: "",
    email: "",
    hours: "Senin - Sabtu: 08:00 - 17:00",
    mapUrl: "",
  });
  
  const [newMethod, setNewMethod] = useState<Partial<PaymentMethod>>({
    type: "bank",
    name: "",
    accountNumber: "",
    accountName: "",
    isActive: true,
    branch: "Medan",
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const editFileInputRef = useRef<HTMLInputElement>(null);

  const branchesFilter = ["Semua", "Medan", "Batam", "Balige", "Samosir"];
  const categories = ["Sofa", "Kursi", "SpringBed", "Lainnya"];

  useEffect(() => {
    const loadOrders = () => {
      const savedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
      setOrders(savedOrders);
    };

    if (isOpen) {
      loadOrders();
    }
  }, [isOpen]);

  // Image upload handler
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, isEdit: boolean = false) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        if (isEdit && editProductForm) {
          setEditProductForm({ ...editProductForm, image: base64String });
        } else {
          setNewProduct({ ...newProduct, image: base64String });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Payment methods handlers
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

  // Product handlers
  const handleEditProduct = (product: Product) => {
    setEditingProductId(product.id);
    setEditProductForm({ ...product });
  };

  const handleSaveProduct = () => {
    if (editProductForm) {
      updateProduct(editProductForm);
      setEditingProductId(null);
      setEditProductForm(null);
    }
  };

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.price && newProduct.image) {
      addProduct({
        id: Date.now().toString(),
        ...newProduct,
      } as Product);
      setNewProduct({
        name: "",
        description: "",
        price: 0,
        image: "",
        category: "Sofa",
        stock: 0,
        branch: "Medan",
        branchPhone: "+6281234567890",
        details: "",
      });
      setShowAddProductForm(false);
    }
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus produk ini?")) {
      deleteProduct(id);
    }
  };

  // Branch handlers
  const handleEditBranch = (branch: Branch) => {
    setEditingBranchId(branch.id);
    setEditBranchForm({ ...branch });
  };

  const handleSaveBranch = () => {
    if (editBranchForm) {
      updateBranch(editBranchForm);
      setEditingBranchId(null);
      setEditBranchForm(null);
    }
  };

  const handleAddBranch = () => {
    if (newBranch.city && newBranch.address && newBranch.phone && newBranch.email && newBranch.mapUrl) {
      addBranch({
        id: newBranch.city?.toLowerCase() || Date.now().toString(),
        ...newBranch,
      } as Branch);
      setNewBranch({
        city: "",
        address: "",
        phone: "",
        email: "",
        hours: "Senin - Sabtu: 08:00 - 17:00",
        mapUrl: "",
      });
      setShowAddBranchForm(false);
    }
  };

  const handleDeleteBranch = (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus cabang ini?")) {
      deleteBranch(id);
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

  const filteredProducts = selectedBranch === "Semua"
    ? products
    : products.filter((p) => p.branch === selectedBranch);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-20 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center z-10">
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
        <div className="border-b border-gray-200 px-6 sticky top-[73px] bg-white z-10">
          <div className="flex gap-6 overflow-x-auto">
            <button
              onClick={() => setActiveTab("orders")}
              className={`py-4 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === "orders"
                  ? "border-amber-600 text-amber-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              Kelola Pesanan
            </button>
            <button
              onClick={() => setActiveTab("products")}
              className={`py-4 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === "products"
                  ? "border-amber-600 text-amber-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              Kelola Produk
            </button>
            <button
              onClick={() => setActiveTab("branches")}
              className={`py-4 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === "branches"
                  ? "border-amber-600 text-amber-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              Kelola Cabang
            </button>
            <button
              onClick={() => setActiveTab("payments")}
              className={`py-4 border-b-2 transition-colors whitespace-nowrap ${
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

          {/* Products Tab */}
          {activeTab === "products" && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-gray-900">Kelola Produk</h3>
                <button
                  onClick={() => setShowAddProductForm(true)}
                  className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Tambah Produk
                </button>
              </div>

              {/* Branch Filter */}
              <div className="flex flex-wrap gap-2 mb-6">
                {branchesFilter.map((branch) => (
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

              {/* Add Product Form */}
              {showAddProductForm && (
                <div className="bg-gray-50 rounded-xl p-4 mb-4 space-y-3 max-h-[60vh] overflow-y-auto">
                  <h4 className="text-gray-900">Tambah Produk Baru</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-gray-700 mb-1 text-sm">Nama Produk *</label>
                      <input
                        type="text"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-1 text-sm">Kategori *</label>
                      <select
                        value={newProduct.category}
                        onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      >
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-1 text-sm">Harga (Rp) *</label>
                      <input
                        type="number"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-1 text-sm">Stok *</label>
                      <input
                        type="number"
                        value={newProduct.stock}
                        onChange={(e) => setNewProduct({ ...newProduct, stock: Number(e.target.value) })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-1 text-sm">Cabang *</label>
                      <select
                        value={newProduct.branch}
                        onChange={(e) => setNewProduct({ ...newProduct, branch: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      >
                        <option value="Medan">Medan</option>
                        <option value="Batam">Batam</option>
                        <option value="Balige">Balige</option>
                        <option value="Samosir">Samosir</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-1 text-sm">Telepon Cabang *</label>
                      <input
                        type="text"
                        value={newProduct.branchPhone}
                        onChange={(e) => setNewProduct({ ...newProduct, branchPhone: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-gray-700 mb-1 text-sm">Upload Gambar *</label>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, false)}
                        className="hidden"
                      />
                      <div className="flex gap-2 items-center">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                          <Upload className="w-4 h-4" />
                          Pilih Gambar
                        </button>
                        {newProduct.image && (
                          <div className="flex items-center gap-2">
                            <img src={newProduct.image} alt="Preview" className="w-16 h-16 object-cover rounded" />
                            <span className="text-green-600 text-sm">✓ Gambar dipilih</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-span-2">
                      <label className="block text-gray-700 mb-1 text-sm">Deskripsi Singkat *</label>
                      <textarea
                        value={newProduct.description}
                        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        rows={2}
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-gray-700 mb-1 text-sm">Detail Lengkap *</label>
                      <textarea
                        value={newProduct.details}
                        onChange={(e) => setNewProduct({ ...newProduct, details: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        rows={3}
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleAddProduct}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                    >
                      Simpan
                    </button>
                    <button
                      onClick={() => setShowAddProductForm(false)}
                      className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50"
                    >
                      Batal
                    </button>
                  </div>
                </div>
              )}

              {/* Products List */}
              <div className="space-y-3">
                {filteredProducts.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <Box className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                    <p>Belum ada produk</p>
                  </div>
                ) : (
                  filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      className="border border-gray-200 rounded-xl p-4"
                    >
                      {editingProductId === product.id && editProductForm ? (
                        <div className="space-y-3 max-h-[50vh] overflow-y-auto">
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-gray-700 mb-1 text-sm">Nama</label>
                              <input
                                type="text"
                                value={editProductForm.name}
                                onChange={(e) => setEditProductForm({ ...editProductForm, name: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                              />
                            </div>
                            <div>
                              <label className="block text-gray-700 mb-1 text-sm">Kategori</label>
                              <select
                                value={editProductForm.category}
                                onChange={(e) => setEditProductForm({ ...editProductForm, category: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                              >
                                {categories.map((cat) => (
                                  <option key={cat} value={cat}>{cat}</option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <label className="block text-gray-700 mb-1 text-sm">Harga</label>
                              <input
                                type="number"
                                value={editProductForm.price}
                                onChange={(e) => setEditProductForm({ ...editProductForm, price: Number(e.target.value) })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                              />
                            </div>
                            <div>
                              <label className="block text-gray-700 mb-1 text-sm">Stok</label>
                              <input
                                type="number"
                                value={editProductForm.stock}
                                onChange={(e) => setEditProductForm({ ...editProductForm, stock: Number(e.target.value) })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                              />
                            </div>
                            <div className="col-span-2">
                              <label className="block text-gray-700 mb-1 text-sm">Gambar Produk</label>
                              <input
                                ref={editFileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageUpload(e, true)}
                                className="hidden"
                              />
                              <div className="flex gap-2 items-center">
                                <button
                                  type="button"
                                  onClick={() => editFileInputRef.current?.click()}
                                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                                >
                                  <Upload className="w-4 h-4" />
                                  Ganti Gambar
                                </button>
                                {editProductForm.image && (
                                  <img src={editProductForm.image} alt="Preview" className="w-16 h-16 object-cover rounded" />
                                )}
                              </div>
                            </div>
                            <div className="col-span-2">
                              <label className="block text-gray-700 mb-1 text-sm">Deskripsi</label>
                              <textarea
                                value={editProductForm.description}
                                onChange={(e) => setEditProductForm({ ...editProductForm, description: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                rows={2}
                              />
                            </div>
                            <div className="col-span-2">
                              <label className="block text-gray-700 mb-1 text-sm">Detail</label>
                              <textarea
                                value={editProductForm.details}
                                onChange={(e) => setEditProductForm({ ...editProductForm, details: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                rows={3}
                              />
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={handleSaveProduct}
                              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
                            >
                              <Save className="w-4 h-4" />
                              Simpan
                            </button>
                            <button
                              onClick={() => {
                                setEditingProductId(null);
                                setEditProductForm(null);
                              }}
                              className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50"
                            >
                              Batal
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex gap-4">
                          <img src={product.image} alt={product.name} className="w-24 h-24 object-cover rounded-lg" />
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h4 className="text-gray-900">{product.name}</h4>
                                <div className="flex items-center gap-2 mt-1">
                                  <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded">
                                    {product.branch}
                                  </span>
                                  <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded">
                                    {product.category}
                                  </span>
                                  <span className="text-gray-500 text-sm">Stok: {product.stock}</span>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <button
                                  onClick={() => handleEditProduct(product)}
                                  className="text-blue-600 hover:text-blue-700"
                                >
                                  <Edit2 className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteProduct(product.id)}
                                  className="text-red-600 hover:text-red-700"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                            <p className="text-gray-600 text-sm mb-2">{product.description}</p>
                            <p className="text-amber-600">{formatPrice(product.price)}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Branches Tab */}
          {activeTab === "branches" && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-gray-900">Kelola Cabang</h3>
                <button
                  onClick={() => setShowAddBranchForm(true)}
                  className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Tambah Cabang
                </button>
              </div>

              {/* Add Branch Form */}
              {showAddBranchForm && (
                <div className="bg-gray-50 rounded-xl p-4 mb-4 space-y-3 max-h-[60vh] overflow-y-auto">
                  <h4 className="text-gray-900">Tambah Cabang Baru</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-gray-700 mb-1 text-sm">Nama Kota *</label>
                      <input
                        type="text"
                        value={newBranch.city}
                        onChange={(e) => setNewBranch({ ...newBranch, city: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-1 text-sm">Telepon *</label>
                      <input
                        type="text"
                        value={newBranch.phone}
                        onChange={(e) => setNewBranch({ ...newBranch, phone: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        placeholder="+62 812-3456-7890"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-gray-700 mb-1 text-sm">Alamat Lengkap *</label>
                      <textarea
                        value={newBranch.address}
                        onChange={(e) => setNewBranch({ ...newBranch, address: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        rows={2}
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-1 text-sm">Email *</label>
                      <input
                        type="email"
                        value={newBranch.email}
                        onChange={(e) => setNewBranch({ ...newBranch, email: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        placeholder="cabang@udmexico.com"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-1 text-sm">Jam Operasi *</label>
                      <input
                        type="text"
                        value={newBranch.hours}
                        onChange={(e) => setNewBranch({ ...newBranch, hours: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-gray-700 mb-1 text-sm">URL Google Maps Embed *</label>
                      <textarea
                        value={newBranch.mapUrl}
                        onChange={(e) => setNewBranch({ ...newBranch, mapUrl: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        rows={3}
                        placeholder="https://www.google.com/maps/embed?pb=..."
                      />
                      <p className="text-gray-500 text-xs mt-1">
                        Cara mendapatkan: Buka Google Maps → Cari lokasi → Klik Share → Embed a map → Salin iframe src URL
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleAddBranch}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                    >
                      Simpan
                    </button>
                    <button
                      onClick={() => setShowAddBranchForm(false)}
                      className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50"
                    >
                      Batal
                    </button>
                  </div>
                </div>
              )}

              {/* Branches List */}
              <div className="space-y-3">
                {branches.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <MapPin className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                    <p>Belum ada cabang</p>
                  </div>
                ) : (
                  branches.map((branch) => (
                    <div
                      key={branch.id}
                      className="border border-gray-200 rounded-xl p-4"
                    >
                      {editingBranchId === branch.id && editBranchForm ? (
                        <div className="space-y-3 max-h-[50vh] overflow-y-auto">
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-gray-700 mb-1 text-sm">Nama Kota</label>
                              <input
                                type="text"
                                value={editBranchForm.city}
                                onChange={(e) => setEditBranchForm({ ...editBranchForm, city: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                              />
                            </div>
                            <div>
                              <label className="block text-gray-700 mb-1 text-sm">Telepon</label>
                              <input
                                type="text"
                                value={editBranchForm.phone}
                                onChange={(e) => setEditBranchForm({ ...editBranchForm, phone: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                              />
                            </div>
                            <div className="col-span-2">
                              <label className="block text-gray-700 mb-1 text-sm">Alamat</label>
                              <textarea
                                value={editBranchForm.address}
                                onChange={(e) => setEditBranchForm({ ...editBranchForm, address: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                rows={2}
                              />
                            </div>
                            <div>
                              <label className="block text-gray-700 mb-1 text-sm">Email</label>
                              <input
                                type="email"
                                value={editBranchForm.email}
                                onChange={(e) => setEditBranchForm({ ...editBranchForm, email: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                              />
                            </div>
                            <div>
                              <label className="block text-gray-700 mb-1 text-sm">Jam Operasi</label>
                              <input
                                type="text"
                                value={editBranchForm.hours}
                                onChange={(e) => setEditBranchForm({ ...editBranchForm, hours: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                              />
                            </div>
                            <div className="col-span-2">
                              <label className="block text-gray-700 mb-1 text-sm">URL Google Maps</label>
                              <textarea
                                value={editBranchForm.mapUrl}
                                onChange={(e) => setEditBranchForm({ ...editBranchForm, mapUrl: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                rows={2}
                              />
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={handleSaveBranch}
                              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
                            >
                              <Save className="w-4 h-4" />
                              Simpan
                            </button>
                            <button
                              onClick={() => {
                                setEditingBranchId(null);
                                setEditBranchForm(null);
                              }}
                              className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50"
                            >
                              Batal
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h4 className="text-gray-900 mb-3">{branch.city}</h4>
                            <div className="space-y-2 text-sm text-gray-600">
                              <p><strong>Alamat:</strong> {branch.address}</p>
                              <p><strong>Telepon:</strong> {branch.phone}</p>
                              <p><strong>Email:</strong> {branch.email}</p>
                              <p><strong>Jam Operasi:</strong> {branch.hours}</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEditBranch(branch)}
                              className="text-blue-600 hover:text-blue-700"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteBranch(branch.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
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
                {branchesFilter.map((branch) => (
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
