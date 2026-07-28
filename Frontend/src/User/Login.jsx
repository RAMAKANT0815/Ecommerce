import React, { useState, useEffect } from 'react';
import '../UserStyles/Form.css';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { login, removeErrors, removeSuccess } from '../features/user/userSlice';

function Login() {
    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const { email, password } = user;

    const { success, loading, error, isAuthenticated } = useSelector(
        (state) => state.user
    );

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const loginDataChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const loginSubmit = (e) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error("Please fill out all the required fields");
            return;
        }

        dispatch(
            login({
                email,
                password,
                isAuthenticated
            })
        );
    };

    useEffect(() => {
        if (error) {
            toast.error(error, {
                position: "top-right",
                autoClose: 3000,
            });

            dispatch(removeErrors());
        }
    }, [dispatch, error]);

    useEffect(() => {
        if (success) {
            toast.success("Login Successful", {
                position: "top-right",
                autoClose: 3000,
            });

            dispatch(removeSuccess());
            if(isAuthenticated){
                navigate("/");
            }
            
        }
    }, [dispatch, success, navigate, isAuthenticated]);

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="form-container">
            <div className="container">
                <div className="form-content">

                    <form
                        className="form"
                        onSubmit={loginSubmit}
                    >

                        <h2>Login</h2>

                        <div className="input-group">
                            <input
                                type="email"
                                placeholder="Enter Email"
                                name="email"
                                value={email}
                                onChange={loginDataChange}
                            />
                        </div>

                        <div className="input-group">
                            <input
                                type="password"
                                placeholder="Enter Password"
                                name="password"
                                value={password}
                                onChange={loginDataChange}
                            />
                        </div>

                        <button
                            type="submit"
                            className="authBtn"
                        >
                            Login
                        </button>

                        <p className="form-links">
                            <Link
                                to="/password/forgot"
                                className="pointer"
                            >
                                Forgot Password?
                            </Link>
                        </p>

                        <p className="form-links">
                            Don't have an account?
                            <Link
                                to="/register"
                                className="pointer"
                            >
                                Register
                            </Link>
                        </p>

                    </form>

                </div>
            </div>
        </div>
    );
}

export default Login;