import React, { useEffect, useState } from "react";

import { toSentenceCase } from "../../utils/common";
import { getRequest } from "../../utils/fetch" 
import BrowseCardItem from "../../components/Browse/BrowseCardItem";
import Sidebar from "../../components/SideNav/SideNav";

type Card = {
  card_id: number;
  card_image: string;
  card_name: string;
  card_number: string;
  set_name: string;
}

type Tcg = {
  tcg_id: number;
  tcg_name: string;
  tcg_description: string;
}

function SearchPage() {

  const [selectedTcg, setSelectedTcg] = useState<Tcg | null>(null);
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<Card[]>([]);

  // Retrieve all cards from requested set
  const handleSearch = async (query: string) => {
    try {
      let search_query = '';

      // Assign user typed input to search query
      const base_query = `search=${query}`;
      search_query += base_query

      // Append tcg if relevant
      if (selectedTcg) {
        search_query += `&tcg=${selectedTcg.tcg_id}`
      }

      const response = await getRequest(`http://localhost:3000/search?${search_query}`, null);
      if (response.ok) {
        const jsonResponse = await response.json();
        setResults(jsonResponse);
      } else {
        console.error('response NOT OK: ', response);
      }
    } catch (e) {
      console.error('Error: ', e)
    }
  }

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    handleSearch(query);
  }

  // Search database as user types in search bar
  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    handleSearch(value);
  }

  // Return initial results of all cards
  useEffect(() => {
    handleSearch('');
  }, [])

  // Make initial search when 'tcg' filter applied
  useEffect(() => {
    handleSearch('');
  }, [selectedTcg])


  return (
    <>
      <div className="container">
        
        {/* Header */}
        <div className="text-center mb-4">
          <h2 className="mt-5">Search</h2>
        </div>

        {/* Search Bar */}
        <form className="d-flex mt-2" onSubmit={handleSubmit}>
          <input type="text" 
                 className="form-control me-2"
                 placeholder="Search for card ..."
                 value={query}
                 onChange={handleChange}
          />
          <button type="submit" className="btn btn-primary">Search</button>
        </form>
      
      </div>
        
      <div id="search-results-container" className="mt-5 d-flex">
        {/* Filter Side Navigation Bar */}
        <Sidebar
          selectedTcg={selectedTcg ? selectedTcg.tcg_name: null}
          setSelectedTcg={setSelectedTcg}
        />
        {/* Search Results */}
        <div className="ms-5 col-md-11 row">
          { results.length > 0 ? results.map(card => (
            // TODO: On Mobile, card details should be hidden
            <div id="browse-item-parent" 
              className="col-12 col-md-3 me-1 ms-1 mb-3" 
              key={card.card_id}>
                <BrowseCardItem 
                  id={card.card_id}
                  card_name={card.card_name}
                  card_number={card.card_number}
                  set_name={toSentenceCase(card.set_name)}
                  image={card.card_image}
                />
            </div>
          )) : (
            <div className="text-center">
              No results found.
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default SearchPage