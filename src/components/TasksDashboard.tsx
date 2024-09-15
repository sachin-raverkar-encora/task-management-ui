import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  status: "Not Started" | "In Progress" | "On Hold" | "Completed" | "Canceled";
}

const TasksDashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<keyof Task | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);
  const navigate = useNavigate();
  const tasksApiUrl = import.meta.env.VITE_TASKS_API_URL;

  useEffect(() => {
    // Fetch tasks from API
    const fetchTasks = async () => {
      // Replace with your actual API endpoint
      const response = await fetch(`${tasksApiUrl}`);
      const data = await response.json();
      setTasks(data);
    };

    fetchTasks();
  }, []);

  // Pagination
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Search
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sorting
  const handleSort = (field: keyof Task) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy && sortOrder) {
      if (a[sortBy] < b[sortBy]) return sortOrder === "asc" ? -1 : 1;
      if (a[sortBy] > b[sortBy]) return sortOrder === "asc" ? 1 : -1;
    }
    return 0;
  });

  return (
    <div>
      {/* Create Task Button */}
      <button onClick={() => navigate("/create-task")}>Create New Task</button>

      <h1>Task List</h1>

      {/* Search Form */}
      <div>
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {/* Task Table */}
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort("title")}>Title</th>
            <th onClick={() => handleSort("description")}>Description</th>
            <th onClick={() => handleSort("dueDate")}>Due Date</th>
            <th onClick={() => handleSort("status")}>Status</th>
          </tr>
        </thead>
        <tbody>
          {sortedTasks.map((task) => (
            <tr key={task.id}>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.dueDate}</td>
              <td>{task.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <ul className="pagination">
        {Array(Math.ceil(filteredTasks.length / tasksPerPage))
          .fill(0)
          .map((_, index) => (
            <li
              key={index}
              className={currentPage === index + 1 ? "active" : ""}
            >
              <button onClick={() => paginate(index + 1)}>{index + 1}</button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default TasksDashboard;
