import { BrowserRouter, Routes, Route } from "react-router-dom";
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

  const [theme, setTheme] =
    useState(
      localStorage.getItem("theme")
      || "dark"
    );

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

    <BrowserRouter>

      <div className="app">

        <Sidebar
          theme={theme}
          setTheme={setTheme}
        />

        <div className="main">

          <Routes>

            <Route
              path="/"
              element={<Dashboard />}
            />

            <Route
              path="/problems"
              element={<Problems />}
            />

            <Route
              path="/planner"
              element={<Planner />}
            />

            <Route
              path="/analytics"
              element={<Analytics />}
            />

            <Route
              path="/studyplan"
              element={<StudyPlan />}
            />

            <Route
              path="/achievements"
              element={<Achievements />}
            />

           
            <Route
              path="/activity"
              element={<Activity />}
            />

            <Route
              path="/login"
              element={<Login />}
            />

            <Route
              path="/register"
              element={<Register />}
            />

          </Routes>

        </div>

      </div>

    </BrowserRouter>

  );

}

export default App;