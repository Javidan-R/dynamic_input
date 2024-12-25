import React from "react";
import DynamicInput from "./components/DynamicInput/DynamicInput";
import { DropdownItem } from "./types/dropdown";

const response: DropdownItem<{}>[] = [
  { id: 1, name: "US Dollar", short: "USD", icon: "$" },
  { id: 2, name: "Euro", short: "EUR", icon: "€" },
  { id: 3, name: "Azerbaijan Manat", short: "AZN", icon: "₼" },
  { id: 4, name: "Turkish Lira", short: "TRY", icon: "₺" },
];

const App: React.FC = () => {
  const getDisplayText = (item: DropdownItem<{}>) =>
    `${item.icon} ${item.short}`;

  return (
    <div style={{ padding: "20px" }}>
      <DynamicInput data={response} getDisplayText={getDisplayText} />
    </div>
  );
};

export default App;
