import { createContext, useContext, useEffect } from "react";
import { useState, useCallback } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "./AuthContext";
import axios from "axios";
export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
  const [doctorInfo, setDoctorInfo] = useState({})
  const { email } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);
  // Trạng thái phân trang
  const [page, setPage] = useState(1); // Trang hiện tại
  const [pageSize] = useState(5); // Số bản ghi mỗi trang
  const [totalPages, setTotalPages] = useState(0); // Tổng số trang
  useEffect(() => {
    if (email) {
      // Đặt lại trang về 1 mỗi khi email thay đổi
      setPage(1);
      getDoctorAppointments(email)
    }
  }, [email, setPage]);


  const getDoctorByEmail = useCallback(async (email) => {
    try {
      const response = await axios.get(`https://localhost:7235/api/Doctor/${email}`);
      console.log(response);

      if (response.status == 200) {
        setDoctorInfo(response.data);
      }
    } catch (error) {
      console.error("Error fetching doctor by email:", error.message);
    }
  }, []);

  const rejectAppointments = useCallback(async (doctorEmail, patientEmail, date, time) => {
    const reason = window.prompt("Please enter reason to reject appointment");
    if (!reason) {
      toast.warning("Please enter reason to reject appointment");
      return
    }
    const isConfirmed = window.confirm(`Are you sure you want to reject this appointment?\nReason: ${reason}`);
    if (!isConfirmed) {
      return;
    }
    // Hiển thị loading
    const loadingToast = toast.loading("Rejecting appointment...");
    try {


      const baseUrl = 'https://localhost:7235/api/Appointment/reject';
      const params = new URLSearchParams({
        doctorEmail,
        patientEmail,
        date,
        time
      });

      const response = await fetch(`${baseUrl}?${params}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reason)
      });
      if (response.ok) {
        console.log("Appointment rejected successfully");
        await getDoctorAppointments(doctorEmail)
        toast.update(loadingToast, {
          render: "Appointment rejected successfully!",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });

      } else {
        console.error("Error rejecting appointment:", response.data);
      }
    } catch (error) {
      console.error("Error rejecting appointment:", error.message);
    }
  }, []);

  const getDoctorAppointments = useCallback(async (email) => {
    try {
      const skip = (page - 1) * pageSize; // Tính số bản ghi cần bỏ qua
      const response = await axios.get(`https://localhost:7235/api/Appointment/get-by-doctor-email/${email}?skip=${skip}&pageSize=${pageSize}`);

      const data = response.data;
      console.log(data);

      if (response.status == 200) {
        setAppointments(data.data);
        setTotalPages(data.metadata.totalPages);
      }
    } catch (error) {
      console.error("Error fetching doctor appointments:", error.message);
    }
  }, [page, pageSize, setAppointments, setTotalPages, doctorInfo, email]);
  const value = { getDoctorAppointments, appointments, rejectAppointments, getDoctorByEmail, doctorInfo, page, setPage, totalPages, pageSize };
  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
