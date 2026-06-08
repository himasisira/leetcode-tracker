import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import Problems from "./pages/Problems";
import Planner from "./pages/Planner";
import Analytics from "./pages/Analytics";
import StudyPlan from "./pages/StudyPlan";
import Achievements from "./pages/Achievements";
import Activity from "./pages/Activity";
import Login from "./pages/Login";
import Register from "./pages/Register";

import "./App.css";
import "./styles/Theme.css";

function App() {

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "dark"
  );

  const token =
    localStorage.getItem("token");

  useEffect(() => {

    document.body.setAttribute(
      "data-theme",
      theme
    );

    localStorage.setItem(
      "theme",
      theme
    );

  }, [theme]);

  return (

    <div className="app">

      <Sidebar
        theme={theme}
        setTheme={setTheme}
      />

      <div className="main">

        <Routes>

          <Route
            path="/"
            element={
              token
                ? <Dashboard />
                : <Navigate to="/login" />
            }
          />

          <Route
            path="/problems"
            element={
              token
                ? <Problems />
                : <Navigate to="/login" />
            }
          />

          <Route
            path="/planner"
            element={
              token
                ? <Planner />
                : <Navigate to="/login" />
            }
          />

          <Route
            path="/analytics"
            element={
              token
                ? <Analytics />
                : <Navigate to="/login" />
            }
          />

          <Route
            path="/studyplan"
            element={
              token
                ? <StudyPlan />
                : <Navigate to="/login" />
            }
          />

          <Route
            path="/achievements"
            element={
              token
                ? <Achievements />
                : <Navigate to="/login" />
            }
          />

          <Route
            path="/activity"
            element={
              token
                ? <Activity />
                : <Navigate to="/login" />
            }
          />

          <Route
            path="/login"
            element={
              token
                ? <Navigate to="/" />
                : <Login />
            }
          />

          <Route
            path="/register"
            element={
              token
                ? <Navigate to="/" />
                : <Register />
            }
          />

        </Routes>

      </div>

    </div>

  );

}

export default App;