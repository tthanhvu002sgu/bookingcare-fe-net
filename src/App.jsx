import { useContext } from "react";
import Login from "./pages/Login";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Route, Routes } from "react-router-dom";
import AddDoctor from "./pages/Admin/AddDoctor";
import AllAppointments from "./pages/Admin/AllAppointments";
import DoctorList from "./pages/Admin/DoctorList";
import { AdminContext } from "./context/AdminContext";
import AddSpecialization from "./pages/Admin/AddSpecialization";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "./context/AuthContext";
import DoctorAppointment from "./pages/Doctor/DoctorAppointment";
import DoctorInfo from "./pages/Doctor/DoctorInfo";
import PatientList from "./pages/Admin/PatientList";
const App = () => {
  const { aToken } = useContext(AdminContext);
  const {userRole} = useContext(AuthContext)
  console.log(userRole);
  let content;
  if (userRole == "admin" && aToken) {
    content = (
      <div className="bg-[#f8f9fd]">
        <ToastContainer />
        <Navbar />
        <div className="flex items-start">
          <Sidebar />
          <Routes>
            <Route path="patients" element={<PatientList />} />
            <Route path="/" element={<> </>} />
            <Route path="/all-appointments" element={<AllAppointments />} />
            <Route path="/add-doctor" element={<AddDoctor />} />
            <Route path="/doctor-list" element={<DoctorList />} />
            <Route path="/add-specialization" element={<AddSpecialization />} />
          </Routes>
        </div>
      </div>
    );
  } else if (userRole == "doctor" && aToken)   {
    content = (
      <div className="bg-[#f8f9fd]">
        <ToastContainer />
        <Navbar />
        <div className="flex items-start">
          <Sidebar />
          <Routes>
            <Route path="doctor-appointments" element={<DoctorAppointment />} />
            <Route path="doctor-info" element={<DoctorInfo />} />
          </Routes>
        </div>
      </div>
    );
  } else {
    content = (
      <>
        <Login />
        <ToastContainer />
      </>
    );
  }
  return content
};

export default App;
