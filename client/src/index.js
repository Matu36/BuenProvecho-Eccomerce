import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import {store} from "../src/Redux/store/index";
import { Provider } from "react-redux";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <ColorModeScript initialColorMode="light" />
  <ChakraProvider>
  <Provider store={store}>
    <BrowserRouter>
  <App />
  </BrowserRouter>
  </Provider>
  </ChakraProvider>
</React.StrictMode>
);



