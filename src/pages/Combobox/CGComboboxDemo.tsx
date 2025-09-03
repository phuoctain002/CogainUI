import React, { useState } from "react";
import { Card, Row, Col, Typography, Space, Button, message } from "antd";
import { CGCombobox, type ComboboxOption } from "@/components/CG";
import { CodePreview } from "@/components";
import "./CGComboboxDemo.scss";

const { Title, Paragraph, Text } = Typography;

// Sample data
const countries: ComboboxOption[] = [
  { value: "vn", label: "Vietnam" },
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "fr", label: "France" },
  { value: "de", label: "Germany" },
  { value: "jp", label: "Japan" },
  { value: "kr", label: "South Korea" },
  { value: "cn", label: "China" },
  { value: "in", label: "India" },
  { value: "au", label: "Australia" },
];

const programmingLanguages: ComboboxOption[] = [
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "csharp", label: "C#" },
  { value: "cpp", label: "C++" },
  { value: "go", label: "Go" },
  { value: "rust", label: "Rust" },
  { value: "php", label: "PHP", disabled: true },
  { value: "ruby", label: "Ruby" },
];

const CGComboboxDemo: React.FC = () => {
  const [basicValue, setBasicValue] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");
  const [reloadValue, setReloadValue] = useState<string>("");
  const [disabledValue, setDisabledValue] = useState<string>("typescript");
  const [advancedValue, setAdvancedValue] = useState<string>("");

  const [loading, setLoading] = useState(false);
  const [dynamicOptions, setDynamicOptions] =
    useState<ComboboxOption[]>(countries);

  const handleReload = () => {
    setLoading(true);
    message.info("Reloading data...");

    // Simulate API call
    setTimeout(() => {
      setDynamicOptions([...countries].sort(() => Math.random() - 0.5));
      setLoading(false);
      message.success("Data reloaded successfully!");
    }, 1000);
  };

  const handleSearch = (searchText: string) => {
    console.log("Search:", searchText);
  };

  // Code examples
  const basicExample = `import { CGCombobox } from '@/components/CG';

const [value, setValue] = useState('');

const options = [
  { value: 'vn', label: 'Vietnam' },
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
];

<CGCombobox
  options={options}
  value={value}
  placeholder="Select a country..."
  onSelect={(value, option) => setValue(value)}
/>`;

  const searchExample = `<CGCombobox
  options={programmingLanguages}
  value={searchValue}
  placeholder="Select a language..."
  showSearch={true}
  searchPlaceholder="Search languages..."
  onSelect={(value) => setSearchValue(value)}
  onSearch={(searchText) => console.log('Search:', searchText)}
/>`;

  const reloadExample = `<CGCombobox
  options={dynamicOptions}
  value={reloadValue}
  placeholder="Select with reload..."
  showReload={true}
  loading={loading}
  onSelect={(value) => setReloadValue(value)}
  onReload={handleReload}
/>`;
  const disabledExample = `<CGCombobox
  options={programmingLanguages}
  value={disabledValue}
  placeholder="This is disabled..."
  disabled={true}
  showSearch={true}
  showReload={true}
  onSelect={(value) => setDisabledValue(value)}
  onReload={() => message.info("Reload clicked!")}
/>`;
  const advancedExample = `<CGCombobox
  options={programmingLanguages}
  value={advancedValue}
  placeholder="Advanced example..."
  showSearch={true}
  showReload={true}
  allowClear={true}
  maxHeight={150}
  width="300px"
  onSelect={(value, option) => {
    setAdvancedValue(value);
    message.success(\`Selected: \${option.label}\`);
  }}
  onSearch={handleSearch}
  onReload={() => message.info('Reload clicked!')}
/>`;

  return (
    <div className="cg-combobox-demo">
      <div className="demo-header">
        <Title level={2}>CGCombobox Component</Title>{" "}
        <Paragraph>
          A powerful and customizable combobox component inspired by ShadCN UI,
          featuring search functionality and reload capability.
        </Paragraph>
      </div>

      <Row gutter={[24, 24]}>
        {/* Basic Combobox */}
        <Col span={24}>
          <CodePreview
            code={basicExample}
            title="Basic Combobox"
            preview={
              <CGCombobox
                options={countries.slice(0, 3)}
                value={basicValue}
                placeholder="Select a country..."
                onSelect={(value) => setBasicValue(value)}
              />
            }
          />
        </Col>
        {/* Search Combobox */}
        <Col span={24}>
          <CodePreview
            code={searchExample}
            title="With Search"
            preview={
              <CGCombobox
                options={programmingLanguages.slice(0, 5)}
                value={searchValue}
                placeholder="Select a language..."
                showSearch={true}
                onSelect={(value) => setSearchValue(value)}
              />
            }
          />
        </Col>
        {/* Reload Combobox */}
        <Col span={24}>
          <Card title="Combobox with Reload" className="demo-card">
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
              <div className="demo-example">
                <Text strong>Example:</Text>
                <CGCombobox
                  options={dynamicOptions}
                  value={reloadValue}
                  placeholder="Select with reload..."
                  showReload={true}
                  loading={loading}
                  onSelect={(value, option) => {
                    setReloadValue(value);
                    message.success(`Selected: ${option.label}`);
                  }}
                  onReload={handleReload}
                />
                <Text type="secondary">Selected: {reloadValue || "None"}</Text>
              </div>
              <CodePreview
                code={reloadExample}
                title="With Reload Button"
                preview={
                  <CGCombobox
                    options={countries.slice(0, 4)}
                    value={reloadValue}
                    placeholder="Select with reload..."
                    showReload={true}
                    onSelect={(value) => setReloadValue(value)}
                    onReload={() => message.info("Reload clicked!")}
                  />
                }
              />
            </Space>
          </Card>
        </Col>{" "}
        {/* Disabled Combobox */}
        <Col span={24}>
          <Card title="Disabled Combobox" className="demo-card">
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
              <div className="demo-example">
                <Text strong>Example:</Text>
                <CGCombobox
                  options={programmingLanguages}
                  value={disabledValue}
                  placeholder="This is disabled..."
                  disabled={true}
                  showSearch={true}
                  showReload={true}
                  onSelect={(value, option) => {
                    setDisabledValue(value);
                    message.success(`Selected: ${option.label}`);
                  }}
                  onReload={() => message.info("Reload clicked!")}
                />
                <Text type="secondary">
                  Disabled: Yes | Selected: {disabledValue || "None"}
                </Text>
              </div>
              <CodePreview
                code={disabledExample}
                title="Disabled State"
                preview={
                  <CGCombobox
                    options={programmingLanguages.slice(0, 3)}
                    value={disabledValue}
                    placeholder="This is disabled..."
                    disabled={true}
                    showSearch={true}
                    showReload={true}
                    onSelect={(value) => setDisabledValue(value)}
                    onReload={() => message.info("Reload!")}
                  />
                }
              />
            </Space>
          </Card>
        </Col>
        {/* Advanced Example */}
        <Col span={24}>
          <Card title="Advanced Combobox" className="demo-card">
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
              {" "}
              <div className="demo-example">
                <Text strong>All features combined:</Text>
                <CGCombobox
                  options={programmingLanguages}
                  value={advancedValue}
                  placeholder="Advanced example..."
                  showSearch={true}
                  showReload={true}
                  allowClear={true}
                  maxHeight={150}
                  width="300px"
                  onSelect={(value, option) => {
                    setAdvancedValue(value);
                    message.success(`Selected: ${option.label}`);
                  }}
                  onSearch={handleSearch}
                  onReload={() => message.info("Reload clicked!")}
                />
                <Text type="secondary">
                  Selected: {advancedValue || "None"}
                </Text>
              </div>
              <CodePreview
                code={advancedExample}
                title="Advanced Usage"
                preview={
                  <CGCombobox
                    options={programmingLanguages.slice(0, 6)}
                    value={advancedValue}
                    placeholder="Advanced example..."
                    showSearch={true}
                    showReload={true}
                    allowClear={true}
                    width="250px"
                    onSelect={(value) => setAdvancedValue(value)}
                    onSearch={() => {}}
                    onReload={() => message.info("Reload!")}
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
              <Title level={4}>CGComboboxProps</Title>
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
                      <code>ComboboxOption[]</code>
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
                      <code>string</code>
                    </td>
                    <td>
                      <code>undefined</code>
                    </td>
                    <td>Selected value</td>
                  </tr>
                  <tr>
                    <td>
                      <code>placeholder</code>
                    </td>
                    <td>
                      <code>string</code>
                    </td>
                    <td>
                      <code>"Select an option..."</code>
                    </td>
                    <td>Placeholder text</td>
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
                    </td>{" "}
                    <td>Show reload button</td>
                  </tr>
                  <tr>
                    <td>
                      <code>loading</code>
                    </td>
                    <td>
                      <code>boolean</code>
                    </td>
                    <td>
                      <code>false</code>
                    </td>
                    <td>Loading state</td>
                  </tr>
                  <tr>
                    <td>
                      <code>disabled</code>
                    </td>
                    <td>
                      <code>boolean</code>
                    </td>
                    <td>
                      <code>false</code>
                    </td>
                    <td>Disabled state</td>
                  </tr>
                  <tr>
                    <td>
                      <code>allowClear</code>
                    </td>
                    <td>
                      <code>boolean</code>
                    </td>
                    <td>
                      <code>true</code>
                    </td>
                    <td>Show clear button</td>
                  </tr>
                  <tr>
                    <td>
                      <code>width</code>
                    </td>
                    <td>
                      <code>number | string</code>
                    </td>
                    <td>
                      <code>"100%"</code>
                    </td>
                    <td>Component width</td>
                  </tr>
                  <tr>
                    <td>
                      <code>maxHeight</code>
                    </td>
                    <td>
                      <code>number</code>
                    </td>
                    <td>
                      <code>200</code>
                    </td>
                    <td>Max height of dropdown</td>
                  </tr>{" "}
                  <tr>
                    <td>
                      <code>onSelect</code>
                    </td>
                    <td>
                      <code>
                        (value: string, option: ComboboxOption) =&gt; void
                      </code>
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
                    </td>{" "}
                    <td>Reload callback</td>
                  </tr>
                </tbody>
              </table>

              <Title level={4} style={{ marginTop: "32px" }}>
                ComboboxOption
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
                      <code>disabled</code>
                    </td>
                    <td>
                      <code>boolean</code>
                    </td>
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

export default CGComboboxDemo;
