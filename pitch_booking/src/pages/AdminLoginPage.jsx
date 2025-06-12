import React, { useState } from "react";
import { ArrowLeft, User } from "lucide-react";

const AdminLoginPage = () => {
  const [view, setView] = useState("initial");
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    country: "",
    dob: "",
    telCode: "",
    telNumber: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAuth = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      if (view === "login") {
        if (formData.email === "pitch@owner.com" && formData.password === "admin123") {
          alert("Login Successful");
          window.location.href = "/admindashboard";
        } else {
          setError("Invalid credentials");
        }
      } else {
        alert("Account created");
        setView("login");
      }
      setLoading(false);
    }, 1000);
  };

  const renderInitial = () => (
    <div className="min-h-screen flex flex-col">
      {/* Header - fixed height */}
      <header className="bg-white shadow-md p-4">
        <h1 className="text-2xl font-bold text-black" style={{ fontFamily: "'Nunito Sans', sans-serif" }}>
          Pitch Booking
        </h1>
      </header>

      {/* Main content - takes remaining space */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Left section with curved edge */}
        <div 
          className="w-full md:w-3/5 h-64 md:h-auto relative overflow-hidden"
          style={{
            clipPath: "polygon(0 0, 85% 0, 100% 50%, 85% 100%, 0 100%)",
            backgroundImage: 'url("/signup.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-black/30 z-10" />
        </div>

        {/* Right section with auth options */}
        <div className="w-full md:w-2/5 bg-white flex flex-col justify-center items-center p-8">
          <div
            tabIndex="0"
            className="bg-white rounded-xl p-8 w-full max-w-lg shadow-lg h-[440px] border-4 border-black focus:outline-none focus:ring-4 focus:ring-green-300 transition-all duration-300 mr-40"
            style={{ fontFamily: "'Nunito Sans', sans-serif" }}
          >
            <div className="flex justify-center mb-6">
              <div className="bg-green-200 rounded-full p-3">
                <User size={40} className="text-green-400" />
              </div>
            </div>
            
            <h1 className="text-2xl font-bold text-center mb-6">Welcome to PitchBooking</h1>
            
            <div className="flex flex-col gap-7">
              <button
                className="w-full bg-black hover:bg-green-400 text-white py-2 px-4 rounded-md font-large"
                onClick={() => setView("signup")}
              >
                Create Account
              </button>
              
              <button
                className="w-full bg-gray-300 hover:bg-green-400 text-black py-2 px-4 rounded-md font-large"
                onClick={() => setView("login")}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAuthForm = () => (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-sm p-4">
        <h1 className="text-2xl font-bold text-black" style={{ fontFamily: "'Nunito Sans', sans-serif" }}>
          Pitch Booking
        </h1>
      </header>
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Left section with curved edge */}
        <div 
          className="w-full md:w-3/5 h-64 md:h-auto relative overflow-hidden"
          style={{
            clipPath: "polygon(0 0, 85% 0, 100% 50%, 85% 100%, 0 100%)",
            backgroundImage: 'url("/signup.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-black/30 z-10" />
        </div>

        {/* Right section with form */}
        <div className="w-full md:w-2/5 bg-white flex justify-center items-center p-8">
          <div 
            tabIndex="0"
            className="bg-white rounded-xl p-8 w-full max-w-lg shadow-lg border-4 border-black focus:outline-none focus:ring-4 focus:ring-green-300 transition-all duration-300 mr-40"
            style={{ fontFamily: "'Nunito Sans', sans-serif" }}
          >
            {/* Scrollable container for signup form with invisible scrollbar */}
            <div className={`${view === "signup" ? "max-h-[500px] overflow-y-auto" : ""}`}
              style={{
                scrollbarWidth: 'none', /* Firefox */
                msOverflowStyle: 'none', /* IE/Edge */
              }}
            >
              {/* Hide scrollbar for Chrome/Safari */}
              <style>
                {`
                  .no-scrollbar::-webkit-scrollbar {
                    display: none;
                  }
                `}
              </style>
              <div className={`${view === "signup" ? "no-scrollbar" : ""}`}>
                <button 
                  onClick={() => setView("initial")}
                  className="flex items-center text-gray-700 hover:text-green-300 transition mb-6"
                >
                  <ArrowLeft size={16} className="mr-1" />
                  <span>Back</span>
                </button>
                
                <div className="flex flex-col items-center mb-6">
                  <div className="bg-green-200 rounded-full p-3 mb-3">
                    <User size={24} className="text-green-400" />
                  </div>
                  <h1 className="text-2xl font-bold">
                    {view === "signup" ? "Create Account" : "Login"}
                  </h1>
                </div>

                {error && <p className="text-red-500 mb-4 text-sm text-center">{error}</p>}
                
                <form onSubmit={handleAuth} className="space-y-4">
                  {view === "signup" && (
                    <>
                      <div className="flex gap-4">
                        <div className="w-1/2">
                          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                            First Name
                          </label>
                          <input 
                            id="firstName"
                            name="firstName"
                            type="text"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-300"
                            required
                            placeholder="John"
                          />
                        </div>
                        <div className="w-1/2">
                          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                            Last Name
                          </label>
                          <input 
                            id="lastName"
                            name="lastName"
                            type="text"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-300"
                            required
                            placeholder="Doe"
                          />
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="w-1/2">
                          <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                            Country
                          </label>
                          <select
                            id="country"
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-300"
                            required
                          >
                            <option value="">Select</option>
                            <option value="US">United States</option>
                            <option value="UK">United Kingdom</option>
                            <option value="CA">Canada</option>
                          </select>
                        </div>
                        <div className="w-1/2">
                          <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-1">
                            Date of Birth
                          </label>
                          <input 
                            id="dob"
                            name="dob"
                            type="date"
                            value={formData.dob}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-300"
                            required
                          />
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="w-2/5">
                          <label htmlFor="telCode" className="block text-sm font-medium text-gray-700 mb-1">
                            Code
                          </label>
                          <select
                            id="telCode"
                            name="telCode"
                            value={formData.telCode}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-300"
                            required
                          >
                            <option value="">+</option>
                            <option value="+1">+1 (US)</option>
                            <option value="+44">+44 (UK)</option>
                            <option value="+91">+91 (IN)</option>
                          </select>
                        </div>
                        <div className="w-3/5">
                          <label htmlFor="telNumber" className="block text-sm font-medium text-gray-700 mb-1">
                            Phone Number
                          </label>
                          <input 
                            id="telNumber"
                            name="telNumber"
                            type="tel"
                            value={formData.telNumber}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-300"
                            required
                            placeholder="1234567890"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input 
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-300"
                      required
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                      {view === "signup" ? "Create Password" : "Password"}
                    </label>
                    <input 
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-300"
                      required
                      placeholder={view === "signup" ? "Create a password" : "Enter your password"}
                    />
                  </div>

                  {view === "signup" && (
                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                        Confirm Password
                      </label>
                      <input 
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-300"
                        required
                        placeholder="Confirm your password"
                      />
                    </div>
                  )}

                  {view === "login" && (
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="remember"
                          className="h-4 w-4 text-green-300 focus:ring-green-300 border-gray-300 rounded"
                        />
                        <label htmlFor="remember" className="text-sm text-gray-700">Remember me</label>
                      </div>
                      <a href="#" className="text-sm text-green-300 hover:underline">
                        Forgot password?
                      </a>
                    </div>
                  )}

                  <button 
                    type="submit" 
                    className="w-full bg-green-300 hover:bg-green-500 text-black py-2 px-4 rounded-md font-medium mt-4"
                    disabled={loading}
                  >
                    {loading 
                      ? view === "signup" 
                        ? "Creating account..." 
                        : "Logging in..."
                      : view === "signup" 
                        ? "Create Account" 
                        : "Login"}
                  </button>
                  
                  <div className="text-center mt-4">
                    <p className="text-sm text-gray-600 mb-2">
                      {view === "signup" 
                        ? "Already have an account?" 
                        : "Don't have an account?"}
                    </p>
                    <button
                      type="button"
                      onClick={() => setView(view === "signup" ? "login" : "signup")}
                      className="bg-black text-white px-4 py-2 rounded-md shadow-sm hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-offset-1 font-medium text-sm"
                    >
                      {view === "signup" ? "Login" : "Create Account"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return view === "initial" ? renderInitial() : renderAuthForm();
};

export default AdminLoginPage;