import React, { useState } from "react";
import { Button, Space } from "antd";
import EditProfileDialog from "./EditProfileDialog";
import SettingsDialog from "./SettingsDialog";

const ExampleComponent: React.FC = () => {
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);
  const [settingsDialogOpen, setSettingsDialogOpen] = useState(false);

  const handleSave = (values: { name: string; username: string }) => {
    console.log("Profile updated:", values);
  };

  return (
    <div
      style={{
        padding: "24px",
        maxWidth: "800px",
        margin: "0 auto",
        background: "#ffffff",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        marginTop: "24px",
      }}
    >
      <h1 style={{ color: "#1f2937", marginBottom: "16px" }}>
        Example Component
      </h1>
      <p style={{ color: "#6b7280", marginBottom: "24px" }}>
        Demo của CustomDialog component với 2 use cases khác nhau:
      </p>

      <Space>
        <Button type="primary" onClick={() => setProfileDialogOpen(true)}>
          Edit Profile
        </Button>

        <Button onClick={() => setSettingsDialogOpen(true)}>Settings</Button>
      </Space>

      <EditProfileDialog
        open={profileDialogOpen}
        onClose={() => setProfileDialogOpen(false)}
        onSave={handleSave}
        initialValues={{
          name: "Pedro Duarte",
          username: "@peduarte",
        }}
      />

      <SettingsDialog
        open={settingsDialogOpen}
        onClose={() => setSettingsDialogOpen(false)}
      />
    </div>
  );
};

export default ExampleComponent;
