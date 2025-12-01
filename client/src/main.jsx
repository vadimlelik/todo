import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { AuthProvider } from './provider/auth.jsx';
import { BrowserRouter, RouterProvider } from 'react-router-dom';
import { router } from './config/router.jsx';

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>,
);
