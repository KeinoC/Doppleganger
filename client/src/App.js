import React from 'react';
import { DataProvider } from './DataProvider/DataContext';
import Home from "./Home/HomePage"
import Nav from "./Home/Nav"
import ChatWindow from './Doppelganger/ChatWindow';


function App() {
  
  // fetch('https://161.35.104.50/helloworld')
  // .then(response => JSON())
  // .then(data => {
  //   console.log(data); // Output the response body
  // })
  // .catch(error => {
  //   console.log('Error:', error);
  // });

  return (
    <DataProvider>
    <div className="App">
        <Nav />
        <Home />
        <ChatWindow />
    </div>
    </DataProvider>
  );
}

export default App;