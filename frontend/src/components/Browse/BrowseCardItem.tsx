import { Link } from "react-router-dom"

  type CardDetails = {
    id: number,
    card_name: string;
    card_number: string;
    set_name: string;
    image: string;
  }


function BrowseCardItem({id, card_name, card_number, set_name, image}: CardDetails) {
  return (
    <>
      {/* Card Parent Div */}
      <div id="card-parent" 
           className="row border border-secondary-subtle rounded-5">

        {/* Left Side (Image) */}
        <div id="card-left-img" className="col-6">
          <Link to={`/card/${id}`}>
            <div className="align-center overflow-hidden mt-2 mb-2 ms-1 rounded-4"
                  style={{height:"200px", 
                          width:"200px",
                        }}
                  >
              <img id="img-cover" 
                src={`../../assets/${image}`} 
                  className="rounded-4" 
                  style={{maxHeight:"100%", 
                          maxWidth:"100%",
                          objectFit:"contain",
                        }}
                  loading="lazy"/>
            </div>
          </Link>
        </div>

        {/* Right Side (Details) */}
        <div id="card-right-text" className="col-6">
          <div className="card-body ms-3 mt-2">
              <h5 className="card-title">
                  {card_name}
              </h5><br />
              <p className="card-text">
                <strong>Card Number:</strong><br/>
                {card_number}
              </p>
              <p className="card-text">
                {/* <small className="text-muted"> */}
                  <strong>Set Name:</strong><br/>
                  {set_name}
                {/* </small> */}
              </p>
          </div>
        </div>

      </div>
    </>
  )
}

export default BrowseCardItem