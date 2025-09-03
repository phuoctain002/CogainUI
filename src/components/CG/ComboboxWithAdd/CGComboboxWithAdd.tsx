import React, { useState, useRef, useEffect } from "react";
import { Button, Input, Empty, Spin } from "antd";
import type { InputRef } from "antd";
import {
  SearchOutlined,
  DownOutlined,
  ReloadOutlined,
  CheckOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { CGDialog } from "../Dialog";
import "./CGComboboxWithAdd.scss";

export interface ComboboxWithAddOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface CGComboboxWithAddProps {
  options: ComboboxWithAddOption[];
  value?: string;
  placeholder?: string;
  searchPlaceholder?: string;
  disabled?: boolean;
  loading?: boolean;
  allowClear?: boolean;
  showSearch?: boolean;
  showReload?: boolean;
  showAddButton?: boolean;
  addButtonText?: string;
  addDialogTitle?: string;
  addDialogWidth?: number;
  addContent?: React.ReactNode;
  maxHeight?: number;
  width?: number | string;
  className?: string;
  notFoundContent?: React.ReactNode;
  canAdd?: boolean; // Permission to show/hide add button
  onSelect?: (value: string, option: ComboboxWithAddOption) => void;
  onSearch?: (value: string) => void;
  onReload?: () => void;
  onAdd?: () => Promise<void> | void; // API call for adding new item
}

const CGComboboxWithAdd: React.FC<CGComboboxWithAddProps> = ({
  options = [],
  value,
  placeholder = "Please select...",
  searchPlaceholder = "Search...",
  disabled = false,
  loading = false,
  allowClear = true,
  showSearch = true,
  showReload = false,
  showAddButton = true,
  addButtonText = "Add New",
  addDialogTitle = "Add New Item",
  addDialogWidth = 500,
  addContent,
  maxHeight = 200,
  width = "100%",
  className = "",
  notFoundContent,
  canAdd = true,
  onSelect,
  onSearch,
  onReload,
  onAdd,
}) => {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [addSubmitting, setAddSubmitting] = useState(false);

  const comboboxRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<InputRef>(null);

  // Filter options based on search
  const filteredOptions = options.filter(
    (option) =>
      option.label.toLowerCase().includes(searchValue.toLowerCase()) ||
      option.value.toLowerCase().includes(searchValue.toLowerCase())
  );

  // Get selected option
  const selectedOption = options.find((option) => option.value === value);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        comboboxRef.current &&
        !comboboxRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
        setSearchValue("");
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const handleToggleOpen = () => {
    if (disabled) return;
    setOpen(!open);
    setSearchValue("");

    if (!open && showSearch && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleSelect = (option: ComboboxWithAddOption) => {
    if (option.disabled) return;
    onSelect?.(option.value, option);
    setOpen(false);
    setSearchValue("");
  };

  const handleSearch = (searchText: string) => {
    setSearchValue(searchText);
    onSearch?.(searchText);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect?.("", {} as ComboboxWithAddOption);
  };

  const handleReload = (e: React.MouseEvent) => {
    e.stopPropagation();
    onReload?.();
  };

  const handleAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setAddDialogOpen(true);
  };

  const handleAddSubmit = async () => {
    if (!onAdd) return;

    try {
      setAddSubmitting(true);
      await onAdd();
      setAddDialogOpen(false);
      // Reload the combobox options
      onReload?.();
    } catch (error) {
      console.error("Error adding new item:", error);
    } finally {
      setAddSubmitting(false);
    }
  };

  const handleAddCancel = () => {
    setAddDialogOpen(false);
  };

  return (
    <>
      <div
        className={`cg-combobox-with-add ${className} ${
          disabled ? "disabled" : ""
        } ${open ? "open" : ""}`}
        ref={comboboxRef}
        style={{ width }}
      >
        {/* Trigger */}
        <div
          className="cg-combobox-with-add-trigger"
          onClick={handleToggleOpen}
        >
          <span className="cg-combobox-with-add-value">
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <div className="cg-combobox-with-add-actions">
            {showReload && (
              <Button
                type="text"
                size="small"
                icon={<ReloadOutlined />}
                onClick={handleReload}
                className="cg-combobox-with-add-action-btn"
                loading={loading}
              />
            )}

            {allowClear && selectedOption && (
              <Button
                type="text"
                size="small"
                onClick={handleClear}
                className="cg-combobox-with-add-clear-btn"
              >
                ×
              </Button>
            )}

            <DownOutlined
              className={`cg-combobox-with-add-arrow ${open ? "open" : ""}`}
            />
          </div>
        </div>

        {/* Dropdown */}
        {open && (
          <div className="cg-combobox-with-add-dropdown">
            {showSearch && (
              <div className="cg-combobox-with-add-search">
                <Input
                  ref={inputRef}
                  placeholder={searchPlaceholder}
                  value={searchValue}
                  onChange={(e) => handleSearch(e.target.value)}
                  prefix={<SearchOutlined />}
                  size="small"
                />
              </div>
            )}

            <div className="cg-combobox-with-add-options" style={{ maxHeight }}>
              {loading ? (
                <div className="cg-combobox-with-add-loading">
                  <Spin size="small" />
                  <span>Loading...</span>
                </div>
              ) : filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <div
                    key={option.value}
                    className={`cg-combobox-with-add-option ${
                      option.value === value ? "selected" : ""
                    } ${option.disabled ? "disabled" : ""}`}
                    onClick={() => handleSelect(option)}
                  >
                    <span className="cg-combobox-with-add-option-label">
                      {option.label}
                    </span>
                    {option.value === value && (
                      <CheckOutlined className="cg-combobox-with-add-option-check" />
                    )}
                  </div>
                ))
              ) : (
                <div className="cg-combobox-with-add-empty">
                  {notFoundContent || (
                    <Empty
                      image={Empty.PRESENTED_IMAGE_SIMPLE}
                      description="No data"
                    />
                  )}
                </div>
              )}
            </div>

            {/* Add Button */}
            {showAddButton && canAdd && (
              <div className="cg-combobox-with-add-footer">
                <Button
                  type="dashed"
                  icon={<PlusOutlined />}
                  onClick={handleAddClick}
                  className="cg-combobox-with-add-btn"
                  block
                >
                  {addButtonText}
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Add Dialog */}
      <CGDialog
        open={addDialogOpen}
        onClose={handleAddCancel}
        title={addDialogTitle}
        width={addDialogWidth}
        footer={
          <div className="cg-combobox-with-add-dialog-footer">
            <Button onClick={handleAddCancel} className="cancel-button">
              Cancel
            </Button>
            <Button
              type="primary"
              onClick={handleAddSubmit}
              loading={addSubmitting}
              className="save-button"
            >
              Add
            </Button>
          </div>
        }
      >
        {addContent}
      </CGDialog>
    </>
  );
};

export default CGComboboxWithAdd;
