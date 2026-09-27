import { Password } from '@mui/icons-material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { removeErrors, removeSuccess } from '../features/user/userSlice';

function ResetPassword() {
    const [newPassword, setNewPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");
    const { success, loading, error} = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const resetPasswordSubmit = (e) => {
        e.preventDefault();
        const myForm = {Password, confPassword,}
        dispatch(resetPassword({token: token, userData: myForm}));
    }

    useEffect(() => {
      if(error){
        toast.error(error, {position: 'top-center', autoClose: 3000});
        dispatch(removeErrors());
      }
    }, [dispatch, error])

    
    useEffect(() => {
      if(success){
        toast.success("password reset successfully", {position: 'top-center', autoClose: 3000});
        dispatch(removeSuccess());
        navigate("/login");
      }
    }, [dispatch, success])
  return (
    <div>
      <Navbar />
      <PageTitle title="Reset Password" />
      <div className="container update-container">
        <div className="form-content">

          <form className="form" onSubmit={resetPasswordSubmit}>
            <h2>Reset Password</h2>

            <div className="input-group">
              <input type="password" placeholder="Enter new password" name='newPassword' value={newPassword} onChange={(e) => setNewPassword(e.target.value)}/>
            </div>

            <div className="input-group">
              <input type="password" placeholder="Confirm new password" name='cnfPassword' value={confPassword} onChange={(e) => setConfPassword(e.target.value)}/>
            </div>

            <button className="authBtn" onClick={resetPasswordSubmit}>Update Password</button>

          </form>

        </div>
      </div>

      <Footer />
    </div>
  )
}

export default ResetPassword
