import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext';
import { AuthContext } from '../../context/AuthContext';
const DoctorInfo = () => {
  const {doctorInfo,getDoctorByEmail} = useContext(DoctorContext);
  const {email} = useContext(AuthContext);
  console.log(doctorInfo);
  useEffect(() => {
    getDoctorByEmail(email);
  },[getDoctorByEmail])
   return (
    <div className="max-w-lg flex flex-col gap-4 text-sm m-5 bg-white p-6 rounded-lg shadow-md">
      {/* Doctor Image */}
      <div className="flex justify-center">
        <img
          src={doctorInfo.doctorImg}
          alt={`${doctorInfo.doctorName} profile`}
          className="w-32 h-32 object-contain rounded-full shadow-lg"
        />
      </div>

      {/* Doctor Name and Specialization */}
      <div className="text-center">
        <p className="font-medium text-3xl text-neutral-900 mt-4">
          {doctorInfo.doctorName}
        </p>
        <p className="text-neutral-600 text-lg">{doctorInfo.specializationName}</p>
      </div>

      <hr className="bg-zinc-400 h-[1px] border-none mt-4" />

      {/* Contact Information */}
      <div>
        <p className="text-neutral-500 underline mt-3">CONTACT INFORMATION</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
          <p className="font-medium">Email:</p>
          <p className="text-blue-500">{doctorInfo.email}</p>
          <p className="font-medium">Booking Fee:</p>
          <p className="text-gray-700">${doctorInfo.bookingFee}</p>
          <p className="font-medium">Availability:</p>
          <p className={`text-sm ${doctorInfo.isAvailable ? "text-green-500" : "text-red-500"}`}>
            {doctorInfo.isAvailable ? "Available" : "Unavailable"}
          </p>
        </div>
      </div>

      {/* Basic Information */}
      <div>
        <p className="text-neutral-500 underline mt-3">BASIC INFORMATION</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
          <p className="font-medium">Degree:</p>
          <p className="text-gray-700 capitalize">{doctorInfo.degree}</p>
          <p className="font-medium">Experience:</p>
          <p className="text-gray-700">{doctorInfo.experience} years</p>
          <p className="font-medium">About:</p>
          <p className="text-gray-700">{doctorInfo.doctorAbout}</p>
        </div>
      </div>

      
    </div>
  );
}

export default DoctorInfo