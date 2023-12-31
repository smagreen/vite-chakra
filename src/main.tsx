import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
  BrowserRouter
} from "react-router-dom";

import Root from './routes/Root';
import ErrorPage from './error-page';

import { ChakraProvider } from '@chakra-ui/react'


// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Root />,
//     errorElement: <ErrorPage />,
//   },
// ]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider>
      {/* <RouterProvider router={router} /> */}
      <BrowserRouter>
        <Root/>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>,
)
