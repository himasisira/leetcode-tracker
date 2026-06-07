import { Link } from "react-router-dom";

function Sidebar({
  theme,
  setTheme
}) {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const logout = () => {

    localStorage.removeItem("user");

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

        {user && (

          <div className="user-box">

            👤 {user.name}

          </div>

        )}

        {!user && (

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

        {user && (

          <button
            className="logout-btn"
            onClick={logout}
          >
            🚪 Sign Out
          </button>

        )}

      </div>

    </div>

  );

}

export default Sidebar;