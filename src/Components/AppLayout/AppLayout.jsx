import React, { useState, useRef, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  DashboardOutlined,
  UserOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
  AppstoreOutlined,
  MenuOutlined,
  LogoutOutlined,
  CloseOutlined,
} from "@ant-design/icons";

import './AppLayout.scss';
import { Logo2 } from "../../assets";
import LogoutConfirmation from "../Logoutconfirm/Logoutconfirm";

const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false); // ✅ Modal state

  const sidebarRef = useRef(null);
  const hamburgerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(event.target)
      ) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarOpen]);

  const handleLinkClick = () => {
    if (window.innerWidth <= 768) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className={`layout ${sidebarOpen ? "sidebar-open" : ""}`}>
      <aside className="sidebar" ref={sidebarRef}>
        <NavLink to="/" className="logoicon" onClick={handleLinkClick} style={{ textDecoration: 'none', color: 'inherit' }}>
          <img src={Logo2} alt="Logo" />
          <p>Zam E-com</p>
        </NavLink>

        <nav className="nav-links">
          <NavLink to="/" className="nav-link" end onClick={handleLinkClick}>
            <DashboardOutlined className="icon" />
            <span>Dashboard</span>
          </NavLink>
          <NavLink to="/customers" className="nav-link" onClick={handleLinkClick}>
            <UserOutlined className="icon" />
            <span>Customers</span>
          </NavLink>
          <NavLink to="/products" className="nav-link" onClick={handleLinkClick}>
            <ShoppingOutlined className="icon" />
            <span>Products</span>
          </NavLink>
          <NavLink to="/orders" className="nav-link" onClick={handleLinkClick}>
            <ShoppingCartOutlined className="icon" />
            <span>Orders</span>
          </NavLink>
          <NavLink to="/categories" className="nav-link" onClick={handleLinkClick}>
            <AppstoreOutlined className="icon" />
            <span>Categories</span>
          </NavLink>

          {/* ✅ Updated logout to open modal */}
          <div
            onClick={() => setShowLogoutModal(true)}
            aria-label="Initiate logout process"
            className="nav-link logout-link"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && setShowLogoutModal(true)}
            style={{cursor: 'pointer'}}
          >
            <LogoutOutlined className="icon"  />
            <span>Logout</span>
          </div>
        </nav>
      </aside>

      <div className="main-content">
        <header className="header">
          <div className="header-content">
            <button
              className="hamburger"
              ref={hamburgerRef}
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <CloseOutlined /> : <MenuOutlined />}
            </button>
            <NavLink to="/profile" className="user-profile">
              👤 User
            </NavLink>
          </div>
        </header>
        <div className="content">
          <Outlet />
        </div>
      </div>

      {/* ✅ Render Logout Modal */}
      {showLogoutModal && (
        <LogoutConfirmation onClose={() => setShowLogoutModal(false)} />
      )}
    </div>
  );
};

export default AppLayout;
