import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const MyAppointment = () => {
  const { user, doctors, appointments, getAppointmentsByPatientEmail } = useContext(AppContext);
  useEffect(() => {
    getAppointmentsByPatientEmail(user);
  }, [])
  console.log(appointments);

  const location = useLocation();
  const handlePayOnline = async () => {
    try {
      const requestData = {
        fullname: "123",
        description: "123",
        amount: 100000,
        userId: "80cf739a-56de-4eb3-b938-041c5eea87b6",
        appointmentId: 2
      };
      const response = await axios.post(
        "https://localhost:7235/api/Payment/VNPay",
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      window.location.href = response.data.returnUrl;
      localStorage.setItem('appointmentId', response.data.appointmentId)
      console.log("Success", response);
    } catch (err) {
      console.log("Error", err);
    }
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);

    const responseCode = queryParams.get("vnp_ResponseCode");

    if (responseCode) {
      if (responseCode === "00") {
        const handlePaySuccess = async () => {
          try {
            const appointmentId = parseInt(localStorage.getItem('appointmentId'), 10);
            const status = 'Đã thanh toán';
            const response = await axios.put(
              `https://localhost:7235/api/Payment/confirm?paymentId=${appointmentId}&status=${encodeURIComponent(status)}`,
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            console.log("Success", response);
          } catch (err) {
            console.log("Error", err);
          }
        }
        handlePaySuccess();
        toast.success("Payment successful.");
      } else {
        toast.error("Payment failed.");
      }
    }
  }, [location.search]);

  return (
    <div>
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">
        My Appointment
      </p>
      <div>
        {appointments.map((item, index) => {
          return (
            <div key={index} className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b">
              <div>
                <img className="w-32 bg-indigo-50" src={item.image} alt="" />
              </div>
              <div className="flex-1 text-sm text-zinc-600">
                <p className="text-neutral-800 font-semibold">{item.doctorName}</p>
                <p className="">{item.specialization}</p>
                <p className="mt-1 font-medium text-neutral-700">Address: {item.address}</p>
                <p className="text-xs mt-1">
                  <span className="text-sm text-neutral-700 font-medium">{item.date}</span> | <span className="text-sm text-neutral-500 font-normal">{item.time}</span>
                </p>
              </div>
              <div className="flex flex-col gap-2 items-end">
                <button className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-200" onClick={handlePayOnline}>Pay Online</button>
                <button className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-200">Cancel Appointment</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyAppointment;
