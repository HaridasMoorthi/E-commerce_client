import React from 'react';
import { ECommerceProvider, useECommerce } from './context/ECommerceContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import { LoginPage } from './pages/LoginPage';
import { ProductDetail } from './components/pdp/ProductDetail';
import { CartDrawer } from './components/cart/CartDrawer';
import { WishlistDrawer } from './components/wishlist/WishlistDrawer';
import { SearchModal } from './components/search/SearchModal';
import { CheckoutModal } from './components/checkout/CheckoutModal';
import { OrderSuccessModal } from './components/checkout/OrderSuccessModal';
import { OrderTrackingModal } from './components/tracking/OrderTrackingModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { Eye } from 'lucide-react';

const MainContent: React.FC = () => {
  const { currentView, selectedProduct } = useECommerce();

  // 1. Enterprise Admin Dashboard
  if (currentView === 'admin') {
    return <AdminDashboard />;
  }

  // 2. Dedicated Enterprise Login Page (Replaces Pop-up Modal)
  if (currentView === 'login') {
    return <LoginPage />;
  }

  return (
    <main className="min-h-screen">
      {/* 3. Homepage View */}
      {currentView === 'home' && <HomePage />}

      {/* 4. Product Listing Page (PLP) */}
      {currentView === 'plp' && <CatalogPage />}

      {/* 5. Product Detail Page (PDP) */}
      {currentView === 'pdp' && selectedProduct && (
        <ProductDetail product={selectedProduct} />
      )}
    </main>
  );
};

const AppShell: React.FC = () => {
  const { currentView, goHome } = useECommerce();

  // Admin and Login portals render as dedicated standalone full pages (no customer header/footer)
  const isStandalonePage = currentView === 'admin' || currentView === 'login';

  return (
    <div className="flex flex-col min-h-screen bg-[#fafafa]">
      {!isStandalonePage && <Header />}
      <MainContent />
      {!isStandalonePage && <Footer />}

      {/* Floating Quick-Switch Pill: Only visible when inside Admin to return to Storefront */}
      {currentView === 'admin' && (
        <div className="fixed bottom-5 right-5 z-40">
          <button
            onClick={goHome}
            className="bg-gray-900 hover:bg-black text-white text-xs font-bold px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-2 border border-gray-700 transition-all hover:scale-105 cursor-pointer"
          >
            <Eye className="w-4 h-4 text-emerald-400" />
            <span>View Live Storefront</span>
          </button>
        </div>
      )}

      {/* Global Shopping Overlays (Cart, Wishlist, Search, Checkout, Tracking) */}
      <CartDrawer />
      <WishlistDrawer />
      <SearchModal />
      <CheckoutModal />
      <OrderSuccessModal />
      <OrderTrackingModal />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ECommerceProvider>
      <AppShell />
    </ECommerceProvider>
  );
};

export default App;
