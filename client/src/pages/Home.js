import React from 'react';
import { useQuery } from '@apollo/client';
import { useState } from 'react';

import QUERY_ALL_SCHOLARSHIPS from '../utils/queries'
import Auth from '../utils/auth';
import Filters from '../components/Filters';



const Home = () => {
  const loading=false;

  const {loading, data} = useQuery(QUERY_ALL_SCHOLARSHIPS)
  const allScholarships = data?.allScholarships;

  if(!allScholarships){
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
              <Filters/>
              <div>
              
            </div>
            </div>          

          ): (
          <div>

             {allScholarships.map((scholarship) => (
               <div>                 
                 {/* CARD */}
               </div>

             ))}
          </div>
          )}
          
        </div>
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div>
              TODO
              </div>
           
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
