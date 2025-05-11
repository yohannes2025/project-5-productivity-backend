//NavBar.js
import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import logo from "../assets/logo.ico";
import styles from "../styles/NavBar.module.css";

function NavBar() {
  const [expanded, setExpanded] = useState(false); // manages collapse state
  const [selected, setSelected] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setSelected(true);
    setExpanded(false); // close the navbar on route change
  }, [location.pathname]);

  const handleNavClick = () => {
    setExpanded(false); // close navbar on link click
  };

  return (
    <>
      <Navbar
        expand="md"
        fixed="top"
        expanded={expanded}
        onToggle={setExpanded}
        className={styles.NavBar}
      >
        <Container>
          <Navbar.Brand className="me-auto">
            <img src={logo} alt="logo" height="45" className="me-2" />
            Productivity
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="ms-auto my-2 my-lg-0" navbarScroll>
              <NavLink
                exact="true"
                to="/"
                className={styles.NavLink}
                onClick={handleNavClick}
              >
                <i className="fa-solid fa-house"></i> Home Page
              </NavLink>
              <NavLink
                exact="true"
                to="/profile"
                className={styles.NavLink}
                onClick={handleNavClick}
              >
                <i className="fa-solid fa-user"></i> Profile
              </NavLink>
              <NavLink
                exact="true"
                to="/settings"
                className={styles.NavLink}
                onClick={handleNavClick}
              >
                <i class="fa-solid fa-gear"></i> Settings
              </NavLink>

              <NavDropdown
                title={
                  <span className={styles.NavLink}>
                    <i className="fa-solid fa-check"></i> Tasks
                  </span>
                }
                id="navbarScrollingDropdown"
                className={styles.NavDropdown}
              >
                <NavDropdown.Item as="div">
                  <NavLink
                    to="/CreateTask"
                    className={styles.NavLink}
                    onClick={handleNavClick}
                  >
                    <i class="fa-solid fa-square-plus"></i> Create Task
                  </NavLink>
                </NavDropdown.Item>
                <NavDropdown.Item as="div">
                  <NavLink
                    to="/EditTask"
                    className={styles.NavLink}
                    onClick={handleNavClick}
                  >
                    <i className="fa-solid fa-file-pen"></i> Edit Task
                  </NavLink>
                </NavDropdown.Item>
                <NavDropdown.Item as="div">
                  <NavLink
                    to="/tasklist"
                    className={styles.NavLink}
                    onClick={handleNavClick}
                  >
                    <i className="fa-solid fa-list-check"></i> Task List
                  </NavLink>
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className={selected ? styles.mainBody : ""}>
        {/* The rest of the main content */}
      </div>
    </>
  );
}

export default NavBar;
