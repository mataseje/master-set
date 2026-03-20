import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

import { getRequest } from '../../utils/fetch';
import BreadCrumbs from "../../components/Browse/BreadCrumbs";
import BrowseItem from "../../components/Browse/BrowseItem";

import "./Browse.css"

function BrowsePage() {

  type Card = {
    card_id: number;
    name: string;
    image: string;
    set: string;
    number: string;
  }

  const [cards, setCards] = useState<Card[]>([]); 

  const getCardList = async () => {
    try {
      const response = await getRequest('http://localhost:3000/browse', null);
      if (response.ok) {
        const jsonResponse = await response.json();
        setCards(jsonResponse);
        
      } else {
        console.log('response NOT OK: ', response);
      }
    } catch (e) {
      console.error('Error: ', e)
    }
  }

  useEffect(() => {
    getCardList();
  }, [])


  return (
    <>
      <h2>Browse Cards</h2>

      <BreadCrumbs />
      
      <div id="" className="row">
        { cards ? cards.map(card => (

          // TODO: On Mobile, card details should be hidden
          // <Link to={`/card/${card.name}`}>
            <div id="browse-item-parent" className="col-12 col-md-3 me-1 ms-1 mb-2" key={card.card_id}>
              <BrowseItem 
                name={card.name}
                card_number={card.number}
                set={card.set}
                image={card.image}
              />
            </div>
          // </Link>
        )) : (
          <tr>
            <td>No Cards Found ...</td>
          </tr>
        )}
      </div>


    </>
  )
}

export default BrowsePage