import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
// import { useParams, Link } from 'react-router-dom';
import { QUERY_ME } from '../utils/queries';
import { DROP_SCHOLARSHIP } from '../utils/mutations'
import ScholarshipList from '../components/ScholarshipList'
import Auth from '../utils/auth';

const Collection = () => {
  const { loading, data } = useQuery(QUERY_ME)

  // 'collection' will pass through the return statement below when authenticating user
  // Check if data is returning from the `QUERY_ME` query
  const collection = data?.me || {}


  // This function will handle the click event to delete the scholarship from the collection
  
  return (
    <div>
      {Auth.loggedIn ? (
        <div>
          <ScholarshipList
            collection={collection.pickedScholarships}
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

export default Collection;