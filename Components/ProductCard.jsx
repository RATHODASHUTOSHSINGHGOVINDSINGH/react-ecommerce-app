import React, { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router";
import { useCart } from "../src/context/CartContext";
import { useAuth } from "../auth/AuthContext";
import { AiFillStar } from "react-icons/ai";
import { IoWarning } from "react-icons/io5";
import { toast } from "react-toastify";

const ProductCard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { addToCart } = useCart();
  const { isLoggedIn } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const products = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: 7999,
      originalPrice: 9999,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&h=600&fit=crop",
      ],
      category: "Electronics",
      rating: 4.5,
      reviews: 128,
      inStock: true,
      description:
        "Premium wireless headphones with noise cancellation technology. Experience crystal-clear sound quality and all-day comfort with these state-of-the-art headphones.",
      features: [
        "Active Noise Cancellation",
        "30-hour battery life",
        "Quick charge - 5 min for 3 hours",
        "Premium comfort fit",
        "High-resolution audio",
        "Voice assistant compatible",
      ],
    },
    {
      id: 2,
      name: "Coffee Mug",
      price: 1199,
      originalPrice: 1599,
      image:
        "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1506368249639-73a05d6f6488?w=600&h=600&fit=crop",
      ],
      category: "Home & Kitchen",
      rating: 4.2,
      reviews: 85,
      inStock: true,
      description:
        "Premium ceramic coffee mug perfect for your morning brew. Ergonomic design with comfortable grip and excellent heat retention.",
      features: [
        "Premium ceramic material",
        "Dishwasher safe",
        "Microwave safe",
        "350ml capacity",
        "Ergonomic handle",
        "Heat retention technology",
      ],
    },
    {
      id: 3,
      name: "Backpack",
      price: 3999,
      originalPrice: 4999,
      image:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=600&fit=crop",
      ],
      category: "Fashion",
      rating: 4.3,
      reviews: 92,
      inStock: true,
      description:
        "Stylish and durable backpack perfect for daily use, travel, or outdoor adventures. Multiple compartments for organized storage.",
      features: [
        "Water-resistant material",
        "Multiple compartments",
        "Padded laptop sleeve",
        "Ergonomic straps",
        "Durable zippers",
        "Lightweight design",
      ],
    },
    {
      id: 4,
      name: "Smartphone",
      price: 55999,
      originalPrice: 69999,
      image:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?w=600&h=600&fit=crop",
      ],
      category: "Electronics",
      rating: 4.6,
      reviews: 245,
      inStock: true,
      description:
        "Latest flagship smartphone with advanced camera system, powerful processor, and all-day battery life.",
      features: [
        "6.1-inch OLED display",
        "Triple camera system",
        "5G connectivity",
        "Fast wireless charging",
        "Water resistant",
        "256GB storage",
      ],
    },
    {
      id: 5,
      name: "Running Shoes",
      price: 10399,
      originalPrice: 12999,
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=600&h=600&fit=crop",
      ],
      category: "Sports",
      rating: 4.4,
      reviews: 156,
      inStock: true,
      description:
        "High-performance running shoes designed for comfort and speed. Advanced cushioning technology for long-distance running.",
      features: [
        "Breathable mesh upper",
        "Advanced cushioning",
        "Lightweight design",
        "Durable rubber outsole",
        "Arch support",
        "Moisture-wicking interior",
      ],
    },
    {
      id: 6,
      name: "Watch",
      price: 15999,
      originalPrice: 19999,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&h=600&fit=crop",
      ],
      category: "Accessories",
      rating: 4.5,
      reviews: 203,
      inStock: true,
      description:
        "Elegant smartwatch with fitness tracking, heart rate monitoring, and smartphone connectivity.",
      features: [
        "GPS tracking",
        "Heart rate monitor",
        "Water resistant",
        "7-day battery life",
        "Sleep tracking",
        "Customizable watch faces",
      ],
    },
    {
      id: 7,
      name: "Sunglasses",
      price: 6399,
      originalPrice: 7999,
      image:
        "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&h=600&fit=crop",
      ],
      category: "Accessories",
      rating: 4.1,
      reviews: 78,
      inStock: true,
      description:
        "Premium polarized sunglasses with UV protection and stylish design. Perfect for outdoor activities.",
      features: [
        "Polarized lenses",
        "100% UV protection",
        "Lightweight frame",
        "Anti-reflective coating",
        "Scratch resistant",
        "Comfortable nose pads",
      ],
    },
    {
      id: 8,
      name: "Laptop",
      price: 79999,
      originalPrice: 99999,
      image:
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&h=600&fit=crop",
      ],
      category: "Electronics",
      rating: 4.7,
      reviews: 189,
      inStock: true,
      description:
        "High-performance laptop perfect for work, gaming, and creative tasks. Fast processor and excellent display quality.",
      features: [
        "Intel i7 processor",
        "16GB RAM",
        "512GB SSD",
        "15.6-inch Full HD display",
        "Long battery life",
        "Backlit keyboard",
      ],
    },
    {
      id: 9,
      name: "Gaming Mouse",
      price: 3999,
      originalPrice: 4999,
      image:
        "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1563297007-0686b7003af7?w=600&h=600&fit=crop",
      ],
      category: "Electronics",
      rating: 4.3,
      reviews: 134,
      inStock: true,
      description:
        "Professional gaming mouse with high precision sensor and customizable RGB lighting.",
      features: [
        "High precision sensor",
        "RGB lighting",
        "Programmable buttons",
        "Ergonomic design",
        "Adjustable DPI",
        "Durable switches",
      ],
    },
    {
      id: 10,
      name: "Yoga Mat",
      price: 2399,
      originalPrice: 2999,
      image:
        "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1506629905057-c3d0cbb36c0c?w=600&h=600&fit=crop",
      ],
      category: "Sports",
      rating: 4.2,
      reviews: 67,
      inStock: true,
      description:
        "Premium yoga mat with excellent grip and cushioning. Perfect for yoga, pilates, and fitness exercises.",
      features: [
        "Non-slip surface",
        "Extra cushioning",
        "Eco-friendly material",
        "Easy to clean",
        "Lightweight and portable",
        "Alignment guides",
      ],
    },
    {
      id: 11,
      name: "Desk Lamp",
      price: 3199,
      originalPrice: 3999,
      image:
        "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=600&h=600&fit=crop",
      ],
      category: "Home & Kitchen",
      rating: 4.0,
      reviews: 89,
      inStock: true,
      description:
        "Modern LED desk lamp with adjustable brightness and color temperature. Perfect for work and study.",
      features: [
        "LED lighting",
        "Adjustable brightness",
        "Color temperature control",
        "USB charging port",
        "Touch controls",
        "Energy efficient",
      ],
    },
    {
      id: 12,
      name: "Bluetooth Speaker",
      price: 6399,
      originalPrice: 7999,
      image:
        "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&h=600&fit=crop",
      ],
      category: "Electronics",
      rating: 4.4,
      reviews: 176,
      inStock: true,
      description:
        "Portable Bluetooth speaker with powerful bass and crystal-clear sound. Waterproof design for outdoor use.",
      features: [
        "360-degree sound",
        "Waterproof design",
        "12-hour battery life",
        "Wireless connectivity",
        "Built-in microphone",
        "Compact and portable",
      ],
    },
    {
      id: 13,
      name: "Winter Jacket",
      price: 11999,
      originalPrice: 14999,
      image:
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=600&h=600&fit=crop",
      ],
      category: "Fashion",
      rating: 4.6,
      reviews: 145,
      inStock: true,
      description:
        "Warm and stylish winter jacket with insulation and weather protection. Perfect for cold weather.",
      features: [
        "Insulated lining",
        "Water resistant",
        "Multiple pockets",
        "Adjustable hood",
        "Breathable fabric",
        "Modern fit",
      ],
    },
    {
      id: 14,
      name: "Water Bottle",
      price: 1599,
      originalPrice: 1999,
      image:
        "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=600&fit=crop",
      ],
      category: "Sports",
      rating: 4.1,
      reviews: 98,
      inStock: true,
      description:
        "Insulated stainless steel water bottle that keeps drinks cold for 24 hours or hot for 12 hours.",
      features: [
        "Double-wall insulation",
        "Leak-proof design",
        "BPA-free materials",
        "Wide mouth opening",
        "Durable construction",
        "Easy to clean",
      ],
    },
    {
      id: 15,
      name: "Phone Case",
      price: 1999,
      originalPrice: 2499,
      image:
        "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=600&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=600&h=600&fit=crop",
      ],
      category: "Accessories",
      rating: 3.9,
      reviews: 234,
      inStock: true,
      description:
        "Protective phone case with shock absorption and wireless charging compatibility. Slim and lightweight design.",
      features: [
        "Drop protection",
        "Wireless charging compatible",
        "Slim profile",
        "Easy installation",
        "Precise cutouts",
        "Scratch resistant",
      ],
    },
    {
      id: 16,
      name: "Keyboard",
      price: 7199,
      originalPrice: 8999,
      image:
        "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=600&h=600&fit=crop",
      ],
      category: "Electronics",
      rating: 4.5,
      reviews: 167,
      inStock: true,
      description:
        "Mechanical gaming keyboard with RGB backlighting and tactile switches. Perfect for gaming and typing.",
      features: [
        "Mechanical switches",
        "RGB backlighting",
        "Anti-ghosting",
        "Programmable keys",
        "Durable construction",
        "Ergonomic design",
      ],
    },
  ];

  const product = products.find((p) => p.id === parseInt(id)) || products[0];

  const totalPrice = product.price * quantity;
  const totalOriginalPrice = product.originalPrice * quantity;
  const totalSavings = totalOriginalPrice - totalPrice;

   

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`Added ${quantity} ${product.name}(s) to cart!`);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate("/cart");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <nav className="mb-8">
          <button
            onClick={() => navigate("/")}
            className="text-indigo-600 hover:text-indigo-700 font-medium"
          >
            ← Back to Products
          </button>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg bg-white shadow-lg">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex space-x-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    selectedImage === index
                      ? "border-indigo-500"
                      : "border-gray-200"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-sm text-indigo-600 font-semibold uppercase tracking-wide mb-2">
                {product.category}
              </p>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>

              <div className="flex items-center space-x-2 mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <AiFillStar key={i} className="w-5 h-5" />
                  ))}
                </div>
                <span className="text-gray-600">
                  ({product.reviews} reviews)
                </span>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <div className="flex items-center space-x-3 mb-3">
                  <span className="text-sm text-gray-600">Unit Price:</span>
                  <span className="text-lg font-bold text-indigo-600">
                    ₹{product.price.toLocaleString()}
                  </span>
                  <span className="text-sm text-gray-500 line-through">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center space-x-3 mb-3">
                  <span className="text-lg font-semibold text-gray-800">
                    Total Price:
                  </span>
                  <span className="text-3xl font-bold text-indigo-600">
                    ₹{totalPrice.toLocaleString()}
                  </span>
                  {totalOriginalPrice > totalPrice && (
                    <span className="text-lg text-gray-500 line-through">
                      ₹{totalOriginalPrice.toLocaleString()}
                    </span>
                  )}
                </div>

                {totalSavings > 0 && (
                  <div className="flex items-center space-x-2">
                    <span className="bg-red-100 text-red-800 text-sm font-semibold px-2 py-1 rounded">
                      You Save: ₹{totalSavings.toLocaleString()}
                    </span>
                    <span className="text-green-600 text-sm font-medium">
                      ({Math.round((totalSavings / totalOriginalPrice) * 100)}%
                      OFF)
                    </span>
                  </div>
                )}
              </div>

              <div className="mb-6">
                {product.inStock ? (
                  <span className="text-green-600 font-semibold">
                    ✓ In Stock
                  </span>
                ) : (
                  <span className="text-red-600 font-semibold">
                    ✗ Out of Stock
                  </span>
                )}
              </div>

              {!isLoggedIn && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <IoWarning className="text-yellow-400 h-5 w-5" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700">
                        <strong>Login required:</strong> Please login to add
                        items to cart or make purchases.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="font-semibold">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 hover:bg-gray-100 transition-colors
                    cursor-pointer"
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-x border-gray-300 font-semibold">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 hover:bg-gray-100 transition-colors
                    cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex space-x-4">
                {isLoggedIn ? (
                  <>
                    <button
                      onClick={handleAddToCart}
                      className="flex-1 bg-indigo-600
                       text-white py-3 px-6 rounded-lg
                        hover:bg-indigo-700 transition-colors font-semibold
                        cursor-pointer"
                      disabled={!product.inStock}
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={handleBuyNow}
                      className="flex-1 bg-indigo-500
                       text-white py-3 px-6 rounded-lg
                        hover:bg-indigo-600 transition-colors font-semibold
                        cursor-pointer"
                      disabled={!product.inStock}
                    >
                      Buy Now
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => navigate("/login")}
                    className="w-full bg-indigo-600 text-white py-3 px-6 
                    rounded-lg hover:bg-indigo-700 transition-colors font-semibold
                    cursor-pointer"
                  >
                    Login to Buy Items
                  </button>
                )}
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-3">Description</h3>
              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-3">Key Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <span className="text-green-500 mr-2">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
