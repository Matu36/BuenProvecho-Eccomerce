import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <ColorModeScript initialColorMode="light" />
  <ChakraProvider>
    <BrowserRouter>
  <App />
  </BrowserRouter>
  </ChakraProvider>
</React.StrictMode>
);



