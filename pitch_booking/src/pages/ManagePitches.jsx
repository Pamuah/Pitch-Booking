import React, { useState } from "react";
import AdminLayout from "../components/AdminLayout";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Check, 
  X, 
  Calendar, 
  Clock, 
  Users, 
  DollarSign, 
  MapPin, 
  Image as ImageIcon,
  Upload
} from "lucide-react";

const ManagePitches = () => {
  const [showAddPitchForm, setShowAddPitchForm] = useState(false);
  const [editingPitchId, setEditingPitchId] = useState(null);
  const [pitches, setPitches] = useState([
    {
      id: 1,
      name: "Main Pitch",
      type: "11-a-side",
      surface: "Natural Grass",
      dimensions: "105m x 68m",
      hourlyRate: 120,
      availability: "8:00 AM - 10:00 PM",
      features: ["Floodlights", "Changing Rooms", "Spectator Area"],
      image: "https://images.unsplash.com/photo-1520412099551-62b6bafeb5bb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80",
      status: "Available"
    },
    {
      id: 2,
      name: "Pitch A",
      type: "5-a-side",
      surface: "Artificial Turf",
      dimensions: "40m x 20m",
      hourlyRate: 60,
      availability: "8:00 AM - 11:00 PM",
      features: ["Floodlights", "Indoor"],
      image: "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80",
      status: "In Use"
    },
    {
      id: 3,
      name: "Pitch B",
      type: "7-a-side",
      surface: "Artificial Turf",
      dimensions: "60m x 40m",
      hourlyRate: 80,
      availability: "9:00 AM - 10:00 PM",
      features: ["Floodlights", "Changing Rooms"],
      image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1293&q=80",
      status: "Maintenance"
    }
  ]);
  const [newPitch, setNewPitch] = useState({
    name: "",
    type: "5-a-side",
    surface: "Artificial Turf",
    dimensions: "",
    hourlyRate: "",
    availability: "8:00 AM - 10:00 PM",
    features: [],
    image: "",
    status: "Available"
  });

  const handleAddPitch = () => {
    setPitches([...pitches, { ...newPitch, id: Date.now() }]);
    setNewPitch({
      name: "",
      type: "5-a-side",
      surface: "Artificial Turf",
      dimensions: "",
      hourlyRate: "",
      availability: "8:00 AM - 10:00 PM",
      features: [],
      image: "",
      status: "Available"
    });
    setShowAddPitchForm(false);
  };

  const handleEditPitch = (id) => {
    setEditingPitchId(id);
    const pitchToEdit = pitches.find(pitch => pitch.id === id);
    setNewPitch({ ...pitchToEdit });
  };

  const handleUpdatePitch = () => {
    setPitches(pitches.map(pitch => 
      pitch.id === editingPitchId ? { ...newPitch } : pitch
    ));
    setEditingPitchId(null);
    setNewPitch({
      name: "",
      type: "5-a-side",
      surface: "Artificial Turf",
      dimensions: "",
      hourlyRate: "",
      availability: "8:00 AM - 10:00 PM",
      features: [],
      image: "",
      status: "Available"
    });
  };

  const handleDeletePitch = (id) => {
    setPitches(pitches.filter(pitch => pitch.id !== id));
  };

  const handleFeatureToggle = (feature) => {
    if (newPitch.features.includes(feature)) {
      setNewPitch({
        ...newPitch,
        features: newPitch.features.filter(f => f !== feature)
      });
    } else {
      setNewPitch({
        ...newPitch,
        features: [...newPitch.features, feature]
      });
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Available":
        return "bg-green-100 text-green-800";
      case "In Use":
        return "bg-blue-100 text-blue-800";
      case "Maintenance":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <AdminLayout>
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 flex-shrink-0 overflow-y-auto">
          <div className="p-4">
            <div className="mb-6">
              <p className="text-xs uppercase text-gray-500 font-semibold mb-2">Pitch Management</p>
              <nav className="space-y-1">
                <button
                  onClick={() => setShowAddPitchForm(true)}
                  className="flex items-center w-full p-2 rounded-lg text-gray-600 hover:bg-gray-100"
                >
                  <Plus size={18} className="mr-3" />
                  <span>Add New Pitch</span>
                </button>
                <button className="flex items-center w-full p-2 rounded-lg text-gray-600 hover:bg-gray-100">
                  <Calendar size={18} className="mr-3" />
                  <span>Availability</span>
                </button>
                <button className="flex items-center w-full p-2 rounded-lg text-gray-600 hover:bg-gray-100">
                  <Clock size={18} className="mr-3" />
                  <span>Operating Hours</span>
                </button>
                <button className="flex items-center w-full p-2 rounded-lg text-gray-600 hover:bg-gray-100">
                  <DollarSign size={18} className="mr-3" />
                  <span>Pricing</span>
                </button>
              </nav>
            </div>

            <div className="mb-6">
              <p className="text-xs uppercase text-gray-500 font-semibold mb-2">Maintenance</p>
              <nav className="space-y-1">
                <button className="flex items-center w-full p-2 rounded-lg text-gray-600 hover:bg-gray-100">
                  <Calendar size={18} className="mr-3" />
                  <span>Schedule Maintenance</span>
                </button>
                <button className="flex items-center w-full p-2 rounded-lg text-gray-600 hover:bg-gray-100">
                  <Clock size={18} className="mr-3" />
                  <span>Maintenance History</span>
                </button>
              </nav>
            </div>
          </div>
        </aside>
        
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Manage Pitches</h1>
              <button
                onClick={() => setShowAddPitchForm(true)}
                className="flex items-center bg-green-300 hover:bg-green-400 text-black px-4 py-2 rounded"
              >
                <Plus size={18} className="mr-2" />
                Add New Pitch
              </button>
            </div>

            {/* Add/Edit Pitch Form */}
            {(showAddPitchForm || editingPitchId) && (
              <div className="bg-white p-6 rounded-lg shadow mb-6">
                <h2 className="text-xl font-bold mb-4">
                  {editingPitchId ? "Edit Pitch" : "Add New Pitch"}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Pitch Name
                      </label>
                      <input
                        type="text"
                        value={newPitch.name}
                        onChange={(e) => setNewPitch({ ...newPitch, name: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-300"
                        placeholder="e.g. Main Pitch"
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Pitch Type
                      </label>
                      <select
                        value={newPitch.type}
                        onChange={(e) => setNewPitch({ ...newPitch, type: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-300"
                      >
                        <option value="5-a-side">5-a-side</option>
                        <option value="7-a-side">7-a-side</option>
                        <option value="11-a-side">11-a-side</option>
                      </select>
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Surface Type
                      </label>
                      <select
                        value={newPitch.surface}
                        onChange={(e) => setNewPitch({ ...newPitch, surface: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-300"
                      >
                        <option value="Artificial Turf">Artificial Turf</option>
                        <option value="Natural Grass">Natural Grass</option>
                        <option value="Indoor">Indoor</option>
                      </select>
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Dimensions
                      </label>
                      <input
                        type="text"
                        value={newPitch.dimensions}
                        onChange={(e) => setNewPitch({ ...newPitch, dimensions: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-300"
                        placeholder="e.g. 40m x 20m"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Hourly Rate (£)
                      </label>
                      <input
                        type="number"
                        value={newPitch.hourlyRate}
                        onChange={(e) => setNewPitch({ ...newPitch, hourlyRate: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-300"
                        placeholder="e.g. 60"
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Availability
                      </label>
                      <input
                        type="text"
                        value={newPitch.availability}
                        onChange={(e) => setNewPitch({ ...newPitch, availability: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-300"
                        placeholder="e.g. 8:00 AM - 10:00 PM"
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Status
                      </label>
                      <select
                        value={newPitch.status}
                        onChange={(e) => setNewPitch({ ...newPitch, status: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-300"
                      >
                        <option value="Available">Available</option>
                        <option value="In Use">In Use</option>
                        <option value="Maintenance">Maintenance</option>
                      </select>
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Image URL
                      </label>
                      <input
                        type="text"
                        value={newPitch.image}
                        onChange={(e) => setNewPitch({ ...newPitch, image: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-300"
                        placeholder="Enter image URL"
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Features
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {["Floodlights", "Changing Rooms", "Spectator Area", "Indoor", "Parking", "Equipment Rental"].map((feature) => (
                      <button
                        key={feature}
                        type="button"
                        onClick={() => handleFeatureToggle(feature)}
                        className={`px-3 py-1 rounded-full text-sm ${
                          newPitch.features.includes(feature)
                            ? "bg-green-300 text-black"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {feature}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end space-x-2 mt-6">
                  <button
                    onClick={() => {
                      setShowAddPitchForm(false);
                      setEditingPitchId(null);
                    }}
                    className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={editingPitchId ? handleUpdatePitch : handleAddPitch}
                    className="px-4 py-2 bg-green-300 rounded text-black hover:bg-green-400"
                  >
                    {editingPitchId ? "Update Pitch" : "Add Pitch"}
                  </button>
                </div>
              </div>
            )}

            {/* Pitches List */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Pitch
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Surface
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Hourly Rate
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {pitches.map((pitch) => (
                      <tr key={pitch.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-md overflow-hidden flex-shrink-0">
                              {pitch.image ? (
                                <img src={pitch.image} alt={pitch.name} className="h-full w-full object-cover" />
                              ) : (
                                <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                                  <ImageIcon size={16} className="text-gray-400" />
                                </div>
                              )}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{pitch.name}</div>
                              <div className="text-sm text-gray-500">{pitch.dimensions}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {pitch.type}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {pitch.surface}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          £{pitch.hourlyRate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(pitch.status)}`}>
                            {pitch.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEditPitch(pitch.id)}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              onClick={() => handleDeletePitch(pitch.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </AdminLayout>
  );
};

export default ManagePitches;