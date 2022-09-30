import { useState } from "react";
import DatePicker from "./components/DatePicker";

import "./styles/global.scss";

const App = () => {
  const colorScheme = "#1461FC";
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="root">
      <button
        style={{
          background: colorScheme,
        }}
        className="btn"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Open calendar
      </button>
      <DatePicker
        isOpen={isOpen}
        colorScheme={colorScheme}
        dateDisplayFormat="DD - MM, dd"
        maxDate={new Date(2088, 0, 10)}
        minDate={new Date(1900, 10, 10)}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
};

export default App;
