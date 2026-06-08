import { useEffect, useState } from "react";
import { saveAs } from "file-saver";

import API from "../services/api";
import ProblemTable from "../components/ProblemTable";
import EditProblemForm from "../components/EditProblemForm";

function Problems() {

  const [problems, setProblems] =
    useState([]);

  const [editingProblem, setEditingProblem] =
    useState(null);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [difficultyFilter, setDifficultyFilter] =
    useState("All");

  const [topicFilter, setTopicFilter] =
    useState("All");

  const [favoriteFilter, setFavoriteFilter] =
    useState("All");

  const fetchProblems = () => {

    API
      .get("/problems")
      .then((response) => {

        setProblems(
          response.data
        );

      })
      .catch(console.log);

  };

  useEffect(() => {

    fetchProblems();

  }, []);

  const deleteProblem = (id) => {

    API
      .delete(`/problems/${id}`)
      .then(fetchProblems)
      .catch(console.log);

  };

  const updateProblem = (updatedProblem) => {

    API
      .put(
        `/problems/${updatedProblem.id}`,
        updatedProblem
      )
      .then(() => {

        fetchProblems();
        setEditingProblem(null);

      })
      .catch(console.log);

  };

  const updateStatus = (
    id,
    status
  ) => {

    const problem =
      problems.find(
        p => p.id === id
      );

    API
      .put(
        `/problems/${id}`,
        {
          ...problem,
          status
        }
      )
      .then(fetchProblems)
      .catch(console.log);

  };

  const toggleFavorite = (
    problem
  ) => {

    API
      .put(
        `/problems/${problem.id}`,
        {
          ...problem,
          favorite: !problem.favorite
        }
      )
      .then(fetchProblems)
      .catch(console.log);

  };

  const exportCSV = () => {

    const headers = [
      "Title",
      "Difficulty",
      "Topic",
      "Status",
      "Favorite"
    ];

    const rows =
      problems.map(problem => [

        problem.title,
        problem.difficulty,
        problem.topic,
        problem.status,
        problem.favorite

      ]);

    const csvContent = [

      headers.join(","),

      ...rows.map(
        row => row.join(",")
      )

    ].join("\n");

    const blob =
      new Blob(
        [csvContent],
        {
          type:
            "text/csv;charset=utf-8;"
        }
      );

    saveAs(
      blob,
      "leetcode_progress.csv"
    );

  };

  const topics = [

    "All",

    ...new Set(
      problems.map(
        p => p.topic
      )
    )

  ];

  const filteredProblems =
    problems.filter((problem) => {

      const matchesSearch =
        problem.title
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          );

      const matchesDifficulty =
        difficultyFilter === "All"
          ? true
          : problem.difficulty ===
            difficultyFilter;

      const matchesFavorite =
        favoriteFilter === "All"
          ? true
          : problem.favorite === true;

      const matchesTopic =
        topicFilter === "All"
          ? true
          : problem.topic ===
            topicFilter;

      return (

        matchesSearch &&
        matchesDifficulty &&
        matchesFavorite &&
        matchesTopic

      );

    });

  return (

    <div>

      <h1 className="page-title">
        Problems 🚀
      </h1>

      <div className="search-bar">

        <input
          type="text"
          placeholder="🔍 Search Problems..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(
              e.target.value
            )
          }
        />

        <select
          value={difficultyFilter}
          onChange={(e) =>
            setDifficultyFilter(
              e.target.value
            )
          }
        >
          <option>All</option>
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>

        <select
          value={favoriteFilter}
          onChange={(e) =>
            setFavoriteFilter(
              e.target.value
            )
          }
        >
          <option>All</option>
          <option>Favorites</option>
        </select>

        <select
          value={topicFilter}
          onChange={(e) =>
            setTopicFilter(
              e.target.value
            )
          }
        >

          {topics.map(topic => (

            <option
              key={topic}
              value={topic}
            >
              {topic}
            </option>

          ))}

        </select>

      </div>

      <button
        className="export-btn"
        onClick={exportCSV}
      >
        ⬇ Export CSV
      </button>

      <ProblemTable
        problems={filteredProblems}
        onDelete={deleteProblem}
        onEdit={setEditingProblem}
        onStatusChange={updateStatus}
        onFavoriteToggle={toggleFavorite}
      />

      {editingProblem && (

        <EditProblemForm
          problem={editingProblem}
          onUpdate={updateProblem}
        />

      )}

    </div>

  );

}

export default Problems;