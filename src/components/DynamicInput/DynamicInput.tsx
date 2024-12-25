import React, { useRef, useCallback, useState } from "react";
import useDropdown from "../../hooks/useDropdown";
import styles from "./DynamicInput.module.css";
import { Props } from "../../types/dropdown";

function DynamicInput<T extends object>({
  data,
  getDisplayText,
  placeholder = "Currency",
}: Props<T>) {
  const inputWrapperRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const labelRef = useRef<HTMLLabelElement>(null);
  const {
    inputValue,
    setInputValue,
    isFocused,
    setIsFocused,
    selectedItem,
    setSelectedItem,
    previouslySelectedItems,
    handleInputChange,
    handleItemClick,
    filteredData,
  } = useDropdown<T>(data);

  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);

  const handleFocus = useCallback(() => {
    if (labelRef.current && inputWrapperRef.current) {
      labelRef.current.style.color = "#007bff";
      inputWrapperRef.current.style.border = "2px solid #afaaaa";
    }

    setIsFocused(true);
  }, []);

  const handleClick = useCallback(() => {
    if (labelRef.current) {
      labelRef.current.style.color = "#007bff";
    }

    if (selectedItem) {
      setInputValue(getDisplayText(selectedItem));
    }
    setIsFocused(true);
  }, [selectedItem, getDisplayText]);

  const handleBlur = useCallback(() => {
    setTimeout(() => {
      if (labelRef.current && inputWrapperRef.current) {
        if (selectedItem) {
          labelRef.current.style.color = "#afaaaa";
          inputWrapperRef.current.style.border = "2px solid #afaaaa";
        } else {
          labelRef.current.style.color = "#afaaaa";
          inputWrapperRef.current.style.border = "1px solid #afaaaa";
        }
      }

      setIsFocused(false);
    }, 100);
  }, [selectedItem]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace" || e.key === "Delete") {
        setInputValue("");
        setSelectedItem(null);
        if (labelRef.current) {
          labelRef.current.style.color = "#555";
        }
      } else if (
        e.key === "Enter" &&
        filteredData.length > 0 &&
        highlightedIndex >= 0
      ) {
        const selectedFromList = filteredData[highlightedIndex];
        setSelectedItem(selectedFromList);
        setInputValue(getDisplayText(selectedFromList));
        setIsFocused(false);
      } else if (e.key === "ArrowDown") {
        if (highlightedIndex < filteredData.length - 1) {
          setHighlightedIndex(highlightedIndex + 1);
        }
      } else if (e.key === "ArrowUp") {
        if (highlightedIndex > 0) {
          setHighlightedIndex(highlightedIndex - 1);
        }
      }
    },
    [filteredData, highlightedIndex, getDisplayText]
  );

  return (
    <div className={styles.container}>
      <div className={styles.inputWrapper} ref={inputWrapperRef}>
        <label
          ref={labelRef}
          className={`${styles.label} ${
            isFocused
              ? styles.labelFocused
              : selectedItem
              ? styles.labelSelected
              : ""
          }`}
        >
          {placeholder}
        </label>

        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          className={styles.input}
          placeholder=""
        />
      </div>

      {/* Dropdown */}
      {isFocused && filteredData.length > 0 && (
        <ul className={styles.dropdown}>
          {filteredData.map((item, index) => (
            <li
              key={item.id}
              className={`${styles.dropdownItem} ${
                highlightedIndex === index
                  ? styles.highlighted
                  : selectedItem && selectedItem.id === item.id
                  ? styles.selected
                  : previouslySelectedItems.some(
                      (prevItem) => prevItem.id === item.id
                    )
                  ? styles.previouslySelected
                  : ""
              }`}
              onClick={() => handleItemClick(item)}
            >
              <span className={styles.name}>{item.name}</span>
              <span className={styles.icon}>{item.icon}</span>
              <span className={styles.short}>{item.short}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DynamicInput;
