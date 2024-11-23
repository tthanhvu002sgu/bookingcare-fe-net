import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
const MyAppointment = () => {
  const { user, appointments, getAppointmentsByPatientEmail, cancelAppointment } = useContext(AppContext);
  const handleCancelAppointment = async (email, date, time) => {
    await cancelAppointment(email, date, time);
    getAppointmentsByPatientEmail(user);
  }
  useEffect(() => {
    getAppointmentsByPatientEmail(user);
  }, [])
  console.log(appointments);

  return (
    <div>
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">
        My Appointment
      </p>
      <div>
        {appointments.map((item, index) => {
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
              {item.appointmentStatus == 2 ? <button className="text-sm text-red-500 text-center sm:min-w-48 py-2 border rounded "> Canceled </button> :

                (new Date(`${item.date}T${item.time}`) > new Date()  ? (<div className="flex flex-col gap-2 items-end">
                  <button className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-200">Pay Online</button>
                  <button className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-200" onClick={() => handleCancelAppointment(user, item.date, item.time)}>Cancel Appointment</button>
                </div>) : (<div className="flex">
                  <button className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-200">Expired</button>
                </div>))}

            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyAppointment;
