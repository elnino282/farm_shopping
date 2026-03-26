import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

// Layouts
import { PublicLayout } from '../components/layout/PublicLayout';
import { DashboardLayout } from '../components/layout/DashboardLayout';

// Public Pages
import { Home } from '../pages/public/Home';
import { ProductList } from '../pages/public/ProductList';
import { ProductDetail } from '../pages/public/ProductDetail';
import { FarmList } from '../pages/public/FarmList';
import { FarmDetail } from '../pages/public/FarmDetail';
import { Traceability } from '../pages/public/Traceability';
import { Login } from '../pages/public/Login';
import { Register } from '../pages/public/Register';

// Buyer Pages
import { Cart } from '../pages/buyer/Cart';
import { Checkout } from '../pages/buyer/Checkout';
import { MyOrders } from '../pages/buyer/MyOrders';
import { OrderDetail as BuyerOrderDetail } from '../pages/buyer/OrderDetail';

// Seller Pages
import { SellerDashboard } from '../pages/seller/Dashboard';
import { SellerProductList } from '../pages/seller/ProductList';
import { CreateEditProduct } from '../pages/seller/CreateEditProduct';
import { SellerProductDetail } from '../pages/seller/SellerProductDetail';
import { SellerOrders } from '../pages/seller/Orders';
import { SellerOrderDetail } from '../pages/seller/OrderDetail';

// Admin Pages
import { AdminDashboard } from '../pages/admin/Dashboard';
import { AdminProducts } from '../pages/admin/Products';
import { AdminUsers } from '../pages/admin/Users';

// Shared Pages
import { Profile } from '../pages/shared/Profile';

// Auth Guard (Mock)
import { useAuthStore } from '../store/authStore';

const ProtectedRoute = ({ children, allowedRoles }: { children: React.ReactNode, allowedRoles?: string[] }) => {
  const { isAuthenticated, user } = useAuthStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'products', element: <ProductList /> },
      { path: 'products/:slug', element: <ProductDetail /> },
      { path: 'farms', element: <FarmList /> },
      { path: 'farms/:id', element: <FarmDetail /> },
      { path: 'traceability', element: <Traceability /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'cart', element: <Cart /> },
      { 
        path: 'checkout', 
        element: <ProtectedRoute><Checkout /></ProtectedRoute> 
      },
      { 
        path: 'orders', 
        element: <ProtectedRoute><MyOrders /></ProtectedRoute> 
      },
      { 
        path: 'orders/:id', 
        element: <ProtectedRoute><BuyerOrderDetail /></ProtectedRoute> 
      },
      {
        path: 'profile',
        element: <ProtectedRoute><Profile /></ProtectedRoute>
      },
    ],
  },
  {
    path: '/seller',
    element: <ProtectedRoute allowedRoles={['seller']}><DashboardLayout /></ProtectedRoute>,
    children: [
      { index: true, element: <SellerDashboard /> },
      { path: 'products', element: <SellerProductList /> },
      { path: 'products/create', element: <CreateEditProduct /> },
      { path: 'products/:id', element: <SellerProductDetail /> },
      { path: 'products/:id/edit', element: <CreateEditProduct /> },
      { path: 'orders', element: <SellerOrders /> },
      { path: 'orders/:id', element: <SellerOrderDetail /> },
      { path: 'profile', element: <Profile /> },
    ],
  },
  {
    path: '/admin',
    element: <ProtectedRoute allowedRoles={['admin']}><DashboardLayout /></ProtectedRoute>,
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: 'products', element: <AdminProducts /> },
      { path: 'users', element: <AdminUsers /> },
      { path: 'profile', element: <Profile /> },
    ],
  },
]);
