import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useCart } from "../src/context/CartContext";
import { useAuth } from "../auth/AuthContext";
import { FaInfoCircle } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { MdOutlineCheckCircle } from "react-icons/md";

const Order = () => {
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const { user } = useAuth();

  const orderId = "ORD12345";
  const orderDate = new Date().toLocaleDateString("en-IN");
  const deliveryDate = new Date(
    Date.now() + 7 * 24 * 60 * 60 * 1000
  ).toLocaleDateString("en-IN");

  useEffect(() => {
    const timer = setTimeout(() => {
      clearCart();
    }, 3000);

    return () => clearTimeout(timer);
  }, [clearCart]);

  return (
    <div className="min-h-screen bg-gray-50 py-8 w-full">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center">
              <FaInfoCircle className="w-5 h-5 text-yellow-400 mr-2" />
              <p className="text-sm text-yellow-700">
                <strong>Demo:</strong> No actual payment was processed and no
                real order was placed.
              </p>
            </div>
          </div>

          <div className="text-center mb-8">
            <div className="w-24 h-24 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
              <MdOutlineCheckCircle className="w-12 h-12 text-green-500" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Order Confirmed!
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Thank you for your purchase. Your order has been confirmed and
              will be processed soon.
            </p>
          </div>

          {/* Order Details */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Order Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">
                  Order ID
                </h3>
                <p className="text-lg font-semibold text-gray-800">{orderId}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">
                  Order Date
                </h3>
                <p className="text-lg font-semibold text-gray-800">
                  {orderDate}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">
                  Customer
                </h3>
                <p className="text-lg font-semibold text-gray-800">
                  {user?.name || "Guest User"}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">
                  Expected Delivery
                </h3>
                <p className="text-lg font-semibold text-gray-800">
                  {deliveryDate}
                </p>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center">
                <FaCheckCircle className="w-5 h-5 text-green-500 mr-2" />
                <p className="text-sm text-green-700">
                  <strong>Payment Confirmed:</strong> Your payment has been
                  processed successfully.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Order Status & Next Steps
            </h2>

            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <FaCheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Order Placed</h3>
                  <p className="text-gray-600 text-sm">
                    Your order has been successfully placed and confirmed.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-indigo-600 font-bold text-sm">2</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">
                    Order Processing
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Your order will be prepared and packed within 1-2 business
                    days.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-indigo-600 font-bold text-sm">3</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">
                    Shipping & Delivery
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Your order will be shipped and delivered by {deliveryDate}.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => navigate("/")}
              className="w-full bg-indigo-600 text-white py-3 px-3 rounded-sm hover:bg-indigo-700 transition-colors font-semibold cursor-pointer"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
