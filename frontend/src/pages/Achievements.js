import { useEffect, useState } from "react";
import API from "../services/api";

function Achievements() {

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
      .catch(console.log);

  }, []);

  const solved =
    problems.filter(
      p => p.status === "Solved"
    ).length;

  const favorites =
    problems.filter(
      p => p.favorite
    ).length;

  return (

    <div>

      <h1 className="page-title">
        🏅 Achievements
      </h1>

      <div className="achievement-card">

        <h2>
          Solver Badges
        </h2>

        {solved >= 1 &&
          <div className="achievement-item">
            👶 Beginner
          </div>
        }

        {solved >= 10 &&
          <div className="achievement-item">
            🥉 Bronze Solver
          </div>
        }

        {solved >= 50 &&
          <div className="achievement-item">
            🥈 Silver Solver
          </div>
        }

        {solved >= 100 &&
          <div className="achievement-item">
            🥇 Gold Solver
          </div>
        }

        {solved >= 150 &&
          <div className="achievement-item">
            👑 Master Solver
          </div>
        }

      </div>

      <div className="achievement-card">

        <h2>
          Special Badges
        </h2>

        {favorites >= 5 &&
          <div className="achievement-item">
            ⭐ Favorite Fan
          </div>
        }

        {solved >= 75 &&
          <div className="achievement-item">
            🎯 Interview Pro
          </div>
        }

        {solved >= 150 &&
          <div className="achievement-item">
            🚀 Top Interview 150 Completed
          </div>
        }

      </div>

      <div className="achievement-card">

        <h2>
          Progress
        </h2>

        <div className="achievement-item">
          ✅ Solved: {solved} / 150
        </div>

        <div className="achievement-item">
          ⭐ Favorites: {favorites}
        </div>

      </div>

    </div>

  );

}

export default Achievements;