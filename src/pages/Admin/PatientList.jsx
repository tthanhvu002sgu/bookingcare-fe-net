import { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import { assets } from "../../assets/assets";
import axios from "axios";
const PatientList = () => {
  const { aToken, getAllPatients, cancelAppointment, patients, patientAppointment, setPatientAppointment } =
    useContext(AdminContext);
  const [selectedPatient, setSelectedPatient] = useState(null);
  // const [appointments, setAppointments] = useState([]);

  const getAppointmentsByPatientEmail = async (email) => {
    const response = await axios.get(
      `https://localhost:7235/api/Appointment/get-by-patient-email/${email}`
    );
    const data = await response.data.data;
    return data;
  };
  const handleSelectedPatient = async (patient) => {

    setSelectedPatient(patient);
    const appointments = await getAppointmentsByPatientEmail(patient.email);
    console.log(appointments);

    setPatientAppointment(appointments);
  };


  useEffect(() => {
    getAllPatients();
  }, []);
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
              {patientAppointment.length > 0 ? (
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
                  {patientAppointment.map((appointment, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-6 gap-4 py-2 px-4 border-b last:border-b-0 appointments-center"
                    >
                      <p>{index + 1}</p>
                      <p>{appointment.patientName}</p>
                      <p>
                        {appointment.date} - {appointment.time}
                      </p>
                      <p>{appointment.doctorName}</p>
                      <p>${appointment.appointmentFee}</p>
                      {appointment.appointmentStatus == 1 ? <button className="text-sm text-green-500 text-left fold-bold">
                        Confirmed
                      </button> : appointment.appointmentStatus == 2 ? (
                        <button className="text-sm text-red-500 text-left">
                          Canceled
                        </button>
                      ) : new Date(`${appointment.date}T${appointment.time}`) > new Date() ? (
                       <p>Unpaid</p>
                      ) : (
                        <button className="text-sm text-stone-500 text-left">
                          Expired
                        </button>
                      )}
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

