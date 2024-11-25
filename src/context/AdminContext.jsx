import { createContext } from "react";
import { useState } from "react";
export const AdminContext = createContext();
import axios from "axios";
import { toast } from "react-toastify";
import { useCallback } from "react";
const AdminContextProvider = (props) => {
  const backendUrl = "https://localhost:7235/";
  const [aToken, setAToken] = useState(localStorage.getItem("aToken") || "");
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [dashData, setDashData] = useState(false);
  const [specializations, setSpecializations] = useState([]);
  const [patients, setPatients] = useState([])
  const [patientAppointment, setPatientAppointment] = useState([])  
    // Trạng thái phân trang
    const [page, setPage] = useState(1); // Trang hiện tại
    const [pageSize] = useState(5); // Số bản ghi mỗi trang
    const [totalPages, setTotalPages] = useState(0); // Tổng số trang

    const getAllPatients = useCallback(async () => {
      const response = await axios.get(
        `https://localhost:7235/api/Patients/Get-all`
      );
      
      const data = await response.data;
      
      if (response.status === 200) {
        setPatients(data);
      } else {
        toast.error(data.message);
      }
    }, []);
  const getAllDoctors = useCallback(async () => {
    try {
      const data = await axios.get("https://localhost:7235/api/Doctor");

      if (data.data.length > 0) {
        setDoctors(JSON.parse(JSON.stringify(data.data, null, 2)));
      }
    } catch (err) {
      console.log(err);
    }
  },[]);
  const getAllSpecializations = useCallback(async () => {
    const data = await axios.get("https://localhost:7235/api/Specialization");
    if (data.data.length > 0) {
      setSpecializations(JSON.parse(JSON.stringify(data.data, null, 2)));
    }
  },[]);
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
  const getDoctorAppointments = useCallback(async (email) => {
    try {
      const response = await fetch(
        `https://localhost:7235/api/Appointment/get-by-doctor-email/${email}`
      );
      const data = await response.json();
      if (data.length > 0) {
        setAppointments(data);
      }
    } catch (error) {
      console.error("Error fetching doctor appointments:", error.message);
    }
  }, []);
  
   // Hàm lấy danh sách lịch hẹn với phân trang
   const getAllAppointments = useCallback(async () => {
    const skip = (page - 1) * pageSize; // Tính số bản ghi cần bỏ qua
    const response = await fetch(
      `https://localhost:7235/api/Appointment/getallappointments?skip=${skip}&pageSize=${pageSize}`
    );
    const data = await response.json();

    if (response.status === 200) {
      setAppointments(data.data);
      setTotalPages(data.metadata.totalPages); // Cập nhật tổng số trang
    } else {
      toast.error(data.message);
    }
  }, [aToken, page, pageSize, setAppointments]);
    
    
    

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
    doctors,
    setDoctors,
    getAllSpecializations,
    specializations,
    addSpecialization,
    deleteSpecialization,
    getDoctorAppointments,
    page,setPage, totalPages,
    getAllPatients,
    patients,
    setTotalPages,
    pageSize,
    patientAppointment, setPatientAppointment
  };
  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};
export default AdminContextProvider;
