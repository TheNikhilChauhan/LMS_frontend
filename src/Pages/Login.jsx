import { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import HomeLayout from "../Layouts/HomeLayout";
import { login } from "../Redux/Slices/AuthSlice";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleUserInput = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!loginData.email || !loginData.password) {
      toast.error("Please fill all the details");
      return;
    }

    //dispatch create account action
    const response = await dispatch(login(loginData));
    console.log(response);
    if (response?.payload?.success) {
      navigate("/");
    }

    setLoginData({
      email: "",
      password: "",
    });
  };
  return (
    <HomeLayout>
      <div className="flex items-center justify-center h-[85vh]">
        <form
          className="flex flex-col justify-center items-center gap-3 rounded-lg p-4 w-[60vh] text-white shadow-[0_0_10px_black]"
          onSubmit={handleLogin}
          noValidate
        >
          <h1 className="text-center text-2xl font-bold">Login Here</h1>

          <div className="flex flex-col items-start gap-2 w-full">
            <label htmlFor="email" className="font-semibold">
              Email
            </label>
            <input
              type="email"
              required
              id="email"
              name="email"
              placeholder="Enter your email"
              className="bg-transparent ml-2 border p-1 pl-2 w-full"
              onChange={handleUserInput}
              value={loginData.email}
            />
          </div>
          <div className="flex flex-col items-start gap-2 w-full">
            <label htmlFor="password" className="font-semibold">
              Password
            </label>
            <input
              type="password"
              required
              id="password"
              name="password"
              placeholder="Enter your password"
              className="bg-transparent ml-2 border p-1 pl-2 w-full"
              onChange={handleUserInput}
              value={loginData.password}
            />
          </div>

          <button
            type="submit"
            className="bg-yellow-600 rounded-sm hover:bg-yellow-500 transition-all ease-in-out duration-300 cursor-pointer text-lg py-2 px-2 font-semibold mt-3 w-full"
          >
            Sign In
          </button>

          <p className="text-center">
            Don &apos; t have an account?{" "}
            <Link to="/signup" className="link text-accent">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </HomeLayout>
  );
}

export default Login;
