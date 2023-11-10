import { useState } from "react";
import { toast } from "react-hot-toast";
import { BsPersonCircle } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import HomeLayout from "../Layouts/HomeLayout";
import { createAccount } from "../Redux/Slices/AuthSlice";

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [previewImage, setPreviewImage] = useState("");

  const [signupData, setSignupData] = useState({
    fullname: "",
    email: "",
    password: "",
    avatar: "",
  });

  const handleUserInput = (e) => {
    const { name, value } = e.target;
    setSignupData({
      ...signupData,
      [name]: value,
    });
  };

  const getImage = (e) => {
    e.preventDefault();

    const uploadImage = e.target.files[0];

    if (uploadImage) {
      setSignupData({
        ...signupData,
        avatar: uploadImage,
      });
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadImage);
      fileReader.addEventListener("load", function () {
        setPreviewImage(this.result);
      });
    }
  };

  const createNewAccount = async (e) => {
    e.preventDefault();
    if (
      !signupData.email ||
      !signupData.password ||
      !signupData.avatar ||
      !signupData.fullname
    ) {
      toast.error("Please fill all the details");
      return;
    }

    //checking name field length
    if (signupData.fullname.length < 5) {
      toast.error("Name should be of atleast 5 characters");
      return;
    }

    //checking valid email
    if (!signupData.email.match(/^[\w\-.]+@([\w-]+\.)+[\w-]{2,}$/gm)) {
      toast.error("Invalid email id");
    }

    const formData = new FormData();
    formData.append("fullname", signupData.fullname);
    formData.append("email", signupData.email);
    formData.append("password", signupData.password);
    formData.append("avatar", signupData.avatar);

    //dispatch create account action
    const response = await dispatch(createAccount(formData));
    console.log(response);
    if (response?.payload?.success) {
      navigate("/");
    }

    setSignupData({
      fullname: "",
      email: "",
      password: "",
      avatar: "",
    });

    setPreviewImage("");
  };
  return (
    <HomeLayout>
      <div className="flex items-center justify-center h-[85vh]">
        <form
          className="flex flex-col justify-center items-center gap-3 rounded-lg p-4 w-[60vh] text-white shadow-[0_0_10px_black]"
          onSubmit={createNewAccount}
          noValidate
        >
          <h1 className="text-center text-2xl font-bold">Register Here</h1>

          <label htmlFor="image_uploads" className="cursor-pointer">
            {previewImage ? (
              <img
                className="w-24 h-24 rounded-full m-auto"
                src={previewImage}
              />
            ) : (
              <BsPersonCircle className="w-24 h-24 rounded-full m-auto" />
            )}
          </label>
          <input
            type="file"
            className="hidden"
            name="image_uploads"
            id="image_uploads"
            accept=".jpg, .jpeg, .png, .svg, .gif"
            onChange={getImage}
          />

          <div className="flex flex-col items-start gap-2 w-full mt-4">
            <label htmlFor="fullname" className="font-semibold">
              Fullname
            </label>
            <input
              type="text"
              required
              id="fullname"
              name="fullname"
              placeholder="Enter your fullname"
              className="bg-transparent ml-2 border p-1 pl-2 w-full"
              onChange={handleUserInput}
              value={signupData.fullname}
            />
          </div>
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
              value={signupData.email}
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
              value={signupData.password}
            />
          </div>

          <button
            type="submit"
            className="bg-yellow-600 rounded-sm hover:bg-yellow-500 transition-all ease-in-out duration-300 cursor-pointer text-lg py-2 px-2 font-semibold mt-3 w-full"
          >
            Create Account
          </button>

          <p className="text-center">
            Already have an account?{" "}
            <Link to="/login" className="link text-accent">
              Login
            </Link>
          </p>
        </form>
      </div>
    </HomeLayout>
  );
}

export default Signup;
