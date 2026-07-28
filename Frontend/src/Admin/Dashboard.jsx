import React from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../pages/Footer";
import PageTitle from "../components/PageTitle";

import "../AdminStyles/Dashboard.css";

import DashboardIcon from "@mui/icons-material/Dashboard";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PeopleIcon from "@mui/icons-material/People";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import CategoryIcon from "@mui/icons-material/Category";
import ReviewsIcon from "@mui/icons-material/Reviews";
import { CheckCircle, Facebook, LinkedIn } from "@mui/icons-material";

const Dashboard = () => {
  return (
    <>
      <PageTitle title="Admin Dashboard" />
      <Navbar />

      <div className="dashboard-container">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="logo">
            <DashboardIcon className="logo-icon" />
            <span>Admin Panel</span>
          </div>

          <div className="nav-menu">
            

            <div className="nav-section">
              <h3>Products</h3>

              <Link to="/admin/products">
                <Inventory2Icon className="nav-icon" />
                All Products
              </Link>

              <Link to="/admin/product/create">
                <AddBoxIcon className="nav-icon" />
                Add Product
              </Link>
            </div>

            <div className="nav-section">
              <h3>Orders</h3>

              <Link to="/admin/orders">
                <ListAltIcon className="nav-icon" />
                Orders
              </Link>
            </div>

            <div className="nav-section">
              <h3>Users</h3>

              <Link to="/admin/users">
                <PeopleIcon className="nav-icon" />
                All Users
              </Link>

              <Link to="/admin/reviewId">
                <ReviewsIcon className="nav-icon" />
                Reviews
              </Link>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          

          <div className="stats-grid">
            <div className="stat-box">
              <Inventory2Icon className="icon" />
              <h3>Total Products</h3>
              <p>120</p>
            </div>

            <div className="stat-box">
              <ShoppingCartIcon className="icon" />
              <h3>Total Orders</h3>
              <p>56</p>
            </div>

            <div className="stat-box">
              <PeopleIcon className="icon" />
              <h3>Total Users</h3>
              <p>230</p>
            </div>

            <div className="stat-box">
              <ReviewsIcon className="icon" />
              <h3>Total Reviews</h3>
              <p>2</p>
            </div>

            <div className="stat-box">
              <CurrencyRupeeIcon className="icon" />
              <h3>Total Revenue</h3>
              <p>₹2,45,000</p>
            </div>

            <div className="stat-box">
              <WarningAmberIcon className="icon" />
              <h3>Out of Stock</h3>
              <p>8</p>
            </div>

            <div className="stat-box">
              <CheckCircle className="icon" />
              <h3>In Stock</h3>
              <p>8</p>
            </div>
          </div>

          <div className="social-stats">
            <div className="social-box instagram">
              <Instagram />
              <h3>Instagram</h3>
              <p>123k followers</p>
              <p>23 posts</p>
            </div>

            <div className="social-box linkedin">
              <LinkedIn />
              <h3>LinkedIn</h3>
              <p>123k followers</p>
              <p>23 posts</p>
            </div>

            <div className="social-box facebook">
              <Facebook />
              <h3>Facebook</h3>
              <p>123k followers</p>
              <p>23 posts</p>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </>
  );
};

export default Dashboard;