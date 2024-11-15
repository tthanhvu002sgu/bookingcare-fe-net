import { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { assets } from "../../assets/assets";
const Dashboard = () => {
  const { aToken, getDashData, dashData, cancelAppointment } =
    useContext(AdminContext);
  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);
  return  (
    <div className="m-5">
      <div className="flex flex-wrap gap-3 ">
        <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
          <img className="w-14 " src={assets.doctor_icon} alt="" />
          <div>
            <p className="text-xl font-semibold text-gray-600">
              {dashData.doctors}
            </p>
            <p className="text-gray-400">Doctors</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
          <img className="w-14 " src={assets.appointments_icon} alt="" />
          <div>
            <p className="text-xl font-semibold text-gray-600">
              {dashData.appointments}
            </p>
            <p className="text-gray-400">Appointments</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
          <img className="w-14 " src={assets.patients_icon} alt="" />
          <div>
            <p className="text-xl font-semibold text-gray-600">
              {dashData.patients}
            </p>
            <p className="text-gray-400">Patients</p>
          </div>
        </div>
      </div>
      <div className="bg-white">
        <div className="flex items-center gap-3 px-3 py-3 mt-10 rounded-t border">
          <img src={assets.list_icon} alt="" />
          <p className="font-semibold">Latest Bookings</p>
        </div>
        <div className="pt-5 border border-t-0">
          {/* {dashData.lastestAppointments.map((item, index) => {
            return (
              <div className="flex items-center px-6 py-3 gap-3 hover:bg-gray-100" key={index}>
                <img className="rounded-full w-10" src={item.docData.docImg} alt="" />
                <div className="flex-1 text-sm">
                  <p className="text-gray-800 font-medium">{item.docData.name}</p>
                  <p className="text-gray-800">{item.slotDate}</p>
                </div>
                {item.canceled ? <p className="text-red-400 text-xs font-medium">Canceled</p> : <img onClick={() => cancelAppointment()}className="w-10 cursor-pointer" src={assets.cancel_icon} alt="" />} 
              </div>
            )
          })} */}
          <div className="flex items-center px-6 py-3 gap-3 hover:bg-gray-100">
            <img
              className="rounded-full w-10"
              src={assets.doctor_icon}
              alt=""
            />
            <div className="flex-1 text-sm">
              <p className="text-gray-800 font-medium">Johnson</p>
              <p className="text-gray-800">Booking on 27 Nov 2024</p>
            </div>
          </div>
          <div className="flex items-center px-6 py-3 gap-3 hover:bg-gray-100">
            <img
              className="rounded-full w-10"
              src={assets.doctor_icon}
              alt=""
            />
            <div className="flex-1 text-sm">
              <p className="text-gray-800 font-medium">Johnson</p>
              <p className="text-gray-800">Booking on 27 Nov 2024</p>
            </div>
          </div>
          <div className="flex items-center px-6 py-3 gap-3 hover:bg-gray-100">
            <img
              className="rounded-full w-10"
              src={assets.doctor_icon}
              alt=""
            />
            <div className="flex-1 text-sm">
              <p className="text-gray-800 font-medium">Johnson</p>
              <p className="text-gray-800">Booking on 27 Nov 2024</p>
            </div>
          </div>
          <div className="flex items-center px-6 py-3 gap-3 hover:bg-gray-100">
            <img
              className="rounded-full w-10"
              src={assets.doctor_icon}
              alt=""
            />
            <div className="flex-1 text-sm">
              <p className="text-gray-800 font-medium">Johnson</p>
              <p className="text-gray-800">Booking on 27 Nov 2024</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;