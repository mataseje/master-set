import { useEffect, useState } from 'react'
import { getRequest } from '../../utils/fetch';

import { toSentenceCase } from '../../utils/common';

import BreadCrumbs from '../../components/Browse/BreadCrumbs';
import BrowseSetItem from '../../components/Browse/BrowseSetItem';

function BrowseSets() {

  type Set = {
    set_id: number;
    name: string;
    release_date: string;
  }

  const [cardSets, setCardSet] = useState([]);

  const getSetList = async () => {
    try {
      const response = await getRequest('http://localhost:3000/browse', null);
      if (response.ok) {
        const jsonResponse = await response.json();
        setCardSet(jsonResponse);
        
      } else {
        console.log('response NOT OK: ', response);
      }
    } catch (e) {
      console.error('Error: ', e)
    }
  }

  useEffect(() => {
    getSetList();
  }, [])

  return (
    <>
      <div className='container mt-5'>
        <BreadCrumbs 
          items={[
            {
              label:'Sets',
              link:'/browse'
            }]
          }
        />
      
      <div className="container d-flex flex-column align-items-center">
        { cardSets ? cardSets.map(set => (

          // TODO: On Mobile, card details should be hidden
          <div id="browse-item-parent" className="col-12 col-md-5 me-1 ms-1 mb-3" key={set.set_id}>
            <BrowseSetItem 
              id={set.set_id}
              name={toSentenceCase(set.name)}
              release_date="Jan 20, 1993"
              image={`../../assets/sets/${set.name}.jpg`}
            />
          </div>
        )) : (
          <tr>
            <td>No Cards Found ...</td>
          </tr>
        )}

      </div>

      </div>

    </>
  )
}

export default BrowseSets