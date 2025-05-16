import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoArrowBackCircleSharp } from "react-icons/io5";

const AdminLoginPage = () => {
  const [view, setView] = useState("initial");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAuth = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      if (view === "login") {
        if (email === "pitch@owner.com" && password === "admin123") {
          alert("Login Successful");
        } else {
          setError("Invalid credentials");
        }
      } else {
        alert("Account created!!!");
      }
      setLoading(false);
    }, 1000);
  };

const renderHeader = () => (
  <div className="fixed top-0 left-0 w-full bg-white shadow z-10 px-5 py-4">
    <h1
      className="text-3xl font-bold text-gray-800 text-left"
      style={{ fontFamily: "'Nunito Sans', sans-serif" }}
    >
      PitchBooking
    </h1>
  </div>
);

  const renderInitial = () => (
    <div className="flex items-center justify-center min-h-screen bg-white pt-24">
      <div className="relative w-full max-w-md h-96 rounded-3xl overflow-hidden shadow-lg mx-4">
        {/* Background Image and Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url("/signup.jpg")` }}
        />
        <div className="absolute inset-0 bg-black/60 rounded-3xl border border-white shadow-lg" />

        {/* Content */}
        <div className="z-20 relative h-full flex flex-col justify-center items-center gap-3">
          <FaUserCircle size={60} className="text-green-300 mb-2" />
          <div className="flex gap-3">
            <button
              onClick={() => setView("signup")}
              className="bg-white text-black font-semibold px-5 py-2 rounded hover:bg-green-300 transition shadow"
            >
              Sign Up
            </button>
            <button
              onClick={() => setView("login")}
              className="bg-white text-black font-semibold px-5 py-2 rounded hover:bg-green-300 transition shadow"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderForm = () => (
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen pt-24 px-4">
      {/* Form Container */}
      <div className="w-full max-w-md lg:max-w-2xl xl:max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden flex flex-col lg:flex-row">
        {/* Form Section */}
        <div className="w-full lg:w-1/2 p-8">
          <div className="flex items-center gap-2 mb-3">
            <IoArrowBackCircleSharp
              size={36}
              className="text-black cursor-pointer hover:text-green-500 transition"
              onClick={() => setView("initial")}
            />
          </div>

          <div className="flex justify-center mb-3">
            <FaUserCircle size={65} className="text-green-300" />
          </div>
          <h2 className="text-3xl font-semibold mb-4 text-center">
            {view === "signup" ? "Create an Account" : "Login"}
          </h2>
          {error && (
            <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
          )}
          <form onSubmit={handleAuth} className="space-y-4">
            {view === "signup" && (
              <>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-2 border rounded-lg text-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="w-1/2 px-4 py-2 border rounded-lg text-sm"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="w-1/2 px-4 py-2 border rounded-lg text-sm"
                    required
                  />
                </div>
                
                  <input
                  type="text"
                  placeholder="Country"
                  className="w-1/2 px-4 py-2 border rounded-lg text-sm"
                  required
                />
                <input
                  type="date"
                  placeholder="Date of Birth"
                  className="w-1/2 px-4 py-2 border rounded-lg text-sm"
                  required
                />
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Tel Code (e.g. +233)"
                    className="w-1/3 px-4 py-2 border rounded-lg text-sm"
                    required
                  />
                  <input
                    type="tel"
                    placeholder="Telephone Number"
                    className="w-2/3 px-4 py-2 border rounded-lg text-sm"
                    required
                  />
                </div>
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full px-4 py-2 border rounded-lg text-sm"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="w-full px-4 py-2 border rounded-lg text-sm"
                  required
                />
              </>
            )}

            {view === "login" && (
              <>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-2 border rounded-lg text-sm mt-5"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full px-4 py-2 border rounded-lg text-sm mt-5"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="remember-me"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                      Remember me
                    </label>
                  </div>
                  <a href="#" className="text-sm text-blue-600 hover:text-blue-500">
                    Forgot password?
                  </a>
                </div>
              </>
            )}
            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-lg hover:bg-green-300 hover:text-black transition mt-5"
              disabled={loading}
            >
              {loading
                ? view === "signup"
                  ? "Signing up..."
                  : "Logging in..."
                : view === "signup"
                ? "Sign Up"
                : "Login"}
            </button>
          </form>

          {/* Added "Don't have an account?" section */}
          {view === "login" && (
           <div className="mt-5 text-center text-sm text-gray-600">
  <p>Don't have an account?</p>
  <button
    onClick={() => setView("signup")}
    className="w-full bg-black text-white py-3 rounded-lg hover:bg-green-300 hover:text-black transition"
  >
    Register
  </button>
</div>

          )}
        </div>

        {/* Image Section */}
        <div className="w-full lg:w-1/2 h-64 lg:h-auto relative">
          <div className="absolute inset-0 bg-black/30 z-10" />
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url("/signup.jpg")` }}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {renderHeader()}
      {view === "initial" ? renderInitial() : renderForm()}
    </div>
  );
};

export default AdminLoginPage;