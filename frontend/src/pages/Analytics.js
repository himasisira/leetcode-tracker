import { useEffect, useState } from "react";
import axios from "axios";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

function Analytics() {

  const [problems, setProblems] =
    useState([]);

  useEffect(() => {

    axios
      .get(
        "http://localhost:8080/api/problems"
      )
      .then((response) => {

        setProblems(
          response.data
        );

      })
      .catch(console.log);

  }, []);

  const easy =
    problems.filter(
      p => p.difficulty === "Easy"
    ).length;

  const medium =
    problems.filter(
      p => p.difficulty === "Medium"
    ).length;

  const hard =
    problems.filter(
      p => p.difficulty === "Hard"
    ).length;

  const solved =
    problems.filter(
      p => p.status === "Solved"
    ).length;

  const attempted =
    problems.filter(
      p => p.status === "Attempted"
    ).length;

  const notStarted =
    problems.filter(
      p => p.status === "Not Started"
    ).length;

  const difficultyData = [
    {
      name: "Easy",
      value: easy
    },
    {
      name: "Medium",
      value: medium
    },
    {
      name: "Hard",
      value: hard
    }
  ];

  const statusData = [
    {
      name: "Solved",
      value: solved
    },
    {
      name: "Attempted",
      value: attempted
    },
    {
      name: "Not Started",
      value: notStarted
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
        📈 Analytics
      </h1>

      <div className="chart-card">

        <h2>
          Difficulty Analysis
        </h2>

        <ResponsiveContainer
          width="100%"
          height={350}
        >

          <BarChart
            data={difficultyData}
          >

            <XAxis
              dataKey="name"
            />

            <YAxis />

            <Tooltip />

            <Bar
  dataKey="value"
  radius={[10, 10, 0, 0]}
>
  {difficultyData.map(
    (entry, index) => (

      <Cell
        key={index}
        fill={COLORS[index]}
      />

    )
  )}
</Bar>

          </BarChart>

        </ResponsiveContainer>

      </div>

      <div className="chart-card">

        <h2>
          Status Distribution
        </h2>

        <ResponsiveContainer
          width="100%"
          height={400}
        >

          <PieChart>

            <Pie
              data={statusData}
              dataKey="value"
              label
            >

              {statusData.map(
                (entry, index) => (

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

    </div>

  );

}

export default Analytics;