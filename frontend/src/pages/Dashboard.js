import { useEffect, useState } from "react";
import API from "../services/api";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

function Dashboard() {

  const [problems, setProblems] =
    useState([]);

  useEffect(() => {

  API
    .get("/problems")
    .then((response) => {

      setProblems(
        response.data
      );

    })
    .catch((error) => {

      console.log(error);

    });

}, []);

  const totalProblems =
    problems.length;

  const solvedProblems =
    problems.filter(
      problem =>
        problem.status ===
        "Solved"
    ).length;

  const attemptedProblems =
    problems.filter(
      problem =>
        problem.status ===
        "Attempted"
    ).length;

  const favoriteProblems =
    problems.filter(
      problem =>
        problem.favorite === true
    ).length;

  const easyProblems =
    problems.filter(
      problem =>
        problem.difficulty ===
        "Easy"
    ).length;

  const mediumProblems =
    problems.filter(
      problem =>
        problem.difficulty ===
        "Medium"
    ).length;

  const hardProblems =
    problems.filter(
      problem =>
        problem.difficulty ===
        "Hard"
    ).length;
    const topicData = {};

problems.forEach(problem => {

  const topic =
    problem.topic || "Other";

  if (!topicData[topic]) {

    topicData[topic] = {
      total: 0,
      solved: 0
    };

  }

  topicData[topic].total++;

  if (
    problem.status === "Solved"
  ) {

    topicData[topic].solved++;

  }

});

  const completionRate =
    totalProblems === 0
      ? 0
      : Math.round(
          (
            solvedProblems /
            totalProblems
          ) * 100
        );

  const top150Progress =
    Math.min(
      Math.round(
        (
          solvedProblems /
          150
        ) * 100
      ),
      100
    );

  const badge =
    solvedProblems >= 100
      ? "👑 Master"
      : solvedProblems >= 50
      ? "🥇 Gold"
      : solvedProblems >= 10
      ? "🥈 Silver"
      : solvedProblems >= 1
      ? "🥉 Bronze"
      : "🚀 Beginner";

  const achievements = [];

  if (solvedProblems >= 1)
    achievements.push(
      "🏅 First Problem Solved"
    );

  if (solvedProblems >= 10)
    achievements.push(
      "🔥 10 Problems Solved"
    );

  if (solvedProblems >= 50)
    achievements.push(
      "🚀 50 Problems Solved"
    );

  if (solvedProblems >= 100)
    achievements.push(
      "👑 100 Problems Solved"
    );

  const difficultyData = [
    {
      name: "Easy",
      value: easyProblems
    },
    {
      name: "Medium",
      value: mediumProblems
    },
    {
      name: "Hard",
      value: hardProblems
    }
  ];

  const COLORS = [
    "#22c55e",
    "#facc15",
    "#ef4444"
  ];

  return (

    <div>

      <h1 className="page-title">
        Dashboard 🚀
      </h1>

      <div className="stats-grid">

        <div className="card">
          <h3>Total Problems</h3>
          <h2>{totalProblems}</h2>
        </div>

        <div className="card">
          <h3>Solved</h3>
          <h2>{solvedProblems}</h2>
        </div>

        <div className="card">
          <h3>Attempted</h3>
          <h2>{attemptedProblems}</h2>
        </div>

        <div className="card">
          <h3>Completion Rate</h3>
          <h2>{completionRate}%</h2>
        </div>

        <div className="card">
          <h3>⭐ Favorites</h3>
          <h2>{favoriteProblems}</h2>
        </div>

        <div className="card">
          <h3>🎯 Top Interview 150</h3>
          <h2>
            {solvedProblems}/150
          </h2>
        </div>

        <div className="card">
          <h3>📈 Progress</h3>
          <h2>
            {top150Progress}%
          </h2>
        </div>

        <div className="card">
          <h3>🏆 Rank</h3>
          <h2>{badge}</h2>
        </div>

      </div>

      <div className="chart-card">

        <h2>
          🎯 Top Interview 150 Progress
        </h2>

        <div className="progress-bar">

          <div
            className="progress-fill"
            style={{
              width:
                `${top150Progress}%`
            }}
          ></div>

        </div>

        <h3
          style={{
            marginTop:"20px"
          }}
        >
          {solvedProblems}
          {" / "}
          150 Completed
        </h3>

      </div>

      <div className="chart-card">

        <h2>
          Difficulty Distribution
        </h2>

        <ResponsiveContainer
          width="100%"
          height={450}
        >

          <PieChart>

            <Pie
              data={difficultyData}
              cx="50%"
              cy="50%"
              innerRadius={90}
              outerRadius={180}
              paddingAngle={5}
              dataKey="value"
              label
            >

              {difficultyData.map(
                (
                  entry,
                  index
                ) => (
                  <Cell
                    key={index}
                    fill={
                      COLORS[index]
                    }
                  />
                )
              )}

            </Pie>

            <Tooltip />
            <Legend />

          </PieChart>

        </ResponsiveContainer>

      </div>

      <div className="achievement-card">

        <h2>
          Achievements 🏆
        </h2>

        {
          achievements.length === 0
          ? (
            <p>
              Solve your first
              problem to unlock
              achievements.
            </p>
          )
          : (
            achievements.map(
              (
                achievement,
                index
              ) => (

                <div
                  key={index}
                  className="achievement-item"
                >
                  {achievement}
                </div>

              )
            )
          )
        }

      </div>

      <div className="achievement-card">

        <h2>
          Recent Solves 🔥
        </h2>

        {problems
          .filter(
            problem =>
              problem.status ===
              "Solved"
          )
          .slice(0, 5)
          .map(problem => (

            <div
              key={problem.id}
              className="achievement-item"
            >
              ✅ {problem.title}
            </div>

          ))}

      </div>
<div className="achievement-card">

  <h2>
    Topic Progress 🎯
  </h2>

  {
    Object.entries(topicData)
      .length === 0
      ? (
        <p>
          No topics found.
        </p>
      )
      : (
        Object.entries(topicData)
          .map(
            ([topic, data]) => (

              <div
                key={topic}
                className="achievement-item"
              >

                <strong>
                  {topic}
                </strong>

                {" : "}

                {data.solved}
                {" / "}

                {data.total}

              </div>

            )
          )
      )
  }

</div>
    </div>

  );

}

export default Dashboard;