import { BrowserRouter as Router, Routes, Route } from "react-router";
import "./App.css";
import Home from "./pages/Home";
import ProductCard from "../Components/ProductCard";
import Cart from "./pages/Cart";
import About from "./pages/About";
import Login from "./pages/Login";
import Order from "../Components/Order";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "../auth/AuthContext";
import ProtectedRoute from "../auth/ProtectedRoute";
import Layout from "../Components/Layout";
import Signup from "../Components/Signup";
import { ToastContainer, Bounce } from "react-toastify";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div
            className="flex  justify-center  p-0
            bg-indigo-50 w-full min-h-screen"
          >
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/product/:id" element={<ProductCard />} />
                <Route path="/cart" element={<Cart />} />
                <Route
                  path="/order"
                  element={
                    <ProtectedRoute>
                      <Order />
                    </ProtectedRoute>
                  }
                />
              </Route>
            </Routes>
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick={false}
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
              transition={Bounce}
            />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
