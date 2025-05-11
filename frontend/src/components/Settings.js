import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";

const Settings = () => {
  const [settings, setSettings] = useState({
    theme: "light",
    calendarStartDay: "Sunday",
    notifications: {
      enabled: false,
      emailNotifications: false,
      pushNotifications: false,
    },
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchUserSettings = async () => {
      try {
        const response = await axios.get("/api/settings");
        setSettings(response.data);
      } catch (error) {
        console.error("Error fetching user settings:", error);
      }
    };
    fetchUserSettings();
  }, []);

  const handleSettingsUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put("/api/settings", settings);
      setMessage("Settings updated successfully!");
    } catch (error) {
      console.error("Error updating settings:", error);
      setMessage("Error updating settings.");
    }
  };

  const handleThemeChange = (e) => {
    const { value } = e.target;
    setSettings((prevSettings) => ({ ...prevSettings, theme: value }));
  };

  const handleCalendarStartDayChange = (e) => {
    const { value } = e.target;
    setSettings((prevSettings) => ({
      ...prevSettings,
      calendarStartDay: value,
    }));
  };

  const handleNotificationsChange = (e) => {
    const { name, checked } = e.target;
    setSettings((prevSettings) => ({
      ...prevSettings,
      notifications: {
        ...prevSettings.notifications,
        [name]: checked,
      },
    }));
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row className="w-100">
        <Col md={6} className="mx-auto">
          <h1 className="text-center mb-4">Settings</h1>
          {message && (
            <Alert variant="info" onClose={() => setMessage("")} dismissible>
              {message}
            </Alert>
          )}
          <Form
            onSubmit={handleSettingsUpdate}
            className="bg-light p-4 rounded shadow"
          >
            <Form.Group controlId="themeSelect">
              <Form.Label>Theme:</Form.Label>
              <Form.Control
                as="select"
                value={settings.theme}
                onChange={handleThemeChange}
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="calendarStartDaySelect">
              <Form.Label>Calendar Start Day:</Form.Label>
              <Form.Control
                as="select"
                value={settings.calendarStartDay}
                onChange={handleCalendarStartDayChange}
              >
                <option value="Sunday">Sunday</option>
                <option value="Monday">Monday</option>
              </Form.Control>
            </Form.Group>
            <h3>Notifications</h3>
            <Form.Group controlId="notificationEnabled">
              <Form.Check
                type="checkbox"
                label="Enable Notifications"
                name="enabled"
                checked={settings.notifications.enabled}
                onChange={handleNotificationsChange}
              />
              <Form.Check
                type="checkbox"
                label="Email Notifications"
                name="emailNotifications"
                checked={settings.notifications.emailNotifications}
                onChange={handleNotificationsChange}
              />
              <Form.Check
                type="checkbox"
                label="Push Notifications"
                name="pushNotifications"
                checked={settings.notifications.pushNotifications}
                onChange={handleNotificationsChange}
              />
            </Form.Group>
            <Button type="submit" variant="primary" className="w-100">
              Save Settings
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Settings;
