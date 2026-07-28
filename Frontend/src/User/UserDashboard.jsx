import React, { useState } from "react";
import "../UserStyles/UserDashboard.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { logout,removeErrors } from "../features/user/userSlice";

function ProfileMenu({ user }) {
  const [open, setOpen] = useState(false);
  const options = [
    {name:'Orders', funcName:orders},
    {name:'Account',funcName:profile},
    {name:'Logout',funcName:logoutUser},

  ]
  const navigate = useNavigate();
  const dispatch = useDispatch()
  function orders(){
    navigate('/orders/user')
  }
  function profile(){
    navigate('/profile')
  }
 
  
  const toggleMenu = () => {
    setOpen(!open);
  };
  function logoutUser(){
    dispatch(logout()).unwrap().then(()=>{
        toast.success('logout successfully')
        dispatch(removeErrors())
        navigate('/login')
    }).catch((error)=>{
        toast.success(error.message || 'logout Failed', {position:'top-center',autoClose:3000})
    })
  }
  if(user?.role==='user'){
    options.unshift({name:'Admin Dashboard', funcName:dashboard})
  }
  function dashboard(){
    navigate('/admin/dashboard')
  }

  return (
    <div className="dashboard-container">
      {/* Overlay */}
      <div
        className={`overlay ${open ? "show" : ""}`}
        onClick={toggleMenu}
      ></div>

      {/* Profile Header */}
      <div className="profile-header" onClick={toggleMenu}>
        <img
          src={user?.avatar?.url || "/avatar.avif"}
          alt="Profile"
          className="profile-avatar"
        />

        <span className="profile-name">
          {user?.name || "Guest"}
        </span>
      </div>

      {/* Dropdown Menu */}
      {open && (
        <div className="menu-options">
          {
            options.map((item)=>(
                <button 
                key={item.name}
                className="menu-option-btn" onClick={item.funcName}>{item.name}</button>
            ))
          }
        </div>
      )}
    </div>
  );
}

export default ProfileMenu;