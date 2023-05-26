import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './index.css';
import NotFound from './pages/NotFound.jsx';
import Packages from './pages/Packages.jsx';
import Scanned from './pages/Scanned.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

const router = createBrowserRouter([
  {path: '/', element: <Packages />},
  {path:'/scanned', element: <Scanned />},
  {path: '*', element: <NotFound />}
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router = {router} />
)