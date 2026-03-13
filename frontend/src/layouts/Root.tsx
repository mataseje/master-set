import Navbar from '../components/Navbar/navbar'
import { Outlet } from 'react-router-dom'

function RootLayout() {
  return (
    <>
      <Navbar /> 
      <Outlet />
    </>
  )
}

export default RootLayout