import { useContext } from "react"
import Login from "./pages/Login"
import { ToastContainer,toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css' 
import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
import { Route, Routes } from "react-router-dom"
import AddDoctor from "./pages/Admin/AddDoctor"
import Dashboard from "./pages/Admin/Dashboard"
import AllAppointments from "./pages/Admin/AllAppointments"
import DoctorList from "./pages/Admin/DoctorList"
const App = () => {
  //const {aToken} = useContext(AdminContext)
  /* return aToken?  (
    <div className="bg-[#f8f9fd]">
      <Navbar />
    </div>)
    :
    (
      <>
        <Login />
        <ToastContainer />
      </>
    ) */
    return   (
      <div className="bg-[#f8f9fd]">
        <ToastContainer />
        <Navbar />
        <div className="flex items-start">
          <Sidebar />
          <Routes>
            <Route path='/' element={<> </>} />
            <Route path='/admin-dashboard' element={<Dashboard />} />
            <Route path='/all-appointments' element={<AllAppointments />} />
            <Route path='/add-doctor' element={<AddDoctor />} />
            <Route path='/doctor-list' element={<DoctorList />} />

          </Routes>
        </div>
      </div>)
}

export default App