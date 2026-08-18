import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Agar token nahi hai to Login page par bhej do
    if (!token) {
      navigate("/login");
      return;
    }

    const getUserDetails = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/v1/users/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("User Details:", res.data);

        
        setUser(res.data.data);

      } catch (error) {
        console.error("User details error:", error);

        
        localStorage.removeItem("token");

        navigate("/login");

      } finally {
        setLoading(false);
      }
    };

    getUserDetails();

  }, [navigate]);


  
  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="dashboard-card">
          <h2>Loading...</h2>
        </div>
      </div>
    );
  }


  
  return (
    <div className="dashboard-container">

      <div className="dashboard-card">

        <h1>Welcome 👋</h1>

        {user ? (
          <div className="user-details">

            <h2>{user.fullName}</h2>

            <div className="user-info">
              <p>
                <strong>First Name:</strong>
                <span>{user.firstName}</span>
              </p>

              <p>
                <strong>Full Name:</strong>
                <span>{user.fullName}</span>
              </p>

              <p>
                <strong>Email:</strong>
                <span>{user.email}</span>
              </p>
            </div>

            <button
              className="logout-btn"
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/login");
              }}
            >
              Logout
            </button>

          </div>
        ) : (
          <p>User details not found.</p>
        )}

      </div>

    </div>
  );
}

export default Dashboard;