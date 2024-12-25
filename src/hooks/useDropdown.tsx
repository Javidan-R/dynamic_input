import { useState, useCallback, useMemo } from "react";
import { DropdownItem } from "../types/dropdown";

function useDropdown<T extends object>(
  initialData: DropdownItem<T>[]
): {
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  isFocused: boolean;
  setIsFocused: React.Dispatch<React.SetStateAction<boolean>>;
  selectedItem: DropdownItem<T> | null;
  setSelectedItem: React.Dispatch<React.SetStateAction<DropdownItem<T> | null>>;
  previouslySelectedItems: DropdownItem<T>[];
  setPreviouslySelectedItems: React.Dispatch<
    React.SetStateAction<DropdownItem<T>[]>
  >;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleItemClick: (item: DropdownItem<T>) => void;
  filteredData: DropdownItem<T>[];
} {
  const [inputValue, setInputValue] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<DropdownItem<T> | null>(
    null
  );
  const [previouslySelectedItems, setPreviouslySelectedItems] = useState<
    DropdownItem<T>[]
  >([]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
      setSelectedItem(null);
    },
    []
  );

  const handleItemClick = useCallback((item: DropdownItem<T>) => {
    setInputValue(`${item.icon} ${item.short}`);
    setSelectedItem(item);
    setPreviouslySelectedItems((prevItems) => [...prevItems, item]);
    setIsFocused(false);
  }, []);

  const filteredData = useMemo(() => {
    if (selectedItem) return [selectedItem];
    if (inputValue === "") return initialData;

    const lowerCaseInput = inputValue.toLowerCase();
    return initialData.filter((item) =>
      item.short.toLowerCase().includes(lowerCaseInput)
    );
  }, [initialData, inputValue, selectedItem]);

  return {
    inputValue,
    setInputValue,
    isFocused,
    setIsFocused,
    selectedItem,
    setSelectedItem,
    previouslySelectedItems,
    setPreviouslySelectedItems,
    handleInputChange,
    handleItemClick,
    filteredData,
  };
}

export default useDropdown;
