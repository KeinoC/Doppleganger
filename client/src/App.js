import React from 'react';
import { DataProvider } from './DataProvider/DataContext';
import Home from "./Home/HomePage"
import Nav from "./Home/Nav"
import ChatWindow from './Doppelganger/ChatWindow';
import './index.css'
import ChatComponent from './Doppelganger/ChatComponent';
import About from './Home/About';
<<<<<<< HEAD
import Demo from './Home/Demo';
=======
>>>>>>> 436e2da7f65594cbc3cf087b17261ecbdf977b22


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
        <About />
<<<<<<< HEAD
        <Demo/>
=======
>>>>>>> 436e2da7f65594cbc3cf087b17261ecbdf977b22
        <ChatComponent />
    </div>
    </DataProvider>
  );
}

export default App;
