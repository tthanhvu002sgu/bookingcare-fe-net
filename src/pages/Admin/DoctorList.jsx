import { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import { assets } from "../../assets/assets";
import axios from "axios";
const DoctorList = () => {
  const {
    doctors,
    aToken,
    getAllDoctors,
    getAllSpecializations,
    specializations,
  } = useContext(AdminContext);
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [formData, setFormData] = useState({});

  const handleEditClick = (doctor) => {
    getAllSpecializations();
    setEditingDoctor(doctor);
    setFormData({ ...doctor });
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdateDoctor = async () => {
    try {
      await axios.put(
        `https://localhost:7235/api/Doctor/update?email=${formData.email}`,
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      alert("Doctor updated successfully!");
      setEditingDoctor(null);
      getAllDoctors();
    } catch (err) {
      console.error("Error updating doctor:", err);
    }
  };
  const handleAvailabilityChange = async (email, isAvailable) => {
    console.log(`isAvailable: ${isAvailable}`);

    try {
      let response = await axios.put(
        `https://localhost:7235/api/Doctor/update-availability?doctorEmail=${email}&isAvailable=${isAvailable}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        console.log(response.data);
        await getAllDoctors()

      }
    } catch (err) {
      console.error("Error updating doctor availability:", err);
    }
  };

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken, getAllDoctors]);
  return (
    <div className="m-5 max-h-[90vh] overflow-y-scroll">
      <h1 className="text-lg font-medium">All Doctors</h1>
      <div className="flex w-full flex-wrap gap-4 pt-5 gap-y-6">
        {doctors.map((doctor, index) => {
          return (
            <div
              className="border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group"
              key={index}
            >
              <img
                className="bg-indigo-50 group-hover:bg-primary transition-all duration-200 h-[270px] w-[200px] object-contain"
                src={doctor.doctorImg ? doctor.doctorImg : assets.doctor_avatar}
                alt={doctor.doctorImg}
              />
              <div className="p-4 ">
                <p className="text-neutral-800 text-lg font-medium">
                  {doctor.doctorName}
                </p>
                <p className="text-zinc-600 text-sm">
                  {doctor.specializationName}
                </p>
              </div>
              <div className="px-4 mt-2 mb-5 flex items-center text-sm gap-1">
                
                <div className="mt-2 w-full flex items-center justify-between text-sm gap-1">
                  <button
                    className={`px-3 py-1 rounded ${doctor.isAvailable ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-700'
                      }`}
                    onClick={() => handleAvailabilityChange(doctor.email, !doctor.isAvailable)}
                  >
                    {doctor.isAvailable ? 'Available' : 'Unavailable'}
                  </button>
                  <button
                    className="bg-green-500 text-white px-3 py-1 rounded"
                    onClick={() => handleEditClick(doctor)}
                  >
                    Edit
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>
      {
        editingDoctor && (
          <>
            {/* Overlay */}
            <div className="fixed inset-0 bg-black bg-opacity-0 z-10 transition-opacity duration-500 ease-in-out opacity-100"></div>
            {/* Form */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded shadow-lg z-20 w-[400px] transition-opacity duration-500 ease-in-out opacity-100">
              <h2 className="text-lg font-medium mb-4">
                Edit Doctor: {editingDoctor.doctorName}
              </h2>
              <form>
                <label className="block mb-2">Name:</label>
                <input
                  type="text"
                  name="doctorName"
                  value={formData.doctorName || ""}
                  onChange={handleInputChange}
                  className="block border p-2 rounded w-full mb-4"
                />
                <label className="block mb-2">Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email || ""}
                  onChange={handleInputChange}
                  className="block border p-2 rounded w-full mb-4"
                  readOnly
                />
                <label className="block mb-2">Specialization:</label>
                <select
                  name="specializationName"
                  value={formData.specializationName || ""}
                  onChange={handleInputChange}
                  className="block border p-2 rounded w-full mb-4"
                >
                  {specializations.map((spec) => (
                    <option key={spec.id} value={spec.name}>
                      {spec.specialization}
                    </option>
                  ))}
                </select>
                <label className="block mb-2">Booking Fee:</label>
                <input
                  type="number"
                  name="bookingFee"
                  value={formData.bookingFee || ""}
                  onChange={handleInputChange}
                  className="block border p-2 rounded w-full mb-4"
                />
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={handleUpdateDoctor}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingDoctor(null)}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </>
        )
      }
    </div >
  );
};

export default DoctorList;
