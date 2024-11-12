import { createContext } from "react";
import { doctors } from "../assets/assets";
import { useState } from "react";
export const AppContext = createContext();
import { useCallback } from "react";
import axios from "axios";
const AppContextProvider = (props) => {
  const [user, setUser] = useState({});
  const [doctors, setDoctors] = useState([]);
  const [userData, setUserData] = useState({});
  const [specializations, setSpecializations] = useState([]);
  const [doctorsBySpecialization, setDoctorsBySpecialization] = useState([]);
  const [selectedSpecialization, setSelectedSpecialization] = useState(null);
  const getAllSpecializations = useCallback(async () => {
    const data = await axios.get("https://localhost:7235/api/Specialization");
    if (data.data.length > 0) {
      setSpecializations(JSON.parse(JSON.stringify(data.data, null, 2)));
    }
  }, []);
  
  const getUserByEmail = async (user) => {
    const response = await axios.get(
      `https://localhost:7235/api/Patients/${user}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setUserData(response.data);
  };
  const getAllDoctors = async () => {
    const data = await axios.get(
      "https://localhost:7235/api/Doctor",
     
    );
    if (data.data.length > 0) {
      let doctorsFilter = JSON.parse(JSON.stringify(data.data, null, 2)).filter((doctor) => doctor.isAvailable == true);      
      setDoctors(doctorsFilter);
    } 
  };
  const getDoctorsBySpecialization = useCallback(async (specializationName) => {
    try {
      
      setSelectedSpecialization(specializationName)
      const response = await axios.get(`https://localhost:7235/api/Doctor/get-by-specialization?specializationName=${specializationName}`);
      if(response.data.length > 0){
        setDoctorsBySpecialization(response.data);
      } else{
        setDoctorsBySpecialization([]);
      }
    } catch (error) {
      setDoctorsBySpecialization([]);

      console.error("Error fetching doctors by specialization:", error);
    }
  }, []);

  const value = {
    doctors,
    user,
    setUser,
    getUserByEmail,
    userData,
    setUserData,
    getAllDoctors,
    getAllSpecializations,
    specializations,
    getDoctorsBySpecialization,
    doctorsBySpecialization,
    selectedSpecialization
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
