import React, { createContext, useContext, useState } from 'react';

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [newMessage, setNewMessage] = useState({});

  return (
    <DataContext.Provider value={{ currentUser, setCurrentUser, newMessage, setNewMessage }}>
      {children}
    </DataContext.Provider>
  );
};

const useData = () => useContext(DataContext);

export { DataProvider, useData };
