import React from 'react';

// Components
import Card from '../../components/Dashboard/Card/dashboard_card';
import Table from '../../components/Dashboard/Table/dashboard_table';

import alakazam from '../../assets/alakazam.jpg'

function DashboardPage() {
  return (
    <>
      <h1>Dashboard</h1>
      <div className='container'>

        {/* Display Cards in Carousel */}
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

        {/* Display Portfolio Financial Summary */}
        <div className='row mt-5'>
          <h2>Value Summary</h2>
          <p>INSERT GRAPH HERE</p>
        </div>

        {/* Display Table of All Cards (Paginated) */}
        <div className='row mt-5'>
          <h2>Portfolio</h2>
          <div>
            <button className='btn btn-primary'> Add Item</button>
            <button className='btn btn-secondary ms-1'>Edit</button>
          </div>
          <Table
            data='data'
          />
        </div>
      </div>
    </>
  )
}

export default DashboardPage