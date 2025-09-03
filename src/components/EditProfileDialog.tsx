import React from "react";
import { Input, Form } from "antd";
import { CGDialog } from "./CG/Dialog/CGDialog";

interface EditProfileDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (values: { name: string; username: string }) => void;
  initialValues?: {
    name: string;
    username: string;
  };
}

const EditProfileDialog: React.FC<EditProfileDialogProps> = ({
  open,
  onClose,
  onSave,
  initialValues = { name: "Pedro Duarte", username: "@peduarte" },
}) => {
  const [form] = Form.useForm();

  const handleSave = () => {
    form.validateFields().then((values) => {
      onSave(values);
      onClose();
    });
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <CGDialog
      open={open}
      onClose={onClose}
      onCancel={handleCancel}
      onSave={handleSave}
      title="Edit profile"
      description="Make changes to your profile here. Click save when you're done."
      width={420}
    >
      <Form form={form} layout="vertical" initialValues={initialValues}>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter your name" }]}
        >
          <Input placeholder="Enter your name" />
        </Form.Item>

        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please enter your username" }]}
        >
          <Input placeholder="Enter your username" />
        </Form.Item>

        {/* Add more form fields for testing scroll */}
        <Form.Item label="Bio" name="bio">
          <Input.TextArea rows={4} placeholder="Tell us about yourself..." />
        </Form.Item>

        <Form.Item label="Website" name="website">
          <Input placeholder="https://example.com" />
        </Form.Item>

        <Form.Item label="Location" name="location">
          <Input placeholder="New York, NY" />
        </Form.Item>

        <Form.Item label="Company" name="company">
          <Input placeholder="Company name" />
        </Form.Item>
      </Form>
    </CGDialog>
  );
};

export default EditProfileDialog;
