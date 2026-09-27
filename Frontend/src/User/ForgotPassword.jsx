import React, { useEffect, useState } from 'react'
import { removeSuccess, updatePassword } from '../features/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';

function ForgotPassword() {
    const {loading, error, success} = useSelector(state => state.user)
;    const dispatch = useDispatch();
    const [email, setEmail] =useState("");

    const forgotPasswordEmail= (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("email address", setEmail);
        dispatch(forgotPassword(myForm));
    }
    useEffect(() => {
        if(error){
            toast.error(error, {position: 'top-center', autoClose: 3000});
            dispatch(removeErrors())
        }
    }, [dispatch, error]);
    useEffect(() => {
        if(success){
            toast.success(message, {position: 'top-center', autoClose: 3000});
            dispatch(removeSuccess())
        }
    }, [dispatch, success]);
  return (
    <>{
        loading?(<Loader/>):
    (<>
      <Navbar />
      <PageTitle title="Forgot password"></PageTitle>
      <div className='container forgot-container'>
        <form className='form' onSubmit={forgotPasswordEmail}>
            <h2>Forgot Password</h2>
            <div className='input-group'>
                <input type="email" placeholder='Enter your registered email' name='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                <button className='authBtn'>{loading?'Sending':'Send'}</button>
            </div>
        </form>
      </div>
      <Footer />
    </>)
}
    </>
  )
}

export default ForgotPassword
