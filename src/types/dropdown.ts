export type DropdownItem<T> = {
  id: string | number;
  name: string;
  short: string;
  icon: string;
} & T;

export type Props<T extends object> = {
  data: DropdownItem<T>[];
  getDisplayText: (item: DropdownItem<T>) => string;
  placeholder?: string;
};
