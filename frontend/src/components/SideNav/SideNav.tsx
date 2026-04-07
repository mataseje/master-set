import React, { useEffect, useState } from "react";
import { getRequest } from "../../utils/fetch" 

type SearchProps = {
  selectedTcg: string | null;
  setSelectedTcg: (tcg: Tcg) => void;
}

type Tcg = {
  tcg_id: number;
  tcg_name: string;
  tcg_description: string;
}

const Sidebar = ({selectedTcg, setSelectedTcg}: SearchProps) => {

  const [availableTcgs, setAvailableTcgs] = useState<Tcg[]>([]);

  // Retrieve tcg info
  const retrieveTcgs = async () => {
    try {
      const response = await getRequest(`http://localhost:3000/search/tcgs`, null);
      if (response.ok) {
        const jsonResponse = await response.json();
        setAvailableTcgs(jsonResponse);
      } else {
        console.error('response NOT OK: ', response);
      }
    } catch (e) {
      console.error('Error: ', e)
    }
  }


  useEffect(() => {
    retrieveTcgs();
  }, [])

  return (
    <div
      className="p-3 bg-light-subtle rounded-4 col-md-1 me-4 ms-5"
      style={{ height: "100vh"}}
    >
      <h3 className="text-center">Filters</h3><hr />
      
      {/* TCG Selection (Dropdown) */}
      <div id="dropdown-parent">
        <label className="form-label text-start fw-bold" 
          htmlFor="tcg-select"
        >
          TCG
        </label>
        <div id="tcg-select" className="dropdown">
          <button type="button"
            className="btn btn-secondary dropdown-toggle w-100" 
            data-bs-toggle="dropdown" 
            aria-expanded="false"
          >
            {/* Dropdown Display Text */}
            {selectedTcg ? selectedTcg : "Select"}
          </button>
          <ul className="dropdown-menu w-100 text-center">
            {availableTcgs ? availableTcgs.map(tcg => (
              <li className="dropdown-item" 
                key={tcg.tcg_id}
                role="button"
                onClick={() => setSelectedTcg(tcg)}
              >
                {tcg.tcg_name}
              </li>
            )) : (
              <li></li>
            )}
          </ul>
        </div>
      </div>

    </div>
  );
};

export default Sidebar;
