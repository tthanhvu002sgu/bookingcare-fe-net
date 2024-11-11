import { createContext } from "react";
import { useState } from "react";
export const AdminContext = createContext();
import axios from "axios";
import { toast } from "react-toastify";
const AdminContextProvider = (props) => {
  const backendUrl = "https://localhost:7235/";
  const [aToken, setAToken] = useState(localStorage.getItem("aToken") || "");
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [dashData, setDashData] = useState(false);
  const [specializations, setSpecializations] = useState([]);

  const getAllDoctors = async () => {
    try{
      const data = await axios.get("https://localhost:7235/api/Doctor");

      if (data.data.length > 0) {
        setDoctors(JSON.parse(JSON.stringify(data.data, null, 2)));
      } 
    } catch(err){
      console.log(err);
    }
   
  };
  const getAllSpecializations = async () => {
    const data = await axios.get("https://localhost:7235/api/Specialization");
    if (data.data.length > 0) {
      setSpecializations(JSON.parse(JSON.stringify(data.data, null, 2)));
    }
  };
  const deleteSpecialization = async (name) => {
    try {
      const response = await axios.delete(
        `https://localhost:7235/api/Specialization/${name}`,
        name,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.success) {
        getAllSpecializations();
        toast.success(`${name} deleted successfully`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const addSpecialization = async (name) => {
    try {
      const data = { specialization: name };
      const response = await axios.post(
        "https://localhost:7235/api/Specialization",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.success) {
        getAllSpecializations();
        toast.success(`${name} added successfully`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getAllAppointments = async () => {
    const data = await axios.post(
      backendUrl + "api/admin/get-all-appointments",
      {},
      { headers: { aToken } }
    );
    if (data.success) {
      setDoctors(data.appointments);
    } else {
      toast.error(data.message);
    }
  };

  const cancelAppointment = async () => {
    const data = await axios.post(
      backendUrl + "api/admin/cancel-appointment",
      {},
      { headers: { aToken } }
    );
    if (data.success) {
      getAllAppointments();
    } else {
      toast.error(data.message);
    }
  };

  const getDashData = async () => {
    const data = await axios.post(
      backendUrl + "api/admin/get-dashboard-data",
      {},
      { headers: { aToken } }
    );
    if (data.success) {
      setDashData(data);
    } else {
      toast.error(data.message);
    }
  };

  const value = {
    aToken,
    setAToken,
    backendUrl,
    getAllDoctors,
    appointments,
    setAppointments,
    getAllAppointments,
    cancelAppointment,
    dashData,
    getDashData,
    doctors,
    setDoctors,
    getAllSpecializations,
    specializations,
    addSpecialization,
    deleteSpecialization
  };
  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};
export default AdminContextProvider;
