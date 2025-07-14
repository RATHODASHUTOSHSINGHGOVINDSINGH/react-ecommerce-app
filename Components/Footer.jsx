import React from "react";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-indigo-400 mb-4">
              ShopSmart
            </h3>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Your trusted online shopping destination for quality products at
              unbeatable prices.
            </p>
            {/* Social Links */}
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-indigo-400 transition-colors"
              >
                <FaXTwitter className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-indigo-400 transition-colors"
              >
                <FaLinkedinIn className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-indigo-400 transition-colors"
              >
                <FaInstagram className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-indigo-400 transition-colors"
              >
                <FaFacebook className="w-6 h-6" />
              </a>
            </div>
          </div>
{/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="/"
                  className="text-gray-300 hover:text-indigo-400 transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="text-gray-300 hover:text-indigo-400 transition-colors"
                >
                  Products
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="text-gray-300 hover:text-indigo-400 transition-colors"
                >
                  Categories
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="text-gray-300 hover:text-indigo-400 transition-colors"
                >
                  Special Deals
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="text-gray-300 hover:text-indigo-400 transition-colors"
                >
                  New Arrivals
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="text-gray-300 hover:text-indigo-400 transition-colors"
                >
                  About Us
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="/"
                  className="text-gray-300 hover:text-indigo-400 transition-colors"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="text-gray-300 hover:text-indigo-400 transition-colors"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="text-gray-300 hover:text-indigo-400 transition-colors"
                >
                  Shipping Info
                </a>
              </li>
              <li>
                <a
                  href="/ "
                  className="text-gray-300 hover:text-indigo-400 transition-colors"
                >
                  Returns & Exchanges
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="text-gray-300 hover:text-indigo-400 transition-colors"
                >
                  Size Guide
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="text-gray-300 hover:text-indigo-400 transition-colors"
                >
                  Track Your Order
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 ">
        <div className="container mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row justify-center items-center">
            <div className="text-gray-400 text-sm mb-2 md:mb-0 ">
              © 2025 ShopSmart. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
