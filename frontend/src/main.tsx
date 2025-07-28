import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LoginForm from './components/features/Auth/LoginForm'
import ErrorPage from './pages/ErrorPage'
import HomePage from './pages/HomePage'
import ProductList from './components/features/Products/ProductList'
import { AuthProvider } from './context/AuthContext'

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/login",
        element: <LoginForm />
      },
      {
        path: "/products",
        element: <ProductList />
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
