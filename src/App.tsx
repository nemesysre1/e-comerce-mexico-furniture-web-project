import { useState } from "react";
import { CartProvider } from "./contexts/CartContext";
import { PaymentProvider } from "./contexts/PaymentContext";
import { ProductProvider } from "./contexts/ProductContext";
import { BranchProvider } from "./contexts/BranchContext";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Services } from "./components/Services";
import { Products } from "./components/Products";
import { Gallery } from "./components/Gallery";
import { Branches } from "./components/Branches";
import { Footer } from "./components/Footer";
import { ShoppingCart } from "./components/ShoppingCart";
import { Checkout } from "./components/Checkout";
import { DashboardAdmin } from "./components/DashboardAdminNew";
import { Login } from "./components/Login";
import { OrderHistory } from "./components/OrderHistory";

function AppContent() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleLoginSuccess = () => {
    setIsLoginOpen(false);
    setIsDashboardOpen(true);
  };

  const handleDashboardOpen = () => {
    if (isAuthenticated) {
      setIsDashboardOpen(true);
    } else {
      setIsLoginOpen(true);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar 
        onCartOpen={() => setIsCartOpen(true)} 
        onDashboardOpen={handleDashboardOpen}
        onHistoryOpen={() => setIsHistoryOpen(true)}
        onLoginOpen={() => setIsLoginOpen(true)}
      />
      <Hero />
      <Services />
      <Products />
      <Gallery />
      <Branches />
      <Footer />
      
      <ShoppingCart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={handleCheckout}
      />
      
      <Checkout
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />
      
      <DashboardAdmin
        isOpen={isDashboardOpen}
        onClose={() => setIsDashboardOpen(false)}
      />
      
      <Login
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSuccess={handleLoginSuccess}
      />
      
      <OrderHistory
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BranchProvider>
        <ProductProvider>
          <CartProvider>
            <PaymentProvider>
              <AppContent />
            </PaymentProvider>
          </CartProvider>
        </ProductProvider>
      </BranchProvider>
    </AuthProvider>
  );
}