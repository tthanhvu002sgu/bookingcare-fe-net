import { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";
const AllAppointments = () => {
  const {
    aToken,
    appointments,
    getAllAppointments,
    cancelAppointment,
    page,
    setPage,
    totalPages,
  } = useContext(AdminContext);
  // Gọi API mỗi khi trang thay đổi
  useEffect(() => {
    getAllAppointments();
  }, [getAllAppointments]);

  // Xử lý chuyển trang
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };
  //xu ly tim kiem

  const [searchQuery, setSearchQuery] = useState(""); // Quản lý input tìm kiếm
  const [filteredAppointments, setFilteredAppointments] = useState([]); // Lưu trữ danh sách đã tìm kiếm
  // Cập nhật filteredAppointments khi appointments thay đổi
  useEffect(() => {
    setFilteredAppointments(appointments);
  }, [appointments]);
  // Hàm xử lý tìm kiếm
  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      setFilteredAppointments(appointments); // Nếu input trống, hiển thị lại tất cả
    } else {
      const filtered = appointments.filter(
        (item) =>
          item.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.doctorName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredAppointments(filtered);
    }
  };
  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Appointments</p>
      {/* Thanh tìm kiếm */}
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Search by patient or doctor name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border px-4 py-2 rounded w-full"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Search
        </button>
      </div>
      <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll">
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b">
          <p>#</p>
          <p>Patient</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Action</p>
        </div>
        {filteredAppointments.map((item, index) => {
          return (
            <div
              className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_3fr_3fr_1fr_1fr] items-center text-gray-600 py-3 px-6 border-b hover:bg-gray-50"
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
              {item.canceled ? (
                <p className="text-red-400 text-xs font-medium">Canceled</p>
              ) : (
                <img
                  onClick={() => cancelAppointment()}
                  className="w-10 cursor-pointer"
                  src={assets.cancel_icon}
                  alt=""
                />
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

export default AllAppointments;
