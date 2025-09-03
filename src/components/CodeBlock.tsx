import React, { useState } from "react";
import { Button, Typography, message } from "antd";
import { CopyOutlined, CheckOutlined } from "@ant-design/icons";
import "./CodeBlock.scss";

const { Text } = Typography;

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  showCopy?: boolean;
}

const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = "tsx",
  title,
  showCopy = true,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      message.success("Code copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      message.error("Failed to copy code");
    }
  };
  return (
    <div className="code-block">
      {(title || showCopy) && (
        <div className="code-block-header">
          {title && <Text strong>{title}</Text>}
          {showCopy && (
            <Button
              type="text"
              size="small"
              icon={copied ? <CheckOutlined /> : <CopyOutlined />}
              onClick={handleCopy}
              className={`copy-button ${copied ? "copied" : ""}`}
            >
              {copied ? "Copied!" : "Copy"}
            </Button>
          )}
        </div>
      )}{" "}
      <div className="code-block-content">
        {!title && showCopy && (
          <Button
            type="text"
            size="small"
            icon={copied ? <CheckOutlined /> : <CopyOutlined />}
            onClick={handleCopy}
            className={`copy-button-floating ${copied ? "copied" : ""}`}
          >
            {copied ? "Copied!" : "Copy"}
          </Button>
        )}
        <pre>
          <code className={`language-${language}`}>{code}</code>
        </pre>
      </div>
    </div>
  );
};

export default CodeBlock;
