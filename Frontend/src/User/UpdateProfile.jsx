import React, { useState } from 'react'
import '../UserStyles/Form.css'
import Navbar from '../components/Navbar'
import Footer from '../pages/Footer'

function UpdateProfile() {
  const [name, setName]=useState("");
  const [email, setEmail]=useState("");

  const [avatar, setAvatar]=useState("");
  const [avatarPreview, setAvatarPreview]=useState("");
 

  return (
    <>
      <Navbar />

      <div className="container update-container">
        <div className="form-content">
            <form className="form">
              <h2>Update Profile</h2>

                <div className="input-group avatar-group">
                    <input type="file" accept="image/" className="file-input"/>
                    <img src={avatarPreview} alt="user profile" className="avatar" />
                </div>
                <div className="input-group">
                    <input type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder='Enter the name'/>
                </div>
                <div className="input-group">
                    <input type="email" value={name} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter email'/>
                </div>
                <button className='authBtn'>Update Profile</button>
            </form>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default UpdateProfile
