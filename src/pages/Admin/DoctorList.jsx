import { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { assets } from "../../assets/assets";
const DoctorList = () => {
  const { doctors, aToken, getAllDoctors } = useContext(AdminContext);
  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);
  return (
    <div className="m-5 max-h-[90vh] overflow-y-scroll">
      <h1 className="text-lg font-medium">All Doctors</h1>
      <div className="flex w-full flex-wrap gap-4 pt-5 gap-y-6">
        {/* {doctors.map((doctor, index) => {
          <div className="border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group" key={index}>
            <img className="bg-indigo-50 group-hover:bg-primary transition-all duration-200" src={doctor.image} alt="" />
            <div className="p-4 ">
              <p className="text-neutral-800 text-lg font-medium">{doctor.name}</p>
              <p className="text-zinc-600 text-sm">{doctor.speciality}</p>
            </div>
            <div className="mt-2 flex items-center text-sm gap-1">
              <input type="checkbox" checked={doctor.available} />
              <p>Available</p>
            </div>
          </div>;
        })} */}
        <div className="border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group">
          <img
            className="bg-indigo-50 group-hover:bg-primary transition-all duration-200"
            src={assets.doctor_icon}
            alt=""
          />
          <div className="p-4 ">
            <p className="text-neutral-800 text-lg font-medium">Hohnson</p>
            <p className="text-zinc-600 text-sm">General Physician</p>
          </div>
          <div className=" p-4 pt-0 mt-2 flex items-center text-sm gap-1">
            <input type="checkbox" checked />
            <p>Available</p>
          </div>
        </div>
        <div className="border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group">
          <img
            className="bg-indigo-50 group-hover:bg-primary transition-all duration-200"
            src={assets.doctor_icon}
            alt=""
          />
          <div className="p-4 ">
            <p className="text-neutral-800 text-lg font-medium">Hohnson</p>
            <p className="text-zinc-600 text-sm">General Physician</p>
          </div>
          <div className=" p-4 pt-0 mt-2 flex items-center text-sm gap-1">
            <input type="checkbox" checked />
            <p>Available</p>
          </div>
        </div><div className="border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group">
          <img
            className="bg-indigo-50 group-hover:bg-primary transition-all duration-200"
            src={assets.doctor_icon}
            alt=""
          />
          <div className="p-4 ">
            <p className="text-neutral-800 text-lg font-medium">Hohnson</p>
            <p className="text-zinc-600 text-sm">General Physician</p>
          </div>
          <div className=" p-4 pt-0 mt-2 flex items-center text-sm gap-1">
            <input type="checkbox" checked />
            <p>Available</p>
          </div>
        </div><div className="border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group">
          <img
            className="bg-indigo-50 group-hover:bg-primary transition-all duration-200"
            src={assets.doctor_icon}
            alt=""
          />
          <div className="p-4 ">
            <p className="text-neutral-800 text-lg font-medium">Hohnson</p>
            <p className="text-zinc-600 text-sm">General Physician</p>
          </div>
          <div className=" p-4 pt-0 mt-2 flex items-center text-sm gap-1">
            <input type="checkbox" checked />
            <p>Available</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorList;
