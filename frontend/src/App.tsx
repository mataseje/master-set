import { useState } from 'react'
import Card from './components/Dashboard/Card/dashboard_card'
import Table from './components/Dashboard/Table/dashboard_table'
import Navbar from './components/Navbar/navbar'
import alakazam from './assets/alakazam.jpg'
import './App.css'

function App() {

  return (
    <>
      <Navbar/>
      <h1>Dashboard</h1>
      <div className='container'>

        <div className='row'>
          <h2>My Cards</h2>
          <div className='col-md-6'>
            <Card
              image={alakazam}
              title='Alakazam'
              description='Base Set Unlimited (Holo)'
            />
          </div>
        </div>

        <div className='row mt-5'>
          <h2>Value Summary</h2>
          <p>INSERT GRAPH HERE</p>
        </div>

        <div className='row mt-5'>
          <h2>Portfolio</h2>
          <Table
            results='data'
          />
        </div>


      </div>

    </>
  )
}

export default App
