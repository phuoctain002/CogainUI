import React, { useState } from "react";
import { Card, Row, Col, Typography, Space, message, Form, Input } from "antd";
import { CGComboboxWithAdd, type ComboboxWithAddOption } from "@/components/CG";
import { CodePreview } from "@/components";
import "./CGComboboxWithAddDemo.scss";

const { Title, Paragraph, Text } = Typography;

// Sample data
const initialCategories: ComboboxWithAddOption[] = [
  {
    value: "frontend",
    label: "Frontend Development",
  },
  {
    value: "backend",
    label: "Backend Development",
  },
  {
    value: "mobile",
    label: "Mobile Development",
  },
  {
    value: "devops",
    label: "DevOps",
  },
  {
    value: "ui_ux",
    label: "UI/UX Design",
  },
];

const CGComboboxWithAddDemo: React.FC = () => {
  const [categories, setCategories] = useState<ComboboxWithAddOption[]>(initialCategories);
  const [basicValue, setBasicValue] = useState<string>("");
  const [permissionValue, setPermissionValue] = useState<string>("");
  const [customValue, setCustomValue] = useState<string>("");
  const [loading, setLoading] = useState(false);
  
  // Form for add dialog
  const [form] = Form.useForm();

  const handleReload = () => {
    setLoading(true);
    message.info("Reloading categories...");

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      message.success("Categories reloaded successfully!");
    }, 1000);
  };

  const handleAddCategory = async () => {
    try {
      const values = await form.validateFields();
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newCategory: ComboboxWithAddOption = {
        value: values.value,
        label: values.label,
      };
      
      setCategories(prev => [...prev, newCategory]);
      form.resetFields();
      message.success(`Added new category: ${values.label}`);
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  // Code examples
  const basicExample = `import { CGComboboxWithAdd } from '@/components/CG';

const [categories, setCategories] = useState([
  { value: "frontend", label: "Frontend Development" },
  { value: "backend", label: "Backend Development" },
  // ... more categories
]);

const [value, setValue] = useState("");
const [form] = Form.useForm();

const handleAddCategory = async () => {
  const values = await form.validateFields();
  // API call to add new category
  const newCategory = { value: values.value, label: values.label };
  setCategories(prev => [...prev, newCategory]);
  form.resetFields();
};

<CGComboboxWithAdd
  options={categories}
  value={value}
  placeholder="Select category..."
  showSearch={true}
  showReload={true}
  addDialogTitle="Add New Category"
  onSelect={(value, option) => setValue(value)}
  onReload={() => {/* reload categories */}}
  onAdd={handleAddCategory}
  addContent={
    <Form form={form} layout="vertical">
      <Form.Item 
        label="Category Value" 
        name="value" 
        rules={[{ required: true }]}
      >
        <Input placeholder="e.g., data-science" />
      </Form.Item>
      <Form.Item 
        label="Category Label" 
        name="label" 
        rules={[{ required: true }]}
      >
        <Input placeholder="e.g., Data Science" />
      </Form.Item>
    </Form>
  }
/>`;

  const permissionExample = `<CGComboboxWithAdd
  options={categories}
  value={permissionValue}
  canAdd={false} // Hide add button based on permission
  placeholder="Select category..."
  onSelect={(value) => setPermissionValue(value)}
/>`;

  const customExample = `<CGComboboxWithAdd
  options={categories}
  value={customValue}
  placeholder="Advanced example..."
  showSearch={true}
  showReload={true}
  addButtonText="Create Category"
  addDialogTitle="Create New Category"
  addDialogWidth={600}
  allowClear={true}
  canAdd={true}
  onSelect={(value) => setCustomValue(value)}
  onReload={handleReload}
  onAdd={handleAddCategory}
  addContent={
    <div>
      <Form form={form} layout="vertical">
        <Form.Item label="Value" name="value" rules={[{ required: true }]}>
          <Input placeholder="Unique identifier" />
        </Form.Item>
        <Form.Item label="Display Name" name="label" rules={[{ required: true }]}>
          <Input placeholder="Human readable name" />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input.TextArea placeholder="Optional description" />
        </Form.Item>
      </Form>
    </div>
  }
/>`;

  return (
    <div className="cg-combobox-with-add-demo">
      <div className="demo-header">
        <Title level={2}>CGComboboxWithAdd Component</Title>
        <Paragraph>
          An extended combobox component with an "Add" button in the dropdown that opens a dialog 
          for adding new items. Supports permission-based visibility and custom add content.
        </Paragraph>
      </div>

      <Row gutter={[24, 24]}>
        {/* Basic Usage */}
        <Col span={24}>
          <Card title="Basic Usage with Add Button" className="demo-card">
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
              <div className="demo-example">
                <Text strong>Example:</Text>
                <CGComboboxWithAdd
                  options={categories}
                  value={basicValue}
                  placeholder="Select category..."
                  showSearch={true}
                  showReload={true}
                  addDialogTitle="Add New Category"
                  onSelect={(value, option) => {
                    setBasicValue(value);
                    message.success(`Selected: ${option.label}`);
                  }}
                  onReload={handleReload}
                  onAdd={handleAddCategory}
                  loading={loading}
                  addContent={
                    <Form form={form} layout="vertical">
                      <Form.Item 
                        label="Category Value" 
                        name="value" 
                        rules={[
                          { required: true, message: "Please enter category value" },
                          { pattern: /^[a-z_]+$/, message: "Only lowercase letters and underscores allowed" }
                        ]}
                      >
                        <Input placeholder="e.g., data_science" />
                      </Form.Item>
                      <Form.Item 
                        label="Category Label" 
                        name="label" 
                        rules={[{ required: true, message: "Please enter category label" }]}
                      >
                        <Input placeholder="e.g., Data Science" />
                      </Form.Item>
                    </Form>
                  }
                />
                <Text type="secondary">
                  Selected: {basicValue || "None"} | Total categories: {categories.length}
                </Text>
              </div>

              <CodePreview
                code={basicExample}
                title="Basic Usage"
                preview={
                  <CGComboboxWithAdd
                    options={categories.slice(0, 3)}
                    value={basicValue}
                    placeholder="Select category..."
                    showSearch={true}
                    showReload={true}
                    addDialogTitle="Add New Category"
                    onSelect={(value) => setBasicValue(value)}
                    onReload={() => message.info("Reload clicked!")}
                    onAdd={async () => {
                      await new Promise(resolve => setTimeout(resolve, 500));
                      message.success("Category added!");
                    }}
                    addContent={
                      <div style={{ padding: "16px" }}>
                        <Text>Add category form would go here...</Text>
                      </div>
                    }
                  />
                }
              />
            </Space>
          </Card>
        </Col>

        {/* Permission Control */}
        <Col span={24}>
          <Card title="Permission Control" className="demo-card">
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
              <div className="demo-example">
                <Text strong>Example (Add button hidden):</Text>
                <CGComboboxWithAdd
                  options={categories}
                  value={permissionValue}
                  placeholder="Select category..."
                  canAdd={false} // Hide add button
                  onSelect={(value, option) => {
                    setPermissionValue(value);
                    message.info(`Selected: ${option.label}`);
                  }}
                />
                <Text type="secondary">
                  Add button is hidden based on user permission
                </Text>
              </div>

              <CodePreview
                code={permissionExample}
                title="Permission Control"
                preview={
                  <CGComboboxWithAdd
                    options={categories.slice(0, 3)}
                    value={permissionValue}
                    placeholder="No add permission..."
                    canAdd={false}
                    onSelect={(value) => setPermissionValue(value)}
                  />
                }
              />
            </Space>
          </Card>
        </Col>

        {/* Advanced Example */}
        <Col span={24}>
          <Card title="Advanced ComboboxWithAdd" className="demo-card">
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
              <div className="demo-example">
                <Text strong>All features combined:</Text>
                <CGComboboxWithAdd
                  options={categories}
                  value={customValue}
                  placeholder="Advanced example..."
                  showSearch={true}
                  showReload={true}
                  addButtonText="Create Category"
                  addDialogTitle="Create New Category"
                  addDialogWidth={600}
                  allowClear={true}
                  canAdd={true}
                  onSelect={(value, option) => {
                    setCustomValue(value);
                    message.success(`Selected: ${option.label}`);
                  }}
                  onReload={handleReload}
                  onAdd={handleAddCategory}
                  loading={loading}
                  addContent={
                    <Form form={form} layout="vertical">
                      <Form.Item 
                        label="Category Value" 
                        name="value" 
                        rules={[{ required: true }]}
                      >
                        <Input placeholder="Unique identifier" />
                      </Form.Item>
                      <Form.Item 
                        label="Display Name" 
                        name="label" 
                        rules={[{ required: true }]}
                      >
                        <Input placeholder="Human readable name" />
                      </Form.Item>
                      <Form.Item label="Description" name="description">
                        <Input.TextArea 
                          placeholder="Optional description" 
                          rows={3}
                        />
                      </Form.Item>
                    </Form>
                  }
                />
                <Text type="secondary">
                  Selected: {customValue || "None"}
                </Text>
              </div>

              <CodePreview
                code={customExample}
                title="Advanced Usage"
                preview={
                  <CGComboboxWithAdd
                    options={categories.slice(0, 3)}
                    value={customValue}
                    placeholder="Advanced example..."
                    showSearch={true}
                    showReload={true}
                    addButtonText="Create Category"
                    addDialogTitle="Create New Category"
                    onSelect={(value) => setCustomValue(value)}
                    onReload={() => message.info("Reload!")}
                    onAdd={async () => {
                      await new Promise(resolve => setTimeout(resolve, 800));
                      message.success("Category created!");
                    }}
                    addContent={
                      <div style={{ padding: "16px" }}>
                        <Text>Advanced form content...</Text>
                      </div>
                    }
                  />
                }
              />
            </Space>
          </Card>
        </Col>

        {/* Props Documentation */}
        <Col span={24}>
          <Card title="Props Documentation" className="demo-card">
            <div className="props-table">
              <Title level={4}>CGComboboxWithAddProps</Title>
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
                    <td><code>options</code></td>
                    <td><code>ComboboxWithAddOption[]</code></td>
                    <td><code>[]</code></td>
                    <td>Array of options to display</td>
                  </tr>
                  <tr>
                    <td><code>value</code></td>
                    <td><code>string</code></td>
                    <td><code>undefined</code></td>
                    <td>Selected value</td>
                  </tr>
                  <tr>
                    <td><code>canAdd</code></td>
                    <td><code>boolean</code></td>
                    <td><code>true</code></td>
                    <td>Permission to show/hide add button</td>
                  </tr>
                  <tr>
                    <td><code>showAddButton</code></td>
                    <td><code>boolean</code></td>
                    <td><code>true</code></td>
                    <td>Whether to show add button</td>
                  </tr>
                  <tr>
                    <td><code>addButtonText</code></td>
                    <td><code>string</code></td>
                    <td><code>"Add New"</code></td>
                    <td>Text for add button</td>
                  </tr>
                  <tr>
                    <td><code>addDialogTitle</code></td>
                    <td><code>string</code></td>
                    <td><code>"Add New Item"</code></td>
                    <td>Title for add dialog</td>
                  </tr>
                  <tr>
                    <td><code>addDialogWidth</code></td>
                    <td><code>number</code></td>
                    <td><code>500</code></td>
                    <td>Width of add dialog</td>
                  </tr>
                  <tr>
                    <td><code>addContent</code></td>
                    <td><code>React.ReactNode</code></td>
                    <td><code>undefined</code></td>
                    <td>Content for add dialog</td>
                  </tr>                  <tr>
                    <td><code>onAdd</code></td>
                    <td><code>{"() => Promise<void> | void"}</code></td>
                    <td><code>undefined</code></td>
                    <td>Add submission callback</td>
                  </tr>
                  <tr>
                    <td><code>onSelect</code></td>
                    <td><code>{"(value, option) => void"}</code></td>
                    <td><code>undefined</code></td>
                    <td>Selection callback</td>
                  </tr>
                  <tr>
                    <td><code>onReload</code></td>
                    <td><code>{"() => void"}</code></td>
                    <td><code>undefined</code></td>
                    <td>Reload callback</td>
                  </tr>
                </tbody>
              </table>

              <Title level={4} style={{ marginTop: "32px" }}>ComboboxWithAddOption</Title>
              <table>
                <thead>
                  <tr>
                    <th>Property</th>
                    <th>Type</th>
                    <th>Required</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>value</code></td>
                    <td><code>string</code></td>
                    <td>Yes</td>
                    <td>Option value</td>
                  </tr>
                  <tr>
                    <td><code>label</code></td>
                    <td><code>string</code></td>
                    <td>Yes</td>
                    <td>Option display text</td>
                  </tr>
                  <tr>
                    <td><code>disabled</code></td>
                    <td><code>boolean</code></td>
                    <td>No</td>
                    <td>Whether option is disabled</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CGComboboxWithAddDemo;
