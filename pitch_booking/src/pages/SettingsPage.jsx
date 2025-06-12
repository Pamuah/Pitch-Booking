import React, { useState } from "react";
import { CreditCard, Bell, Shield, User } from "lucide-react";
import AdminLayout from "../components/AdminLayout";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("payment");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <AdminLayout>
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Settings</h1>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="border-b">
                <div className="flex overflow-x-auto">
                  <button
                    onClick={() => handleTabChange("payment")}
                    className={`px-6 py-3 font-medium text-sm flex items-center border-b-2 ${
                      activeTab === "payment"
                        ? "border-green-300 text-green-300"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    <CreditCard size={18} className="mr-2" />
                    Payment Settings
                  </button>
                  <button
                    onClick={() => handleTabChange("notification")}
                    className={`px-6 py-3 font-medium text-sm flex items-center border-b-2 ${
                      activeTab === "notification"
                        ? "border-green-300 text-green-300"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    <Bell size={18} className="mr-2" />
                    Notification Settings
                  </button>
                  <button
                    onClick={() => handleTabChange("security")}
                    className={`px-6 py-3 font-medium text-sm flex items-center border-b-2 ${
                      activeTab === "security"
                        ? "border-green-300 text-green-300"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    <Shield size={18} className="mr-2" />
                    Security Settings
                  </button>
                  <button
                    onClick={() => handleTabChange("profile")}
                    className={`px-6 py-3 font-medium text-sm flex items-center border-b-2 ${
                      activeTab === "profile"
                        ? "border-green-300 text-green-300"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    <User size={18} className="mr-2" />
                    Profile Settings
                  </button>
                </div>
              </div>
              
              {/* Tab Content */}
              <div className="p-6">
                {activeTab === "payment" && (
                  <div>
                    <h3 className="text-lg font-medium mb-4">Payment Settings</h3>
                    <p className="text-gray-600">Manage your payment methods and billing information.</p>
                  </div>
                )}
                {activeTab === "notification" && (
                  <div>
                    <h3 className="text-lg font-medium mb-4">Notification Settings</h3>
                    <p className="text-gray-600">Configure your notification preferences.</p>
                  </div>
                )}
                {activeTab === "security" && (
                  <div>
                    <h3 className="text-lg font-medium mb-4">Security Settings</h3>
                    <p className="text-gray-600">Update your password and manage security preferences.</p>
                  </div>
                )}
                {activeTab === "profile" && (
                  <div>
                    <h3 className="text-lg font-medium mb-4">Profile Settings</h3>
                    <p className="text-gray-600">Edit your profile information.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </AdminLayout>
  );
};

export default SettingsPage;