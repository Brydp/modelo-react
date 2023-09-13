import React from 'react';
import ReactDOM from 'react-dom/client';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import App from "./App"
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './Login';
import Cadastro from './Cadastro';
import Filmes from './Filmes';
import EditaFilme from './components/EditaFilme';

const theme = createTheme({
  palette: {
      mode: 'light',
      primary: {
        main: '#611d98',
      },
      secondary: {
        main: '#501496',
      },
      warning: {
        main: '#523b29',
      },
      text: {
        primary: 'rgba(143,61,239,0.87)',
        secondary: 'rgba(126,0,255,0.6)',
        disabled: 'rgba(130,66,191,0.38)',
        hint: '#633c92',
      },
      divider: 'rgba(96,49,160,0.92)',
    },

});
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/cadastro",
    element: <Cadastro />
  },
  {
    path: "/filmes",
    element: <Filmes />
  },
  {
    path: "/edicao/:id",
    element: <EditaFilme />
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={theme}>
  <RouterProvider router={router} />
  </ThemeProvider>
);