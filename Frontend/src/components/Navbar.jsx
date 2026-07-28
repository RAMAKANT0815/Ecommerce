import React, { useState } from "react";
import "../componentStyles/Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import '../pageStyles/Search.css'
import UserDashboard from "../User/UserDashboard";
import { useSelector } from "react-redux";


function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("")

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const toggleSearch=()=>setIsSearchOpen(!isSearchOpen)
  const {isAuthenticated} = useSelector((state)=>state.user);
  const navigate = useNavigate();
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if(searchQuery.trim()){
      navigate(`/products?keyword=${encodeURIComponent(searchQuery.trim())}`)
    }else{
      navigate('/products')
    }
    setSearchQuery("")
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/" onClick={() => setIsMenuOpen(false)}>
            ShopKart
          </Link>
        </div>

        <div className={isMenuOpen ? "navbar-links active" : "navbar-links"}>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>

            <li>
              <Link to="/products">Products</Link>
            </li>

            <li>
              <Link to="/about">About</Link>
            </li>

            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        <div className="navbar-icons">
          <div className="search-container">
            <form className={`search-form ${isSearchOpen ?'active': ''}`} onSubmit={handleSearchSubmit}>
              <input type="text" placeholder="Search products..." value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)}/>
              <button className="search-icon" onClick={toggleSearch} type="button">
                <SearchIcon focusable="false" />
              </button>
              
            </form>
          </div>

          <div className="cart-container">
            <Link to="/cart">
              <ShoppingCartIcon className="icon" />
              <span className="cart-badge">0</span>
            </Link>

            <Link to="/wishlist">
              <FavoriteBorderIcon className="icon" />
              <span className="cart-badge">0</span>
            </Link>
          </div>

          {!isAuthenticated && 
            <Link to="/register">
              <PersonOutlinedIcon className="register-link" />
            </Link>
          }         
            
          

          <div className="navbar-hamburger" onClick={toggleMenu}>
            {isMenuOpen ? (
              <CloseIcon className="icon" />
            ) : (
              <MenuIcon className="icon" />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;