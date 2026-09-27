import React, { useState, useEffect } from 'react'
import '../UserStyles/Form.css'
import Navbar from '../components/Navbar'
import Footer from '../pages/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { updateProfile, removeErrors, removeSuccess } from '../features/user/userSlice'
import { toast } from 'react-toastify'

function UpdateProfile() {

const [name, setName]=useState("");
const [email, setEmail]=useState("");

const [avatar, setAvatar]=useState("");
const [avatarPreview, setAvatarPreview]=useState("/avatar.avif"); // ✅ FIX

const { user, loading, error, success } = useSelector((state) => state.user);

const dispatch = useDispatch();
const navigate = useNavigate();

// 🔥 IMAGE HANDLER
const updateProfileImageChangeHandler=(e)=>{
  const reader = new FileReader();
  const file = e.target.files[0];

  reader.onloadend = () => {
    if(reader.readyState === 2){
      setAvatarPreview(reader.result);
      setAvatar(reader.result);
    }
  };

  reader.onerror = () => {
    toast.error("Error reading file");
  };

  if (file) {
    reader.readAsDataURL(file);
  }
};

// 🔥 SUBMIT
const updateProfileSubmitHandler=(e)=>{
  e.preventDefault();

  const formData = new FormData();
  formData.set("name", name);
  formData.set("email", email);

  if (avatar !== "") {   // ✅ FIX
    formData.set("avatar", avatar);
  }

  dispatch(updateProfile(formData));
};

// 🔥 ERROR HANDLE
useEffect(() => {
  if (error) {
    toast.error(error, { autoClose: 2000 , position: toast.POSITION.TOP_CENTER });
    dispatch(removeErrors());
  }
}, [error, dispatch]);

useEffect(() => {
  if (success) {
    toast.success(message, {position: toast.POSITION.TOP_CENTER, autoClose: 2000});
    

    dispatch(removeSuccess());
    navigate("/profile");
  }
}, [success, dispatch]);

useEffect(() => {
  if (user) {
    setName(user.name);
    setEmail(user.email);
    setAvatarPreview(user.avatar.url);
  }
}, [user]);
return (
  
<>
  <Navbar />
  <div className="container update-container">
    <div className="form-content">

        <form className="form" encType="multipart/form-data" onSubmit={updateProfileSubmitHandler}> {/* ✅ FIX */}
          <h2>Update Profile</h2>

            <div className="input-group avatar-group">
                <input 
                  type="file" 
                  accept="image/*"   // ✅ FIX
                  className="file-input" 
                  onChange={updateProfileImageChangeHandler}
                />
                <img src={avatarPreview} alt="user profile" className="avatar" />
            </div>

            <div className="input-group">
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e)=>setName(e.target.value)} 
                  placeholder='Enter the name' 
                />
            </div>

            <div className="input-group">
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e)=>setEmail(e.target.value)} 
                  placeholder='Enter email' 
                />
            </div>

            <button className='authBtn' disabled={loading}>
              {loading ? "Updating..." : "Update Profile"}
            </button>

        </form>

    </div>
  </div>

  <Footer />

</>
)
}

export default UpdateProfile;