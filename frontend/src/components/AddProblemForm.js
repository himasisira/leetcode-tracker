import { useState } from "react";

function AddProblemForm({ onAdd }) {

  const [title, setTitle] =
    useState("");

  const [difficulty, setDifficulty] =
    useState("Easy");

  const [status, setStatus] =
    useState("Attempted");

  const handleSubmit = (e) => {

    e.preventDefault();

    if (!title.trim()) return;

    onAdd({
      title,
      difficulty,
      status
    });

    setTitle("");
    setDifficulty("Easy");
    setStatus("Attempted");
  };

  return (

    <form
      className="problem-form"
      onSubmit={handleSubmit}
    >

      <input
        type="text"
        placeholder="Enter Problem Name..."
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
        ➕ Add Problem
      </button>

    </form>

  );

}

export default AddProblemForm;