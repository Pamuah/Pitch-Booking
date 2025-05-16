import React from "react";

const PopUpForm = ({ show, onClose }) => {
  const [name, setName] = React.useState("");
  const [contact, setContact] = React.useState("");

  const handleSubmit = () => {
    alert(`Name: ${name}\nContact: ${contact}`);
    setName("");
    setContact("");
    onClose(); // Close the modal
  };

  if (!show) return null; // Don't render modal if show is false

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-96 shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Enter Your Info</h2>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 mb-3 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="Contact Info"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
        <button
          onClick={onClose}
          className="w-full mt-2 text-sm text-gray-500 hover:underline"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default PopUpForm;
