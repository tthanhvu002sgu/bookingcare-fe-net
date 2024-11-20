import { createContext } from "react";
import { useState, useCallback } from "react";
import { toast } from "react-toastify";

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
  const [appointments, setAppointments] = useState([]);
  
  const rejectAppointments = useCallback(async (doctorEmail, patientEmail,date,time) => {
    const reason = window.prompt("Please enter reason to reject appointment");
    if(!reason) {
      toast.warning("Please enter reason to reject appointment");
      return
    }
    const isConfirmed = window.confirm(`Are you sure you want to reject this appointment?\nReason: ${reason}`);
    if (!isConfirmed) {
      return;
    }
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
        } else {
            console.error("Error rejecting appointment:", response.data);
        }
    } catch (error) {
        console.error("Error rejecting appointment:", error.message);
    }
}, []);
  const getDoctorAppointments = useCallback(async (email) => {
    try {
        const response = await fetch(`https://localhost:7235/api/Appointment/get-by-doctor-email/${email}`);
        const data = await response.json();
        if(data.length > 0){
            setAppointments(data);
        }
    } catch (error) {
        console.error("Error fetching doctor appointments:", error.message);
    }
}, []); 
  const value = { getDoctorAppointments, appointments, rejectAppointments };
  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
