import { createContext } from "react";
import { useState } from "react";
export const AppContext = createContext();
import { useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";
const AppContextProvider = (props) => {
  const [user, setUser] = useState({});
  const [doctors, setDoctors] = useState([]);
  const [userData, setUserData] = useState({});
  const [specializations, setSpecializations] = useState([]);
  const [doctorsBySpecialization, setDoctorsBySpecialization] = useState([]);
  const [selectedSpecialization, setSelectedSpecialization] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [patientId, setPatientId] = useState(null);
  // Trạng thái phân trang
  const [page, setPage] = useState(1); // Trang hiện tại
  const [pageSize] = useState(5); // Số bản ghi mỗi trang
  const [totalPages, setTotalPages] = useState(0); // Tổng số trang
  const cancelAppointment = useCallback(async (patientEmail, date, time) => {
    try {
      const url = `https://localhost:7235/api/Appointment/cancel`;
      const params = new URLSearchParams({
        patientEmail,
        date,
        time,
      });

      const response = await axios.post(`${url}?${params.toString()}`);

      if (response.status === 200) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message || "Failed to cancel appointment.");
      }
    } catch (error) {
      console.error("Error canceling appointment:", error);
    }
  }, []);
  // Hàm lấy danh sách lịch hẹn với phân trang

  const getAppointmentsByPatientEmail = useCallback(
    async (email) => {
      const skip = (page - 1) * pageSize; // Tính số bản ghi cần bỏ qua
      const response = await axios.get(
        `https://localhost:7235/api/Appointment/get-by-patient-email/${email}?skip=${skip}&pageSize=${pageSize}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = response.data;

      if (response.status === 200) {
        setAppointments(data.data);
        setTotalPages(data.metadata.totalPages); // Cập nhật tổng số trang
      } else {
        toast.error(data.message);
      }
    },
    [page, pageSize, setAppointments]
  );

  const getAllSpecializations = useCallback(async () => {
    const data = await axios.get("https://localhost:7235/api/Specialization");
    if (data.data.length > 0) {
      setSpecializations(JSON.parse(JSON.stringify(data.data, null, 2)));
    }
  }, []);
  const getPatientIdByEmail = async (email) => {
    const response = await axios.get(
      `https://localhost:7235/api/Patients/get-id-by-email/${email}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      setPatientId(response.data);
    } else {
      console.log("Failed to get patient id");
    }
  };

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
    const data = await axios.get("https://localhost:7235/api/Doctor");
    if (data.data.length > 0) {
      let doctorsFilter = JSON.parse(JSON.stringify(data.data, null, 2)).filter(
        (doctor) => doctor.isAvailable == true
      );
      setDoctors(doctorsFilter);
    }
  };
  const getDoctorsBySpecialization = useCallback(async (specializationName) => {
    try {
      setSelectedSpecialization(specializationName);
      const response = await axios.get(
        `https://localhost:7235/api/Doctor/get-by-specialization?specializationName=${specializationName}`
      );
      if (response.data.length > 0) {
        setDoctorsBySpecialization(response.data);
      } else {
        setDoctorsBySpecialization([]);
      }
    } catch (error) {
      setDoctorsBySpecialization([]);

      console.error("Error fetching doctors by specialization:", error);
    }
  }, []);
  const getDoctorByEmail = useCallback(async (email) => {
    try {
      const response = await axios.get(
        `https://localhost:7235/api/Doctor/${email}`
      );

      setSelectedDoctor(response.data);
    } catch (error) {
      setDoctorsBySpecialization([]);

      console.error("Error fetching doctors by email:", error);
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
    selectedSpecialization,
    getDoctorByEmail,
    selectedDoctor,
    appointments,
    getAppointmentsByPatientEmail,
    cancelAppointment,
    getPatientIdByEmail,
    patientId,
    page,
    setPage,
    totalPages,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
