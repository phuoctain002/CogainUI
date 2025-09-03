import React, { useState } from "react";
import { Tabs, Card } from "antd";
import { EyeOutlined, CodeOutlined } from "@ant-design/icons";
import CodeBlock from "./CodeBlock";
import "./CodePreview.scss";

interface CodePreviewProps {
  title: string;
  description?: string;
  preview: React.ReactNode;
  code: string;
  defaultTab?: "preview" | "code";
}

const CodePreview: React.FC<CodePreviewProps> = ({
  title,
  description,
  preview,
  code,
  defaultTab = "preview",
}) => {
  const [activeTab, setActiveTab] = useState<string>(defaultTab);

  const tabItems = [
    {
      key: "preview",
      label: (
        <span>
          <EyeOutlined />
          Preview
        </span>
      ),
      children: <div className="preview-content">{preview}</div>,
    },
    {
      key: "code",
      label: (
        <span>
          <CodeOutlined />
          Code
        </span>
      ),
      children: <CodeBlock code={code} language="tsx" showCopy={true} />,
    },
  ];

  return (
    <Card className="code-preview-card">
      <div className="code-preview-header">
        <h3>{title}</h3>
        {description && <p>{description}</p>}
      </div>

      <Tabs
        activeKey={activeTab}
        onChange={(key: string) => setActiveTab(key)}
        items={tabItems}
        className="code-preview-tabs"
      />
    </Card>
  );
};

export default CodePreview;
