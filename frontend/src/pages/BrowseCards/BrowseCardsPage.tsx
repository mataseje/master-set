import { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom";

import { toSentenceCase } from "../../utils/common";
import { getRequest } from '../../utils/fetch';
import BreadCrumbs from "../../components/Browse/BreadCrumbs";
import BrowseCardItem from "../../components/Browse/BrowseCardItem";


import "./Browse.css"

type Card = {
  card_id: number;
  card_image: string;
  card_name: string;
  card_number: string;
  set_name: string;
  set_slug: string;
  tcg_id: number;
}

function BrowseCards() {

  // Retrieve set_id from url
  const location = useLocation();

  const [cards, setCards] = useState<Card[]>([]); 
  const [cardSet, setCardSet] = useState<string>('');
  const [cardTcg, setCardTcg] = useState<string>('');

  // Retrieve all cards from requested set
  const getCardList = async () => {
    try {
      const response = await getRequest('http://localhost:3000' + location.pathname, null);
      if (response.ok) {
        const jsonResponse = await response.json();
        setCards(jsonResponse);

        // Assign the set name using the first returned card in the json response
        setCardSet(jsonResponse[0].set_slug);
        setCardTcg(jsonResponse[0].tcg_slug);
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
      {/* Upper Page */}
      <div className="container">

        {/* Bread Crumbs */}
        <BreadCrumbs 
          items={[
            {
              label:'TCGs',
              link:'/browse/tcgs'
            },
            {
              label: 'Sets',
              link: `/browse/sets/${cardTcg}`
            },
            {
              label: 'Cards',
              link: `/browse/cards/${cardSet}`
            },
          ]
          }
        />

        <h2>Browse Cards</h2>
        {/* Set Logo */}
        <div className="row justify-content-center">
          <div className="border d-flex justify-content-center align-center overflow-hidden mt-2 mb-2 rounded-4"
            style={{height:"125px", 
                      width:"250px",
                      background: "#fff",
                    }}
          >
            <img src={`../../assets/sets/${cardSet}.jpg`} 
              style={{maxHeight:"100%", 
                      maxWidth:"100%",
                      objectFit:"contain",
                    }}
            />
          </div>
        </div>
        <hr />

      </div>
      
      {/* Iterate and display Card for each card found in the set */}
      <div id="" className="row justify-content-center mt-5">
        { cards ? cards.map(card => (

          // TODO: On Mobile, card details should be hidden
          <div id="browse-item-parent" className="col-12 col-md-3 me-1 ms-1 mb-3" key={card.card_id}>
            <BrowseCardItem 
              id={card.card_id}
              card_name={card.card_name}
              card_number={card.card_number}
              set_name={card.set_name}
              image={card.card_image}
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