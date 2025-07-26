import { Home } from '@mui/icons-material'
import './App.css'
import LoginForm from './components/features/Auth/LoginForm'
import ErrorPage from './pages/ErrorPage'
import HomePage from './pages/HomePage'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ProductList from './components/features/Products/ProductList'

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
function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
