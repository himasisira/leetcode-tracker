import { useEffect, useState } from "react";
import axios from "axios";

function StudyPlan() {

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

  return (

    <div>

      <h1 className="page-title">
        📚 Study Plan
      </h1>

      {Object.entries(topicData)
        .map(([topic, data]) => (

          <div
            key={topic}
            className="achievement-card"
          >

            <h3>{topic}</h3>

            <p>
              {data.solved}
              {" / "}
              {data.total}
              {" Solved"}
            </p>

          </div>

        ))}

    </div>

  );

}

export default StudyPlan;