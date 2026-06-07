import { useState, useEffect } from "react";

function Planner() {

  const topics = [
    "Arrays",
    "Strings",
    "Linked List",
    "Stack",
    "Queue",
    "Trees",
    "Graphs",
    "Dynamic Programming"
  ];

  const [completed, setCompleted] =
    useState([]);

  useEffect(() => {

    const saved =
      JSON.parse(
        localStorage.getItem("planner")
      ) || [];

    setCompleted(saved);

  }, []);

  const toggleTopic = (topic) => {

    let updated;

    if (completed.includes(topic)) {

      updated = completed.filter(
        item => item !== topic
      );

    } else {

      updated = [
        ...completed,
        topic
      ];

    }

    setCompleted(updated);

    localStorage.setItem(
      "planner",
      JSON.stringify(updated)
    );

  };

  const progress =
    Math.round(
      (completed.length /
        topics.length) * 100
    );

  return (

    <div>

      <h1 className="page-title">
        🚀 Daily Planner
      </h1>

      <div className="chart-card">

        <h2>
          🎯 Today's Goal
        </h2>

        <p>
          Solve 3 LeetCode Problems
        </p>

        <div
          className="progress-bar"
          style={{
            marginTop: "15px"
          }}
        >

          <div
            className="progress-fill"
            style={{
              width:
                `${progress}%`
            }}
          />

        </div>

        <h3
          style={{
            marginTop: "15px"
          }}
        >
          {completed.length}
          {" / "}
          {topics.length}
          {" "}Topics Completed
        </h3>

        <h3>
          Progress :
          {" "}
          {progress}%
        </h3>

      </div>

      <div className="chart-card">

        <h2>
          📚 Study Checklist
        </h2>

        {topics.map(topic => (

          <div
            key={topic}
            className="achievement-item"
          >

            <label>

              <input
                type="checkbox"
                checked={
                  completed.includes(
                    topic
                  )
                }
                onChange={() =>
                  toggleTopic(
                    topic
                  )
                }
                style={{
                  marginRight:
                    "10px"
                }}
              />

              {topic}

            </label>

          </div>

        ))}

      </div>

      <div className="chart-card">

        <h2>
          🔥 Motivation
        </h2>

        <h3>

          {
            progress === 100
              ? "🏆 Excellent! All topics completed."
              : progress >= 75
              ? "🚀 Almost there!"
              : progress >= 50
              ? "💪 Keep pushing!"
              : progress >= 25
              ? "🔥 Good start!"
              : "🎯 Start solving today!"
          }

        </h3>

      </div>

    </div>

  );

}

export default Planner;