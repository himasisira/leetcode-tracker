import { useState } from "react";

function EditProblemForm({ problem, onUpdate }) {

  const [title, setTitle] =
    useState(problem.title);

  const [difficulty, setDifficulty] =
    useState(problem.difficulty);

  const [status, setStatus] =
    useState(problem.status);

  const handleSubmit = (e) => {

    e.preventDefault();

    onUpdate({
      id: problem.id,
      title,
      difficulty,
      status
    });

  };

  return (

    <div className="edit-modal">

      <form
        className="problem-form"
        onSubmit={handleSubmit}
      >

        <h2>Edit Problem</h2>

        <input
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />

        <select
          value={difficulty}
          onChange={(e) =>
            setDifficulty(e.target.value)
          }
        >
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>

        <select
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
        >
          <option>Solved</option>
          <option>Attempted</option>
        </select>

        <button type="submit">
          Update Problem
        </button>

      </form>

    </div>

  );
}

export default EditProblemForm;