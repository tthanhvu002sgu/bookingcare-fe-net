import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
const Login = () => {
  const [state, setState] = useState("Sign up");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const { user, setUser } = useContext(AppContext);

  const navigate = useNavigate();
  const handleConfirmPasswordInput = (e) => {
    setConfirmPassword(e.target.value);
    if (password !== e.target.value) {
      setError("Passwords do not match");
    } else {
      setError("");
    }
  };

  const onSubmitHandle = async (e) => {
    e.preventDefault();
    if (state === "Sign up") {
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }
      try {
        const userData = {
          fullName: name,
          email,
          password,
          confirmPassword,
          image: "",
          dob: new Date(dob).toISOString(),
          gender,
          address: "",
          phoneNumber: phone,
        };
        const requestData = {
          model: userData,
        };

        const response = await axios.post(
          "https://localhost:7235/api/User/SignUp",
          requestData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log(response);
        toast.success("Account created successfully");
        setState("Login");
      } catch (err) {
        toast.error(err.response.data.errors[0])
        console.log(err.response.data.errors[0]);
      }
    } else {
      try {
        const userData = {
          email,
          password,
        };

        const response = await axios.post(
          "https://localhost:7235/api/User/SignIn",
          userData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response);
        

        if (response.status == 200) {
          toast.success("Login successfully");
          navigate("/");
          setUser(userData.email); // Lưu thông tin người dùng vào AppContext
          setError("");
        } else {
          toast.error("Email or password is incorrect");
          console.log(response);

          setError(response.data.message || "Failed to sign in");
        }
      } catch (err) {
        toast.error("Email or password is incorrect");

        console.log(err);
      }
    }
  };
  return (
    <form className="min-h-[80vh] flex items-center" onSubmit={onSubmitHandle}>
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
        <p className="text-2xl font-semibold">
          {state == "Sign up" ? "Create account" : "Login"}
        </p>
        <p>
          Please {state == "Sign up" ? "Create account" : "Login"} to book
          appointment{" "}
        </p>
        {state == "Sign up" && (
          <div className="w-full">
            <p>Full Name:</p>
            <input
              className="border border-zinc-300 rounded w-full p-2 mt-1"
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          </div>
        )}

        <div className="w-full">
          <p>Email:</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>

        <div className="w-full">
          <p>Password:</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>
        {state == "Sign up" && (
          <div className="w-full">
            <p>Confirm password:</p>
            <input
              className="border border-zinc-300 rounded w-full p-2 mt-1"
              type="password"
              onChange={(e) => handleConfirmPasswordInput(e)}
              value={confirmPassword}
              required
            />
            {error && <p className="text-red-500 mt-1">{error}</p>}
          </div>
        )}

        {state == "Sign up" && (
          <>
            <div className="w-full">
              <p>DOB:</p>
              <input
                className="border border-zinc-300 rounded w-full p-2 mt-1"
                type="date"
                onChange={(e) => setDob(e.target.value)}
                value={dob}
                required
              />
            </div>
            <div className="w-full">
              <p>Phone:</p>
              <input
                className="border border-zinc-300 rounded w-full p-2 mt-1"
                type="number"
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                required
              />
            </div>
            <div className="w-full">
              <p>Gender:</p>
              <select
                name=""
                id=""
                value={gender}
                className="border border-zinc-300 rounded w-full p-2 mt-1"
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </>
        )}

        <button
          type="submit"
          className="bg-primary text-white w-full p-2 rounded-md text-base"
        >
          {state == "Sign up" ? "Create account" : "Login"}
        </button>
        {state == "Sign up" ? (
          <p>
            Already have account?{" "}
            <span
              onClick={() => {
                setState("Login");
              }}
              className="text-primary underline cursor-pointer"
            >
              Login here
            </span>
          </p>
        ) : (
          <p>
            Create a new account?{" "}
            <span
              onClick={() => {
                setState("Sign up");
              }}
              className="text-primary underline cursor-pointer"
            >
              Click here
            </span>
          </p>
        )}
        {error && <p className="text-red-500 mt-1">{error}</p>}
      </div>
    </form>
  );
};

export default Login;
