function ProblemTable({
  problems,
  onDelete,
  onEdit,
  onStatusChange,
  onFavoriteToggle
}) {

  return (

    <div className="table-container">

      <h2>Problem List</h2>

      <table className="problem-table">

        <thead>

          <tr>
            <th>⭐</th>
            <th>✓</th>
            <th>Title</th>
            <th>Topic</th>
            <th>Difficulty</th>
            <th>Status</th>
            <th>LeetCode</th>
            <th>Action</th>
          </tr>

        </thead>

        <tbody>

          {problems.map((problem) => (

            <tr key={problem.id}>

            <td>

  <button
    className="favorite-btn"
    onClick={() =>
      onFavoriteToggle(problem)
    }
  >
    {problem.favorite
      ? "⭐"
      : "☆"}
  </button>

</td>

              <td>
                {problem.status === "Solved"
                  ? "✅"
                  : "⬜"}
              </td>

              <td>
                {problem.title}
              </td>

              <td>
                {problem.topic}
              </td>

              <td>

                <span
                  className={`difficulty ${problem.difficulty.toLowerCase()}`}
                >
                  {problem.difficulty}
                </span>

              </td>
<td>

  <button
    className={`status-btn ${
      problem.status === "Solved"
        ? "status-solved"
        : problem.status === "Attempted"
        ? "status-attempted"
        : "status-notstarted"
    }`}
    onClick={() => {

      const nextStatus =
        problem.status === "Not Started"
          ? "Attempted"
          : problem.status === "Attempted"
          ? "Solved"
          : "Not Started";

      onStatusChange(
        problem.id,
        nextStatus
      );

    }}
  >
    {problem.status}
  </button>

</td>

              <td>

                <a
                  href={problem.leetcodeLink}
                  target="_blank"
                  rel="noreferrer"
                  className="leetcode-link"
                >
                  🔗 Open
                </a>

              </td>

              <td>

                <button
                  className="edit-btn"
                  onClick={() =>
                    onEdit(problem)
                  }
                >
                  ✏️
                </button>

                <button
                  className="delete-btn"
                  onClick={() =>
                    onDelete(problem.id)
                  }
                >
                  🗑️
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}

export default ProblemTable;