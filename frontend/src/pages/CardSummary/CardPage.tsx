import {useEffect, useState} from 'react'
import { getRequest } from '../../utils/fetch';
import { useParams } from 'react-router-dom';

import PricingTable from '../../components/CardOverview/PricingTable/PricingTable';

function CardPage() {

  type Card = {
    card_id: number;
    name: string;
    image: string;
    set: string;
    number: string;
  }

  const {card_id} = useParams();

  const [card, setCard] = useState<Card>(); 

  const getCardDetails = async () => {
      try {
        console.log('card_id', card_id)
        const response = await getRequest(`http://localhost:3000/card/${card_id}`, null);
        if (response.ok) {
            const jsonResponse = await response.json();
            setCard(jsonResponse);
        } else {
            console.log('response NOT OK: ', response);
        }
      } catch (e) {
      console.error('Error: ', e)
      }
  }

  useEffect(() => {
      getCardDetails();
  }, [])

  // Return this on failure to retrieve card info
  if (!card?.card_id) {
    return <div>LOADING CARD INFO</div>
  }

  return (
    <>
      <div className='container'>

        <div className='row text-center mt-5'>
          <h2>{card.name}</h2>
        </div>

        {/*TODO: REPLACE W/ CAROUSEL https://react-slick.neostack.com/docs/example/custom-paging */}
        <div className='row'>
          {/* Main Image */}
          <div className='col-3 border'>
          </div>

          <div className='col-6 border text-center'>
            <img src={`../assets/${card.image}`} 
             className='mt-2 mb-2'
             style={{maxHeight:"350px", maxWidth:"260px"}}
             alt="" />
          </div>

          {/* Description */}
          <div className='col-3 border'>
            <div className='text-center'>
              <h3>{card.name}</h3>
              <br />
            </div>
            {/* Details */}
            <ul id='card-details' className='list-unstyled'>
              <li><strong>Set:</strong> {card.set}</li>
              <li><strong>Card Number:</strong> {card.number}</li>
              <li><strong>Release Date:</strong> Dec 2025</li>
            </ul>
          </div>
        </div>

        {/* Related Cards */}
        <div id='current-set-cards' className='row'>
        </div>

        {/* Card Pricing */}
        {/* TODO: Implement Filtering */}
        {/* <div className='dropdown'>
          <button className='btn btn-secondary'></button>
        </div> */}

        <div id='pricing-table'>
          <PricingTable />
        </div>

      </div>

    </>
  )
}

export default CardPage