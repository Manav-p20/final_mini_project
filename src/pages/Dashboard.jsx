import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useSelector, useDispatch } from "react-redux";

import {
  fetchstates,
  fetchsales,
  fetchtotalproducts,
} from "../features/Dashboard/Dashboardslice";

import { useTheme } from "../context/Themecontext";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { darkMode } = useTheme();

  // Get data from Redux
  const { stats, sales, products, loading } = useSelector(
    (state) => state.dashboard,
  );

  const user = useSelector((state) => state.auth.user);

  // Fetch dashboard data
  useEffect(() => {
    dispatch(fetchstates());
    dispatch(fetchsales());
    dispatch(fetchtotalproducts());
  }, [dispatch]);

  // -----------------------------
  // Percentage calculation
  // -----------------------------

  const prevMonthSales = stats?.totalorder?.[0]?.previousmonthsale || 0;

  const currentMonthSales = stats?.totalorder?.[0]?.currentmonthsale || 0;

  const calculateGrowthPercentage = () => {
    if (prevMonthSales === 0) {
      return currentMonthSales > 0 ? 100 : 0;
    }

    const percentage =
      ((currentMonthSales - prevMonthSales) / prevMonthSales) * 100;

    return percentage.toFixed(2);
  };

  const sellingPercentage = calculateGrowthPercentage();

  const isGrowthPositive = Number(sellingPercentage) >= 0;

  // -----------------------------
  // Loading
  // -----------------------------

  if (loading) {
    return (
      <div
        className={`min-vh-100 d-flex justify-content-center align-items-center ${
          darkMode ? "bg-dark text-light" : "bg-light text-dark"
        }`}
      >
        <h3>Loading...</h3>
      </div>
    );
  }

  return (
    <div
      className={`min-vh-100 ${
        darkMode ? "dashboard-dark" : "dashboard-light"
      }`}
    >
      <Navbar />

      <div className="row m-0">
        <div className="d-flex p-0">
          <Sidebar />

          <div className="container-fluid p-4">
            <h2 className="mb-4">Welcome, {user?.name || "Admin"}</h2>

            {/* Statistics Cards */}
            <div className="row mb-4">
              {/* Total Products */}
              <div className="col-md-4 py-2">
                <div className="card bg-primary text-white p-3 border-0 shadow-sm">
                  <h5>Total Products</h5>

                  <h3>{products?.length || 0}</h3>
                </div>
              </div>

              {/* Total Orders */}
              <div className="col-md-4 py-2">
                <div className="card bg-success text-white p-3 border-0 shadow-sm">
                  <h5>Total Orders</h5>

                  <h3>{stats?.totalorder?.length || 0}</h3>

                  <h5>
                    {isGrowthPositive ? "↑" : "↓"} {sellingPercentage}%
                  </h5>

                  <small>Compared to previous month</small>
                </div>
              </div>

              {/* Total Users */}
              <div className="col-md-4 py-2">
                <div className="card bg-warning text-white p-3 border-0 shadow-sm">
                  <h5>Total Users</h5>

                  <h3>{stats?.totalusers?.length || 0}</h3>
                </div>
              </div>
            </div>

            <h4 className="mb-3">Sales Overview</h4>

            {/* Sales Chart */}
            <div className="card border-0 shadow-sm sales-card">
              <div className="card-body p-3 p-md-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="fw-semibold mb-0">Sales Overview</h5>

                  <span className="badge bg-primary-subtle text-primary">
                    This Month
                  </span>
                </div>

                <div
                  style={{
                    width: "100%",
                    height: 280,
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={sales}
                      margin={{
                        top: 10,
                        right: 10,
                        left: -10,
                        bottom: 0,
                      }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        stroke={"#374151"}
                      />

                      <XAxis
                        dataKey="name"
                        tick={{
                          fontSize: 12,
                          fill: "#000000",
                        }}
                        axisLine={{
                          stroke: "#000000",
                        }}
                        tickLine={false}
                      />

                      <YAxis
                        tick={{
                          fontSize: 12,
                          fill: "#000000",
                        }}
                        axisLine={false}
                        tickLine={false}
                        width={40}
                      />

                      <Tooltip
                        contentStyle={{
                          borderRadius: "10px",
                          border: "1px solid #374151",

                          backgroundColor: "#1F2937",
                          color: "#111127",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                          fontSize: "13px",
                        }}
                      />

                      <Line
                        type="monotone"
                        dataKey="sales"
                        stroke="#6366F1"
                        strokeWidth={2.5}
                        dot={{
                          r: 3,
                          fill: "#6366F1",
                          strokeWidth: 0,
                        }}
                        activeDot={{ r: 5 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
