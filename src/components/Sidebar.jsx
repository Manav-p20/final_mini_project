import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../context/Themecontext";

const Sidebar = () => {
  const { darkMode } = useTheme();
  const location = useLocation();

  const menuItems = [
    {
      path: "/dashboard",
      label: "Dashboard",
      icon: "📊",
    },
    {
      path: "/products",
      label: "Products",
      icon: "📦",
    },
    {
      path: "/orders",
      label: "Orders",
      icon: "🛒",
    },
    {
      path: "/users",
      label: "Users",
      icon: "👥",
    },
  ];

return (
  <aside
    className={`p-3 ${
      darkMode ? "sidebar-dark" : "sidebar-light"
    }`}
  >
    <ul className="list-unstyled d-flex flex-column gap-4">
      {menuItems.map((item) => {
        const isActive = location.pathname === item.path;

        return (
          <li key={item.path} className="fw-bold">
            <Link
              to={item.path}
              className={`sidebar-link text-decoration-none  ${
                isActive ? "active" : ""
              }`}
            >
              <div className="d-flex align-items-center gap-2">
                <span className="sidebar-icon">
                  {item.icon}
                </span>

                <span>{item.label}</span>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  </aside>
);
}

export default Sidebar;
