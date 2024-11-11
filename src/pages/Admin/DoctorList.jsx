import { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { assets } from "../../assets/assets";
import axios from "axios";
const DoctorList = () => {
  const { doctors, aToken, getAllDoctors } = useContext(AdminContext);

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
      console.log(response);
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
                className="bg-indigo-50 group-hover:bg-primary transition-all duration-200"
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
              <div className="px-4 mt-2 flex items-center text-sm gap-1">
                <input
                  className="w-6 h-6"
                  type="checkbox"
                  onChange={(e) =>
                    handleAvailabilityChange(doctor.email, e.target.checked)
                  }
                  checked={doctor.isAvailable}
                />
                <p>Available</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DoctorList;
