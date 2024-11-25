import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
const MyAppointment = () => {
  const { user, userData, appointments, getAppointmentsByPatientEmail, cancelAppointment, getUserByEmail, getPatientIdByEmail, patientId, page,
    setPage,
    totalPages } = useContext(AppContext);
  const handleCancelAppointment = async (email, date, time) => {
    await cancelAppointment(email, date, time);
    getAppointmentsByPatientEmail(user);
  }
  useEffect(() => {
    getAppointmentsByPatientEmail(user);
    getUserByEmail(user);
    getPatientIdByEmail(user)
  }, [page])
  console.log(appointments);
  console.log(userData);
  console.log(patientId);



  const location = useLocation();
  const handlePayOnline = async (appointment) => {
    try {
      const requestData = {
        fullname: userData.fullName,
        description: `Thanh toán hóa đơn khám bệnh. Bác sĩ: ${appointment.doctorName}. Chuyên khoa: ${appointment.specialization}. Ngày khám: ${appointment.date}. Giờ khám: ${appointment.time}.`,
        amount: appointment.appointmentFee * 25700,
        userId: patientId,
        appointmentId: appointment.appointmentId
      };
      console.log(requestData);



      const response = await axios.post(
        "https://localhost:7235/api/Payment/VNPay",
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      window.open(response.data.returnUrl, '_blank');
      localStorage.setItem('appointmentId', response.data.appointmentId)
      console.log("Success", response);
    } catch (err) {
      console.log("Error", err);
    }
  };
  useEffect(() => {
    const handleFocus = () => {
      getAppointmentsByPatientEmail(user);
    };

    // Lắng nghe sự kiện focus
    window.addEventListener("focus", handleFocus);

    // Dọn dẹp sự kiện khi component unmount
    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, []);
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
            // Gọi lại API để lấy danh sách lịch hẹn mới

            window.close()
            await getAppointmentsByPatientEmail(user);

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
  // Xử lý chuyển trang
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };
  return (
    <div>
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">
        My Appointment
      </p>
      <div>
        {Array.from(appointments).map((item, index) => {
          console.log(`${new Date(item.date).toISOString().split('T')[0]} `)
          console.log(new Date().toISOString().split('T')[0]);


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
              {item.appointmentStatus == 2 ? <button className="text-sm text-red-500 text-center sm:min-w-48 py-2 border rounded font-bold"> Canceled </button> :

                (new Date(`${item.date}T${item.time}`) > new Date() ? (item.appointmentStatus == 1 ? <div className="flex">
                  <button className="text-sm text-green-500 font-bold text-center sm:min-w-48 py-2 border rounded ">Confirmed</button>
                </div> : <div className="flex flex-col gap-2 items-end">
                  <button className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-200" onClick={() => handlePayOnline(item)}>Pay Online</button>
                  <button className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-200 " onClick={() => handleCancelAppointment(user, item.date, item.time)}>Cancel Appointment</button>
                </div>) : (<div className="flex">
                  <button className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded font-bold ">Expired</button>
                </div>))}

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

export default MyAppointment;
