import React, { useState, useRef, useEffect } from "react";
import { Button, Input, Spin, Empty } from "antd";
import type { InputRef } from "antd";
import {
  SearchOutlined,
  DownOutlined,
  CheckOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import "./CGCombobox.scss";

export interface ComboboxOption<T = any> {
  value: string;
  label: string;
  disabled?: boolean;
  item?: T;
}

export interface CGComboboxProps<T = any> {
  options: ComboboxOption[];
  value?: string;
  placeholder?: string;
  searchPlaceholder?: string;
  disabled?: boolean;
  loading?: boolean;
  allowClear?: boolean;
  showSearch?: boolean;
  showReload?: boolean;
  notFoundContent?: React.ReactNode;
  maxHeight?: number;
  width?: number | string;
  className?: string;
  onSelect?: (value: string, option: ComboboxOption<T>) => void;
  onSearch?: (value: string) => void;
  onReload?: () => void;
  onDropdownVisibleChange?: (open: boolean) => void;
}

const CGCombobox = <T,>({
  options = [],
  value,
  placeholder = "Select an option...",
  searchPlaceholder = "Search...",
  disabled = false,
  loading = false,
  allowClear = true,
  showSearch = true,
  showReload = false,
  notFoundContent,
  maxHeight = 200,
  width = "100%",
  className = "",
  onSelect,
  onSearch,
  onReload,
  onDropdownVisibleChange,
}: CGComboboxProps<T>) => {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
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
  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        comboboxRef.current &&
        !comboboxRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
        onDropdownVisibleChange?.(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onDropdownVisibleChange]);

  const handleToggleOpen = () => {
    if (disabled) return;
    const newOpen = !open;
    setOpen(newOpen);
    onDropdownVisibleChange?.(newOpen);
    if (newOpen && showSearch && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleSearch = (searchText: string) => {
    setSearchValue(searchText);
    onSearch?.(searchText);
  };

  const handleSelect = (option: ComboboxOption<T>) => {
    if (option.disabled) return;
    onSelect?.(option.value, option);
    setOpen(false);
    setSearchValue("");
    onDropdownVisibleChange?.(false);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect?.("", { value: "", label: "" });
    setSearchValue("");
  };
  const handleReload = (e: React.MouseEvent) => {
    e.stopPropagation();
    onReload?.();
  };

  return (
    <div
      className={`cg-combobox ${className} ${disabled ? "disabled" : ""} ${
        open ? "open" : ""
      }`}
      ref={comboboxRef}
      style={{ width }}
    >
      {/* Trigger */}
      <div className="cg-combobox-trigger" onClick={handleToggleOpen}>
        <span className="cg-combobox-value">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <div className="cg-combobox-actions">
          {showReload && (
            <Button
              type="text"
              size="small"
              icon={<ReloadOutlined />}
              onClick={handleReload}
              className="cg-combobox-action-btn"
              loading={loading}
            />
          )}

          {allowClear && selectedOption && (
            <Button
              type="text"
              size="small"
              onClick={handleClear}
              className="cg-combobox-clear-btn"
            >
              ×
            </Button>
          )}

          <DownOutlined className={`cg-combobox-arrow ${open ? "open" : ""}`} />
        </div>
      </div>

      {/* Dropdown */}
      {open && (
        <div className="cg-combobox-dropdown">
          {showSearch && (
            <div className="cg-combobox-search">
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

          <div className="cg-combobox-options" style={{ maxHeight }}>
            {loading ? (
              <div className="cg-combobox-loading">
                <Spin size="small" />
                <span>Loading...</span>
              </div>
            ) : filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <div
                  key={option.value}
                  className={`cg-combobox-option ${
                    option.value === value ? "selected" : ""
                  } ${option.disabled ? "disabled" : ""}`}
                  onClick={() => handleSelect(option)}
                >
                  <span className="cg-combobox-option-label">
                    {option.label}
                  </span>
                  {option.value === value && (
                    <CheckOutlined className="cg-combobox-option-check" />
                  )}
                </div>
              ))
            ) : (
              <div className="cg-combobox-empty">
                {notFoundContent || (
                  <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description="No data"
                  />
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CGCombobox;
