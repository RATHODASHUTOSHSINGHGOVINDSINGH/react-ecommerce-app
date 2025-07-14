import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../../auth/AuthContext";
import { useNavigate } from "react-router";

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [subtotal, setSubtotal] = useState(0);
  const [originalTotal, setOriginalTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [platformFee, setPlatformFee] = useState(0);
  const [total, setTotal] = useState(0);
  const [isCartEmpty, setIsCartEmpty] = useState(true);

  
  useEffect(() => {
    const calculatedSubtotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    
    const calculatedOriginalTotal = cartItems.reduce(
      (sum, item) => sum + item.originalPrice * item.quantity,
      0
    );
    
    const calculatedDiscount = calculatedOriginalTotal - calculatedSubtotal;
    
    const calculatedPlatformFee = cartItems.reduce(
      (sum, item) => sum + 2 * item.quantity,
      0
    );
    
    const calculatedTotal = calculatedSubtotal + calculatedPlatformFee;

     
    setSubtotal(calculatedSubtotal);
    setOriginalTotal(calculatedOriginalTotal);
    setDiscount(calculatedDiscount);
    setPlatformFee(calculatedPlatformFee);
    setTotal(calculatedTotal);
    setIsCartEmpty(cartItems.length === 0);
  }, [cartItems]);

  const handleProceedToPayment = () => {
    navigate("/order");
  };

  return (
    <>
      {!isLoggedIn ? (
        <div className="min-h-screen bg-gray-50 py-8 w-full">
          <div className="container mx-auto px-4">
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔒</div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Login Required
              </h2>
              <p className="text-gray-600 mb-8">
                Please login to access your cart and view your items.
              </p>
              <button
                onClick={() => navigate('/login')}
                className=" bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-semibold cursor-pointer"
              >
                Login  
              </button>
             
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-screen bg-gray-50 py-8 w-full">
          <div className="container mx-auto px-4">
             
            {isCartEmpty ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🛒</div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  Your Cart is Empty
                </h2>
                <p className="text-gray-600 mb-8">
                  Looks like you haven't added anything to your cart yet.
                </p>
                <a
                  href="/"
                  className="bg-indigo-600 text-white px-3 py-3 rounded-sm hover:bg-indigo-700 transition-colors "
                >
                  Continue Shopping
                </a>
              </div>
            ) : (
              <>
                
                <div className="mb-8">
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    Shopping Cart
                  </h1>
                  <p className="text-gray-700">
                    Welcome {user?.name}! You have {cartItems.length} item{cartItems.length !== 1 ? "s" : ""} in your cart
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  
                  <div className="lg:col-span-2">
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                      {cartItems.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center p-6 border-b border-gray-200 last:border-b-0"
                        >
                           
                          <div className="w-20 h-20 flex-shrink-0 mr-4">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          </div>

                          
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-semibold text-gray-800 mb-1">
                              {item.name}
                            </h3>
                            <p className="text-sm text-gray-500 mb-2">
                              {item.category}
                            </p>
                            <div className="flex items-center space-x-2">
                              <p className="text-lg font-bold text-indigo-600">
                                ₹{item.price.toLocaleString()}
                              </p>
                              <p className="text-sm text-gray-500 line-through">
                                ₹{item.originalPrice.toLocaleString()}
                              </p>
                            </div>
                          </div>

                          
                          <div className="ml-6">
                            <div className="flex items-center space-x-4">
                              <span className="font-semibold text-sm">Qty:</span>
                              <div className="flex items-center border border-gray-300 rounded-lg">
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="px-3 py-2 hover:bg-gray-100 transition-colors"
                                  disabled={item.quantity <= 1}
                                >
                                  -
                                </button>
                                <span className="px-4 py-2 border-x border-gray-300 font-semibold">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="px-3 py-2 hover:bg-gray-100 transition-colors"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                             
                             
                          </div>

                           
                          <div className="ml-6 text-right">
                            <p className="text-lg font-bold text-gray-800 mb-2">
                              ₹{(item.price * item.quantity).toLocaleString()}
                            </p>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-red-500
                               hover:text-red-700 text-sm transition-colors
                               cursor-pointer"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

     
                    <div className="mt-6">
                      <a
                        href="/"
                        className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
                      >
                        ← Continue Shopping
                      </a>
                    </div>
                  </div>

                  
                  <div className="lg:col-span-1">
                    <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
                      <h2 className="text-xl font-bold text-gray-800 mb-4">
                        Price Details
                      </h2>

                      <div className="space-y-3 mb-4">
                        <div className="flex justify-between">
                          <span className="text-gray-600">
                            Price  
                          </span>
                          <span className="font-semibold">
                            ₹{subtotal.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Discount</span>
                          <span className="font-semibold text-green-600">
                            -₹{discount.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">
                            Platform Fee  
                          </span>
                          <span className="font-semibold">
                            ₹{platformFee.toLocaleString()}
                          </span>
                        </div>
                      </div>

                      <div className="border-t pt-4 mb-4">
                        <div className="flex justify-between items-center">
                          <span className="text-xl font-bold text-gray-800">
                            Total Amount
                          </span>
                          <span className="text-xl font-bold text-indigo-600">
                            ₹{total.toLocaleString()}
                          </span>
                        </div>
                      </div>

                      
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-6">
                        <p className="text-sm text-green-700">
                          🎉 You will save ₹{discount.toLocaleString()} on this order
                        </p>
                      </div>

                      <button
                        onClick={handleProceedToPayment}
                        className="w-full bg-indigo-600 text-white py-3
                         rounded-lg hover:bg-indigo-700 transition-colors 
                         font-semibold mb-4 cursor-pointer"
                      >
                        Proceed to Payment
                      </button>

                      <div className="text-center">
                        <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                          <span>🔒</span>
                          <span>Secure checkout</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
