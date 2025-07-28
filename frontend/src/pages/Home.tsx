import React from "react";
import Nav from "@/customcomponents/Nav";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Nav />
      <section className="bg-gradient-to-r from-blue-100 via-white to-green-100 min-h-screen py-20 px-6 font-serif">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 mb-6">
            Welcome to <span className="text-blue-600">CropLink</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Your one-stop platform to shorten, manage, and analyze your crop-related links — tailored for the agri-tech world.
          </p>

          <div className="flex justify-center space-x-6 mb-16">
            <Link
              to="/register"
              className="bg-blue-600 text-white px-6 py-3 rounded-xl text-lg font-semibold hover:bg-blue-700 transition"
            >
              Get Started
            </Link>
            <Link
              to="/signin"
              className="border border-blue-600 text-blue-600 px-6 py-3 rounded-xl text-lg font-semibold hover:bg-blue-100 transition"
            >
              Sign In
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-10 text-left">
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-bold mb-2 text-blue-700">🔗 URL Shortening</h3>
              <p className="text-gray-600">
                Create clean, custom short links for crop-related websites, reports, and product pages.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-bold mb-2 text-green-700">📊 Analytics</h3>
              <p className="text-gray-600">
                Track click rates, locations, and devices. Optimize your campaign reach to farmers and stakeholders.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-bold mb-2 text-purple-700">🔒 Secure & Reliable</h3>
              <p className="text-gray-600">
                Powered by JWT authentication and PostgreSQL, your data stays safe and performant.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
