import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineArrowLeft, AiOutlineZoomOut } from "react-icons/ai";
import { BsPersonCircle } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import { getUserData, updateProfile } from "../../Redux/Slices/AuthSlice";

function EditProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [data, setData] = useState({
    prevImage: "",
    fullname: "",
    avatar: undefined,
    userId: useSelector((state) => state?.auth?.data?._id),
  });

  const handleImageUpload = (e) => {
    e.preventDefault();
    const uploadImage = e.target.files[0];
    if (uploadImage) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadImage);
      fileReader.addEventListener("load", function () {
        setData({
          ...data,
          prevImage: this.result,
          avatar: uploadImage,
        });
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    if (!data.fullname || !data.avatar) {
      toast.error("All fields are mandatory");
      return;
    }
    if (data.fullname.length < 5) {
      toast.error("Name must be greater than 5 characters");
      return;
    }
    const formData = new FormData();
    formData.append("fullname", data.fullname);
    formData.append("avatar", data.avatar);

    await dispatch(updateProfile([data?.userId, formData]));
    await dispatch(getUserData());
    navigate("/user/profile");
  };

  return (
    <HomeLayout>
      <div className="flex items-center justify-center h-[100vh]">
        <form
          onSubmit={onFormSubmit}
          className="flex flex-col justify-center items-center gap-5 rounded-lg p-4 text-white w-80 min-h-[26rem] shadow-[0_0_10px_black]"
        >
          <h1 className="text-center">Edit Profile</h1>
          <label
            htmlFor="image_upload"
            className="w-28 h-28 rounded-full font-semibold cursor-pointer"
          >
            {data.prevImage ? (
              <img
                className=" w-36 h-32 rounded-full m-auto"
                src={data.prevImage}
              />
            ) : (
              <BsPersonCircle className="w-28 h-28 rounded-full m-auto" />
            )}
          </label>
          <input
            onChange={handleImageUpload}
            className="hidden"
            type="file"
            id="image_upload"
            name="image_upload"
            accept=".jgp, .png, .svg, .jpeg"
          />
          <div className="flex flex-col gap-1">
            <label htmlFor="fullname" className="text-lg font-semibold">
              FullName
            </label>
            <input
              required
              type="text"
              id="fullname"
              name="fullname"
              placeholder="Enter your name"
              className=" border px-2 py-1 bg-transparent"
              value={data.fullname}
              onChange={handleInputChange}
            />
          </div>
          <button className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 text-lg cursor-pointer">
            Update Profile
          </button>
          <Link to="/user/profile">
            <p className="link text-accent cursor-pointer flex items-center justify-center w-full">
              <AiOutlineArrowLeft /> Go back to profile
            </p>
          </Link>
        </form>
      </div>
    </HomeLayout>
  );
}

export default EditProfile;
