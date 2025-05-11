// TaskList.js
import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Table,
} from "react-bootstrap";

const TaskList = () => {
  const [tasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [filterOptions, setFilterOptions] = useState({
    category: "",
    status: "",
    dueDate: "",
    assignedUsers: [],
  });
  const [sortOption, setSortOption] = useState("dueDate");

  const handleTaskClick = (task) => setSelectedTask(task);
  const closeTaskDetails = () => setSelectedTask(null);
  const handleSearch = (e) => setSearchText(e.target.value);
  const handleFilterChange = (option, value) => {
    setFilterOptions((prev) => ({ ...prev, [option]: value }));
  };
  const handleSortChange = (option) => setSortOption(option);

  const markTaskComplete = (task) => console.log("Mark complete:", task);
  const editTask = (task) => console.log("Edit task:", task);

  return (
    <Container
      fluid
      className="d-flex flex-column justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        paddingTop: "2rem",
        backgroundColor: "#f8f9fa",
      }}
    >
      <Card className="p-4 shadow w-100" style={{ maxWidth: "960px" }}>
        <h3 className="text-center mb-4">Your Task List</h3>

        {/* Search + Filters */}
        <Form className="mb-4">
          <Row className="align-items-end g-3 justify-content-center">
            <Col md={4}>
              <Form.Group controlId="searchTasks">
                <Form.Label>Search</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Search tasks..."
                  value={searchText}
                  onChange={handleSearch}
                />
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group controlId="categoryFilter">
                <Form.Label>Category</Form.Label>
                <Form.Select
                  value={filterOptions.category}
                  onChange={(e) =>
                    handleFilterChange("category", e.target.value)
                  }
                >
                  <option value="">All</option>
                  {/* Add category options dynamically */}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group controlId="sortBy">
                <Form.Label>Sort By</Form.Label>
                <Form.Select
                  value={sortOption}
                  onChange={(e) => handleSortChange(e.target.value)}
                >
                  <option value="dueDate">Due Date</option>
                  <option value="priority">Priority</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
        </Form>

        {/* Task Table */}
        <Table striped bordered hover responsive className="text-center">
          <thead>
            <tr>
              <th>Title</th>
              <th>Due Date</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Assigned Users</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <tr
                  key={task.id}
                  onClick={() => handleTaskClick(task)}
                  style={{ cursor: "pointer" }}
                >
                  <td>{task.title}</td>
                  <td>{new Date(task.dueDate).toLocaleDateString()}</td>
                  <td>{task.priority}</td>
                  <td>{task.status}</td>
                  <td>{task.assignedUsers?.join(", ")}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  No tasks available
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Card>

      {/* Task Details Popup */}
      {selectedTask && (
        <>
          <div
            className="position-fixed top-0 start-0 w-100 h-100"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 1040 }}
            onClick={closeTaskDetails}
          />
          <Card
            className="position-fixed top-50 start-50 translate-middle p-4 shadow"
            style={{ zIndex: 1050, width: "90%", maxWidth: "500px" }}
          >
            <h4>{selectedTask.title}</h4>
            <p>{selectedTask.description}</p>
            <p>Due: {new Date(selectedTask.dueDate).toLocaleDateString()}</p>
            <p>Category: {selectedTask.category}</p>
            <p>Priority: {selectedTask.priority}</p>
            <p>Status: {selectedTask.status}</p>

            <div className="d-flex justify-content-between mt-3">
              <Button
                variant="success"
                onClick={() => markTaskComplete(selectedTask)}
              >
                Complete
              </Button>
              <Button variant="warning" onClick={() => editTask(selectedTask)}>
                Edit
              </Button>
              <Button variant="secondary" onClick={closeTaskDetails}>
                Close
              </Button>
            </div>
          </Card>
        </>
      )}
    </Container>
  );
};

export default TaskList;
