import { Link } from "react-router-dom"

  type TcgDetails = {
    id: number,
    tcg_name: string,
    tcg_slug: string,
    tcg_image: string;
  }

function BrowseTcgItem({tcg_name, tcg_slug, tcg_image}: TcgDetails) {

  return (
    <>
      {/* Card Parent Div */}
      <Link to={`/browse/sets/${tcg_slug}`}>
        <div id="card-parent" 
             className="row border border-secondary-subtle rounded-4">

          {/* Left Side (Image) */}
          <div id="card-left-img" className="col">
            <div className="d-flex justify-content-center align-center overflow-hidden mt-2 mb-2 ms-2 rounded-4"
                  style={{height:"200px", 
                          width:"200px",
                          background: "#fff",
                        }}
                  >
              <img id="img-cover" 
                  src={tcg_image} 
                  className="rounded-4" 
                  style={{maxHeight:"100%", 
                          maxWidth:"100%",
                          objectFit:"contain",
                        }}
                  loading="lazy"/>
            </div>
          </div>

          {/* Right Side (Details) */}
          <div id="card-right-text" className="col">
            <div className="card-body ms-3 mt-2">
                <h5 className="card-title mt-5">
                  {tcg_name}
                </h5><br />
                <p className="card-text">
                  <small className="text-muted">
                    <strong>Release Date:</strong><br/>
                  </small>
                </p>
            </div>
          </div>

        </div>
      </Link>
    </>
  )
}

export default BrowseTcgItem