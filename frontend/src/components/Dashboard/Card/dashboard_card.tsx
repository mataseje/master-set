import React from 'react';
import { Link } from 'react-router-dom';

type CardProps = {
  image: string,
  title: string,
  description: string
}
function dashboard_card({image, title, description}: CardProps) {
  return (
    <>
      <div className="card" id="dashboard-card" style={{width: "18rem"}}>
        <img src={image} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
        </div>
        <div className="card-body">
          <Link to="/">Price History</Link>
        </div>
      </div>
    </>


  )
}

export default dashboard_card