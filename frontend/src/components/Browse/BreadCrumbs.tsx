import { Link } from 'react-router-dom'

function BreadCrumbs() {
  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/browse">Browse</Link></li>
          <li className="breadcrumb-item"><Link to="#">Sets</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Base Set</li>
        </ol>
      </nav>
    </>
  )
}

export default BreadCrumbs