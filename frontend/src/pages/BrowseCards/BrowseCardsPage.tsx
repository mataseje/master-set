import { useEffect, useState } from "react"

import { getRequest } from '../../utils/fetch';
import BreadCrumbs from "../../components/Browse/BreadCrumbs";
import BrowseItem from "../../components/Browse/BrowseCardItem";

import "./Browse.css"

function BrowseCards() {

  type Card = {
    card_id: number;
    name: string;
    image: string;
    set: string;
    number: string;
  }

  const [cards, setCards] = useState<Card[]>([]); 

  // TODO: This page should request all cards within a set and then load them.
  const getCardList = async () => {
    try {
      const response = await getRequest(`http://localhost:3000/browse/set/${set_id}`, null);
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
      <BreadCrumbs 
        items={[
          {
            label:'Sets',
            link:'/browse'
          },
          {
            label:'',
            link:`/${cards.set}`
          },
        ]
        }
      />
      
      <div id="" className="row justify-content-center">
        { cards ? cards.map(card => (

          // TODO: On Mobile, card details should be hidden
          <div id="browse-item-parent" className="col-12 col-md-3 me-1 ms-1 mb-3" key={card.card_id}>
            <BrowseItem 
              id={card.card_id}
              name={card.name}
              card_number={card.number}
              set={card.set}
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

export default BrowseCards