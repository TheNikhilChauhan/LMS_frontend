import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import { verifySubscription } from "../../../../server/controllers/payment.controllers";
import axiosInstance from "../../Helpers/axiosInstance";

const initialState = {
  key: "",
  subscription_id: "",
  isPaymentVerified: false,
  allPayments: {},
  finalMonths: {},
  monthlySalesRecord: {},
};

// get razorpay key
export const getRazorPayId = createAsyncThunk("/razorpay/getId", async () => {
  try {
    const response = await axiosInstance.get("/payments/razorpay-key");
    return (await response).data;
  } catch (error) {
    toast.error("Failed to load the data");
  }
});

// buy course
export const purchaseCourseBundle = createAsyncThunk(
  "/purchaseCourse",
  async () => {
    try {
      const response = await axiosInstance.get("/payments/subscribe");
      return (await response).data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

// verify the user payment
export const verifyUserPayment = createAsyncThunk(
  "/payments/verify",
  async (data) => {
    try {
      const response = await axiosInstance.get("/payments/verify", {
        razorpay_payment_id: data.razorpay_payment_id,
        razorpay_subscription_id: data.razorpay_subscription_id,
        razorpay_signature: data.razorpay_signature,
      });

      return (await response).data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

// getting the payment records
export const getPaymentRecord = createAsyncThunk(
  "/payments/record",
  async () => {
    try {
      const response = await axiosInstance.get("/payments?count=100");
      toast.promise(response, {
        loading: "Getting the payment records",
        success: (data) => {
          return data?.data?.message;
        },
        error: "Failed to get payment records",
      });

      return (await response).data;
    } catch (error) {
      toast.error("Operation failed!");
    }
  }
);

//cancel subscription
export const cancelCourseBundel = createAsyncThunk(
  "/payments/cancel",
  async () => {
    try {
      const response = await axiosInstance.get("/payments/unsubscribe");
      toast.promise(response, {
        loading: "Unsubscribing the bundle",
        success: (data) => {
          return data?.data?.message;
        },
        error: "Failed to Unsubscribe.",
      });

      return (await response).data;
    } catch (error) {
      toast.error("Operation failed!");
    }
  }
);

const razorpaySlice = createSlice({
  name: "razorpay",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRazorPayId.fulfilled, (state, action) => {
        state.key = action?.payload?.key;
      })
      .addCase(purchaseCourseBundle.fulfilled, (state, action) => {
        state.subscription_id = action?.payload?.subscription_id;
      })
      .addCase(verifyUserPayment.fulfilled, (state, action) => {
        toast.success(action?.payload?.message);
        state.isPaymentVerified = action?.payload?.success;
      })
      .addCase(verifyUserPayment.rejected, (state, action) => {
        toast.success(action?.payload?.message);
        state.isPaymentVerified = action?.payload?.success;
      })
      .addCase(getPaymentRecord.fulfilled, (state, action) => {
        state.allPayments = action?.payload?.allPayments;
        state.finalMonths = action?.payload?.finalMonths;
        state.monthlySalesRecord = action?.payload?.monthlySalesRecord;
      });
  },
});
