import React, { ReactNode } from "react";
import { Modal, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import "./CGDialog.scss";

export interface CGDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  width?: number;
  footer?: ReactNode;
  showDefaultFooter?: boolean;
  onSave?: () => void;
  onCancel?: () => void;
  saveText?: string;
  cancelText?: string;
  saveButtonProps?: any;
  cancelButtonProps?: any;
}

export const CGDialog: React.FC<CGDialogProps> = ({
  open,
  onClose,
  title,
  description,
  children,
  width = 420,
  footer,
  showDefaultFooter = true,
  onSave,
  onCancel,
  saveText = "Save changes",
  cancelText = "Cancel",
  saveButtonProps = {},
  cancelButtonProps = {},
}) => {
  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      onClose();
    }
  };

  const handleSave = () => {
    if (onSave) {
      onSave();
    }
  };

  const renderFooter = () => {
    if (footer !== undefined) {
      return footer;
    }

    if (!showDefaultFooter) {
      return null;
    }

    return (
      <div className="dialog-footer">
        <Button
          onClick={handleCancel}
          className="cancel-button"
          {...cancelButtonProps}
        >
          {cancelText}
        </Button>
        <Button
          type="primary"
          onClick={handleSave}
          className="save-button"
          {...saveButtonProps}
        >
          {saveText}
        </Button>
      </div>
    );
  };

  return (
    <Modal
      open={open}
      onCancel={handleCancel}
      footer={null}
      className="cg-dialog"
      width={width}
      centered
      closable={false}
      zIndex={1100}
    >
      <div className="dialog-container">
        {/* Fixed Header */}
        <div className="dialog-header">
          <h3 className="dialog-title">{title}</h3>
          <Button
            type="text"
            icon={<CloseOutlined />}
            className="close-button"
            onClick={handleCancel}
          />
        </div>

        {/* Scrollable Content */}
        <div className="dialog-content">
          {description && <p className="dialog-description">{description}</p>}

          {children}
        </div>

        {/* Footer */}
        {renderFooter()}
      </div>
    </Modal>
  );
};
