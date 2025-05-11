// CreateTaskPage.js
import React, { useState } from "react";
import axios from "axios";
import CreateTask from "./CreateTask"; // Import the CreateTask component

const CreateTaskPage = () => {
  // State variable for debugging
  const [debugData, setDebugData] = useState(null);

  const handleCreateTask = async (taskData) => {
    try {
      const token = localStorage.getItem("access_token");

      // Format due_date as YYYY-MM-DD
      const formattedDueDate = (() => {
        if (!taskData.dueDate) return "";
        const date = new Date(taskData.dueDate);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      })();

      // Prepare data payload
      const data = {
        title: taskData.title,
        description: taskData.description,
        due_date: formattedDueDate,
        priority: taskData.priority,
        category: taskData.category,
        status: taskData.status.toLowerCase(),
        assigned_users: taskData.assignedUsers,
      };

      // Send POST request to create task
      const response = await axios.post(
        "http://localhost:8000/api/tasks/",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Task created successfully:");
      return response.data;
    } catch (err) {
      if (err.response) {
        console.error("Server validation errors:", err.response.data);
        alert("Task creation failed: " + JSON.stringify(err.response.data));
      } else {
        console.error("Network or unknown error:", err.message);
        alert("Network error: " + err.message);
      }
      throw err;
    }
  };

  return (
    <>
      {debugData && (
        <div
          style={{
            backgroundColor: "#f0f0f0",
            padding: "20px",
            margin: "20px",
            border: "1px solid #ccc",
          }}
        >
          <h3 style={{ margin: "0 0 10px 0" }}>Debug Data:</h3>
          <pre>{JSON.stringify(debugData, null, 2)}</pre>
        </div>
      )}
      <CreateTask onSubmit={handleCreateTask} />
    </>
  );
};

export default CreateTaskPage;
