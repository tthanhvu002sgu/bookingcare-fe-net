import React, { useEffect } from "react";
import { useContext } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { assets } from "../../assets/assets";
const DoctorAppointment = () => {
  const email = localStorage.getItem("email");
  console.log(email);

  const { appointments, getDoctorAppointments, rejectAppointments , page,
    setPage,
    totalPages,} =
    useContext(DoctorContext);

  useEffect(() => {
    if (email) {
      getDoctorAppointments(email);
    }
  }, [email, page,getDoctorAppointments]);
  console.log(`appointments`, appointments);
  

  // Xử lý chuyển trang
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };
  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Appointments</p>
      <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll">
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b">
          <p>#</p>
          <p>Patient</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Action</p>
        </div>
        {Array.from(appointments).map((item, index) => {
          return (
            <div
              className={`flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_3fr_3fr_1fr_1fr] items-center text-gray-600 py-3 px-6 border-b hover:bg-gray-50 ${
                item.appointmentStatus == 0 ? "bg-white" : "bg-slate-100"
              }`}
              key={index}
            >
              <p className="max-sm:hidden">{index + 1}</p>
              <div className="flex items-center gap-2 ">
                <p>{item.patientName}</p>
              </div>
              <p>
                {item.date}, {item.time}
              </p>
              <div className="flex items-center gap-2 ">
                <p>{item.doctorName}</p>
              </div>
              <p>{item.appointmentFee}</p>

              {item.appointmentStatus == 1 ?  <button className="text-sm text-green-500 text-left fold-bold">
                  Confirmed
                </button> :  item.appointmentStatus == 2 ? (
                <button className="text-sm text-red-500 text-left">
                  Canceled
                </button>
              ) : new Date(`${item.date}T${item.time}`) > new Date() ? (
                <img
                  className="w-10 cursor-pointer"
                  src={assets.cancel_icon}
                  alt=""
                  onClick={() => rejectAppointments(item.doctorEmail,item.patientEmail, item.date,item.time)}
                />
              ) : (
                <button className="text-sm text-stone-500 text-left">
                  Expired
                </button>
              )}
            </div>
          );
        })}
      </div>
      {/* Điều hướng phân trang */}
      <div className="flex justify-center items-center gap-4 mt-4">
        <button
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          disabled={page === 1}
          onClick={() => handlePageChange(page - 1)}
        >
          Previous
        </button>
        <p>
          Page {page} of {totalPages}
        </p>
        <button
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          disabled={page === totalPages}
          onClick={() => handlePageChange(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DoctorAppointment;
