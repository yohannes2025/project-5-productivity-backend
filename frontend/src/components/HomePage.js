// Home.js

import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Row className="justify-content-center mb-5">
        <Col md={10} lg={8}>
          <h1 className="display-4 fw-bold text-primary">
            Stay Productive, Stay Ahead
          </h1>
          <p className="lead text-muted mt-3">
            Organize your life and collaborate better with our calendar-driven
            productivity app. Plan your tasks, track habits, and achieve more
            together.
          </p>
          <div className="d-flex justify-content-center gap-3 mt-3">
            <Link to="/register">
              <Button variant="outline-primary" size="lg">
                Get Started
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline-success" size="lg">
                Login
              </Button>
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
