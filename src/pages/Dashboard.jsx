import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useSelector, useDispatch } from "react-redux";
import { fetchstates, fetchsales } from "../features/Dashboard/Dashboardslice";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { stats, sales, loading } = useSelector(
    (state) => state.dashboard
  );

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(fetchstates());
    dispatch(fetchsales());
  }, [dispatch]);

  if (loading) {
    return <h3 className="text-center mt-5">Loading...</h3>;
  }

  return (
    <>
      <Navbar />

      <div className="d-flex">
        <Sidebar />

        <div className="container-fluid p-4">
          <h2 className="mb-4">
            Welcome, {user?.name || "Admin"}
          </h2>

          <div className="row mb-4">
            <div className="col-md-4">
              <div className="card bg-primary text-white p-3">
                <h5>Total Products</h5>
                <h3>{stats?.totalproducts || 0}</h3>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card bg-success text-white p-3">
                <h5>Total Orders</h5>
                <h3>{stats?.totalorder || 0}</h3>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card bg-warning text-white p-3">
                <h5>Total Users</h5>
                <h3>{stats?.totalusers || 0}</h3>
              </div>
            </div>
          </div>

          <h4 className="mb-3">Sales Overview</h4>

          <LineChart width={700} height={300} data={sales}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#8884d8"
            />
          </LineChart>
        </div>
      </div>
    </>
  );
};

export default Dashboard;