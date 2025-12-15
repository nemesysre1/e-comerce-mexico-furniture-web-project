import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface PaymentMethod {
  id: string;
  type: "qr" | "dana" | "ovo" | "bank";
  name: string;
  accountNumber?: string;
  accountName?: string;
  qrCodeUrl?: string;
  isActive: boolean;
  branch: string; // Added branch field
}

interface PaymentContextType {
  paymentMethods: PaymentMethod[];
  updatePaymentMethod: (method: PaymentMethod) => void;
  deletePaymentMethod: (id: string) => void;
  addPaymentMethod: (method: PaymentMethod) => void;
  getPaymentMethodsByBranch: (branch: string) => PaymentMethod[];
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

const defaultPaymentMethods: PaymentMethod[] = [
  // Medan
  {
    id: "medan-1",
    type: "qr",
    name: "QRIS UD.Mexico Medan",
    qrCodeUrl: "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=UDMEXICO-MEDAN-PAYMENT",
    isActive: true,
    branch: "Medan",
  },
  {
    id: "medan-2",
    type: "dana",
    name: "DANA Medan",
    accountNumber: "0812-3456-7890",
    accountName: "UD Mexico Medan",
    isActive: true,
    branch: "Medan",
  },
  {
    id: "medan-3",
    type: "ovo",
    name: "OVO Medan",
    accountNumber: "0812-3456-7890",
    accountName: "UD Mexico Medan",
    isActive: true,
    branch: "Medan",
  },
  {
    id: "medan-4",
    type: "bank",
    name: "Bank Mandiri Medan",
    accountNumber: "1234567890",
    accountName: "UD Mexico Medan",
    isActive: true,
    branch: "Medan",
  },
  // Batam
  {
    id: "batam-1",
    type: "qr",
    name: "QRIS UD.Mexico Batam",
    qrCodeUrl: "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=UDMEXICO-BATAM-PAYMENT",
    isActive: true,
    branch: "Batam",
  },
  {
    id: "batam-2",
    type: "dana",
    name: "DANA Batam",
    accountNumber: "0813-4567-8901",
    accountName: "UD Mexico Batam",
    isActive: true,
    branch: "Batam",
  },
  {
    id: "batam-3",
    type: "ovo",
    name: "OVO Batam",
    accountNumber: "0813-4567-8901",
    accountName: "UD Mexico Batam",
    isActive: true,
    branch: "Batam",
  },
  {
    id: "batam-4",
    type: "bank",
    name: "Bank BCA Batam",
    accountNumber: "2345678901",
    accountName: "UD Mexico Batam",
    isActive: true,
    branch: "Batam",
  },
  // Balige
  {
    id: "balige-1",
    type: "qr",
    name: "QRIS UD.Mexico Balige",
    qrCodeUrl: "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=UDMEXICO-BALIGE-PAYMENT",
    isActive: true,
    branch: "Balige",
  },
  {
    id: "balige-2",
    type: "dana",
    name: "DANA Balige",
    accountNumber: "0814-5678-9012",
    accountName: "UD Mexico Balige",
    isActive: true,
    branch: "Balige",
  },
  {
    id: "balige-3",
    type: "ovo",
    name: "OVO Balige",
    accountNumber: "0814-5678-9012",
    accountName: "UD Mexico Balige",
    isActive: true,
    branch: "Balige",
  },
  {
    id: "balige-4",
    type: "bank",
    name: "Bank BRI Balige",
    accountNumber: "3456789012",
    accountName: "UD Mexico Balige",
    isActive: true,
    branch: "Balige",
  },
  // Samosir
  {
    id: "samosir-1",
    type: "qr",
    name: "QRIS UD.Mexico Samosir",
    qrCodeUrl: "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=UDMEXICO-SAMOSIR-PAYMENT",
    isActive: true,
    branch: "Samosir",
  },
  {
    id: "samosir-2",
    type: "dana",
    name: "DANA Samosir",
    accountNumber: "0815-6789-0123",
    accountName: "UD Mexico Samosir",
    isActive: true,
    branch: "Samosir",
  },
  {
    id: "samosir-3",
    type: "ovo",
    name: "OVO Samosir",
    accountNumber: "0815-6789-0123",
    accountName: "UD Mexico Samosir",
    isActive: true,
    branch: "Samosir",
  },
  {
    id: "samosir-4",
    type: "bank",
    name: "Bank BNI Samosir",
    accountNumber: "4567890123",
    accountName: "UD Mexico Samosir",
    isActive: true,
    branch: "Samosir",
  },
];

export function PaymentProvider({ children }: { children: ReactNode }) {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(() => {
    const saved = localStorage.getItem("paymentMethods");
    return saved ? JSON.parse(saved) : defaultPaymentMethods;
  });

  useEffect(() => {
    localStorage.setItem("paymentMethods", JSON.stringify(paymentMethods));
  }, [paymentMethods]);

  const updatePaymentMethod = (method: PaymentMethod) => {
    setPaymentMethods((prev) =>
      prev.map((m) => (m.id === method.id ? method : m))
    );
  };

  const deletePaymentMethod = (id: string) => {
    setPaymentMethods((prev) => prev.filter((m) => m.id !== id));
  };

  const addPaymentMethod = (method: PaymentMethod) => {
    setPaymentMethods((prev) => [...prev, method]);
  };

  const getPaymentMethodsByBranch = (branch: string) => {
    return paymentMethods.filter((m) => m.branch === branch && m.isActive);
  };

  return (
    <PaymentContext.Provider
      value={{
        paymentMethods,
        updatePaymentMethod,
        deletePaymentMethod,
        addPaymentMethod,
        getPaymentMethodsByBranch,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
}

export function usePayment() {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error("usePayment must be used within PaymentProvider");
  }
  return context;
}