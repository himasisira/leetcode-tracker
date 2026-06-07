import { useEffect, useState } from "react";
import axios from "axios";

import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";

function Activity() {

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
      .catch((error) => {

        console.log(error);

      });

  }, []);

  const solvedProblems =
    problems.filter(
      p => p.status === "Solved"
    );

  const totalSolved =
    solvedProblems.length;

  const today =
    new Date()
      .toISOString()
      .split("T")[0];

  const solvedToday =
    solvedProblems.filter(
      p =>
        p.solvedDate === today
    ).length;

  const solvedThisWeek =
    solvedProblems.filter(
      p => {

        if (!p.solvedDate)
          return false;

        const solvedDate =
          new Date(
            p.solvedDate
          );

        const currentDate =
          new Date();

        const difference =
          (currentDate -
            solvedDate) /
          (1000 * 60 * 60 * 24);

        return difference <= 7;

      }
    ).length;

  const solvedThisMonth =
    solvedProblems.filter(
      p => {

        if (!p.solvedDate)
          return false;

        const date =
          new Date(
            p.solvedDate
          );

        const now =
          new Date();

        return (
          date.getMonth() ===
            now.getMonth() &&
          date.getFullYear() ===
            now.getFullYear()
        );

      }
    ).length;

  const heatmapData = {};

  solvedProblems.forEach(
    problem => {

      if (
        problem.solvedDate
      ) {

        heatmapData[
          problem.solvedDate
        ] =
          (
            heatmapData[
              problem.solvedDate
            ] || 0
          ) + 1;

      }

    }
  );

  const values =
    Object.keys(
      heatmapData
    ).map(date => ({

      date,

      count:
        heatmapData[
          date
        ]

    }));

  return (

    <div>

      <h1 className="page-title">
        🔥 Activity
      </h1>

      <div className="stats-grid">

        <div className="card">

          <h3>
            ✅ Total Solved
          </h3>

          <h2>
            {totalSolved}
          </h2>

        </div>

        <div className="card">

          <h3>
            📅 Solved Today
          </h3>

          <h2>
            {solvedToday}
          </h2>

        </div>

        <div className="card">

          <h3>
            🔥 Solved This Week
          </h3>

          <h2>
            {solvedThisWeek}
          </h2>

        </div>

        <div className="card">

          <h3>
            🚀 Solved This Month
          </h3>

          <h2>
            {solvedThisMonth}
          </h2>

        </div>

      </div>

      <div className="achievement-card">

        <h2>
          📈 Coding Heatmap
        </h2>

        <CalendarHeatmap

          startDate={
            new Date(
              new Date()
                .setMonth(
                  new Date()
                    .getMonth() - 6
                )
            )
          }

          endDate={
            new Date()
          }

          values={values}

          classForValue={
            value => {

              if (!value)
                return "color-empty";

              if (
                value.count >= 4
              )
                return "color-github-4";

              if (
                value.count >= 3
              )
                return "color-github-3";

              if (
                value.count >= 2
              )
                return "color-github-2";

              return "color-github-1";

            }
          }

        />

        <div
          className="heatmap-legend"
        >

          <span>
            Less
          </span>

          <div className="legend-box color-empty"></div>

          <div className="legend-box color-github-1"></div>

          <div className="legend-box color-github-2"></div>

          <div className="legend-box color-github-3"></div>

          <div className="legend-box color-github-4"></div>

          <span>
            More
          </span>

        </div>

      </div>

      <div className="achievement-card">

        <h2>
          Recent Activity 🔥
        </h2>

        {solvedProblems.length === 0 ? (

          <p>
            No solved problems yet.
          </p>

        ) : (

          solvedProblems
            .slice()
            .reverse()
            .slice(0, 10)
            .map(problem => (

              <div
                key={problem.id}
                className="achievement-item"
              >
                ✅ {problem.title}
              </div>

            ))

        )}

      </div>

    </div>

  );

}

export default Activity;