import React, { useState } from "react";
import {
  Button,
  Space,
  Typography,
  Card,
  Form,
  Input,
  Select,
  Switch,
  Slider,
  Checkbox,
  Row,
  Col,
} from "antd";
import {
  SettingOutlined,
  UserOutlined,
  InfoCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import "./CGDialogDemo.scss";
import { CGDialog } from "@/components";
import CodePreview from "@/components/CodePreview";

const { Title, Paragraph, Text } = Typography;

const CGDialogDemo: React.FC = () => {
  // Dialog states
  const [profileDialog, setProfileDialog] = useState(false);
  const [settingsDialog, setSettingsDialog] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState(false);
  const [infoDialog, setInfoDialog] = useState(false);
  const [CGDialogOpen, setCGDialogOpen] = useState(false);

  // Form instances
  const [profileForm] = Form.useForm();
  const [settingsForm] = Form.useForm();

  // Handle save functions
  const handleProfileSave = () => {
    profileForm.validateFields().then((values) => {
      console.log("Profile data:", values);
      setProfileDialog(false);
    });
  };

  const handleSettingsSave = () => {
    const values = settingsForm.getFieldsValue();
    console.log("Settings data:", values);
    setSettingsDialog(false);
  };

  const handleDelete = () => {
    console.log("Item deleted!");
    setConfirmDialog(false);
  };

  return (
    <div className="demo-container">
      <div className="demo-header">
        <Title level={1}>CGDialog Component Demo</Title>
        <Paragraph>
          Tái sử dụng CGDialog component với nhiều use cases khác nhau.
          Component này được thiết kế giống ShadCN UI với scroll support và
          title cố định.
        </Paragraph>
      </div>
      <div className="demo-sections">
        {/* Use Cases */}
        <Card title="🎯 Use Cases" className="demo-card">
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={8}>
              <Card size="small" className="use-case-card">
                <UserOutlined className="use-case-icon" />
                <Title level={4}>Form Dialog</Title>
                <Text>Dialog với form validation và scroll content</Text>
                <Button
                  type="primary"
                  block
                  style={{ marginTop: "12px" }}
                  onClick={() => setProfileDialog(true)}
                >
                  Edit Profile
                </Button>
              </Card>
            </Col>

            <Col xs={24} sm={12} md={8}>
              <Card size="small" className="use-case-card">
                <SettingOutlined className="use-case-icon" />
                <Title level={4}>Settings Dialog</Title>
                <Text>Dialog với các controls và long content</Text>
                <Button
                  block
                  style={{ marginTop: "12px" }}
                  onClick={() => setSettingsDialog(true)}
                >
                  Open Settings
                </Button>
              </Card>
            </Col>

            <Col xs={24} sm={12} md={8}>
              <Card size="small" className="use-case-card">
                <ExclamationCircleOutlined className="use-case-icon" />
                <Title level={4}>Confirmation Dialog</Title>
                <Text>Dialog với custom footer và actions</Text>
                <Button
                  danger
                  block
                  style={{ marginTop: "12px" }}
                  onClick={() => setConfirmDialog(true)}
                >
                  Delete Item
                </Button>
              </Card>
            </Col>

            <Col xs={24} sm={12} md={8}>
              <Card size="small" className="use-case-card">
                <InfoCircleOutlined className="use-case-icon" />
                <Title level={4}>Info Dialog</Title>
                <Text>Dialog chỉ hiển thị thông tin, không có footer</Text>
                <Button
                  block
                  style={{ marginTop: "12px" }}
                  onClick={() => setInfoDialog(true)}
                >
                  Show Info
                </Button>
              </Card>
            </Col>

            <Col xs={24} sm={12} md={8}>
              <Card size="small" className="use-case-card">
                <Title level={4}>Custom Content</Title>
                <Text>Dialog với content hoàn toàn custom</Text>
                <Button
                  block
                  style={{ marginTop: "12px" }}
                  onClick={() => setCGDialogOpen(true)}
                >
                  Custom Dialog
                </Button>
              </Card>
            </Col>
          </Row>
        </Card>

        {/* Features */}
        <Card title="✨ Features" className="demo-card">
          <Row gutter={[24, 16]}>
            <Col xs={24} md={12}>
              <ul className="feature-list">
                <li>
                  🎨 <strong>ShadCN UI Styling</strong> - Thiết kế hiện đại với
                  SCSS
                </li>
                <li>
                  📱 <strong>Responsive</strong> - Tự động center và responsive
                </li>
                <li>
                  🔄 <strong>Scroll Support</strong> - Header/Footer cố định,
                  content scroll
                </li>
                <li>
                  ⚡ <strong>TypeScript</strong> - Full type safety
                </li>
              </ul>
            </Col>
            <Col xs={24} md={12}>
              <ul className="feature-list">
                <li>
                  🎯 <strong>Reusable</strong> - Content hoàn toàn flexible
                </li>
                <li>
                  🛠️ <strong>Customizable</strong> - Footer, buttons, sizing
                  custom được
                </li>
                <li>
                  🎪 <strong>Dark Mode</strong> - Hỗ trợ dark mode
                </li>
                <li>
                  📦 <strong>Ant Design</strong> - Tích hợp với Ant Design
                  ecosystem
                </li>
              </ul>
            </Col>
          </Row>
        </Card>

        {/* Props Documentation */}
        <Card title="📖 Props Documentation" className="demo-card">
          <div className="props-table">
            <table>
              <thead>
                <tr>
                  <th>Prop</th>
                  <th>Type</th>
                  <th>Default</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <code>open</code>
                  </td>
                  <td>boolean</td>
                  <td>-</td>
                  <td>Hiển thị/ẩn dialog</td>
                </tr>
                <tr>
                  <td>
                    <code>onClose</code>
                  </td>
                  <td>() =&gt; void</td>
                  <td>-</td>
                  <td>Callback khi đóng dialog</td>
                </tr>
                <tr>
                  <td>
                    <code>title</code>
                  </td>
                  <td>string</td>
                  <td>-</td>
                  <td>Tiêu đề dialog</td>
                </tr>
                <tr>
                  <td>
                    <code>description</code>
                  </td>
                  <td>string</td>
                  <td>-</td>
                  <td>Mô tả phụ (optional)</td>
                </tr>
                <tr>
                  <td>
                    <code>children</code>
                  </td>
                  <td>ReactNode</td>
                  <td>-</td>
                  <td>Nội dung dialog</td>
                </tr>
                <tr>
                  <td>
                    <code>width</code>
                  </td>
                  <td>number</td>
                  <td>420</td>
                  <td>Chiều rộng dialog</td>
                </tr>
                <tr>
                  <td>
                    <code>footer</code>
                  </td>
                  <td>ReactNode</td>
                  <td>-</td>
                  <td>Custom footer hoàn toàn</td>
                </tr>
                <tr>
                  <td>
                    <code>showDefaultFooter</code>
                  </td>
                  <td>boolean</td>
                  <td>true</td>
                  <td>Hiển thị footer mặc định</td>
                </tr>
                <tr>
                  <td>
                    <code>onSave</code>
                  </td>
                  <td>() =&gt; void</td>
                  <td>-</td>
                  <td>Callback nút Save</td>
                </tr>
                <tr>
                  <td>
                    <code>saveText</code>
                  </td>
                  <td>string</td>
                  <td>'Save changes'</td>
                  <td>Text nút Save</td>
                </tr>
                <tr>
                  <td>
                    <code>cancelText</code>
                  </td>
                  <td>string</td>
                  <td>'Cancel'</td>
                  <td>Text nút Cancel</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </div>
      {/* 1. Profile Form Dialog */}
      <CGDialog
        open={profileDialog}
        onClose={() => setProfileDialog(false)}
        onSave={handleProfileSave}
        title="Edit Profile"
        description="Make changes to your profile here. Click save when you're done."
        width={450}
      >
        <Form
          form={profileForm}
          layout="vertical"
          initialValues={{
            name: "Pedro Duarte",
            username: "@peduarte",
            email: "pedro@example.com",
          }}
        >
          <Form.Item
            label="Full Name"
            name="name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input placeholder="Enter your full name" />
          </Form.Item>

          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please enter your username" }]}
          >
            <Input placeholder="@username" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Invalid email format" },
            ]}
          >
            <Input placeholder="your@email.com" />
          </Form.Item>

          <Form.Item label="Bio" name="bio">
            <Input.TextArea
              rows={3}
              placeholder="Tell us about yourself..."
              showCount
              maxLength={500}
            />
          </Form.Item>

          <Form.Item label="Website" name="website">
            <Input placeholder="https://your-website.com" />
          </Form.Item>

          <Form.Item label="Location" name="location">
            <Input placeholder="New York, NY" />
          </Form.Item>

          <Form.Item label="Company" name="company">
            <Input placeholder="Company name" />
          </Form.Item>
        </Form>
      </CGDialog>
      {/* 2. Settings Dialog */}
      <CGDialog
        open={settingsDialog}
        onClose={() => setSettingsDialog(false)}
        onSave={handleSettingsSave}
        title="Application Settings"
        description="Configure your application preferences and behavior."
        width={520}
        saveText="Apply Settings"
        cancelText="Discard Changes"
      >
        <Form
          form={settingsForm}
          layout="vertical"
          initialValues={{
            theme: "light",
            language: "en",
            notifications: true,
            autoSave: false,
            volume: 75,
          }}
        >
          <Form.Item label="Theme" name="theme">
            <Select>
              <Select.Option value="light">Light Theme</Select.Option>
              <Select.Option value="dark">Dark Theme</Select.Option>
              <Select.Option value="auto">Auto (System)</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Language" name="language">
            <Select>
              <Select.Option value="en">English</Select.Option>
              <Select.Option value="vi">Tiếng Việt</Select.Option>
              <Select.Option value="ja">日本語</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item name="notifications" valuePropName="checked">
            <Checkbox>Enable push notifications</Checkbox>
          </Form.Item>

          <Form.Item name="autoSave" valuePropName="checked">
            <Checkbox>Auto-save changes</Checkbox>
          </Form.Item>

          <Form.Item label="Volume" name="volume">
            <Slider min={0} max={100} step={5} />
          </Form.Item>

          <Form.Item label="API Endpoint" name="apiEndpoint">
            <Input placeholder="https://api.example.com" />
          </Form.Item>

          <Form.Item label="Cache Size (MB)" name="cacheSize">
            <Input type="number" placeholder="500" />
          </Form.Item>

          <Form.Item label="Backup Directory" name="backupDir">
            <Input placeholder="/path/to/backup" />
          </Form.Item>
        </Form>
      </CGDialog>
      {/* 3. Confirmation Dialog */}
      <CGDialog
        open={confirmDialog}
        onClose={() => setConfirmDialog(false)}
        title="Confirm Deletion"
        description="This action cannot be undone. This will permanently delete the item and remove all associated data."
        width={400}
        footer={
          <div
            style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}
          >
            <Button onClick={() => setConfirmDialog(false)}>Cancel</Button>
            <Button danger type="primary" onClick={handleDelete}>
              Delete Permanently
            </Button>
          </div>
        }
      >
        <div style={{ padding: "16px 0" }}>
          <Text strong>Item Details:</Text>
          <ul style={{ marginTop: "8px", paddingLeft: "20px" }}>
            <li>Name: Important Document.pdf</li>
            <li>Size: 2.5 MB</li>
            <li>Created: March 15, 2024</li>
            <li>Last modified: September 1, 2024</li>
          </ul>
        </div>
      </CGDialog>
      {/* 4. Info Dialog */}
      <CGDialog
        open={infoDialog}
        onClose={() => setInfoDialog(false)}
        title="Application Information"
        showDefaultFooter={false}
        width={500}
      >
        <div className="info-content">
          <div className="info-section">
            <Title level={4}>Version Information</Title>
            <p>
              <strong>Version:</strong> 2.1.4
            </p>
            <p>
              <strong>Build:</strong> 20240903-1
            </p>
            <p>
              <strong>Release Date:</strong> September 3, 2024
            </p>
          </div>

          <div className="info-section">
            <Title level={4}>System Requirements</Title>
            <ul>
              <li>Node.js 18+ required</li>
              <li>React 18+ supported</li>
              <li>Modern browser with ES2020 support</li>
              <li>Minimum 4GB RAM recommended</li>
            </ul>
          </div>

          <div className="info-section">
            <Title level={4}>What's New</Title>
            <ul>
              <li>✨ Added CGDialog component</li>
              <li>🎨 Improved ShadCN UI styling</li>
              <li>📱 Enhanced responsive design</li>
              <li>🐛 Fixed scroll behavior issues</li>
            </ul>
          </div>

          <div style={{ textAlign: "center", marginTop: "24px" }}>
            <Button type="primary" onClick={() => setInfoDialog(false)}>
              Got it, thanks!
            </Button>
          </div>
        </div>
      </CGDialog>{" "}
      {/* 5. Custom Content Dialog */}
      <CGDialog
        open={CGDialogOpen}
        onClose={() => setCGDialogOpen(false)}
        title="Custom Content Example"
        description="This dialog demonstrates completely custom content with mixed components."
        width={600}
        saveText="Export Data"
        cancelText="Close"
        onSave={() => {
          console.log("Exporting data...");
          setCGDialogOpen(false);
        }}
      >
        <div className="custom-content">
          <Card
            title="📊 Data Statistics"
            size="small"
            style={{ marginBottom: "16px" }}
          >
            <Row gutter={16}>
              <Col span={8}>
                <div className="stat-item">
                  <Text strong>Total Users</Text>
                  <div className="stat-number">1,234</div>
                </div>
              </Col>
              <Col span={8}>
                <div className="stat-item">
                  <Text strong>Active Sessions</Text>
                  <div className="stat-number">89</div>
                </div>
              </Col>
              <Col span={8}>
                <div className="stat-item">
                  <Text strong>Storage Used</Text>
                  <div className="stat-number">45.2 GB</div>
                </div>
              </Col>
            </Row>
          </Card>

          <Card
            title="🎯 Quick Actions"
            size="small"
            style={{ marginBottom: "16px" }}
          >
            <Space wrap>
              <Button size="small">Refresh Data</Button>
              <Button size="small">Clear Cache</Button>
              <Button size="small">Run Backup</Button>
              <Button size="small">Send Report</Button>
            </Space>
          </Card>

          <Card title="⚙️ Configuration" size="small">
            <Form layout="inline" size="small">
              <Form.Item label="Format">
                <Select defaultValue="json" style={{ width: 100 }}>
                  <Select.Option value="json">JSON</Select.Option>
                  <Select.Option value="csv">CSV</Select.Option>
                  <Select.Option value="xml">XML</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item>
                <Checkbox defaultChecked>Include metadata</Checkbox>
              </Form.Item>
              <Form.Item>
                <Checkbox>Compress output</Checkbox>
              </Form.Item>
            </Form>{" "}
          </Card>
        </div>
      </CGDialog>
      {/* Code Examples Section */}
      <div className="code-examples">
        <Typography.Title
          level={2}
          style={{ marginBottom: "24px", textAlign: "center" }}
        >
          📝 Code Examples
        </Typography.Title>

        {/* 1. Basic Form Dialog */}
        <CodePreview
          title="1. Basic Form Dialog"
          description="Dialog với form validation và save functionality"
          preview={
            <Space>
              <Button type="primary" onClick={() => setProfileDialog(true)}>
                Edit Profile
              </Button>
            </Space>
          }
          code={`import { CGDialog } from '@/components';

const [profileDialog, setProfileDialog] = useState(false);
const [form] = Form.useForm();

const handleSave = () => {
  form.validateFields().then(values => {
    console.log('Profile data:', values);
    setProfileDialog(false);
  });
};

<CGDialog
  open={profileDialog}
  onClose={() => setProfileDialog(false)}
  onSave={handleSave}
  title="Edit Profile"
  description="Make changes to your profile here. Click save when you're done."
  width={450}
>
  <Form form={form} layout="vertical">
    <Form.Item
      label="Full Name"
      name="name"
      rules={[{ required: true, message: 'Please enter your name' }]}
    >
      <Input placeholder="Enter your full name" />
    </Form.Item>
    
    <Form.Item
      label="Username"
      name="username"
      rules={[{ required: true, message: 'Please enter your username' }]}
    >
      <Input placeholder="@username" />
    </Form.Item>
  </Form>
</CGDialog>`}
        />

        {/* 2. Settings Dialog */}
        <CodePreview
          title="2. Settings Dialog"
          description="Dialog với multiple form controls và custom button text"
          preview={
            <Space>
              <Button onClick={() => setSettingsDialog(true)}>
                Open Settings
              </Button>
            </Space>
          }
          code={`<CGDialog
  open={settingsDialog}
  onClose={() => setSettingsDialog(false)}
  onSave={handleSettingsSave}
  title="Application Settings"
  description="Configure your application preferences and behavior."
  width={520}
  saveText="Apply Settings"
  cancelText="Discard Changes"
>
  <Form form={settingsForm} layout="vertical">
    <Form.Item label="Theme" name="theme">
      <Select>
        <Select.Option value="light">Light Theme</Select.Option>
        <Select.Option value="dark">Dark Theme</Select.Option>
        <Select.Option value="auto">Auto (System)</Select.Option>
      </Select>
    </Form.Item>
    
    <Form.Item name="notifications" valuePropName="checked">
      <Checkbox>Enable push notifications</Checkbox>
    </Form.Item>
    
    <Form.Item label="Volume" name="volume">
      <Slider min={0} max={100} step={5} />
    </Form.Item>
  </Form>
</CGDialog>`}
        />

        {/* 3. Confirmation Dialog */}
        <CodePreview
          title="3. Confirmation Dialog"
          description="Dialog với custom footer và danger actions"
          preview={
            <Space>
              <Button danger onClick={() => setConfirmDialog(true)}>
                Delete Item
              </Button>
            </Space>
          }
          code={`<CGDialog
  open={confirmDialog}
  onClose={() => setConfirmDialog(false)}
  title="Confirm Deletion"
  description="This action cannot be undone. This will permanently delete the item."
  width={400}
  footer={
    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
      <Button onClick={() => setConfirmDialog(false)}>
        Cancel
      </Button>
      <Button danger type="primary" onClick={handleDelete}>
        Delete Permanently
      </Button>
    </div>
  }
>
  <div style={{ padding: '16px 0' }}>
    <Text strong>Item Details:</Text>
    <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
      <li>Name: Important Document.pdf</li>
      <li>Size: 2.5 MB</li>
      <li>Created: March 15, 2024</li>
    </ul>
  </div>
</CGDialog>`}
        />

        {/* 4. Info Only Dialog */}
        <CodePreview
          title="4. Info Only Dialog"
          description="Dialog chỉ hiển thị thông tin, không có default footer"
          preview={
            <Space>
              <Button onClick={() => setInfoDialog(true)}>Show Info</Button>
            </Space>
          }
          code={`<CGDialog
  open={infoDialog}
  onClose={() => setInfoDialog(false)}
  title="Application Information"
  showDefaultFooter={false}
  width={500}
>
  <div className="info-content">
    <div className="info-section">
      <Title level={4}>Version Information</Title>
      <p><strong>Version:</strong> 2.1.4</p>
      <p><strong>Build:</strong> 20240903-1</p>
    </div>
    
    <div style={{ textAlign: 'center', marginTop: '24px' }}>
      <Button type="primary" onClick={() => setInfoDialog(false)}>
        Got it, thanks!
      </Button>
    </div>
  </div>
</CGDialog>`}
        />

        {/* 5. Custom Content Dialog */}
        <CodePreview
          title="5. Custom Content Dialog"
          description="Dialog với complex custom content và mixed components"
          preview={
            <Space>
              <Button onClick={() => setCGDialogOpen(true)}>
                Custom Content
              </Button>
            </Space>
          }
          code={`<CGDialog
  open={CGDialogOpen}
  onClose={() => setCGDialogOpen(false)}
  title="Custom Content Example"
  description="This dialog demonstrates completely custom content."
  width={600}
  saveText="Export Data"
  cancelText="Close"
  onSave={() => {
    console.log('Exporting data...');
    setCGDialogOpen(false);
  }}
>
  <div className="custom-content">
    <Card title="📊 Data Statistics" size="small">
      <Row gutter={16}>
        <Col span={8}>
          <div className="stat-item">
            <Text strong>Total Users</Text>
            <div className="stat-number">1,234</div>
          </div>
        </Col>
        {/* More stats... */}
      </Row>
    </Card>
    
    <Card title="🎯 Quick Actions" size="small">
      <Space wrap>
        <Button size="small">Refresh Data</Button>
        <Button size="small">Clear Cache</Button>
      </Space>
    </Card>
  </div>
</CGDialog>`}
        />
      </div>
    </div>
  );
};

export default CGDialogDemo;
