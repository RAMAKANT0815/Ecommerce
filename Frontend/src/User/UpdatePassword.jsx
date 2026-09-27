import React, { useEffect, useState } from 'react'
import '../UserStyles/Form.css'
import Navbar from '../components/Navbar'
import Footer from '../pages/Footer'
import PageTitle from '../components/PageTitle'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { removeErrors } from '../features/user/userSlice'

function UpdatePassword() {
  const {success, loading, error} = useSelector(state => state.user); 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const updatePasswordSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("oldPassword", oldPassword)
    myForm.set("newPassword", newPassword)
    myForm.set("confPassword", confPassword)
    for(let pair of myForm.entries()){
      console.log(pair[0]+'-'+pair[1]);
    }
    dispatch(updatePassword(myForm))
  }
  useEffect(() => {
    if(error){
      toast.error(error.message, {position: 'top-center', autoClose: 3000});
      dispatch(removeErrors())
    }
  },[dispatch, error])
  useEffect(() => {
    if(success){
      toast.success("password updated successfully", {position: 'top-center', autoClose: 3000});
      dispatch(removeSuccess())
      navigate("/profile")
    }
  },[dispatch, success])
  return (
    <>
    { loading?( <Loade />):
   ( <>
      <Navbar />
      <PageTitle title="Update Password" />
      <div className="container update-container">
        <div className="form-content">

          <form className="form">
            <h2>Update Password</h2>

            <div className="input-group">
              <input type="password" placeholder="Enter current password" name='oldPassword' value={oldPassword} onChange={(e) => setOldPassword(e.target.value)}/>
            </div>

            <div className="input-group">
              <input type="password" placeholder="Enter new password" name='newPassword' value={newPassword} onChange={(e) => setNewPassword(e.target.value)}/>
            </div>

            <div className="input-group">
              <input type="password" placeholder="Confirm new password" name='cnfPassword' value={confPassword} onChange={(e) => setConfPassword(e.target.value)}/>
            </div>

            <button className="authBtn" onClick={updatePasswordSubmit}>Update Password</button>

          </form>

        </div>
      </div>

      <Footer />
    </>)}
    </>
  )
}

export default UpdatePassword