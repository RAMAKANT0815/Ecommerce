import React, { useEffect } from 'react'

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from 'react-router-dom'

import Home from './pages/Home'
import ProductDetails from './pages/ProductDetails'
import Products from './pages/products'

import Register from './User/Register'
import Login from './User/Login'

import { useDispatch, useSelector } from 'react-redux'
import { loadUser } from './features/user/userSlice'

import UserDashboard from './User/UserDashboard'
import Profile from './User/Profile'
import ProtectedRoute from './components/ProtectedRoute'

import Dashboard from './Admin/Dashboard'
import UpdateProfile from './User/UpdateProfile'
import ProductList from './Admin/ProductsList'
import CreateProduct from './Admin/CreateProduct'

import UpdatePassword from './User/UpdatePassword'
import ForgotPassword from './User/ForgotPassword'
import ResetPassword from './User/ResetPassword'


function App() {

    const { isAuthenticated, user } = useSelector(state => state.user)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadUser())
    }, [dispatch])


    console.log(isAuthenticated, user)


    return (
        <Router>

            <Routes>

                <Route
                    path="/"
                    element={
                        isAuthenticated
                            ? <Home />
                            : <Navigate to="/login" replace />
                    }
                />

                <Route
                    path="/product/:id"
                    element={<ProductDetails />}
                />

                <Route
                    path="/products"
                    element={<Products />}
                />

                <Route
                    path="/products/:keyword"
                    element={<Products />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/profile/update"
                    element={
                        <ProtectedRoute element={<UpdateProfile />} />
                    }
                />

                <Route
                    path="/password/update"
                    element={
                        <ProtectedRoute element={<UpdatePassword />} />
                    }
                />

                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute element={<Profile />} />
                    }
                />

                <Route
                    path="/admin/dashboard"
                    element={
                        <ProtectedRoute
                            element={<Dashboard />}
                            adminOnly={true}
                        />
                    }
                />

                <Route
                    path="/admin/products"
                    element={
                        <ProtectedRoute
                            element={<ProductList />}
                            adminOnly={true}
                        />
                    }
                />

                <Route
                    path="/admin/product/create"
                    element={
                        <ProtectedRoute
                            element={<CreateProduct />}
                            adminOnly={true}
                        />
                    }
                />

                <Route
                    path="/password/forgot"
                    element={<ForgotPassword />}
                />

                <Route
                    path="/reset/:token"
                    element={<ResetPassword />}
                />

            </Routes>

            {isAuthenticated && <UserDashboard user={user} />}

        </Router>
    )
}

export default App