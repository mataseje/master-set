import { useEffect, useState } from 'react'
import { getRequest } from '../../utils/fetch';

import BreadCrumbs from '../../components/Browse/BreadCrumbs';
import BrowseSetItem from '../../components/Browse/BrowseSetItem';
import { useParams } from 'react-router-dom';

function BrowseSets() {

  type Set = {
    set_id: number;
    set_name: string;
    set_slug: string;
    release_date: string;
  }

  const { tcg_slug } = useParams();
  const [cardSets, setCardSet] = useState<Set[]>([]);

  const getSetList = async () => {
    try {
      const response = await getRequest('http://localhost:3000/browse/sets/' + tcg_slug, null);
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

  console.log('cardSets: ', cardSets);

  return (
    <>
      <div className='container'>
        <BreadCrumbs 
          items={[
            {
              label:'TCGs',
              link:'/browse/tcgs'
            },
            {
              label: `Sets`,
              link:`/browse/sets/${tcg_slug}`
            },
          ]}
        />
      <h2>Browse Sets</h2>
      
      <div className="container d-flex flex-column align-items-center">
        { cardSets ? cardSets.map(set => (

          // TODO: On Mobile, card details should be hidden
          <div id="browse-item-parent" className="col-12 col-md-5 me-1 ms-1 mb-3" key={set.set_id}>
            <BrowseSetItem 
              id={set.set_id}
              set_name={set.set_name}
              set_slug={set.set_slug}
              release_date="Jan 20, 1993"
              image={`../../assets/sets/${set.set_slug}.jpg`}
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