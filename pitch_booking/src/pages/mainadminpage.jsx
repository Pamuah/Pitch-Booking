"use client"
import { useState, useEffect } from "react"
import { Users, Calendar, User, XCircle, MapPin, Plus, Edit, AlertCircle, Settings, CheckCircle2, Trash2, X } from "lucide-react"
import axios from "axios"

// API base URL
const API_BASE_URL = "https://football-park-management.onrender.com/api"

const MainAdminPage = () => {
  const [activeTab, setActiveTab] = useState("userControl")
  const [userFilter, setUserFilter] = useState("all")
  const [pitchFilter, setPitchFilter] = useState("all")
  const [bookingFilter, setBookingFilter] = useState("all")
  const [requestFilter, setRequestFilter] = useState("pending")
  const [activeSettingsMenu, setActiveSettingsMenu] = useState(null)

  // Data states
  const [users, setUsers] = useState([])
  const [pitches, setPitches] = useState([])
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState({
    users: false,
    pitches: false,
    bookings: false,
  })
  const [error, setError] = useState({
    users: null,
    pitches: null,
    bookings: null,
  })

  // Pitch management states
  const [showAddPitchForm, setShowAddPitchForm] = useState(false)
  const [editingPitchId, setEditingPitchId] = useState(null)
  const [newPitch, setNewPitch] = useState({
    name: "",
    location: "",
    type: "5-a-side",
    isIndoor: false,
    pricePerHour: "",
    images: [],
    features: [],
    ownerEmail: ""
  })
  const [uploadingImages, setUploadingImages] = useState(false)

  // Auth state
  const [authToken, setAuthToken] = useState(null)
  const [userRole, setUserRole] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const initializeAuth = () => {
      const token =
        localStorage.getItem("authToken") || localStorage.getItem("token") || localStorage.getItem("accessToken")

      const role = localStorage.getItem("userRole") || localStorage.getItem("role")

      console.log("Retrieved token:", token ? "Token found" : "No token found")
      console.log("Retrieved role:", role)

      if (token) {
        setAuthToken(token)
        setUserRole(role)
        setIsAuthenticated(true)
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
      } else {
        console.warn("No authentication token found in localStorage")
        setIsAuthenticated(false)
      }
    }

    initializeAuth()
  }, [])

  const createAuthenticatedRequest = (token) => {
    return axios.create({
      baseURL: API_BASE_URL,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
  }

  useEffect(() => {
    console.log("Before fetched data - Auth status:", isAuthenticated, "Token:", authToken ? "Present" : "Missing")

    if (!isAuthenticated || !authToken) {
      console.warn("Cannot fetch data: Not authenticated or no token")
      return
    }

    const fetchData = async () => {
      try {
        const authAxios = createAuthenticatedRequest(authToken)
        setError((prev) => ({ ...prev, [activeTab]: null }))

        switch (activeTab) {
          case "userControl":
            setLoading((prev) => ({ ...prev, users: true }))
            try {
              const usersRes = await authAxios.get("/admin/users")
              console.log("Users response:", usersRes.data)
              setUsers(usersRes.data.data || usersRes.data || [])
            } catch (err) {
              console.error("Error fetching users:", err.response?.data || err.message)
              throw err
            } finally {
              setLoading((prev) => ({ ...prev, users: false }))
            }
            break

          case "managePitches":
            setLoading((prev) => ({ ...prev, pitches: true }))
            try {
              const endpoint =
                userRole === "admin"
                  ? "/admin/pitches/pending"
                  : "/admin/pitches"

              const pitchesRes = await authAxios.get(endpoint)
              console.log("Pitches response:", pitchesRes.data)
              setPitches(pitchesRes.data.data || pitchesRes.data || [])
            } catch (err) {
              console.error("Error fetching pitches:", err.response?.data || err.message)
              throw err
            } finally {
              setLoading((prev) => ({ ...prev, pitches: false }))
            }
            break

          case "manageBookings":
            setLoading((prev) => ({ ...prev, bookings: true }))
            try {
              const bookingsRes = await authAxios.get("/admin/bookings")
              console.log("Bookings response:", bookingsRes.data)
              setBookings(bookingsRes.data.data || bookingsRes.data || [])
            } catch (err) {
              console.error("Error fetching bookings:", err.response?.data || err.message)
              throw err
            } finally {
              setLoading((prev) => ({ ...prev, bookings: false }))
            }
            break
        }
      } catch (err) {
        console.error(`Error fetching ${activeTab} data:`, err)

        if (err.response?.status === 401) {
          console.error("Authentication failed - token may be expired")
          localStorage.removeItem("authToken")
          localStorage.removeItem("token")
          localStorage.removeItem("accessToken")
          setAuthToken(null)
          setIsAuthenticated(false)
          delete axios.defaults.headers.common["Authorization"]
          setError((prev) => ({ ...prev, [activeTab]: "Authentication failed. Please login again." }))
        } else if (err.response?.status === 403) {
          setError((prev) => ({ ...prev, [activeTab]: "Access denied. Insufficient permissions." }))
        } else {
          setError((prev) => ({
            ...prev,
            [activeTab]: err.response?.data?.message || err.message || "An error occurred",
          }))
        }

        setLoading((prev) => ({ ...prev, [activeTab]: false }))
      }
    }

    fetchData()
  }, [activeTab, authToken, userRole, isAuthenticated])

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files)
    if (files.length === 0) return

    alert("Image upload is temporarily disabled. Using placeholder images.")
    
    const placeholderImages = [
      "https://via.placeholder.com/400x300/000000/FFFFFF?text=Pitch+Image+1",
      "https://via.placeholder.com/400x300/000000/FFFFFF?text=Pitch+Image+2"
    ]

    setNewPitch((prev) => ({
      ...prev,
      images: [...prev.images, ...placeholderImages.slice(0, files.length)],
    }))
  }

  const removeImage = (index) => {
    setNewPitch((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }))
  }

  const handleFeatureToggle = (feature) => {
    setNewPitch((prev) => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter((f) => f !== feature)
        : [...prev.features, feature],
    }))
  }

  const handleAddPitch = async () => {
    if (!authToken) {
      alert("Authentication required")
      return
    }

    if (!newPitch.name || !newPitch.location || !newPitch.pricePerHour || !newPitch.ownerEmail) {
      alert("Please fill in all required fields including owner email")
      return
    }

    try {
      const authAxios = createAuthenticatedRequest(authToken)
      console.log("Sending pitch data:", newPitch)
      
      const response = await authAxios.post("/pitches", {
        ...newPitch,
        pricePerHour: Number(newPitch.pricePerHour)
      })
      
      console.log("Add pitch response:", response.data)
      
      setPitches((prev) => [...prev, response.data.data || response.data])
      setShowAddPitchForm(false)
      resetPitchForm()
      alert("Pitch added successfully")
    } catch (err) {
      console.error("Error adding pitch:", err)
      console.error("Error details:", err.response?.data)
      alert(err.response?.data?.message || "Failed to add pitch. Check console for details.")
    }
  }

  const handleUpdatePitch = async () => {
    if (!authToken || !editingPitchId) return

    if (!newPitch.name || !newPitch.location || !newPitch.pricePerHour) {
      alert("Please fill in all required fields")
      return
    }

    try {
      const authAxios = createAuthenticatedRequest(authToken)
      console.log("Sending update data:", newPitch)
      
      const updateData = { ...newPitch }
      delete updateData.images
      
      const response = await authAxios.patch(`/pitches/${editingPitchId}`, {
        ...updateData,
        pricePerHour: Number(updateData.pricePerHour)
      })
      
      console.log("Update pitch response:", response.data)
      
      setPitches((prev) => 
        prev.map((p) => (p._id === editingPitchId ? response.data.data || response.data : p))
      )
      setEditingPitchId(null)
      setShowAddPitchForm(false)
      resetPitchForm()
      alert("Pitch updated successfully")
    } catch (err) {
      console.error("Error updating pitch:", err)
      console.error("Error details:", err.response?.data)
      alert(err.response?.data?.message || "Failed to update pitch. Check console for details.")
    }
  }

  const handleDeletePitch = async (pitchId) => {
    if (!confirm("Are you sure you want to delete this pitch?")) return
    if (!authToken) return

    try {
      const authAxios = createAuthenticatedRequest(authToken)
      await authAxios.delete(`/pitches/${pitchId}`)
      setPitches((prev) => prev.filter((p) => p._id !== pitchId))
      alert("Pitch deleted successfully")
    } catch (err) {
      console.error("Error deleting pitch:", err)
      alert(err.response?.data?.message || "Failed to delete pitch")
    }
  }

  const handleApprovePitch = async (pitchId) => {
    if (!authToken) return

    try {
      const pitchToApprove = pitches.find(p => p._id === pitchId)
      if (!pitchToApprove) {
        alert("Pitch not found")
        return
      }

      const authAxios = createAuthenticatedRequest(authToken)
      await authAxios.patch(`/admin/pitches/${pitchId}/approve`, {
        ownerEmail: pitchToApprove.ownerEmail || pitchToApprove.owner?.email || "admin@example.com"
      })

      setPitches((prev) =>
        prev.map((pitch) =>
          pitch._id === pitchId ? { ...pitch, isApproved: true } : pitch
        )
      )

      alert("Pitch approved successfully")
    } catch (err) {
      console.error("Error approving pitch:", err)
      alert(err.response?.data?.message || "Failed to approve pitch")
    }
  }

  const resetPitchForm = () => {
    setNewPitch({
      name: "",
      location: "",
      type: "5-a-side",
      isIndoor: false,
      pricePerHour: "",
      images: [],
      features: [],
      ownerEmail: ""
    })
  }

  const handleDeleteUser = async (userId) => {
    if (!confirm("Are you sure you want to delete this user?")) return
    if (!authToken) return

    try {
      const authAxios = createAuthenticatedRequest(authToken)
      await authAxios.delete(`/admin/users/${userId}`)
      setUsers((prev) => prev.filter((u) => u._id !== userId))
      alert("User deleted successfully")
    } catch (err) {
      console.error("Error deleting user:", err)
      alert(err.response?.data?.message || "Failed to delete user")
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Authentication Required</h2>
          <p className="text-gray-600 mb-4">Please login to access the admin panel.</p>
          <button
            onClick={() => (window.location.href = "/login")}
            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
          >
            Go to Login
          </button>
        </div>
      </div>
    )
  }

  const renderLoading = () => (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
    </div>
  )

  const renderError = (message) => (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
      <strong className="font-bold">Error!</strong>
      <span className="block sm:inline"> {message}</span>
    </div>
  )

  const renderPitchForm = () => (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">
          {editingPitchId ? "Edit Pitch" : "Add New Pitch"}
        </h3>
        <button
          onClick={() => {
            setShowAddPitchForm(false)
            setEditingPitchId(null)
            resetPitchForm()
          }}
          className="text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Pitch Name *
          </label>
          <input
            type="text"
            value={newPitch.name}
            onChange={(e) => setNewPitch(prev => ({ ...prev, name: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Enter pitch name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location *
          </label>
          <input
            type="text"
            value={newPitch.location}
            onChange={(e) => setNewPitch(prev => ({ ...prev, location: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Enter location"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Type
          </label>
          <select
            value={newPitch.type}
            onChange={(e) => setNewPitch(prev => ({ ...prev, type: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="5-a-side">5-a-side</option>
            <option value="7-a-side">7-a-side</option>
            <option value="11-a-side">11-a-side</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price per Hour (GHS) *
          </label>
          <input
            type="number"
            value={newPitch.pricePerHour}
            onChange={(e) => setNewPitch(prev => ({ ...prev, pricePerHour: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Enter price"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Owner Email *
          </label>
          <input
            type="email"
            value={newPitch.ownerEmail}
            onChange={(e) => setNewPitch(prev => ({ ...prev, ownerEmail: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Enter owner email"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Venue Type
          </label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                checked={!newPitch.isIndoor}
                onChange={() => setNewPitch(prev => ({ ...prev, isIndoor: false }))}
                className="mr-2"
              />
              Outdoor
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                checked={newPitch.isIndoor}
                onChange={() => setNewPitch(prev => ({ ...prev, isIndoor: true }))}
                className="mr-2"
              />
              Indoor
            </label>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Features
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {["Parking", "Changing Rooms", "Showers", "Equipment Rental", "Lighting", "Refreshments"].map((feature) => (
            <label key={feature} className="flex items-center">
              <input
                type="checkbox"
                checked={newPitch.features.includes(feature)}
                onChange={() => handleFeatureToggle(feature)}
                className="mr-2"
              />
              {feature}
            </label>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Images
        </label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageUpload}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          disabled={uploadingImages}
        />
        {uploadingImages && (
          <p className="text-sm text-gray-500 mt-1">Uploading images...</p>
        )}
        
        {newPitch.images.length > 0 && (
          <div className="mt-2 grid grid-cols-3 gap-2">
            {newPitch.images.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={image}
                  alt={`Pitch image ${index + 1}`}
                  className="w-full h-20 object-cover rounded"
                />
                <button
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-end space-x-2 mt-6">
        <button
          onClick={() => {
            setShowAddPitchForm(false)
            setEditingPitchId(null)
            resetPitchForm()
          }}
          className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          onClick={editingPitchId ? handleUpdatePitch : handleAddPitch}
          className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
          disabled={uploadingImages}
        >
          {editingPitchId ? "Update Pitch" : "Add Pitch"}
        </button>
      </div>
    </div>
  )

  const renderTabContent = () => {
    if (loading[activeTab]) return renderLoading()
    if (error[activeTab]) return renderError(error[activeTab])

    switch (activeTab) {
      case "userControl":
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto max-h-[70vh] overflow-y-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50 sticky top-0">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                          No users found
                        </td>
                      </tr>
                    ) : (
                      users.map((user) => (
                        <tr key={user._id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                <User size={16} className="text-gray-600" />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{user.name}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                user.role === "pitch-owner"
                                  ? "bg-purple-100 text-purple-800"
                                  : "bg-blue-100 text-blue-800"
                              }`}
                            >
                              {user.role}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button
                                className="text-red-600 hover:text-red-900"
                                onClick={() => handleDeleteUser(user._id)}
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )

      case "managePitches":
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Pitch Management</h3>
              {!showAddPitchForm && !editingPitchId && (
                <button
                  className="bg-black text-white px-4 py-2 rounded-lg text-sm flex items-center"
                  onClick={() => {
                    setShowAddPitchForm(true)
                    setEditingPitchId(null)
                    resetPitchForm()
                  }}
                >
                  <Plus size={16} className="mr-1" />
                  Add New Pitch
                </button>
              )}
            </div>

            {(showAddPitchForm || editingPitchId) && renderPitchForm()}

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto max-h-[70vh] overflow-y-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50 sticky top-0">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Pitch Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Location
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price/Hour
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {pitches.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                          No pitches found
                        </td>
                      </tr>
                    ) : (
                      pitches.map((pitch) => (
                        <tr key={pitch._id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              {pitch.imageUrl && (
                                <div className="flex-shrink-0 h-10 w-10 rounded-full overflow-hidden">
                                  <img
                                    className="h-full w-full object-cover"
                                    src={pitch.imageUrl || "/placeholder.svg"}
                                    alt={pitch.name}
                                  />
                                </div>
                              )}
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{pitch.name}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pitch.location}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pitch.type}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">GHS {pitch.pricePerHour}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                pitch.isApproved ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {pitch.isApproved ? "Approved" : "Pending"}
                            </span>
                          </td>
                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
  <div className="flex items-center space-x-2">
    {activeSettingsMenu !== pitch._id ? (
      <button
        className="text-gray-600 hover:text-violet-600 p-1 rounded-full hover:bg-gray-100"
        onClick={() => setActiveSettingsMenu(pitch._id)}
      >
        <Settings size={21} />
      </button>
    ) : (
      <>
        {/* Edit Button */}
        <button
          className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
          onClick={() => {
            setEditingPitchId(pitch._id);
            setNewPitch({
              name: pitch.name,
              location: pitch.location,
              type: pitch.type,
              isIndoor: pitch.isIndoor,
              pricePerHour: pitch.pricePerHour,
              images: pitch.imageUrl ? [pitch.imageUrl] : [],
              features: pitch.features || [],
              ownerEmail: pitch.ownerEmail || pitch.owner?.email || ""
            });
            setActiveSettingsMenu(null);
            setShowAddPitchForm(true);
          }}
          title="Edit"
        >
          <Edit size={20} />
        </button>

        {/* Approve Button */}
        <button
          className={`p-1 rounded ${
            pitch.isApproved
              ? "text-gray-400 cursor-not-allowed"
              : "text-green-600 hover:text-green-900 hover:bg-green-50"
          }`}
          onClick={() => {
            if (!pitch.isApproved) {
              handleApprovePitch(pitch._id);
            }
            setActiveSettingsMenu(null);
          }}
          disabled={pitch.isApproved}
          title={pitch.isApproved ? "Already Approved" : "Approve"}
        >
          <CheckCircle2 size={20} />
        </button>

        {/* Disapprove Button */}
        {!pitch.isApproved && (
          <button
            className="text-yellow-600 hover:text-yellow-800 p-1 rounded hover:bg-yellow-50"
            onClick={() => {
              alert("Disapprove functionality will be added when endpoint is available");
              setActiveSettingsMenu(null);
            }}
            title="Disapprove"
          >
            <XCircle size={20} />
          </button>
        )}

        {/* Delete Button */}
        <button
          className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
          onClick={() => {
            if (confirm("Are you sure you want to delete this pitch?")) {
              handleDeletePitch(pitch._id);
            }
            setActiveSettingsMenu(null);
          }}
          title="Delete"
        >
          <Trash2 size={20} />
        </button>

        {/* Close Menu Button */}
        <button
          className="text-gray-600 hover:text-gray-900 p-1 rounded-full hover:bg-gray-100"
          onClick={() => setActiveSettingsMenu(null)}
          title="Close"
        >
          <X size={19} />
        </button>
      </>
    )}
  </div>
</td>

                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )

      case "manageBookings":
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto max-h-[70vh] overflow-y-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50 sticky top-0">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Team Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Phone
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Duration
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total Cost
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {bookings.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                          No bookings found
                        </td>
                      </tr>
                    ) : (
                      bookings.map((booking) => (
                        <tr key={booking._id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {booking.teamName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.email}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.phoneNumber}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.duration} hours</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">GHS {booking.totalCost}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                booking.status === "confirmed"
                                  ? "bg-green-100 text-green-800"
                                  : booking.status === "pending"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"
                              }`}
                            >
                              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="w-full bg-white border-b border-gray-200 flex-shrink-0">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold">Admin Control Panel</h2>
        </div>
        <nav className="flex flex-wrap px-4 py-2 space-x-4">
          <button
            onClick={() => setActiveTab("userControl")}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm ${
              activeTab === "userControl" ? "bg-black text-white" : "hover:bg-gray-100"
            }`}
          >
            <Users size={18} />
            <span>User Control</span>
          </button>
          <button
            onClick={() => setActiveTab("managePitches")}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm ${
              activeTab === "managePitches" ? "bg-black text-white" : "hover:bg-gray-100"
            }`}
          >
            <MapPin size={18} />
            <span>Manage Pitches</span>
          </button>
          <button
            onClick={() => setActiveTab("manageBookings")}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm ${
              activeTab === "manageBookings" ? "bg-black text-white" : "hover:bg-gray-100"
            }`}
          >
            <Calendar size={18} />
            <span>Manage Bookings</span>
          </button>
        </nav>
      </div>

      <main className="flex-1 overflow-hidden p-4 md:p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">
            {activeTab === "userControl" && "User Control"}
            {activeTab === "managePitches" && "Pitch Management"}
            {activeTab === "manageBookings" && "Booking Management"}
          </h1>
        </div>

        <div className="h-full overflow-y-auto">
          {renderTabContent()}
        </div>
      </main>
    </div>
  )
}

export default MainAdminPage