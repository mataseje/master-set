import "./HomePage.css"

function HomePage() {
  return (
    <>
      <div className="container py-5">

        {/* Hero Section */}
        <div className="text-center mb-5">
          <h1 className="fw-bold">Explore, Collect, and Track Your TCG Collection</h1>
          <ol className="list-unstyled mt-3">
            <li className="text-muted fs-5">
              Explore and find new cards for your collection.
            </li>
            <li className="text-muted fs-5">
              Create wishlists for cards you own, and cards you are looking for.
            </li>
            <li className="text-muted fs-5">
              Track the value of your collection.
              </li>

          </ol>
        </div>


        {/* Two-Option Section */}
        <div className="row g-4">
          
          {/* Search Option */}
          <div className="col-md-6">
            <div className="card shadow-sm h-100">
              <div className="card-body text-center">
                <h4 className="card-title mb-3">Search for an Item</h4>
                <p className="text-muted">
                  Know what you're looking for? Jump right in and begin searching.
                </p>
                <button className="btn btn-outline-primary mt-3">
                  Start Searching
                </button>
              </div>
            </div>
          </div>

          {/* Browse Categories Option */}
          <div className="col-md-6">
            <div className="card shadow-sm h-100">
              <div className="card-body text-center">
                <h4 className="card-title mb-3">Browse Categories</h4>
                <p className="text-muted">
                  Prefer to explore? Browse through curated categories to discover items.
                </p>
                <button className="btn btn-outline-secondary mt-3">
                  Browse Categories
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Releases */}
        <div className="row py-5">
          <h3>Recent Releases</h3>
          {/* Carousel Showing Latest Sets */}
          <div id="carouselExample" className="carousel slide py-5 border">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src="../../assets/common_imgs/broken_file.jpg" 
                    className=""
                    alt="..."/>
              </div>
              <div className="carousel-item">
                <img src="../../assets/common_imgs/broken_file.jpg" 
                    className=""
                    alt="..."/>
              </div>
              <div className="carousel-item">
                <img src="../../assets/common_imgs/broken_file.jpg" 
                    className=""
                    alt="..."/>
              </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>

      </div>
    </>
  )
}

export default HomePage