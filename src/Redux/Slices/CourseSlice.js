import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "../../Helpers/axiosInstance";

const initialState = {
  courseData: [],
};

// get all the courses
export const getAllCourses = createAsyncThunk("/course/get", async (data) => {
  try {
    const res = axiosInstance.get("/course", data);
    toast.promise(res, {
      loading: "loading course data...",
      success: "Course loaded successfully",
      error: "Failed to get the courses",
    });
    return (await res).data.courses;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

// remove a course
export const deleteCourse = createAsyncThunk("/course/delete", async (id) => {
  try {
    const response = axiosInstance.delete(`/course/${id}`);
    toast.promise(response, {
      loading: "deleting course...",
      success: "Course deleted successfully",
      error: "Failed to delete the course",
    });
    return (await response).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

//creating a new course
export const createNewCourse = createAsyncThunk(
  "/course/create",
  async (data) => {
    try {
      let formData = new FormData();
      formData.append("title", data?.title);
      formData.append("description", data?.description);
      formData.append("category", data?.category);
      formData.append("createdBy", data?.createdBy);
      formData.append("thumbnail", data?.thumbnail);

      const response = axiosInstance.post("/course", formData);
      toast.promise(response, {
        loading: "Creating new course",
        success: "Course created successfully",
        error: "Failed to create course",
      });
      return (await response).data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCourses.fulfilled, (state, action) => {
      if (action?.payload) {
        state.courseData = [...action.payload];
      }
    });
  },
});

export default courseSlice.reducer;
