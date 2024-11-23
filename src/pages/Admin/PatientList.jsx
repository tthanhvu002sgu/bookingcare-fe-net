import { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import { assets } from "../../assets/assets";
import axios from "axios";
const PatientList = () => {
  const { aToken, getAllPatients, dashData, cancelAppointment, patients } =
    useContext(AdminContext);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const handleSelectedPatient = async (patient) => {
    setSelectedPatient(patient);
    const appointments = await getAppointmentsByPatientEmail(patient.email);
    setAppointments(appointments);
  };

  useEffect(() => {
    getAllPatients();
  }, [getAllPatients]);
  return (
    <div className="m-5">
      <h1 className="text-xl font-bold mb-5">Patient List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {patients.map((patient) => (
          <div
            key={patient.id}
            className="p-4 bg-white rounded shadow hover:shadow-lg cursor-pointer"
            onClick={() => handleSelectedPatient(patient)}
          >
            <p className="text-center font-semibold">{patient.fullName}</p>
            <p className="text-center text-gray-500">{patient.email}</p>
          </div>
        ))}
      </div>

      {selectedPatient && (
        <>
          <div className="mt-10">
            <h2 className="text-lg font-bold mb-4">
              Appointments for {selectedPatient.fullName}
            </h2>
            <div className="bg-white rounded shadow p-4">
              {appointments.length > 0 ? (
                <div className="overflow-x-auto">
                  {/* Header */}
                  <div className="grid grid-cols-6 gap-4 py-2 px-4 border-b font-semibold bg-gray-50">
                    <p>#</p>
                    <p>Patient</p>
                    <p>Date & Time</p>
                    <p>Doctor</p>
                    <p>Fees</p>
                    <p>Status</p>
                  </div>
                  {/* Rows */}
                  {appointments.map((appointment, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-6 gap-4 py-2 px-4 border-b last:border-b-0 items-center"
                    >
                      <p>{index + 1}</p>
                      <p>{appointment.patientName}</p>
                      <p>
                        {appointment.date} - {appointment.time}
                      </p>
                      <p>{appointment.doctorName}</p>
                      <p>${appointment.appointmentFee}</p>
                      <p
                        className={`${appointment.appointmentStatus == 2 ? 'text-red-500' : "text-green-500"} hover:underline`}
                      
                      >
                        {appointment.appointmentStatus == 2 ? "Canceled" : "Completed"}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center">
                  No appointments found for this patient.
                </p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PatientList;

const getAppointmentsByPatientEmail = async (email) => {
  const response = await axios.get(
    `https://localhost:7235/api/Appointment/get-by-patient-email/${email}`
  );
  const data = await response.data;
  return data;
};
