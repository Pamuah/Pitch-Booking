import React, { useState } from "react";
import { User } from "lucide-react";

const MainAdminLoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        "https://football-park-management.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok && data.success) {
        // Store the token in localStorage
        console.log("Login successful:", data);
        // In a real app, you would navigate to the dashboard here
        // localStorage.setItem("authToken", data.token);
        // localStorage.setItem("user", JSON.stringify(data.user));
        // navigate("/mainadmin");
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header - fixed height */}
      <header className="bg-white shadow-md p-4">
        <h1
          className="text-2xl font-bold text-black"
          style={{ fontFamily: "'Nunito Sans', sans-serif" }}
        >
          Pitch Booking
        </h1>
      </header>

      {/* Main content - takes remaining space */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Left section with curved edge and welcome text overlay */}
        <div
          className="w-full md:w-3/5 h-64 md:h-auto relative overflow-hidden"
          style={{
            backgroundImage:
              'url("https://images.pexels.com/photos/399187/pexels-photo-399187.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Overlay inside image container */}
          <div className="absolute inset-0 bg-black/40 z-10" />

          {/* Curved edge - only on medium screens and up */}
          <div
            className="hidden md:block absolute top-0 right-0 w-16 h-full bg-white"
            style={{
              clipPath: "polygon(30% 0%, 100% 20%, 100% 80%, 30% 100%, 0% 50%)",
            }}
          />

          {/* Welcome text overlay */}
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <div className="text-center text-white px-8">
              <h2
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-lg"
                style={{ fontFamily: "'Nunito Sans', sans-serif" }}
              >
                Welcome to
              </h2>
              <h3
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-green-300 drop-shadow-lg"
                style={{ fontFamily: "'Nunito Sans', sans-serif" }}
              >
                PitchBooking
              </h3>
              <p className="text-lg md:text-xl mt-4 opacity-90 drop-shadow">
                Admin Portal
              </p>
            </div>
          </div>
        </div>

        {/* Right section with login form */}
        <div className="w-full md:w-2/5 bg-white flex flex-col justify-center items-center p-8">
          <div
            tabIndex={0}
            className="bg-white rounded-xl p-8 w-full max-w-lg shadow-lg h-auto border-4 border-black focus:outline-none focus:ring-4 focus:ring-green-300 transition-all duration-300 mr-0 md:mr-40"
            style={{ fontFamily: "'Nunito Sans', sans-serif" }}
          >
            <div className="flex justify-center mb-6">
              <div className="bg-green-200 rounded-full p-4">
                <User size={40} className="text-green-400" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-center mb-2">Admin Login</h1>
            <p className="text-gray-600 text-center mb-6">
              Access the admin dashboard
            </p>
            {error && (
              <p className="text-red-500 mb-4 text-sm text-center bg-red-50 p-3 rounded-md">
                {error}
              </p>
            )}
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-300 transition-colors"
                  required
                  placeholder="admin@example.com"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-300 transition-colors"
                  required
                  placeholder="Enter your password"
                />
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="remember"
                    className="h-4 w-4 text-green-300 focus:ring-green-300 border-gray-300 rounded"
                  />
                  <label htmlFor="remember" className="text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                <a
                  href="#"
                  className="text-sm text-green-400 hover:text-green-500 hover:underline transition-colors"
                >
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full bg-green-400 hover:bg-green-500 text-black py-3 px-4 rounded-md font-semibold transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                    <span>Logging in...</span>
                  </div>
                ) : (
                  "Login to Dashboard"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainAdminLoginPage;
