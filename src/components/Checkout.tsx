import { useState, useEffect } from "react";
import { X, Upload, Check } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { usePayment } from "../contexts/PaymentContext";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface CheckoutProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Checkout({ isOpen, onClose }: CheckoutProps) {
  const { cart, getTotalPrice, clearCart } = useCart();
  const { getPaymentMethodsByBranch } = usePayment();
  const [step, setStep] = useState(1);
  const [selectedPayment, setSelectedPayment] = useState("");
  const [paymentProof, setPaymentProof] = useState<string | null>(null);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  // Get branch from cart items (using the first item's branch)
  const cartBranch = cart.length > 0 ? cart[0].branch : "";
  
  // Get payment methods for the branch
  const availablePaymentMethods = getPaymentMethodsByBranch(cartBranch);

  // Reset when opening checkout
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setSelectedPayment("");
      setPaymentProof(null);
    }
  }, [isOpen]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPaymentProof(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitOrder = () => {
    // Simulate order submission
    const order = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      customer: customerInfo,
      items: cart,
      total: getTotalPrice(),
      paymentMethod: availablePaymentMethods.find((p) => p.id === selectedPayment),
      paymentProof: paymentProof,
      status: "pending",
      branch: cartBranch,
    };

    // Save to localStorage
    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));

    // Send WhatsApp notification to admin
    const message = `*PESANAN BARU #${order.id}*\n\nNama: ${customerInfo.name}\nTelepon: ${customerInfo.phone}\nCabang: ${cartBranch}\nTotal: ${formatPrice(getTotalPrice())}\n\nMohon cek dashboard untuk detail lengkap.`;
    window.open(
      `https://wa.me/6281234567890?text=${encodeURIComponent(message)}`,
      "_blank"
    );

    clearCart();
    alert("Pesanan berhasil! Kami akan menghubungi Anda segera.");
    onClose();
    setStep(1);
    setSelectedPayment("");
    setPaymentProof(null);
    setCustomerInfo({ name: "", phone: "", email: "", address: "" });
  };

  if (!isOpen) return null;

  const selectedPaymentMethod = availablePaymentMethods.find(
    (p) => p.id === selectedPayment
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-20 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
          <div>
            <h2 className="text-gray-900">Checkout</h2>
            {cartBranch && (
              <p className="text-gray-500 text-sm">Cabang: {cartBranch}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Steps Indicator */}
        <div className="px-6 pt-6">
          <div className="flex items-center justify-between mb-8">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step >= s
                      ? "bg-amber-600 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {step > s ? <Check className="w-5 h-5" /> : s}
                </div>
                {s < 3 && (
                  <div
                    className={`flex-1 h-1 mx-2 ${
                      step > s ? "bg-amber-600" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Step 1: Customer Info */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-gray-900 mb-4">Informasi Pembeli</h3>
              <div>
                <label className="block text-gray-700 mb-2">Nama Lengkap *</label>
                <input
                  type="text"
                  value={customerInfo.name}
                  onChange={(e) =>
                    setCustomerInfo({ ...customerInfo, name: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Nomor Telepon *</label>
                <input
                  type="tel"
                  value={customerInfo.phone}
                  onChange={(e) =>
                    setCustomerInfo({ ...customerInfo, phone: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={customerInfo.email}
                  onChange={(e) =>
                    setCustomerInfo({ ...customerInfo, email: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Alamat Lengkap *</label>
                <textarea
                  value={customerInfo.address}
                  onChange={(e) =>
                    setCustomerInfo({ ...customerInfo, address: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
                  rows={3}
                  required
                />
              </div>
              <button
                onClick={() => setStep(2)}
                disabled={
                  !customerInfo.name ||
                  !customerInfo.phone ||
                  !customerInfo.address
                }
                className="w-full bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Lanjutkan
              </button>
            </div>
          )}

          {/* Step 2: Payment Method */}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-gray-900 mb-4">Pilih Metode Pembayaran</h3>
              
              {availablePaymentMethods.length === 0 ? (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
                  Tidak ada metode pembayaran aktif untuk cabang {cartBranch}.
                  Silakan hubungi admin.
                </div>
              ) : (
                <>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4 text-sm text-blue-800">
                    Metode pembayaran otomatis disesuaikan dengan cabang <strong>{cartBranch}</strong>
                  </div>
                  
                  <div className="space-y-3">
                    {availablePaymentMethods.map((method) => (
                      <div
                        key={method.id}
                        onClick={() => setSelectedPayment(method.id)}
                        className={`border-2 rounded-xl p-4 cursor-pointer transition-colors ${
                          selectedPayment === method.id
                            ? "border-amber-600 bg-amber-50"
                            : "border-gray-200 hover:border-amber-300"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                              selectedPayment === method.id
                                ? "border-amber-600"
                                : "border-gray-300"
                            }`}
                          >
                            {selectedPayment === method.id && (
                              <div className="w-3 h-3 bg-amber-600 rounded-full" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="text-gray-900">{method.name}</div>
                            {method.accountNumber && (
                              <div className="text-gray-500 text-sm">
                                {method.accountNumber} - {method.accountName}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {selectedPaymentMethod && selectedPaymentMethod.type === "qr" && (
                    <div className="bg-gray-50 rounded-xl p-6 text-center">
                      <p className="text-gray-700 mb-4">Scan QR Code untuk pembayaran</p>
                      <ImageWithFallback
                        src={selectedPaymentMethod.qrCodeUrl || ""}
                        alt="QR Code"
                        className="w-64 h-64 mx-auto"
                      />
                    </div>
                  )}

                  {selectedPaymentMethod && selectedPaymentMethod.type !== "qr" && (
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                      <p className="text-amber-800 mb-2">Transfer ke:</p>
                      <p className="text-gray-900">
                        {selectedPaymentMethod.accountNumber}
                      </p>
                      <p className="text-gray-700">a.n. {selectedPaymentMethod.accountName}</p>
                      <p className="text-amber-600 mt-3">
                        Total: {formatPrice(getTotalPrice())}
                      </p>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <button
                      onClick={() => setStep(1)}
                      className="flex-1 border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Kembali
                    </button>
                    <button
                      onClick={() => setStep(3)}
                      disabled={!selectedPayment}
                      className="flex-1 bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Lanjutkan
                    </button>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Step 3: Upload Payment Proof */}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-gray-900 mb-4">Upload Bukti Transfer</h3>
              
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
                <p className="text-blue-800 mb-2">Total Pembayaran:</p>
                <p className="text-blue-600 text-2xl">{formatPrice(getTotalPrice())}</p>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
                {paymentProof ? (
                  <div>
                    <ImageWithFallback
                      src={paymentProof}
                      alt="Payment Proof"
                      className="max-w-full h-64 object-contain mx-auto mb-4"
                    />
                    <button
                      onClick={() => setPaymentProof(null)}
                      className="text-red-600 hover:text-red-700"
                    >
                      Hapus
                    </button>
                  </div>
                ) : (
                  <label className="cursor-pointer">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600 mb-1">
                      Klik untuk upload bukti transfer
                    </p>
                    <p className="text-gray-400 text-sm">
                      Format: JPG, PNG (Max 5MB)
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                <p className="text-yellow-800">
                  Pesanan Anda akan diproses setelah kami verifikasi pembayaran.
                  Kami akan menghubungi Anda via WhatsApp.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Kembali
                </button>
                <button
                  onClick={handleSubmitOrder}
                  disabled={!paymentProof}
                  className="flex-1 bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Konfirmasi Pesanan
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}