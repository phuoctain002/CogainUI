import React, { useState } from "react";
import { Card, Row, Col, Typography, Space, message, Tag } from "antd";
import { CGComboboxDialog, type ComboboxDialogOption } from "@/components/CG";
import { CodePreview } from "@/components";
import "./CGComboboxDialogDemo.scss";

const { Title, Paragraph, Text } = Typography;

// Sample data
const users: ComboboxDialogOption[] = [
  {
    key: "1",
    value: "john_doe",
    label: "John Doe",
    description: "Senior Developer - Frontend Team",
    email: "john.doe@company.com",
    department: "Engineering",
  },
  {
    key: "2",
    value: "jane_smith",
    label: "Jane Smith",
    description: "Product Manager - Mobile Apps",
    email: "jane.smith@company.com",
    department: "Product",
  },
  {
    key: "3",
    value: "mike_wilson",
    label: "Mike Wilson",
    description: "UX Designer - Design System",
    email: "mike.wilson@company.com",
    department: "Design",
  },
  {
    key: "4",
    value: "sarah_johnson",
    label: "Sarah Johnson",
    description: "DevOps Engineer - Infrastructure",
    email: "sarah.johnson@company.com",
    department: "Engineering",
  },
  {
    key: "5",
    value: "alex_brown",
    label: "Alex Brown",
    description: "Data Scientist - Analytics Team",
    email: "alex.brown@company.com",
    department: "Data",
  },
  {
    key: "6",
    value: "lisa_davis",
    label: "Lisa Davis",
    description: "QA Engineer - Testing Team",
    email: "lisa.davis@company.com",
    department: "Engineering",
    disabled: true,
  },
];

const projects: ComboboxDialogOption[] = [
  {
    key: "1",
    value: "project_alpha",
    label: "Project Alpha",
    description: "Next-generation mobile application with AI features",
    status: "Active",
    priority: "High",
  },
  {
    key: "2",
    value: "project_beta",
    label: "Project Beta",
    description: "Backend infrastructure modernization initiative",
    status: "Planning",
    priority: "Medium",
  },
  {
    key: "3",
    value: "project_gamma",
    label: "Project Gamma",
    description: "Customer analytics dashboard redesign",
    status: "Active",
    priority: "High",
  },
  {
    key: "4",
    value: "project_delta",
    label: "Project Delta",
    description: "Legacy system migration and optimization",
    status: "On Hold",
    priority: "Low",
  },
  {
    key: "5",
    value: "project_epsilon",
    label: "Project Epsilon",
    description: "Real-time notification system implementation",
    status: "Active",
    priority: "Medium",
  },
];

const CGComboboxDialogDemo: React.FC = () => {
  const [singleValue, setSingleValue] = useState<string>("");
  const [multipleValue, setMultipleValue] = useState<string[]>([]);
  const [listModeValue, setListModeValue] = useState<string>("");
  const [tableModeValue, setTableModeValue] = useState<string[]>([]);
  const [customValue, setCustomValue] = useState<string[]>([]);

  const [loading, setLoading] = useState(false);

  const handleReload = () => {
    setLoading(true);
    message.info("Reloading data...");

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      message.success("Data reloaded successfully!");
    }, 1000);
  };

  const handleSearch = (searchText: string) => {
    console.log("Search:", searchText);
  };

  // Custom table columns for projects
  const projectColumns = [
    {
      title: "Project Name",
      dataIndex: "label",
      key: "label",
      ellipsis: true,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        const color =
          status === "Active"
            ? "green"
            : status === "Planning"
            ? "blue"
            : status === "On Hold"
            ? "orange"
            : "default";
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
      render: (priority: string) => {
        const color =
          priority === "High"
            ? "red"
            : priority === "Medium"
            ? "orange"
            : "default";
        return <Tag color={color}>{priority}</Tag>;
      },
    },
  ];

  // Code examples
  const singleSelectExample = `import { CGComboboxDialog } from '@/components/CG';

const [value, setValue] = useState('');

const users = [
  { 
    key: "1", 
    value: "john_doe", 
    label: "John Doe", 
    description: "Senior Developer - Frontend Team" 
  },
  // ... more users
];

<CGComboboxDialog
  options={users}
  value={value}
  placeholder="Select a user..."
  dialogTitle="Select User"
  multiple={false}
  onSelect={(value, option) => setValue(value)}
/>`;

  const multipleSelectExample = `<CGComboboxDialog
  options={users}
  value={multipleValue}
  placeholder="Select multiple users..."
  dialogTitle="Select Users"
  multiple={true}
  onSelect={(values, options) => setMultipleValue(values)}
/>`;

  const listModeExample = `<CGComboboxDialog
  options={users}
  value={listModeValue}
  placeholder="List mode..."
  dialogTitle="Select User (List Mode)"
  displayMode="list"
  allowDisplayModeSwitch={false}
  multiple={false}
  onSelect={(value) => setListModeValue(value)}
/>`;

  const tableModeExample = `<CGComboboxDialog
  options={projects}
  value={tableModeValue}
  placeholder="Table mode..."
  dialogTitle="Select Projects (Table Mode)"
  displayMode="table"
  allowDisplayModeSwitch={false}
  multiple={true}
  tableColumns={projectColumns}
  dialogWidth={800}
  onSelect={(values) => setTableModeValue(values)}
/>`;

  const customExample = `<CGComboboxDialog
  options={projects}
  value={customValue}
  placeholder="Advanced example..."
  dialogTitle="Select Projects"
  showSearch={true}
  showReload={true}
  multiple={true}
  allowDisplayModeSwitch={true}
  dialogWidth={900}
  maxHeight={400}
  tableColumns={projectColumns}
  onSelect={(values, options) => {
    setCustomValue(values);
    message.success(\`Selected \${options.length} project(s)\`);
  }}
  onSearch={handleSearch}
  onReload={handleReload}
  onDisplayModeChange={(mode) => message.info(\`Display mode: \${mode}\`)}
/>`;

  return (
    <div className="cg-combobox-dialog-demo">
      <div className="demo-header">
        <Title level={2}>CGComboboxDialog Component</Title>
        <Paragraph>
          A powerful combination of Combobox and Dialog that opens a dialog to
          display options in List or Table format, supporting both single and
          multiple selection.
        </Paragraph>
      </div>

      <Row gutter={[24, 24]}>
        {/* Single Select */}
        <Col span={24}>
          <Card title="Single Selection" className="demo-card">
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
              <div className="demo-example">
                <Text strong>Example:</Text>
                <CGComboboxDialog
                  options={users}
                  value={singleValue}
                  placeholder="Select a user..."
                  dialogTitle="Select User"
                  multiple={false}
                  onSelect={(value, option) => {
                    setSingleValue(value as string);
                    message.success(
                      `Selected: ${(option as ComboboxDialogOption).label}`
                    );
                  }}
                />
                <Text type="secondary">Selected: {singleValue || "None"}</Text>
              </div>

              <CodePreview
                code={singleSelectExample}
                title="Single Selection"
                preview={
                  <CGComboboxDialog
                    options={users.slice(0, 3)}
                    value={singleValue}
                    placeholder="Select a user..."
                    dialogTitle="Select User"
                    multiple={false}
                    onSelect={(value) => setSingleValue(value as string)}
                  />
                }
              />
            </Space>
          </Card>
        </Col>

        {/* Multiple Select */}
        <Col span={24}>
          <Card title="Multiple Selection" className="demo-card">
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
              <div className="demo-example">
                <Text strong>Example:</Text>
                <CGComboboxDialog
                  options={users}
                  value={multipleValue}
                  placeholder="Select multiple users..."
                  dialogTitle="Select Users"
                  multiple={true}
                  onSelect={(values, options) => {
                    setMultipleValue(values as string[]);
                    message.success(
                      `Selected ${
                        (options as ComboboxDialogOption[]).length
                      } user(s)`
                    );
                  }}
                />
                <Text type="secondary">
                  Selected: {multipleValue.length} user(s)
                </Text>
              </div>

              <CodePreview
                code={multipleSelectExample}
                title="Multiple Selection"
                preview={
                  <CGComboboxDialog
                    options={users.slice(0, 4)}
                    value={multipleValue}
                    placeholder="Select multiple users..."
                    dialogTitle="Select Users"
                    multiple={true}
                    onSelect={(values) => setMultipleValue(values as string[])}
                  />
                }
              />
            </Space>
          </Card>
        </Col>

        {/* List Mode */}
        <Col span={24}>
          <Card title="List Display Mode" className="demo-card">
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
              <div className="demo-example">
                <Text strong>Example:</Text>
                <CGComboboxDialog
                  options={users}
                  value={listModeValue}
                  placeholder="List mode..."
                  dialogTitle="Select User (List Mode)"
                  displayMode="list"
                  allowDisplayModeSwitch={false}
                  multiple={false}
                  onSelect={(value, option) => {
                    setListModeValue(value as string);
                    message.success(
                      `Selected: ${(option as ComboboxDialogOption).label}`
                    );
                  }}
                />
                <Text type="secondary">
                  Selected: {listModeValue || "None"}
                </Text>
              </div>

              <CodePreview
                code={listModeExample}
                title="List Mode"
                preview={
                  <CGComboboxDialog
                    options={users.slice(0, 3)}
                    value={listModeValue}
                    placeholder="List mode..."
                    dialogTitle="Select User (List Mode)"
                    displayMode="list"
                    allowDisplayModeSwitch={false}
                    multiple={false}
                    onSelect={(value) => setListModeValue(value as string)}
                  />
                }
              />
            </Space>
          </Card>
        </Col>

        {/* Table Mode */}
        <Col span={24}>
          <Card title="Table Display Mode" className="demo-card">
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
              <div className="demo-example">
                <Text strong>Example:</Text>
                <CGComboboxDialog
                  options={projects}
                  value={tableModeValue}
                  placeholder="Table mode..."
                  dialogTitle="Select Projects (Table Mode)"
                  displayMode="table"
                  allowDisplayModeSwitch={false}
                  multiple={true}
                  tableColumns={projectColumns}
                  dialogWidth={800}
                  onSelect={(values, options) => {
                    setTableModeValue(values as string[]);
                    message.success(
                      `Selected ${
                        (options as ComboboxDialogOption[]).length
                      } project(s)`
                    );
                  }}
                />
                <Text type="secondary">
                  Selected: {tableModeValue.length} project(s)
                </Text>
              </div>

              <CodePreview
                code={tableModeExample}
                title="Table Mode"
                preview={
                  <CGComboboxDialog
                    options={projects.slice(0, 3)}
                    value={tableModeValue}
                    placeholder="Table mode..."
                    dialogTitle="Select Projects"
                    displayMode="table"
                    allowDisplayModeSwitch={false}
                    multiple={true}
                    tableColumns={projectColumns}
                    dialogWidth={700}
                    onSelect={(values) => setTableModeValue(values as string[])}
                  />
                }
              />
            </Space>
          </Card>
        </Col>

        {/* Advanced Example */}
        <Col span={24}>
          <Card title="Advanced ComboboxDialog" className="demo-card">
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
              <div className="demo-example">
                <Text strong>All features combined:</Text>
                <CGComboboxDialog
                  options={projects}
                  value={customValue}
                  placeholder="Advanced example..."
                  dialogTitle="Select Projects"
                  showSearch={true}
                  showReload={true}
                  multiple={true}
                  allowDisplayModeSwitch={true}
                  dialogWidth={900}
                  maxHeight={400}
                  tableColumns={projectColumns}
                  loading={loading}
                  onSelect={(values, options) => {
                    setCustomValue(values as string[]);
                    message.success(
                      `Selected ${
                        (options as ComboboxDialogOption[]).length
                      } project(s)`
                    );
                  }}
                  onSearch={handleSearch}
                  onReload={handleReload}
                  onDisplayModeChange={(mode) =>
                    message.info(`Display mode: ${mode}`)
                  }
                />
                <Text type="secondary">
                  Selected: {customValue.length} project(s)
                </Text>
              </div>

              <CodePreview
                code={customExample}
                title="Advanced Usage"
                preview={
                  <CGComboboxDialog
                    options={projects.slice(0, 4)}
                    value={customValue}
                    placeholder="Advanced example..."
                    dialogTitle="Select Projects"
                    showSearch={true}
                    showReload={true}
                    multiple={true}
                    allowDisplayModeSwitch={true}
                    dialogWidth={800}
                    tableColumns={projectColumns}
                    onSelect={(values) => setCustomValue(values as string[])}
                    onSearch={() => {}}
                    onReload={() => message.info("Reload!")}
                    onDisplayModeChange={(mode) =>
                      message.info(`Mode: ${mode}`)
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
              <Title level={4}>CGComboboxDialogProps</Title>
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
                      <code>options</code>
                    </td>
                    <td>
                      <code>ComboboxDialogOption[]</code>
                    </td>
                    <td>
                      <code>[]</code>
                    </td>
                    <td>Array of options to display</td>
                  </tr>
                  <tr>
                    <td>
                      <code>value</code>
                    </td>
                    <td>
                      <code>string | string[]</code>
                    </td>
                    <td>
                      <code>undefined</code>
                    </td>
                    <td>Selected value(s)</td>
                  </tr>
                  <tr>
                    <td>
                      <code>multiple</code>
                    </td>
                    <td>
                      <code>boolean</code>
                    </td>
                    <td>
                      <code>false</code>
                    </td>
                    <td>Allow multiple selection</td>
                  </tr>
                  <tr>
                    <td>
                      <code>displayMode</code>
                    </td>
                    <td>
                      <code>"list" | "table"</code>
                    </td>
                    <td>
                      <code>"list"</code>
                    </td>
                    <td>Display mode in dialog</td>
                  </tr>
                  <tr>
                    <td>
                      <code>allowDisplayModeSwitch</code>
                    </td>
                    <td>
                      <code>boolean</code>
                    </td>
                    <td>
                      <code>true</code>
                    </td>
                    <td>Allow switching display mode</td>
                  </tr>
                  <tr>
                    <td>
                      <code>dialogTitle</code>
                    </td>
                    <td>
                      <code>string</code>
                    </td>
                    <td>
                      <code>"Select Options"</code>
                    </td>
                    <td>Dialog title</td>
                  </tr>
                  <tr>
                    <td>
                      <code>dialogWidth</code>
                    </td>
                    <td>
                      <code>number</code>
                    </td>
                    <td>
                      <code>600</code>
                    </td>
                    <td>Dialog width</td>
                  </tr>
                  <tr>
                    <td>
                      <code>showSearch</code>
                    </td>
                    <td>
                      <code>boolean</code>
                    </td>
                    <td>
                      <code>true</code>
                    </td>
                    <td>Show search input</td>
                  </tr>
                  <tr>
                    <td>
                      <code>showReload</code>
                    </td>
                    <td>
                      <code>boolean</code>
                    </td>
                    <td>
                      <code>false</code>
                    </td>
                    <td>Show reload button</td>
                  </tr>
                  <tr>
                    <td>
                      <code>tableColumns</code>
                    </td>
                    <td>
                      <code>TableColumnsType</code>
                    </td>
                    <td>
                      <code>undefined</code>
                    </td>
                    <td>Custom table columns</td>
                  </tr>
                  <tr>
                    <td>
                      <code>onSelect</code>
                    </td>
                    <td>
                      <code>(value, options) =&gt; void</code>
                    </td>
                    <td>
                      <code>undefined</code>
                    </td>
                    <td>Selection callback</td>
                  </tr>
                  <tr>
                    <td>
                      <code>onSearch</code>
                    </td>
                    <td>
                      <code>(value: string) =&gt; void</code>
                    </td>
                    <td>
                      <code>undefined</code>
                    </td>
                    <td>Search callback</td>
                  </tr>
                  <tr>
                    <td>
                      <code>onReload</code>
                    </td>
                    <td>
                      <code>() =&gt; void</code>
                    </td>
                    <td>
                      <code>undefined</code>
                    </td>
                    <td>Reload callback</td>
                  </tr>
                  <tr>
                    <td>
                      <code>onDisplayModeChange</code>
                    </td>
                    <td>
                      <code>(mode) =&gt; void</code>
                    </td>
                    <td>
                      <code>undefined</code>
                    </td>
                    <td>Display mode change callback</td>
                  </tr>
                </tbody>
              </table>

              <Title level={4} style={{ marginTop: "32px" }}>
                ComboboxDialogOption
              </Title>
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
                    <td>
                      <code>key</code>
                    </td>
                    <td>
                      <code>string</code>
                    </td>
                    <td>Yes</td>
                    <td>Unique identifier</td>
                  </tr>
                  <tr>
                    <td>
                      <code>value</code>
                    </td>
                    <td>
                      <code>string</code>
                    </td>
                    <td>Yes</td>
                    <td>Option value</td>
                  </tr>
                  <tr>
                    <td>
                      <code>label</code>
                    </td>
                    <td>
                      <code>string</code>
                    </td>
                    <td>Yes</td>
                    <td>Option display text</td>
                  </tr>
                  <tr>
                    <td>
                      <code>description</code>
                    </td>
                    <td>
                      <code>string</code>
                    </td>
                    <td>No</td>
                    <td>Option description</td>
                  </tr>
                  <tr>
                    <td>
                      <code>disabled</code>
                    </td>
                    <td>
                      <code>boolean</code>
                    </td>
                    <td>No</td>
                    <td>Whether option is disabled</td>
                  </tr>
                  <tr>
                    <td>
                      <code>[key: string]</code>
                    </td>
                    <td>
                      <code>any</code>
                    </td>
                    <td>No</td>
                    <td>Additional custom properties</td>
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

export default CGComboboxDialogDemo;
