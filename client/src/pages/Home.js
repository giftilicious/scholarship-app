import React from 'react';
import {useQuery} from '@apollo/client';
import SearchResults from '../components/SearchResults/index';
import ScholarshipCard from '../components/ScholarshipCard/index';
import Auth from '../utils/auth';


const Home = () => {
  
  const {loading, data} = useQuery(QUERY_ALL_SCHOLARSHIPS)
  const allScholarships = data?.allScholarships;

  if(!allScholarships || loading){
    return (
      <div>
        <h1>Loading ...</h1>
      </div>
    )
  }
  return (
    <main>
      <div className="flex-row justify-center">
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '1px dotted #1a1a1a' }}
        >
          {Auth.loggedIn ? (
            <div>
              <SearchResults/>         
            </div>
          ) : (
              <div>
                {allScholarships.map((scholarship) => (
                  <ScholarshipCard
                  scholarship = {scholarship}
                  />
                ))}
              </div>
          )}
          
        </div>        
      </div>
    </main>
  );
};

export default Home;
