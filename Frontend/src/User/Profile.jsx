import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageTitle from "../components/PageTitle";
import '../UserStyles/Profile.css'


const Profile = () => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  console.log(user);
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated]);

  return (
    <>
   {loading? (<loading/>) : ( <div className="profile-container">
      <PageTitle title={`Profile - ${user?.name}`} />
      {/* Profile Image Section */}
      <div className="profile-image">
        <h1 className="profile-heading">My Profile</h1>

        <img
          src={user?.avatar?.url}
          alt="User Profile"
        />

        <Link to="/profile/update">Edit Profile</Link>
      </div>

      {/* Profile Details */}
      <div className="profile-details">

        <div className="profile-detail">
          <h2>UserName:</h2>
          <p>{user?.name}</p>
        </div>

        <div className="profile-detail">
          <h2>Email:</h2>
          <p>{user?.email}</p>
        </div>

        <div className="profile-detail">
          <h2>Joined On:</h2>
          <p>{user.createdAt ? String(user?.createdAt).substring(0, 10) : 'N/A'}</p>
        </div>

      </div>

      {/* Buttons */}
      <div className="profile-buttons">
        <Link to="/orders/user">My Orders</Link>
        <Link to="/password/update">Change Password</Link>
      </div>
    </div>)}
    </>
  );
};


export default Profile;