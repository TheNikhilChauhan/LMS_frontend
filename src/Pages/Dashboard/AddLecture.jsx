import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import { addCourseLecture } from "../../Redux/Slices/LectureSlice";

function AddLecture() {
  const courseDetails = useLocation().state;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userInput, setUserInput] = useState({
    id: courseDetails._id,
    lecture: undefined,
    title: "",
    description: "",
    videoSrc: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value,
    });
  };

  const handleVideo = (e) => {
    const video = e.target.files[0];
    const source = window.URL.createObjectURL(video);
    setUserInput({
      ...userInput,
      lecture: video,
      videoSrc: source,
    });
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    if (!userInput.lecture || !userInput.title || !userInput.description) {
      toast.error("All fields are mandatory!");
      return;
    }

    const response = await dispatch(addCourseLecture(userInput));
    if (response?.payload?.success) {
      navigate(-1);
      setUserInput({
        id: courseDetails._id,
        lecture: undefined,
        title: "",
        description: "",
        videoSrc: "",
      });
    }
  };

  useEffect(() => {
    if (!courseDetails) navigate("/course");
  }, []);

  return (
    <HomeLayout>
      <div className="min-h-[90vh] text-white flex flex-col items-center justify-center gap-10 mx-16">
        <div className=" flex flex-col shadow-[0_0_10px_black] gap-5 p-2 w-96 rounded-lg">
          <header className="flex items-center justify-center relative">
            <button
              className="absolute left-2 text-xl text-green-500"
              onClick={() => navigate(-1)}
            >
              <AiOutlineArrowLeft />
            </button>
            <h1 className=" text-xl text-yellow-500 font-semibold">
              Add New Lecture
            </h1>
          </header>
          <form onSubmit={onFormSubmit} className="flex flex-col gap-3">
            <input
              type="text"
              name="title"
              value={userInput.title}
              placeholder="Enter the Title of the Lecture"
              className="bg-transparent px-3 py-1 border"
              onChange={handleInputChange}
            />
            <textarea
              type="text"
              name="description"
              value={userInput.description}
              placeholder="Enter the description of the Lecture"
              className="bg-transparent px-3 py-1 border resize-none overflow-y-scroll h-36"
              onChange={handleInputChange}
            />
            {userInput.videoSrc ? (
              <video
                muted
                src={userInput.videoSrc}
                controls
                controlsList="nodownload nofullscreen"
                disablePictureInPicture
                className="object-fill rounded-tl-lg rounded-tr-lg w-full"
              ></video>
            ) : (
              <div className="h-48 flex items-center justify-center border cursor-pointer">
                <label
                  htmlFor="lecture"
                  className="cursor-pointer font-semibold text-xl"
                >
                  Choose Your video
                </label>
                <input
                  type="file"
                  className="hidden "
                  id="lecture"
                  name="lecture"
                  onChange={handleVideo}
                  accept="video/mp4 video/*"
                />
              </div>
            )}
            <button
              className="btn btn-primary py-1 font-semibold text-lg"
              type="submit"
            >
              Add New Lecture
            </button>
          </form>
        </div>
      </div>
    </HomeLayout>
  );
}

export default AddLecture;
