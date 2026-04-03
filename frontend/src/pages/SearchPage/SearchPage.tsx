import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"

import { toSentenceCase } from "../../utils/common";
import { getRequest, postRequest } from "../../utils/fetch" 
import BrowseCardItem from "../../components/Browse/BrowseCardItem";

type Card = {
  card_id: number;
  card_name: string;
  image: string;
  set_name: string;
  number: string;
}

function SearchPage() {

  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Card[]>([]);

  // Retrieve all cards from requested set
  const handleSearch = async (query: string) => {
    try {
      console.log('query: ', query)
      const response = await getRequest(`http://localhost:3000/search?search=${query}`, null);
      if (response.ok) {
        const jsonResponse = await response.json();
        setResults(jsonResponse);
      } else {
        console.log('response NOT OK: ', response);
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

  return (
    <>
      <div className="container">
        <div className="text-center mb-4">
          <h2 className="mt-5">Search</h2>
        </div>
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
        
      <div id="" className="row justify-content-center mt-5">
        { results ? results.map(card => (
          // TODO: On Mobile, card details should be hidden
          <div id="browse-item-parent" className="col-12 col-md-3 me-1 ms-1 mb-3" key={card.card_id}>
            <BrowseCardItem 
              id={card.card_id}
              card_name={card.card_name}
              card_number={card.number}
              set_name={toSentenceCase(card.set_name)}
              image={card.image}
            />
          </div>
        )) : (
          <tr>
            <td>No Cards Found ...</td>
          </tr>
        )}
      </div>
    </>
  )
}

export default SearchPage