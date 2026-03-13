import { createBrowserRouter } from 'react-router-dom'

// Pages
import BrowsePage from './pages/Browse/BrowsePage.js'
import DashboardPage from './pages/Dashboard/DashboardPage.js'
import HomePage from './pages/Home/HomePage.js'
import RootLayout from './layouts/Root'

export const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      id: 'root',
      // errorElement: <ErrorPage />,
      // loader: tokenLoader,
      children: [
        {
          path: '', 
          element: <HomePage />
        },
        {
          path: 'home', 
          element: <HomePage />
        },
        {
          path: 'dashboard', 
          element: <DashboardPage />
        },
        {
          path: 'browse', 
          element: <BrowsePage />
        },
      ]
    }
]);