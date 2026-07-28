import React, { useState, useEffect } from 'react'
import '../UserStyles/Form.css'
import {useSelector, useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {register,removeErrors,removeSuccess,} from "../features/user/userSlice";


function Register() {
    const [user, setUser] = useState(
        {
            name:'',
            email:'',
            password:''
        }
    );
    const [avatar, setAvatar] = useState("")
    const [avatarPrev, setAvatarPrev]=useState('/avatar.avif')
    const {name, email, password}=user
    const {success, loading, error}=useSelector(state=>state.user)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const registerDataChange=(e)=>{
        if(e.target.name=='avatar'){
            const reader=new FileReader();
            reader.onload=()=>{
                if(reader.readyState===2){
                    setAvatarPrev(reader.result);
                    setAvatar(reader.result)
                }
            }
            reader.readAsDataURL(e.target.files[0]);
        }else{
            setUser({...user,[e.target.name]:e.target.value})
        }
    }
    const registerSubmit=(e)=>{
        e.preventDefault();
         console.log("Register clicked");
        if(!name || !email || !password){
            toast.error('plz fill out all the required fields');
            return;
        }
        const myForm = new FormData();
        myForm.set('name', name);
        myForm.set('email', email);
        myForm.set('password', password);
        myForm.set('avatar', avatar);
        for(let pair of myForm.entries()){
            console.log(pair[0], pair[1]);
        }
        console.log(myForm)
        dispatch(register(myForm))
    }
    useEffect(() => {
        if (error) {
          toast.error(error, {
            position: 'top-right',
            autoClose: 3000,
          });
        dispatch(removeErrors());
        }
    }, [dispatch, error]);
    useEffect(() => {
        if (success) {
          toast.success("Registered successfully", {
            position: 'top-right',
            autoClose: 3000,
          });
        dispatch(removeSuccess());
        navigate('/login')
        }
    }, [dispatch, success]);
    

  return (
    <div className="form-container">
      <div className="container">
        <div className="form-content">
          <form className="form" onSubmit={registerSubmit} encType='multipart/form-data'>

            <h2>Register</h2>

            <div className="input-group">
              <input
                type="text"
                placeholder="Enter username"
                name='name'
                value={name}
                onChange={registerDataChange}
              />
            </div>

            <div className="input-group">
              <input
                type="email"
                placeholder="Enter Email"
                name='email'
                value={email}
                onChange={registerDataChange}
              />
            </div>

            <div className="input-group">
              <input
                type="password"
                placeholder="Enter Password"
                name='password'
                value={password}
                onChange={registerDataChange}
              />
            </div>

            <div className="input-group avatar-group">
              <input
                type="file"
                accept="image/*"
                className="file-input"
                name='avatar'
                onChange={registerDataChange}
              />

              
                <img
                  src={avatarPrev}
                  alt="Avatar Preview"
                  className="avatar"
               
                />
              
            </div>

            <button
              type="submit"
              className="authBtn"
            >
              {loading?'Registering':'Register'}
            </button>

            <p className="form-links">
              Already have an account?
              <Link className="pointer" to="/login">
                Login
              </Link>
            </p>

          </form>
        </div>
      </div>
    </div>
  );
}

export default Register
