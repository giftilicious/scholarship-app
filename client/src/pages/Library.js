import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import ScholarshipList from '../components/ScholarshipList'
import Auth from '../utils/auth';

const Library = () => {
  const { data } = useQuery(QUERY_ME)
  const library = data?.me || {}
  
  return (
    <div>
    {Auth.loggedIn ? (
      <div>
        <ScholarshipList
          library={library.definedScholarships}
        />
      </div>
    ) : (
      <div>
        {/* Define elements that will render on the screen if user is not logged in */}
        <h4>
          You need to be logged in to see your saved award list. Use the navigation
          links above to sign up or log in!
        </h4>
      </div>
    )}
  </div>
);
};

export default Library;

