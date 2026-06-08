import { Link } from "react-router-dom";

function Sidebar({
  theme,
  setTheme
}) {

  const token =
    localStorage.getItem("token");

  const userName =
    localStorage.getItem("userName");

  const logout = () => {

    localStorage.clear();

    window.location.href = "/login";

  };

  return (

    <div className="sidebar">

      <div>

        <div className="logo-container">

          <img
            src="/logo192.png"
            alt="LeetTrack"
            className="sidebar-logo"
          />

          <h2 className="logo">
            LeetTrack
          </h2>

        </div>

        <ul>

          <li>
            <Link to="/">
              📊 Dashboard
            </Link>
          </li>

          <li>
            <Link to="/problems">
              💻 Problems
            </Link>
          </li>

          <li>
            <Link to="/planner">
              📅 Planner
            </Link>
          </li>

          <li>
            <Link to="/analytics">
              📈 Analytics
            </Link>
          </li>

          <li>
            <Link to="/studyplan">
              📚 Study Plan
            </Link>
          </li>

          <li>
            <Link to="/achievements">
              🏅 Achievements
            </Link>
          </li>

          <li>
            <Link to="/activity">
              🔥 Activity
            </Link>
          </li>

        </ul>

      </div>

      <div className="sidebar-bottom">

        <button
          className="theme-btn"
          onClick={() =>
            setTheme(
              theme === "dark"
                ? "light"
                : "dark"
            )
          }
        >
          {
            theme === "dark"
              ? "☀ Light Mode"
              : "🌙 Dark Mode"
          }
        </button>

        {token && (

          <div className="user-box">
            👤 {userName}
          </div>

        )}

        {!token && (

          <>

            <Link
              to="/login"
              className="auth-btn"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="auth-btn"
            >
              Register
            </Link>

          </>

        )}

        {token && (

          <button
            className="logout-btn"
            onClick={logout}
          >
            🚪 Logout
          </button>

        )}

      </div>

    </div>

  );

}

export default Sidebar;