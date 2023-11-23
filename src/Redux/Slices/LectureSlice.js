import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "../../Helpers/axiosInstance";

const initialState = {
  lectures: [],
};

//get all the lectures of a course
export const getCourseLectures = createAsyncThunk(
  "/course/lectures/get",
  async (cid) => {
    try {
      const response = axiosInstance.get(`/course/${cid}`);
      toast.promise(response, {
        loading: " Fetching course lectures",
        success: "Lectures fetched successfully",
        error: "Failed to load the lectures",
      });
      return (await response).data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

//add the lectures to a course
export const addCourseLecture = createAsyncThunk(
  "/course/lectures/add",
  async (data) => {
    try {
      let formData = new FormData();

      formData.append("lecture", data.lecture);
      formData.append("title", data.title);
      formData.append("description", data.description);

      const response = axiosInstance.post(`/course/${data.id}`, formData);
      toast.promise(response, {
        loading: " Adding course lectures",
        success: "Lectures added successfully",
        error: "Failed to add the lectures",
      });
      return (await response).data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

//delete a lectures from the course
export const deleteCourseLecture = createAsyncThunk(
  "/course/lectures/delete",
  async (data) => {
    try {
      const response = axiosInstance.delete(
        `/course?courseId=${data.courseId}&lectureId=${data.lectureId}`
      );
      toast.promise(response, {
        loading: " Deleting course lecture",
        success: "Lecture deleted successfully",
        error: "Failed to delete the lecture",
      });
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

const lectureSlice = createSlice({
  name: "lecture",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCourseLectures.fulfilled, (state, action) => {
        state.lectures = action?.payload?.lectures;
      })
      .addCase(addCourseLecture.fulfilled, (state, action) => {
        state.lectures = action?.payload?.course?.lectures;
      });
  },
});

export default lectureSlice.reducer;
