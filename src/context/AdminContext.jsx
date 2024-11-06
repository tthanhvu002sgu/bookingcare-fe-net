import { createContext } from "react";
import { useState } from "react";
export const AdminContext = createContext();
import axios from "axios";
import { toast } from "react-toastify";
const AdminContextProvider = (props) => {
  const backendUrl =
    "https://localhost:7235/";
  const [aToken, setAToken] = useState(localStorage.getItem("aToken") || "");
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments ] = useState([]);
    const [dashData, setDashData] = useState(false)


    
  const getAllDoctors = async () => {
    const data = await axios.post(
      backendUrl + "api/admin/get-all-doctors",
      {},
      { headers: { aToken } }
    );
    if (data.success) {
      setDoctors(data.doctors);
    } else {
      toast.error(data.message);
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
  }

  const cancelAppointment = async () => {
    const data = await axios.post(
      backendUrl + "api/admin/cancel-appointment",
      {},
      { headers: { aToken } }
    );
    if (data.success) {
        getAllAppointments()
    } else {
      toast.error(data.message);
    }
  }

  const getDashData = async () => {
    const data = await axios.post(
        backendUrl + "api/admin/get-dashboard-data",
        {},
        { headers: { aToken } }
        );
    if (data.success) {
        setDashData(data)
    } else {
        toast.error(data.message);
    }

  }

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
    getDashData
};
  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};
export default AdminContextProvider;
