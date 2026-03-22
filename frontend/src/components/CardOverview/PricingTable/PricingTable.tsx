import React from 'react'

function PricingTable() {

  return (
    <>
      <div>Price History</div>
      <table className="table table-striped table-hover">
        {/* Table Header */}
        <thead>
          <tr >
            <th scope='col'>Item Name</th>
            <th scope='col'>Description</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          <tr>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table> 
    </>
  )
}

export default PricingTable