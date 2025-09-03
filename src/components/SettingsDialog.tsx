import React, { useState } from "react";
import { Input, Select, Switch, Slider, Button } from "antd";
import { CGDialog } from "./CG";

interface SettingsDialogProps {
  open: boolean;
  onClose: () => void;
}

const SettingsDialog: React.FC<SettingsDialogProps> = ({ open, onClose }) => {
  const [settings, setSettings] = useState({
    theme: "light",
    notifications: true,
    autoSave: false,
    volume: 50,
  });

  const handleSave = () => {
    console.log("Settings saved:", settings);
    onClose();
  };

  return (
    <CGDialog
      open={open}
      onClose={onClose}
      onSave={handleSave}
      title="Settings"
      description="Configure your application preferences."
      width={480}
      saveText="Apply Settings"
      cancelText="Discard"
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {/* Theme Selection */}
        <div>
          <label
            style={{ display: "block", marginBottom: "8px", fontWeight: 500 }}
          >
            Theme
          </label>
          <Select
            style={{ width: "100%" }}
            value={settings.theme}
            onChange={(value) =>
              setSettings((prev) => ({ ...prev, theme: value }))
            }
          >
            <Select.Option value="light">Light</Select.Option>
            <Select.Option value="dark">Dark</Select.Option>
            <Select.Option value="auto">Auto</Select.Option>
          </Select>
        </div>

        {/* Notifications Toggle */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <div style={{ fontWeight: 500, marginBottom: "4px" }}>
              Enable Notifications
            </div>
            <div style={{ fontSize: "14px", color: "#6b7280" }}>
              Receive push notifications for important updates
            </div>
          </div>
          <Switch
            checked={settings.notifications}
            onChange={(checked) =>
              setSettings((prev) => ({ ...prev, notifications: checked }))
            }
          />
        </div>

        {/* Auto Save Toggle */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <div style={{ fontWeight: 500, marginBottom: "4px" }}>
              Auto Save
            </div>
            <div style={{ fontSize: "14px", color: "#6b7280" }}>
              Automatically save changes as you work
            </div>
          </div>
          <Switch
            checked={settings.autoSave}
            onChange={(checked) =>
              setSettings((prev) => ({ ...prev, autoSave: checked }))
            }
          />
        </div>

        {/* Volume Slider */}
        <div>
          <label
            style={{ display: "block", marginBottom: "12px", fontWeight: 500 }}
          >
            Volume: {settings.volume}%
          </label>
          <Slider
            value={settings.volume}
            onChange={(value) =>
              setSettings((prev) => ({ ...prev, volume: value }))
            }
            min={0}
            max={100}
            step={5}
          />
        </div>

        {/* API Key Input */}
        <div>
          <label
            style={{ display: "block", marginBottom: "8px", fontWeight: 500 }}
          >
            API Key
          </label>
          <Input.Password
            placeholder="Enter your API key"
            style={{ fontFamily: "monospace" }}
          />
        </div>

        {/* More content for scroll testing */}
        <div>
          <label
            style={{ display: "block", marginBottom: "8px", fontWeight: 500 }}
          >
            Cache Size (MB)
          </label>
          <Input type="number" placeholder="500" min={100} max={2000} />
        </div>

        <div>
          <label
            style={{ display: "block", marginBottom: "8px", fontWeight: 500 }}
          >
            Backup Location
          </label>
          <Input
            placeholder="/path/to/backup"
            addonAfter={<Button size="small">Browse</Button>}
          />
        </div>
      </div>
    </CGDialog>
  );
};

export default SettingsDialog;
