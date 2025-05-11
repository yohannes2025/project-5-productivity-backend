// Profile.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button, Table } from "react-bootstrap";

const Profile = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    avatar: "",
  });
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("/api/profile");
        setUser(response.data);
        // Fetching additional user data to show in a table
        const userResponse = await axios.get("/api/user_data");
        setUserData(userResponse.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };
    fetchUserProfile();
  }, []);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put("/api/profile", user);
      console.log("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setUser((prevUser) => ({ ...prevUser, avatar: file }));
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row>
        <Col xs={12} md={10} lg={8}>
          <h1 className="text-center mb-4">Profile</h1>
          <Form onSubmit={handleProfileUpdate}>
            <Form.Group controlId="formBasicName">
              <Form.Label>Name:</Form.Label>
              <Form.Control
                type="text"
                value={user.name}
                onChange={(e) =>
                  setUser((prevUser) => ({ ...prevUser, name: e.target.value }))
                }
                className="mb-3"
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                value={user.email}
                onChange={(e) =>
                  setUser((prevUser) => ({
                    ...prevUser,
                    email: e.target.value,
                  }))
                }
                className="mb-3"
              />
            </Form.Group>
            <Form.Group controlId="formBasicAvatar">
              <Form.Label>Avatar:</Form.Label>
              <Form.Control
                type="file"
                onChange={handleAvatarChange}
                className="mb-3"
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Update Profile
            </Button>
          </Form>

          {/* Table component */}
          <h2 className="mt-4">User Data</h2>
          <Table striped bordered hover className="mt-3">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Other Info</th>
              </tr>
            </thead>
            <tbody>
              {userData.length > 0 ? (
                userData.map((data) => (
                  <tr key={data.id}>
                    <td>{data.id}</td>
                    <td>{data.name}</td>
                    <td>{data.email}</td>
                    <td>{data.otherInfo}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
