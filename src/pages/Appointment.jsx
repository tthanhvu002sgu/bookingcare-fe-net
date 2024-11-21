import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import RalatedDoctors from "../components/RalatedDoctors";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";

import { toast } from "react-toastify";

const Appointment = () => {
  const { selectedDoctor, getDoctorByEmail, user } = useContext(AppContext);
  const email = useParams();
  useEffect(() => {
    getDoctorByEmail(email.doctorEmail);
  }, []);
  console.log(selectedDoctor);

  const daysOfWeek = ["SUN", "MON", "THU", "WED", "THU", "FRI", "SAT"];

  const [docInfo, setDocInfo] = useState(selectedDoctor);

  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");
  const checkDoubleBooking = async (patientEmail, date, time) => {
    try {
      const response = await axios.post(
        "https://localhost:7235/api/Appointment/check-double-booking",
        null, // No body needed for this request
        {
          params: {
            patientEmail: patientEmail,
            date: date,
            time: time,
          },
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log(response.data.message);
        return true; // Time slot is available
      }
    } catch (error) {
      if (error.response || error.response.status === 409) {
        console.error(error.response.data.message);
        toast.error("You already have an appointment in this time slot.");
      } else {
        console.error("Error checking double booking:", error);
      }
      return false; // Time slot is not available
    }
  };
  const bookAppointment = async () => {
    try {
      if (user && Object.keys(user).length != 0) {
        const selectedSlot = docSlots[slotIndex];

        const appointmentDate = selectedSlot[0].datetime; // Không chuyển đổi sang chuỗi
        const appointmentTime = slotTime;

        const formattedDate = appointmentDate.toLocaleDateString("en-CA"); // Định dạng đúng ngày
        console.log(
          `formattedDate: ${formattedDate}, appointmentTime: ${appointmentTime}`
        );
        console.log(user);

        const isAvailable = await checkDoubleBooking(
          user,
          formattedDate,
          appointmentTime
        );
        console.log(isAvailable);
        
        if (isAvailable) {
          const data = {
            patientEmail: user,
            doctorEmail: selectedDoctor.email,
            specialization: selectedDoctor.specializationName,
            address: "",
            doctorName: selectedDoctor.doctorName,
            patientNamee: "",
            appointmentFee: selectedDoctor.bookingFee,
            paymentId: 1,
            date: formattedDate,
            time: appointmentTime,
            appointmentStatus: 0, // Assuming matching enum
          };

          const response = await axios.post(
            "https://localhost:7235/api/Appointment/add",
            data,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (response.status == 200) {
            console.log(response);

            console.log(
              `Booking appointment for ${data.patientEmail} with ${data.doctorName} on ${data.date} at ${data.time}`
            );

            toast.success(
              `Booking appointment for ${data.patientEmail} with ${data.doctorName} on ${data.date} at ${data.time}`
            );
            // Update the booked slot in docSlots
            setDocSlots((prevSlots) =>
              prevSlots.map((daySlots, index) =>
                index === slotIndex
                  ? daySlots.map((slot) =>
                      slot.time === slotTime ? { ...slot, booked: true } : slot
                    )
                  : daySlots
              )
            );
          } else {
            toast.error(response.data.message);
          }
        } 
      }
    } catch (error) {
      toast.error(
        "The selected time slot is already booked. Please choose another time."
      );

      console.error("Error booking appointment:", error);
    }
  };

  
  const getAvailableSlots = async () => {
    setDocSlots([]);

    try {
      // Gọi API lấy danh sách khung giờ đã đặt
      const response = await axios.get(
        `https://localhost:7235/api/Appointment/get-booked-slots/${email.doctorEmail}`
      );
      const bookedSlots = response.data;

      console.log(`Booked slots for ${email.doctorEmail}:`, bookedSlots);

      // getting current date and time
      let today = new Date();
      let currentTime = today.getTime();

      for (let i = 0; i < 7; i++) {
        let currentDate = new Date(today);
        currentDate.setDate(today.getDate() + i);

        let endTime = new Date();
        endTime.setDate(today.getDate() + i);
        endTime.setHours(21, 0, 0, 0);

        if (today.getDate() == currentDate.getDate()) {
          currentDate.setHours(
            currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
          );
          currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
        } else {
          currentDate.setHours(10);
          currentDate.setMinutes(0);
        }

        let timeSlots = [];

        while (currentDate < endTime) {
          const formattedTime = currentDate.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });
          const formattedDate = currentDate.toISOString().split("T")[0];

          // Kiểm tra nếu khung giờ này đã đặt
          const isBooked = bookedSlots.some((slot) => {
            const slotDate = new Date(slot.date).toISOString().split("T")[0];
            const slotTime = slot.time.trim();
            return slotDate === formattedDate && slotTime === formattedTime;
          });

          // Kiểm tra nếu khung giờ này đã qua
          const isPastSlot = currentDate.getTime() < currentTime;

          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime,
            booked: isBooked || isPastSlot,
          });

          currentDate.setMinutes(currentDate.getMinutes() + 30);
        }
        console.log(docSlots);

        setDocSlots((prev) => [...prev, timeSlots]);
      }
    } catch (error) {
      console.error("Error fetching booked slots:", error);
    }
  };
  useEffect(() => {
    getAvailableSlots();
    const interval = setInterval(() => {
      getAvailableSlots();
    }
    , 10000);
    return () => clearInterval(interval);
  }, [docInfo]);

  
  return (
    docInfo && (
      <div>
        {/* doctor details */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <img
              className="bg-primary w-full sm:max-w-72 rounded-lg"
              src={docInfo.doctorImg}
              alt=""
            />
          </div>
          <div className="flex-1 border border-gray-400 rounded-lg py-8 p-8 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
            {/* doc info */}
            <p className="flex items-center gap-2 text-xl font-medium text-gray-900">
              {docInfo.name}{" "}
              <img className="w-5" src={assets.verified_icon} alt="" />{" "}
            </p>
            <div className="flex items-center gap-3 text-sm mt-1 text-gray-600">
              <p>
                {docInfo.degree} - {docInfo.specializationName}
              </p>
              <button className="py-0.5 px-2 border text-xs rounded-full">
                {docInfo.experience}
              </button>
            </div>
            {/* Doctor about */}

            <div>
              <p className="flex items-center font-medium text-xs text-gray-900 mt-3 gap-1">
                About <img src={assets.info_icon} alt="" />
              </p>
              <p className="text-sm text-gray-500 max-w-[700px] mt-3">
                {docInfo.doctorAbout}
              </p>
            </div>
            {/* <p>Appointment Fee: {docInfo.fee}</p> */}
          </div>
        </div>

        {/* booking slot */}
        <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
          <p>Booking Slot</p>
          <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
            {docSlots.length &&
              docSlots.map((item, index) => (
                <div
                  onClick={() => setSlotIndex(index)}
                  className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                    slotIndex == index
                      ? "bg-primary text-white"
                      : "border border-gray-200"
                  }`}
                  key={index}
                >
                  <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                  <p>{item[0] && item[0].datetime.getDate()}</p>
                </div>
              ))}
          </div>

          {/*  <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
            {docSlots.length &&
              docSlots[slotIndex].map((item, index) => (
                <p
                  onClick={() => !item.booked && setSlotTime(item.time)}
                  className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
                    item.booked
                      ? "bg-gray-400 text-white cursor-not-allowed"
                      : item.time === slotTime
                      ? "bg-primary text-white"
                      : "border border-gray-200 text-gray-400"
                  }`}
                  key={index}
                >
                  {item.booked ? "booked" : item.time.toLowerCase()}
                </p>
              ))}
          </div> */}
          <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
            {docSlots.length &&
              docSlots[slotIndex].map((item, index) => (
                <p
                  onClick={() => !item.booked && setSlotTime(item.time)}
                  className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
                    item.booked
                      ? "bg-gray-400 text-white cursor-not-allowed"
                      : item.time === slotTime
                      ? "bg-primary text-white"
                      : "border border-gray-200 text-gray-400"
                  }`}
                  key={index}
                >
                  {item.booked ? "booked" : item.time.toLowerCase()}
                </p>
              ))}
          </div>

          <button
            onClick={() => bookAppointment(user, selectedDoctor)}
            className="bg-primary text-white font-light px-14 py-3 text-sm rounded-full my-6"
          >
            Book an appointment
          </button>
        </div>
      </div>
    )
  );
};

export default Appointment;
