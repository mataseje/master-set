import { createBrowserRouter } from 'react-router-dom'
import { Navigate } from 'react-router-dom'

// Pages
import Authentication from './pages/Authentication/Authentication'
import BrowseCards from './pages/BrowseCards/BrowseCardsPage' 
import BrowseSets from './pages/BrowseSets/BrowseSetsPage'
import BrowseTcgs from './pages/BrowseTcgs/BrowseTcgsPage'
import CardPage from './pages/CardSummary/CardPage'
import DashboardPage from './pages/Dashboard/DashboardPage'
import HomePage from './pages/Home/HomePage'
import PasswordReset from './pages/PasswordReset/PasswordReset'
import Registration from './pages/Registration/Registration'
import RootLayout from './layouts/Root'
import SearchPage from './pages/SearchPage/SearchPage'

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
          element: <Navigate to="/browse/tcgs" />
        },
        {
          // Show all TCGs
          path: 'browse/tcgs', 
          element: <BrowseTcgs />
        },
        {
          // Show all Sets within a TCG
          path: 'browse/sets/:tcg_slug', 
          element: <BrowseSets />
        },
        {
          // Show all Cards within a Set
          path: 'browse/cards/:set_slug', 
          element: <BrowseCards />
        },
        {
          // Show specific card
          path: 'card/:card_id',
          element: <CardPage />
        },
        {
          path: 'search', 
          element: <SearchPage />
        },
        {
          path: 'account', 
          element: <Navigate to="/account/login" />
        },
        {
          path: 'account/login', 
          element: <Authentication />
        },
        {
          path: 'account/register', 
          element: <Registration />
        },
        {
          path: '/reset-password', 
          element: <PasswordReset />
        }
      ]
    }
]);