import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";

const Home = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const [filteredProducts, setFilteredProducts] = useState([]);

  const products = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: "₹7,999",
      originalPrice: "₹9,999",
      image: "Wireless Headphones.jpeg",
      category: "Electronics",
    },
    {
      id: 2,
      name: "Coffee Mug",
      price: "₹1,199",
      originalPrice: "₹1,599",
      image: "Coffee Mug.jpeg",
      category: "Home & Kitchen",
    },
    {
      id: 3,
      name: "Backpack",
      price: "₹3,999",
      originalPrice: "₹4,999",
      image: "Backpack.jpeg",
      category: "Fashion",
    },
    {
      id: 4,
      name: "Smartphone",
      price: "₹25,999",
      originalPrice: "₹39,999",
      image: "Smartphone.jpeg",
      category: "Electronics",
    },
    {
      id: 5,
      name: "Running Shoes",
      price: "₹10,399",
      originalPrice: "₹12,999",
      image: "Running Shoes.jpeg",
      category: "Sports",
    },
    {
      id: 6,
      name: "Watch",
      price: "₹15,999",
      originalPrice: "₹19,999",
      image: "Watch.jpeg ",
      category: "Accessories",
    },
    {
      id: 7,
      name: "Sunglasses",
      price: "₹6,399",
      originalPrice: "₹7,999",
      image: "Sunglasses.jpeg ",
      category: "Accessories",
    },
    {
      id: 8,
      name: "Laptop",
      price: "₹79,999",
      originalPrice: "₹99,999",
      image: "Laptop.jpeg",
      category: "Electronics",
    },
    {
      id: 9,
      name: "Gaming Mouse",
      price: "₹3,999",
      originalPrice: "₹4,999",
      image: "Gaming Mouse.jpeg",
      category: "Electronics",
    },
    {
      id: 10,
      name: "LED TV",
      price: "₹39,899",
      originalPrice: "₹45,999",
      image: "LED TV.jpg ",
      category: "Electronics",
    },
    {
      id: 11,
      name: "Desk Lamp",
      price: "₹3,199",
      originalPrice: "₹3,999",
      image: "Desk Lamp.jpeg ",
      category: "Home & Kitchen",
    },
    {
      id: 12,
      name: "Bluetooth Speaker",
      price: "₹6,399",
      originalPrice: "₹7,999",
      image: "Bluetooth Speaker.jpeg ",
      category: "Electronics",
    },
    {
      id: 13,
      name: "Winter Jacket",
      price: "₹11,999",
      originalPrice: "₹14,999",
      image: "Winter Jacket.jpeg",
      category: "Fashion",
    },
    {
      id: 14,
      name: "Water Bottle",
      price: "₹1,599",
      originalPrice: "₹1,999",
      image: "Water Bottles.jpg ",
      category: "Sports",
    },
    {
      id: 15,
      name: "Phone Case",
      price: "₹1,999",
      originalPrice: "₹2,499",
      image: "Phone Case.jpeg",
      category: "Accessories",
    },
    {
      id: 16,
      name: "Keyboard",
      price: "₹7,199",
      originalPrice: "₹8,999",
      image: "Keyboard.jpeg ",
      category: "Electronics",
    },
  ];

  useEffect(() => {
    if (searchQuery) {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [searchQuery]);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const clearSearch = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {searchQuery && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-3xl font-bold text-gray-800">
                Search Results for "{searchQuery}"
              </h2>
              <button
                onClick={clearSearch}
                className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors cursor-pointer"
              >
                Clear Search
              </button>
            </div>
            <p className="text-gray-600">
              {filteredProducts.length} product
              {filteredProducts.length !== 1 ? "s" : ""} found
            </p>
          </div>
        )}

        {!searchQuery && (
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Products
          </h2>
        )}

        {searchQuery && filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              No Products Found
            </h3>
            <p className="text-gray-600 mb-8">
              Sorry, we couldn't find any products matching "{searchQuery}". Try
              searching with different keywords.
            </p>
            <button
              onClick={clearSearch}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer"
            >
              Browse All Products
            </button>
          </div>
        )}

        {filteredProducts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer"
                onClick={() => handleProductClick(product.id)}
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>

                <div className="p-4">
                  <div className="mb-2">
                    <span className="text-xs text-indigo-600 font-semibold uppercase tracking-wide">
                      {product.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    {product.name}
                  </h3>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl font-bold text-indigo-600">
                        {product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          {product.originalPrice}
                        </span>
                      )}
                    </div>

                    {product.originalPrice && (
                      <div className="flex items-center justify-between">
                        <span className="bg-red-100 text-red-800 text-xs font-semibold px-2 py-1 rounded">
                          Save ₹
                          {parseInt(
                            product.originalPrice.slice(1).replace(",", "")
                          ) - parseInt(product.price.slice(1).replace(",", ""))}
                        </span>
                        <span className="text-green-600 text-sm font-medium">
                          {Math.round(
                            ((parseInt(
                              product.originalPrice.slice(1).replace(",", "")
                            ) -
                              parseInt(
                                product.price.slice(1).replace(",", "")
                              )) /
                              parseInt(
                                product.originalPrice.slice(1).replace(",", "")
                              )) *
                              100
                          )}
                          % OFF
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
