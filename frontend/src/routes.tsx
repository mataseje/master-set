import { createBrowserRouter } from 'react-router-dom'

// Pages
import BrowsePage from './pages/Browse/BrowsePage'
import CardPage from './pages/Card/CardPage'
import DashboardPage from './pages/Dashboard/DashboardPage'
import HomePage from './pages/Home/HomePage'
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
        {
          path: 'card/:card_id',
          element: <CardPage />
        }
      ]
    }
]);