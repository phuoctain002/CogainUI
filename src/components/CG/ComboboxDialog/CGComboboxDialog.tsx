import React, { useState, useRef, useEffect } from "react";
import { Button, Input, Table, List, Checkbox, Empty, Spin } from "antd";
import type { InputRef, TableColumnsType } from "antd";
import {
  SearchOutlined,
  DownOutlined,
  ReloadOutlined,
  UnorderedListOutlined,
  TableOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import { CGDialog } from "../Dialog";
import "./CGComboboxDialog.scss";

export interface ComboboxDialogOption<T = any> {
  key: string;
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
  [key: string]: any;
  item?: T;
}

export interface CGComboboxDialogProps<T = any> {
  options: ComboboxDialogOption[];
  value?: string | string[];
  placeholder?: string;
  searchPlaceholder?: string;
  disabled?: boolean;
  loading?: boolean;
  allowClear?: boolean;
  showSearch?: boolean;
  showReload?: boolean;
  multiple?: boolean;
  displayMode?: "list" | "table";
  allowDisplayModeSwitch?: boolean;
  dialogTitle?: string;
  dialogWidth?: number;
  maxHeight?: number;
  width?: number | string;
  className?: string;
  tableColumns?: TableColumnsType<ComboboxDialogOption>;
  onSelect?: (
    value: string | string[],
    options: ComboboxDialogOption<T> | ComboboxDialogOption<T>[]
  ) => void;
  onSearch?: (value: string) => void;
  onReload?: () => void;
  onDisplayModeChange?: (mode: "list" | "table") => void;
}

const CGComboboxDialog = <T,>({
  options = [],
  value,
  placeholder = "Click to select...",
  searchPlaceholder = "Search...",
  disabled = false,
  loading = false,
  allowClear = true,
  showSearch = true,
  showReload = false,
  multiple = false,
  displayMode = "list",
  allowDisplayModeSwitch = true,
  dialogTitle = "Select Options",
  dialogWidth = 600,
  maxHeight = 400,
  width = "100%",
  className = "",
  tableColumns,
  onSelect,
  onSearch,
  onReload,
  onDisplayModeChange,
}: CGComboboxDialogProps<T>) => {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [currentDisplayMode, setCurrentDisplayMode] = useState<
    "list" | "table"
  >(displayMode);
  const [selectedKeys, setSelectedKeys] = useState<string[]>(() => {
    if (multiple && Array.isArray(value)) {
      return value;
    } else if (!multiple && typeof value === "string") {
      return value ? [value] : [];
    }
    return [];
  });

  const inputRef = useRef<InputRef>(null);

  // Filter options based on search
  const filteredOptions = options.filter(
    (option) =>
      option.label.toLowerCase().includes(searchValue.toLowerCase()) ||
      option.value.toLowerCase().includes(searchValue.toLowerCase()) ||
      (option.description &&
        option.description.toLowerCase().includes(searchValue.toLowerCase()))
  );

  // Get selected options
  const selectedOptions = options.filter((option) =>
    selectedKeys.includes(option.key)
  );
  const displayValue =
    selectedOptions.length > 0
      ? multiple
        ? `${selectedOptions.length} selected`
        : selectedOptions[0].label
      : "";

  // Sync external value with internal state
  useEffect(() => {
    if (multiple && Array.isArray(value)) {
      setSelectedKeys(value);
    } else if (!multiple && typeof value === "string") {
      setSelectedKeys(value ? [value] : []);
    }
  }, [value, multiple]);

  // Sync display mode
  useEffect(() => {
    setCurrentDisplayMode(displayMode);
  }, [displayMode]);

  const handleOpen = () => {
    if (disabled) return;
    setOpen(true);
    setSearchValue("");

    if (showSearch && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSearchValue("");
  };

  const handleSearch = (searchText: string) => {
    setSearchValue(searchText);
    onSearch?.(searchText);
  };

  const handleItemSelect = (option: ComboboxDialogOption<T>) => {
    if (option.disabled) return;

    if (multiple) {
      const newSelectedKeys = selectedKeys.includes(option.key)
        ? selectedKeys.filter((key) => key !== option.key)
        : [...selectedKeys, option.key];

      setSelectedKeys(newSelectedKeys);
      const newSelectedOptions = options.filter((opt) =>
        newSelectedKeys.includes(opt.key)
      );
      onSelect?.(newSelectedKeys, newSelectedOptions);
    } else {
      // Single select - close dialog immediately
      setSelectedKeys([option.key]);
      onSelect?.(option.key, option);
      handleClose();
    }
  };

  const handleConfirm = () => {
    if (multiple) {
      const selectedOptions = options.filter((opt) =>
        selectedKeys.includes(opt.key)
      );
      onSelect?.(selectedKeys, selectedOptions);
    }
    handleClose();
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedKeys([]);
    onSelect?.(
      multiple ? [] : "",
      multiple ? [] : ({} as ComboboxDialogOption)
    );
  };

  const handleReload = (e: React.MouseEvent) => {
    e.stopPropagation();
    onReload?.();
  };

  const handleDisplayModeChange = (mode: "list" | "table") => {
    setCurrentDisplayMode(mode);
    onDisplayModeChange?.(mode);
  };

  // Default table columns
  const defaultTableColumns: TableColumnsType<ComboboxDialogOption> = [
    {
      title: "Name",
      dataIndex: "label",
      key: "label",
      ellipsis: true,
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
      ellipsis: true,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
      render: (text) => text || "-",
    },
  ];

  const columns = tableColumns || defaultTableColumns;

  const renderContent = () => {
    if (loading) {
      return (
        <div className="cg-combobox-dialog-loading">
          <Spin size="large" />
          <p>Loading...</p>
        </div>
      );
    }

    if (filteredOptions.length === 0) {
      return (
        <div className="cg-combobox-dialog-empty">
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="No data found"
          />
        </div>
      );
    }

    if (currentDisplayMode === "table") {
      return (
        <Table
          dataSource={filteredOptions}
          columns={columns}
          pagination={false}
          size="small"
          scroll={{ y: maxHeight }}
          rowSelection={
            multiple
              ? {
                  type: "checkbox",
                  selectedRowKeys: selectedKeys,
                  onChange: (keys: React.Key[]) => {
                    setSelectedKeys(keys as string[]);
                  },
                  getCheckboxProps: (record) => ({
                    disabled: record.disabled,
                  }),
                }
              : undefined
          }
          onRow={(record) => ({
            onClick: () => handleItemSelect(record),
            className: `cg-combobox-dialog-table-row ${
              selectedKeys.includes(record.key) ? "selected" : ""
            } ${record.disabled ? "disabled" : ""}`,
          })}
          rowClassName={(record) =>
            selectedKeys.includes(record.key) ? "ant-table-row-selected" : ""
          }
        />
      );
    }

    // List mode
    return (
      <div className="cg-combobox-dialog-list" style={{ maxHeight }}>
        <List
          dataSource={filteredOptions}
          renderItem={(item) => (
            <List.Item
              key={item.key}
              className={`cg-combobox-dialog-list-item ${
                selectedKeys.includes(item.key) ? "selected" : ""
              } ${item.disabled ? "disabled" : ""}`}
              onClick={() => handleItemSelect(item)}
            >
              <div className="cg-combobox-dialog-list-content">
                {multiple && (
                  <Checkbox
                    checked={selectedKeys.includes(item.key)}
                    disabled={item.disabled}
                    onChange={() => handleItemSelect(item)}
                  />
                )}
                <div className="cg-combobox-dialog-list-info">
                  <div className="cg-combobox-dialog-list-label">
                    {item.label}
                  </div>
                  {item.description && (
                    <div className="cg-combobox-dialog-list-description">
                      {item.description}
                    </div>
                  )}
                </div>
                {!multiple && selectedKeys.includes(item.key) && (
                  <CheckOutlined className="cg-combobox-dialog-list-check" />
                )}
              </div>
            </List.Item>
          )}
        />
      </div>
    );
  };

  return (
    <div
      className={`cg-combobox-dialog ${className} ${
        disabled ? "disabled" : ""
      }`}
    >
      {/* Trigger */}
      <div
        className="cg-combobox-dialog-trigger"
        onClick={handleOpen}
        style={{ width }}
      >
        <span className="cg-combobox-dialog-value">
          {displayValue || placeholder}
        </span>

        <div className="cg-combobox-dialog-actions">
          {showReload && (
            <Button
              type="text"
              size="small"
              icon={<ReloadOutlined />}
              onClick={handleReload}
              className="cg-combobox-dialog-action-btn"
              loading={loading}
            />
          )}

          {allowClear && selectedKeys.length > 0 && (
            <Button
              type="text"
              size="small"
              onClick={handleClear}
              className="cg-combobox-dialog-clear-btn"
            >
              ×
            </Button>
          )}

          <DownOutlined className="cg-combobox-dialog-arrow" />
        </div>
      </div>

      {/* Dialog */}
      <CGDialog
        open={open}
        onClose={handleClose}
        title={dialogTitle}
        width={dialogWidth}
        footer={
          multiple ? (
            <div className="cg-combobox-dialog-footer">
              <span className="cg-combobox-dialog-footer-info">
                Selected: {selectedKeys.length} item
                {selectedKeys.length !== 1 ? "s" : ""}
              </span>
              <div className="cg-combobox-dialog-footer-actions">
                <Button onClick={handleClose} className="cancel-button">
                  Cancel
                </Button>
                <Button
                  type="primary"
                  onClick={handleConfirm}
                  className="save-button"
                >
                  Confirm ({selectedKeys.length})
                </Button>
              </div>
            </div>
          ) : null
        }
      >
        <div className="cg-combobox-dialog-content">
          {/* Header */}
          <div className="cg-combobox-dialog-header">
            {showSearch && (
              <div className="cg-combobox-dialog-search">
                <Input
                  ref={inputRef}
                  placeholder={searchPlaceholder}
                  value={searchValue}
                  onChange={(e) => handleSearch(e.target.value)}
                  prefix={<SearchOutlined />}
                  allowClear
                />
              </div>
            )}

            {allowDisplayModeSwitch && (
              <div className="cg-combobox-dialog-mode-switch">
                <Button.Group>
                  <Button
                    type={currentDisplayMode === "list" ? "primary" : "default"}
                    icon={<UnorderedListOutlined />}
                    onClick={() => handleDisplayModeChange("list")}
                    size="small"
                  >
                    List
                  </Button>
                  <Button
                    type={
                      currentDisplayMode === "table" ? "primary" : "default"
                    }
                    icon={<TableOutlined />}
                    onClick={() => handleDisplayModeChange("table")}
                    size="small"
                  >
                    Table
                  </Button>
                </Button.Group>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="cg-combobox-dialog-body">{renderContent()}</div>
        </div>
      </CGDialog>
    </div>
  );
};

export default CGComboboxDialog;
