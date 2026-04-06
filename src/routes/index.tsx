import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

// Layouts
import { PublicLayout } from '@/src/shared/components/layout/PublicLayout';
import { DashboardLayout } from '@/src/shared/components/layout/DashboardLayout';

// Auth Pages
import { Login } from '@/src/modules/auth/pages/Login';
import { Register } from '@/src/modules/auth/pages/Register';
import { Profile } from '@/src/modules/auth/pages/Profile';

// Catalog Pages
import { Home } from '@/src/modules/catalog/pages/Home';
import { ProductList } from '@/src/modules/catalog/pages/ProductList';
import { ProductDetail } from '@/src/modules/catalog/pages/ProductDetail';
import { FarmList } from '@/src/modules/catalog/pages/FarmList';
import { FarmDetail } from '@/src/modules/catalog/pages/FarmDetail';
import { Traceability } from '@/src/modules/catalog/pages/Traceability';

// Cart Pages
import { Cart } from '@/src/modules/cart/pages/Cart';

// Orders Pages
import { Checkout } from '@/src/modules/orders/pages/Checkout';
import { MyOrders } from '@/src/modules/orders/pages/MyOrders';
import { OrderDetail as BuyerOrderDetail } from '@/src/modules/orders/pages/OrderDetail';

// Seller Pages
import { SellerDashboard } from '@/src/modules/seller/pages/Dashboard';
import { SellerProductList } from '@/src/modules/seller/pages/ProductList';
import { CreateEditProduct } from '@/src/modules/seller/pages/CreateEditProduct';
import { SellerProductDetail } from '@/src/modules/seller/pages/SellerProductDetail';
import { SellerOrders } from '@/src/modules/seller/pages/Orders';
import { SellerOrderDetail } from '@/src/modules/seller/pages/OrderDetail';

// Admin Pages
import { AdminDashboard } from '@/src/modules/admin/pages/Dashboard';
import { AdminProducts } from '@/src/modules/admin/pages/Products';
import { AdminUsers } from '@/src/modules/admin/pages/Users';

// Auth Guard (Mock)
import { useAuthStore } from '@/src/modules/auth/store';

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
