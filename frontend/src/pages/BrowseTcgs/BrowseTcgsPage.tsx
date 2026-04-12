import { useEffect, useState } from 'react'
import { getRequest } from '../../utils/fetch';

import BreadCrumbs from '../../components/Browse/BreadCrumbs';
import BrowseTcgItem from '../../components/Browse/BrowseTcgItem';

function BrowseTcgs() {

  type Tcg = {
    tcg_desc: string;
    tcg_id: number;
    tcg_name: string;
    tcg_slug: string;
  }

  const [allTcgs, setAllTcgs] = useState<Tcg[]>([]);

  const getAllTcgs = async () => {
    try {
      const response = await getRequest('http://localhost:3000/browse', null);
      if (response.ok) {
        const jsonResponse = await response.json();
        setAllTcgs(jsonResponse);
        
      } else {
        console.log('response NOT OK: ', response);
      }
    } catch (e) {
      console.error('Error: ', e)
    }
  }

  useEffect(() => {
    getAllTcgs();
  }, [])

  return (
    <>
      <div className='container'>
        <BreadCrumbs 
          items={[
            {
              label:'TCGs',
              link:'/browse'
            }
          ]}
        />
        <h2>Browse TCGs</h2>
      
        <div className="container d-flex flex-column align-items-center">
          { allTcgs ? allTcgs.map(tcg => (

            // TODO: On Mobile, card details should be hidden
            <div id="browse-item-parent" 
              className="col-12 col-md-5 me-1 ms-1 mb-3" 
              key={tcg.tcg_id}
            >
              <BrowseTcgItem 
                id={tcg.tcg_id}
                tcg_name={tcg.tcg_name}
                tcg_slug={tcg.tcg_slug}
                tcg_image={`../../assets/tcgs/${tcg.tcg_slug}.jpg`}
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

export default BrowseTcgs