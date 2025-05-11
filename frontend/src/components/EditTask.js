import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Container, Card, Form, Button } from "react-bootstrap";

const EditTask = ({ task, users = [], onSubmit, onCancel }) => {
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [dueDate, setDueDate] = useState(
    task?.dueDate ? new Date(task.dueDate) : new Date()
  );
  const [priority, setPriority] = useState(task?.priority || "low");
  const [category, setCategory] = useState(task?.category || "");
  const [assignedUsers, setAssignedUsers] = useState(task?.assignedUsers || []);
  const [files, setFiles] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      ...task,
      title,
      description,
      dueDate,
      priority,
      category,
      assignedUsers,
      files,
    });
  };

  const handleAssignedUserChange = (e) => {
    const options = e.target.options;
    const selected = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selected.push(options[i].value);
      }
    }
    setAssignedUsers(selected);
  };

  return (
    <Container
      fluid
      className="d-flex align-items-center justify-content-center mt-5 mt-md-3"
      style={{ minHeight: "100vh", paddingTop: "40px" }}
    >
      <Card className="p-4 shadow" style={{ width: "100%", maxWidth: "600px" }}>
        <h3 className="text-center mb-4">Edit Task</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="taskTitle">
            <Form.Control
              type="text"
              placeholder="Task Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="taskDescription" className="mt-3">
            <Form.Control
              as="textarea"
              placeholder="Task Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </Form.Group>

          <Form.Group controlId="taskDueDate" className="mt-3">
            <Form.Label>Due Date</Form.Label>
            <DatePicker
              selected={dueDate}
              onChange={(date) => setDueDate(date)}
              className="form-control"
            />
          </Form.Group>

          <Form.Group controlId="taskPriority" className="mt-3">
            <Form.Label>Priority</Form.Label>
            <Form.Select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="taskCategory" className="mt-3">
            <Form.Control
              type="text"
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="assignedUsers" className="mt-3">
            <Form.Label>Assigned Users:</Form.Label>
            <Form.Select
              multiple
              value={assignedUsers}
              onChange={handleAssignedUserChange}
            >
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="taskFiles" className="mt-3">
            <Form.Label>Upload Files</Form.Label>
            <Form.Control
              type="file"
              multiple
              onChange={(e) => setFiles(Array.from(e.target.files))}
            />
          </Form.Group>

          <div className="d-flex justify-content-between mt-3">
            <Button variant="primary" type="submit">
              Edit Task
            </Button>
            <Button
              variant="outline-secondary"
              type="button"
              onClick={onCancel}
            >
              Cancel Edit
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default EditTask;
