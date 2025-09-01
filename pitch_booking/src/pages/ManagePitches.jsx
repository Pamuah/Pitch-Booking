import React, { useState, useEffect } from "react";
import AdminLayout from "../components/AdminLayout";
import { PostData } from "../api services/post_service";
import { sendControlData } from "../api services/get_service";
import { patchData } from "../api services/patch_service";
import { deleteData } from "../api services/delete_service";
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
  Upload,
} from "lucide-react";

const ManagePitches = () => {
  const [showAddPitchForm, setShowAddPitchForm] = useState(false);
  const [editingPitchId, setEditingPitchId] = useState(null);
  const [pitches, setPitches] = useState([]);
  const [newPitch, setNewPitch] = useState({
    name: "",
    type: "5-a-side",
    location: "",
    pricePerHour: "",
    features: [],
    startTime: "08:00",
    closingTime: "22:00",
    image: null,
  });

  const getMyPitches = async () => {
    try {
      const response = await sendControlData({}, "/api/owner/my-pitches", true);
      console.log("Owner's pitches:", response.data);
      // setting the response data to the pitches state to print out in the UI
      setPitches(response.data);
    } catch (err) {
      console.error("Failed to fetch pitches:", err.message);
    }
  };

  useEffect(() => {
    getMyPitches();
  }, []);

  //ADD new pitches
  const SubmitNewPitches = async () => {
    const formData = new FormData();

    formData.append("name", newPitch.name);
    formData.append("location", newPitch.location);
    formData.append("type", newPitch.type);
    formData.append("pricePerHour", newPitch.pricePerHour);
    formData.append("openingTime", newPitch.startTime);
    formData.append("closingTime", newPitch.closingTime);

    if (newPitch.image instanceof File) {
      formData.append("image", newPitch.image);
    } else {
      console.warn("Image is not a valid file.");
    }

    newPitch.features.forEach((feature) => {
      formData.append("features", feature);
    });

    try {
      const response = await PostData(formData, "/api/pitches", true);
      console.log("Pitch submitted:", response);
      alert("Pitch submitted successfully!");
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Submission failed. Please try again.");
    }
  };

  // Get Pitches
  const SubmitGetPitches = async () => {
    try {
      const res = await sendControlData(
        { someParam: "value" },
        "/api/owner/my-pitches",
        true
      );
      setPitches(res.data);
    } catch (err) {
      console.error("Failed to fetch pitches:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditPitch = (id) => {
    setEditingPitchId(id);
    const pitchToEdit = pitches.find((pitch) => pitch._id === id);

    if (!pitchToEdit) return;

    setNewPitch({
      id: pitchToEdit._id || "",
      name: pitchToEdit.name || "",
      type: pitchToEdit.type || "",
      location: pitchToEdit.location || "",
      features: pitchToEdit.features || [],
      pricePerHour: pitchToEdit.pricePerHour || "",
      openingTime: pitchToEdit.startTime || "08:00",
      closingTime: pitchToEdit.closingTime || "22:00",
      image: "",
    });

    setShowAddPitchForm(true);
  };

  // Update Pitches
  const handleUpdatePitch = async () => {
    const token = localStorage.getItem("token");

    try {
      const formData = createFormDataFromPitch(newPitch);

      const result = await patchData(
        `/api/pitches/${editingPitchId}`,
        formData,
        token,
        true // indicates multipart/form-data
      );

      const { data: updatedPitchData } = result;

      console.log("Pitch updated successfully:", updatedPitchData);

      // Updating local UI
      setPitches(
        pitches.map((pitch) =>
          pitch._id === editingPitchId ? { ...updatedPitchData } : pitch
        )
      );

      // Resetting the form
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
        status: "Available",
      });
    } catch (error) {
      console.error("Update failed:", error.message);
    }
  };

  const createFormDataFromPitch = (pitch) => {
    const formData = new FormData();
    formData.append("name", pitch.name);
    formData.append("type", pitch.type);
    formData.append("location", pitch.location || "");
    formData.append("openingTime", pitch.startTime || "");
    formData.append("closingTime", pitch.closingTime || "");
    formData.append("pricePerHour", pitch.pricePerHour || "");

    (pitch.features || []).forEach((feature) => {
      formData.append("features[]", feature);
    });

    if (pitch.image && typeof pitch.image === "object") {
      formData.append("image", pitch.image);
    }

    return formData;
  };

  //Deleting pitches
  const handleDeletePitch = async (pitchId) => {
    const token = localStorage.getItem("token");

    try {
      await deleteData(`/api/pitches/${pitchId}`, token);
      console.log("Pitch deleted successfully");
      alert("Pitch deleted successfully");

      // Update UI
      setPitches((prev) => prev.filter((pitch) => pitch._id !== pitchId));
    } catch (error) {
      console.error("Delete failed:", error.message);
      alert("Delete failed. Please try again.");
    }
  };

  const handleFeatureToggle = (feature) => {
    if (newPitch.features.includes(feature)) {
      setNewPitch({
        ...newPitch,
        features: newPitch.features.filter((f) => f !== feature),
      });
    } else {
      setNewPitch({
        ...newPitch,
        features: [...newPitch.features, feature],
      });
    }
  };

  return (
    <AdminLayout>
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 flex-shrink-0 overflow-y-auto">
          <div className="p-4">
            <div className="mb-6">
              <p className="text-xs uppercase text-gray-500 font-semibold mb-2">
                Pitch Management
              </p>
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
              <p className="text-xs uppercase text-gray-500 font-semibold mb-2">
                Maintenance
              </p>
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
                        value={newPitch.name || ""}
                        onChange={(e) =>
                          setNewPitch({ ...newPitch, name: e.target.value })
                        }
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-300"
                        placeholder="e.g. Main Pitch"
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Pitch Type
                      </label>
                      <select
                        value={newPitch.type || ""}
                        onChange={(e) =>
                          setNewPitch({ ...newPitch, type: e.target.value })
                        }
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-300"
                      >
                        <option value="5-a-side">5-a-side</option>
                        <option value="7-a-side">7-a-side</option>
                        <option value="11-a-side">11-a-side</option>
                      </select>
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Location
                      </label>
                      <input
                        type="text"
                        value={newPitch.location || ""}
                        onChange={(e) =>
                          setNewPitch({
                            ...newPitch,
                            location: e.target.value,
                          })
                        }
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-300"
                        placeholder="e.g. Ablekuma"
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
                        value={newPitch.pricePerHour || ""}
                        onChange={(e) =>
                          setNewPitch({
                            ...newPitch,
                            pricePerHour: e.target.value,
                          })
                        }
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-300"
                        placeholder="e.g. 60"
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Add Image of Pitch
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            setNewPitch((prev) => ({ ...prev, image: file }));
                          }
                        }}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-300"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Opening Time
                      </label>
                      <input
                        type="time"
                        value={newPitch.openingTime || ""}
                        onChange={(e) =>
                          setNewPitch({
                            ...newPitch,
                            openingTime: e.target.value,
                          })
                        }
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Closing Time
                      </label>
                      <input
                        type="time"
                        value={newPitch.closingTime || ""}
                        onChange={(e) =>
                          setNewPitch({
                            ...newPitch,
                            closingTime: e.target.value,
                          })
                        }
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-300"
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Features
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "floodlights",
                      "lockerRooms",
                      "parking",
                      "stands",
                      "wifi",
                    ].map((feature) => (
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
                    onClick={
                      editingPitchId ? handleUpdatePitch : SubmitNewPitches
                    }
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
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Pitch
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Type
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Availability
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Hourly Rate
                      </th>

                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {pitches.map((pitch) => (
                      <tr key={pitch._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-md overflow-hidden flex-shrink-0">
                              {pitch.image ? (
                                <img
                                  src={pitch.image}
                                  alt={pitch.name}
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                                  <ImageIcon
                                    size={16}
                                    className="text-gray-400"
                                  />
                                </div>
                              )}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {pitch.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {pitch.location}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {pitch.type}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {pitch.openingTime}-{pitch.closingTime}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          £{pitch.pricePerHour}
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEditPitch(pitch._id)}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              onClick={() => handleDeletePitch(pitch._id)}
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
