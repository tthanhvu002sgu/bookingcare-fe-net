import { useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Doctors = () => {
  const {
    specializations,
    doctorsBySpecialization,
    getAllSpecializations,
    getDoctorsBySpecialization,
    selectedSpecialization
  } = useContext(AppContext);
  const navigate = useNavigate();
  console.log(selectedSpecialization);
  
  useEffect(() => {
    
    getAllSpecializations();
  }, [getAllSpecializations]);

  return (
    <div>
      <p className="text-gray-600">Browse through the doctors specialist.</p>
      <div className="flex flex-col items-start sm:flex-row gap-5 mt-5">
        <div className="flex flex-col gap-3 text-sm text-gray-600">
          {specializations.map((item, index) => {
            return (
              <p
                onClick={() => {
                  getDoctorsBySpecialization(item.specialization);
                }}
                className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${item.specialization == selectedSpecialization ? "bg-blue-200" : ""}`}
                key={index}
              >
                {item.specialization}
              </p>
            );
          })}
        </div>
        <div className="w-full grid grid-cols-auto gap-4 gap-y-6">
          {doctorsBySpecialization.map((item, index) => {
            return (
              <div
                onClick={() => navigate(`/appointment/${item._id}`)}
                className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
                key={index}
              >
                <img className="bg-blue-50" src={item.doctorImg} alt="" />
                <div className="p-4">
                  <div className="flex items-center gap-2 text-sm text-center text-green-600">
                    <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                    <p>Available</p>
                  </div>
                  <p className="text-gray-900 text-lg font-medium">
                    {item.doctorName}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {item.specializationName}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
