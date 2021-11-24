import React from 'react';
import { useQuery } from '@apollo/client';


const Home = () => {
  const loading=false;
  return (
    <main>
      <div className="flex-row justify-center">
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '1px dotted #1a1a1a' }}
        >
          <div>
              TODO
              </div>
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
