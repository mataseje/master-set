import React from 'react'

type PortfolioData = {
  data: string
}

function dashboard_table({data}: PortfolioData) {

  const item_name = 'Alakazam';
  const description = 'Base Set - Unlimited';
  const condition = 'LP-NM';
  const quantity = 1;
  const avg_cost = 55;
  const mkt_price = 85;
  const total_pl_amount = mkt_price - avg_cost;
  const total_pl_percent = total_pl_amount / avg_cost;

  return (
  <>
    <table className="table table-striped table-hover">
      <thead>
        <tr >
          <th scope='col'>Item Name</th>
          <th scope='col'>Description</th>
          <th scope='col'>Condition</th>
          <th scope='col'>Quantity</th>
          <th scope='col'>Avg Cost ($)</th>
          <th scope='col'>Market Price</th>
          <th scope='col'>Profit/Loss($)</th>
          <th scope='col'>Profit/Loss(%)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{item_name}</td>
          <td>{description}</td>
          <td>{condition}</td>
          <td>{quantity}</td>
          <td>{avg_cost}</td>
          <td>{mkt_price}</td>
          <td>{total_pl_amount}</td>
          <td>{total_pl_percent}</td>
        </tr>
      </tbody>
    </table> 
  </>
  )
}

export default dashboard_table