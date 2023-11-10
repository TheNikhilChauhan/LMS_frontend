import { useState } from "react";
import toast from "react-hot-toast";

import axiosInstance from "../Helpers/axiosInstance";
import HomeLayout from "../Layouts/HomeLayout";

function Contact() {
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setUserInput({
      ...userInput,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userInput.email || !userInput.message || !userInput.name) {
      toast.error("All fields are mandatory");
      return;
    }

    //checking valid email
    if (!userInput.email.match(/^[\w\-.]+@([\w-]+\.)+[\w-]{2,}$/gm)) {
      toast.error("Invalid email id");
      return;
    }

    try {
      const response = axiosInstance.post("/contact", userInput);
      toast.promise(response, {
        loading: "Submitting your message...",
        success: "Form submitted successfully",
        error: "Failed to submit the form",
      });
      const contactResponse = await response;
      if (contactResponse?.data?.success) {
        setUserInput({
          name: "",
          email: "",
          message: "",
        });
      }
    } catch (error) {
      toast.error("Operation failed");
    }
  };

  return (
    <HomeLayout>
      <div className="flex items-center justify-center h-[100vh]">
        <form
          noValidate
          className="flex flex-col items-center justify-center gap-2 p-5 rounded-md text-white shadow-[0_0_10px_black] w-[22rem]"
          onSubmit={handleSubmit}
        >
          <h1 className="text-3xl font-semibold">Contact Form</h1>

          <div className="flex flex-col gap-1 items-start w-full">
            <label htmlFor="name" className="text-xl font-semibold">
              Name
            </label>
            <input
              className=" bg-transparent border px-2 py-1 rounded-sm w-full"
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              onChange={handleInputChange}
              value={userInput.name}
            />
          </div>
          <div className="flex flex-col gap-1 w-full items-start">
            <label htmlFor="email" className="text-xl font-semibold">
              Email
            </label>
            <input
              className=" bg-transparent border px-2 py-1 rounded-sm w-full"
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              onChange={handleInputChange}
              value={userInput.email}
            />
          </div>
          <div className="flex flex-col gap-1 w-full items-start">
            <label htmlFor="message" className="text-xl font-semibold">
              Message
            </label>
            <textarea
              className=" bg-transparent border px-2 py-1 rounded-sm resize-none h-40 w-full"
              id="message"
              name="message"
              placeholder="Enter your message"
              onChange={handleInputChange}
              value={userInput.message}
            />
          </div>
          <button className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer">
            Submit
          </button>
        </form>
      </div>
    </HomeLayout>
  );
}

export default Contact;
