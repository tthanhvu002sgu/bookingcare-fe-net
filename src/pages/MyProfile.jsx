import { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
const MyProfile = () => {
  const { user, getUserByEmail, userData } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [userUpdateData, setUserUpdateData] = useState({});

  function formatDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  }

  useEffect(() => {
    getUserByEmail(user);
    setUserUpdateData(userData);
  }, [user, isEdit]);
  const handleSaveChange = async () => {
    setIsEdit(false);
    console.log(userUpdateData);
    try {
      const data = {
        FullName: userUpdateData.name == '' ? userData.fullName : userUpdateData.name,
        Image: "userUpdateData.image",
        Dob: new Date(userUpdateData.dob).toISOString() == 'Invalid Date' ? userData.dob : new Date(userUpdateData.dob).toISOString(),
        Gender: userUpdateData.gender == '' ? userData.gender : userUpdateData.gender,
        Address: userUpdateData.address == '' ? userData.address : userUpdateData.address,
        PhoneNumber: userUpdateData.phone == '' ? userData.phoneNumber : userUpdateData.phone,
      };
      const response = await axios.put(
        `https://localhost:7235/api/Patients/update?email=${user}`, 
        data, // Truyền patient object trong body
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      getUserByEmail(user)
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="max-w-lg flex flex-col gap-2 text-sm ">
      {isEdit ? (
        <input
          className="bg-gray-50 text-3xl font-medium max-w-60 mt-4"
          type="text"
          value={userUpdateData.name}
          onChange={(e) =>
            setUserUpdateData((prev) => ({ ...prev, name: e.target.value }))
          }
        />
      ) : (
        <p className="font-medium text-3xl text-neutral-900 mt-4">
          {userData.fullName}
        </p>
      )}
      <hr className="bg-zinc-400 h-[1px] border-none" />

      <div>
        <p className="text-neutral-500 underline mt-3">CONTACT INFORMATION</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
          <p className="font-medium">Email:</p>
          <p className="text-blue-500">{userData.email}</p>
          <p className="font-medium">Phone:</p>
          {isEdit ? (
            <input
              className="bg-gray-100 max-w-52"
              type="number"
              value={userUpdateData.phone}
              onChange={(e) =>
                setUserUpdateData((prev) => ({
                  ...prev,
                  phone: e.target.value,
                }))
              }
            />
          ) : (
            <p className="text-blue-400">{userData.phoneNumber}</p>
          )}
          <p className="font-medium">Address: </p>
          {isEdit ? (
            <p>
              <input
                type="text"
                className="bg-gray-50"
                value={userUpdateData.address}
                onChange={(e) =>
                  setUserUpdateData((prev) => ({
                    ...prev,
                    address: e.target.value,
                  }))
                }
              />
              <br />
            </p>
          ) : (
            <p className="text-gray-500">{userData.address}</p>
          )}
        </div>
      </div>
      <div>
        <p className="text-neutral-500 underline mt-3">BASIC INFORMATION</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
          <p className="font-medium">Gender:</p>

          {isEdit ? (
            <select
              className="bg-gray-100 max-w-20"
              onChange={(e) =>
                setUserUpdateData((prev) => ({
                  ...prev,
                  gender: e.target.value,
                }))
              }
              value={userUpdateData.gender}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          ) : (
            <p className="text-gray-400 capitalize ">{userData.gender}</p>
          )}
          <p className="font-medium">Date of Birth:</p>
          {isEdit ? (
            <input
              className="max-w-28 bg-gray-100"
              onChange={(e) =>
                setUserUpdateData((prev) => ({ ...prev, dob: e.target.value }))
              }
              value={userUpdateData.dob}
              type="date"
            />
          ) : (
            <p className="text-gray-400">{formatDate(userData.dob)}</p>
          )}
        </div>
      </div>
      <div className="mt-6 ">
        {isEdit ? (
          <button
            className="border border-primary px-8 py-2 rounded-full hover:text-white hover:bg-primary transition-all"
            onClick={() => handleSaveChange()}
          >
            Save Information
          </button>
        ) : (
          <button
            className="border border-primary px-8 py-2 rounded-full hover:text-white hover:bg-primary transition-all"
            onClick={() => setIsEdit(true)}
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
