import React, { useState, createContext, useContext } from "react";

// Context to share active tab value and setter
const TabsContext = createContext();

export const Tabs = ({ defaultValue, children }) => {
  const [active, setActive] = useState(defaultValue);
  return (
    <TabsContext.Provider value={{ active, setActive }}>
      <div>{children}</div>
    </TabsContext.Provider>
  );
};

// Container for the tab triggers (buttons)
export const TabsList = ({ children, className = "" }) => {
  return <div className={`flex gap-2 mb-4 ${className}`}>{children}</div>;
};

// Single tab button (trigger)
export const TabsTrigger = ({ value, children }) => {
  const { active, setActive } = useContext(TabsContext);
  const isActive = active === value;

  return (
    <button
      onClick={() => setActive(value)}
      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
        isActive
          ? "bg-blue-600 text-white"
          : "bg-gray-200 text-gray-800 hover:bg-gray-300"
      }`}
    >
      {children}
    </button>
  );
};

// The content that shows only when its tab is active
export const TabsContent = ({ value, children }) => {
  const { active } = useContext(TabsContext);
  return active === value ? <div>{children}</div> : null;
};
