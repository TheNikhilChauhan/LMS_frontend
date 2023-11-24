import "./App.css";

import { Route, Routes } from "react-router-dom";

import RequireAuth from "./Auth/RequireAuth";
import AboutUs from "./Pages/AboutUs";
import Contact from "./Pages/Contact";
import CourseDescription from "./Pages/Course/CourseDescription";
import CourseList from "./Pages/Course/CourseList";
import CreateCourse from "./Pages/Course/CreateCourse";
import AddLecture from "./Pages/Dashboard/AddLecture";
import AdminDashboard from "./Pages/Dashboard/AdminDashboard";
import Denied from "./Pages/Denied";
import DisplayLectures from "./Pages/DisplayLectures";
import HomePage from "./Pages/HomePage";
import Login from "./Pages/Login";
import NotFound from "./Pages/NotFound";
import Checkout from "./Pages/Payment/Checkout";
import PaymentFailure from "./Pages/Payment/PaymentFailure";
import PaymentSuccess from "./Pages/Payment/PaymentSuccess";
import Signup from "./Pages/Signup";
import EditProfile from "./Pages/User/EditProfile";
import UserProfile from "./Pages/User/UserProfile";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/about" element={<AboutUs />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/course" element={<CourseList />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route
          path="/course/description"
          element={<CourseDescription />}
        ></Route>

        <Route element={<RequireAuth allowedRoles={["ADMIN"]} />}>
          <Route path="/course/create" element={<CreateCourse />} />
          <Route path="/course/addLecture" element={<AddLecture />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={["ADMIN", "USER"]} />}>
          <Route path="/user/profile" element={<UserProfile />} />
          <Route path="/user/editprofile" element={<EditProfile />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkout/success" element={<PaymentSuccess />} />
          <Route path="/checkout/fail" element={<PaymentFailure />} />
          <Route path="/course/displayLectures" element={<DisplayLectures />} />
        </Route>
        <Route path="/denied" element={<Denied />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </>
  );
}

export default App;
