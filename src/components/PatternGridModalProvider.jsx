import React, { createContext, useContext, useState } from 'react';

const PatternGridModalContext = createContext();

export const usePatternGridModal = () => useContext(PatternGridModalContext);

const PatternGridModalProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  return (
    <PatternGridModalContext.Provider value={{ open, setOpen }}>
      {children}
    </PatternGridModalContext.Provider>
  );
};

export default PatternGridModalProvider; 