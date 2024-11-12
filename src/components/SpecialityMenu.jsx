import { specialityData } from "../assets/assets";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
const SpecialityMenu = () => {
  const { specializations, getAllSpecializations, getDoctorsBySpecialization, setSelectedSpecialization } = useContext(AppContext);
  
  useEffect(() => {
    getAllSpecializations();
  });
  return (
    <div
      className="flex flex-col items-center gap-4 py-16 text-gray-800"
      id="speciality"
    >
      <h1 className="text-3xl font-medium">Find by Speciality</h1>
      <p className="sm:w1/3 text-center text-sm">
        Simply browse through our extensive list of trusted doctors, schedule
        your appointment hassle-here
      </p>
      <div className="flex sm:justify-center gap-4 pt-5 w-full overflow-scroll">
        {specializations.map((item, index) => {
          return (
            <Link
              onClick={() => getDoctorsBySpecialization(item.specialization)}
              className="flex flex-col items-center text-sm font-semibold text-gray-800 cursor-pointer flex-shrink-0 p-4 rounded-lg shadow-lg hover:shadow-2xl hover:translate-y-[-10px] hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-600 transition-all duration-300 ease-in-out"
              to={`/doctors/${item.specialization}`}
              key={index}
            >
              <p>{item.specialization}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SpecialityMenu;
