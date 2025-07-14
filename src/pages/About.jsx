import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-white  ">
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            Welcome to <span className="text-indigo-600">ShopSmart</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Your one-stop digital shopping destination built for speed,
            simplicity, and smarter choices.
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-16">
          <div className=" bg-white rounded-md   shadow-xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              About Us
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              We designed ShopSmart with one goal in mind: to make online
              shopping intuitive, fast, and personalized without the clutter.
              Whether you're discovering unique local products or shopping from
              your favorite brands, our app offers a seamless experience powered
              by clean design and smart technology.
            </p>
          </div>
        </div>

        <div className="mb-16  ">
          <h2 className="text-3xl font-bold text-center  text-gray-800 mb-12">
            Why ShopSmart?
          </h2>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 flex-1 min-w-[280px] max-w-[350px]">
              <div className="text-4xl mb-4">🏷️</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Simple & Clean Design
              </h3>
              <p className="text-gray-600">
                Navigate effortlessly with our user-friendly interface designed
                for everyone.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 flex-1 min-w-[280px] max-w-[350px]">
              <div className="text-4xl mb-4">🔄</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Instant Updates
              </h3>
              <p className="text-gray-600">
                Stay informed with real-time product availability and instant
                updates.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 flex-1 min-w-[280px] max-w-[350px]">
              <div className="text-4xl mb-4">🛒</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Effortless Shopping
              </h3>
              <p className="text-gray-600">
                Browse and buy with just a few taps. Shopping has never been
                easier.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 flex-1 min-w-[280px] max-w-[350px]">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Lightning Fast
              </h3>
              <p className="text-gray-600">
                Enjoy a smooth, responsive interface that keeps up with your
                pace.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 flex-1 min-w-[280px] max-w-[350px]">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Smart Recommendations
              </h3>
              <p className="text-gray-600">
                Get personalized product suggestions based on your preferences.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 flex-1 min-w-[280px] max-w-[350px]">
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Local & Global
              </h3>
              <p className="text-gray-600">
                Discover unique local products alongside your favorite global
                brands.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto text-center">
          <div className=" bg-white rounded-2xl shadow-xl p-8">
            <div className="text-5xl mb-4">🔒</div>
            <h3 className="text-2xl font-bold mb-4">Secure Shopping</h3>
            <p className="text-lg opacity-90">
              Shop with confidence knowing your data is protected with
              industry-leading security measures.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
