import { Link } from "react-router-dom"

  type CardDetails = {
    name: string;
    card_number: string;
    set: string;
    image: string;
  }

function browse_item({name, card_number, set, image}: CardDetails) {

  return (
    <>
      {/* Card Parent Div */}
      <div id="card-summary" className="row border border-secondary-subtle">

        {/* Image Path */}
        <div className="col" id="card-image-parent-col">
          <Link to={`/card/${name.toLowerCase()}`}>
            <img id="img-cover" 
                src={`../assets/${image}`} 
                className="mw-100 rounded-3" 
                style={{maxHeight:"350px", maxWidth:"260px"}}
                loading="lazy"/>
          </Link>
        </div>

        {/* Item Details */}
        <div className="col" id="card-text-parent-col">
          <div className="card-body ms-3 mt-2">
              <h5 className="card-title">
                  {name}
              </h5><br />
              <p className="card-text">
                <strong>Card Number:</strong><br/>
                {card_number}
              </p>
              <p className="card-text">
                <small className="text-muted">
                  <strong>Set Name:</strong><br/>
                  {set}
                </small>
              </p>
          </div>
        </div>

      </div>
    </>
  )
}

export default browse_item