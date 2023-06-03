import React, { createContext, useContext, useState } from 'react';

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState("testuser");
  const [newMessage, setNewMessage] = useState({});
  const [chatHistory, setChatHistory] = useState([]);

  //Example usage for chat route in js on the clientside:
  async function sendMessageToServer() {
    try {
      const response = await fetch('https://api.testapp365.com/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // "mode": "no-cors",
        },
        body: JSON.stringify({
          username: currentUser,
          conversation_history: chatHistory,
        }),
      });

      const data = await response.json();
      console.log(data);
      setChatHistory([...chatHistory, data])
    } catch (error) {
      console.error('Error:', error);
    }
  }



  return (
    <DataContext.Provider value={{ currentUser, setCurrentUser, newMessage, setNewMessage, sendMessageToServer, chatHistory, setChatHistory }}>
      {children}
    </DataContext.Provider>
  );
};

const useData = () => useContext(DataContext);

export { DataProvider, useData };
