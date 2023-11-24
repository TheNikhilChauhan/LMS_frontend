import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJs,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { useEffect } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { BsCollectionPlayFill, BsTrash } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { FcSalesPerformance } from "react-icons/fc";
import { GiMoneyStack } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import { deleteCourse, getAllCourses } from "../../Redux/Slices/CourseSlice";
import { getPaymentRecord } from "../../Redux/Slices/RazorpaySlice";
import { getStatsData } from "../../Redux/Slices/StatSlice";

ChartJs.register(
  ArcElement,
  BarElement,
  CategoryScale,
  Legend,
  LinearScale,
  Title,
  Tooltip
);

function AdminDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { allUsersCount, subscribedCount } = useSelector(
    (state) => state.stats
  );

  const { allPayments, monthlySalesRecord } = useSelector(
    (state) => state.razorpay
  );

  const userData = {
    labels: ["Registered User", "Enrolled User"],
    datasets: [
      {
        label: "User Details",
        data: [allUsersCount, subscribedCount],
        backgroundColor: ["yellow", "green"],
        borderWidth: 1,
        borderColor: ["yellow", "green"],
      },
    ],
  };

  const salesData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    fontColor: "white",
    datasets: [
      {
        label: "Sales/ Month",
        data: monthlySalesRecord,
        backgroundColor: ["rgb(255, 99, 132)"],
        borderColor: ["white"],
        borderWidth: 2,
      },
    ],
  };

  const myCourses = useSelector((state) => state?.course?.courseData);

  const onCourseDelete = async (id) => {
    if (window.confirm("Are you sure that you want to delete the course?")) {
      const res = await dispatch(deleteCourse(id));
      if (res?.payload?.success) {
        await dispatch(getAllCourses());
      }
    }
  };

  useEffect(() => {
    (async () => {
      await dispatch(getAllCourses());
      await dispatch(getStatsData());
      await dispatch(getPaymentRecord());
    })();
  }, []);

  return (
    <HomeLayout>
      <div className="min-h-[90vh] pt-5 flex flex-col flex-wrap gap-10 text-white">
        <h1 className="text-center text-5xl font-semibold text-yellow-500">
          Dashboard
        </h1>
        <div className="grid grid-cols-2 gap-5 m-auto mx-10">
          <div className="flex flex-col items-center gap-10 p-5 shadow-lg rounded-lg">
            <div className="w-80 h-80">
              {console.log(userData)}
              <Pie data={userData} />
            </div>
            <div className="grid grid-cols-2 gap-5">
              <div className="flex items-center justify-between p-5 gap-5 rounded-md shadow-lg">
                <div className="flex flex-col items-center">
                  <p className="font-semibold">Registered Users</p>
                  <h3 className="text-4xl font-bold">{allUsersCount}</h3>
                </div>
                <FaUsers className="text-4xl text-yellow-500" />
              </div>
              <div className="flex items-center justify-between p-5 gap-5 rounded-md shadow-lg">
                <div className="flex flex-col items-center">
                  <p className="font-semibold">Subscribed Users</p>
                  <h3 className="text-4xl font-bold">{subscribedCount}</h3>
                </div>
                <FaUsers className="text-4xl text-green-500" />
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-10 p-5 shadow-lg rounded-md">
            <div className="h-80 w-full relative">
              <Bar data={salesData} className="absolute bottom-0 h-80 w-full" />
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div className="flex items-center justify-between p-5 gap-5 rounded-md shadow-lg">
                <div className="flex flex-col items-center">
                  <p className="font-semibold">Subscription Count</p>
                  <h3 className="text-4xl font-bold">{allPayments?.count}</h3>
                </div>
                <FcSalesPerformance className="text-4xl text-green-500" />
              </div>
              <div className="flex items-center justify-between p-5 gap-5 rounded-md shadow-lg">
                <div className="flex flex-col items-center">
                  <p className="font-semibold">Total Revenue</p>
                  <h3 className="text-4xl font-bold">
                    {allPayments?.count * 499}
                  </h3>
                </div>
                <GiMoneyStack className="text-4xl text-green-500" />
              </div>
            </div>
          </div>
        </div>

        <div className="mx-[10%] w-[80%] self-center items-center justify-center gap-5">
          <div className="flex w-full items-center justify-between">
            <h1 className="text-center text-3xl font-semibold">
              Courses Overview
            </h1>
            <button
              onClick={() => {
                navigate("/course/create");
              }}
              className="w-fit bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300 rounded py-2 font-semibold text-lg cursor-pointer"
            >
              Create New Course
            </button>
          </div>

          <table className="table overflow-x-scroll">
            <thead>
              <tr>
                <th>Serial No.</th>
                <th>Course Title</th>
                <th>Course Category</th>
                <th>Instructor</th>
                <th>Description</th>
                <th>Total Lectures</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {myCourses?.map((course, index) => {
                return (
                  <tr key={course._id}>
                    <td>{index + 1}</td>
                    <td>
                      <textarea
                        readOnly
                        value={course?.title}
                        className="w-40 h-auto bg-transparent resize-none"
                      />
                    </td>
                    <td>{course?.category}</td>
                    <td>{course?.createdBy}</td>
                    <td className="max-w-28 overflow-hidden text-ellipsis">
                      <textarea
                        value={course?.description}
                        readOnly
                        className="w-80 h-auto bg-transparent resize-none"
                      />
                    </td>
                    <td>{course?.numberOfLectures}</td>
                    <td className="flex items-center gap-4">
                      <button
                        onClick={() =>
                          navigate("/course/displayLectures", {
                            state: { ...course },
                          })
                        }
                        className="bg-green-500 hover:bg-green-600 transition-all ease-in-out duration-300 text-xl py-2 px-4 rounded-lg font-bold"
                      >
                        <BsCollectionPlayFill />
                      </button>
                      <button
                        onClick={() => {
                          onCourseDelete(course?._id);
                        }}
                        className="bg-red-500 hover:bg-red-600 transition-all ease-in-out duration-300 text-xl py-2 px-4 rounded-lg font-bold"
                      >
                        <BsTrash />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </HomeLayout>
  );
}

export default AdminDashboard;
