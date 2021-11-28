import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
// import { useParams, Link } from 'react-router-dom';
import { QUERY_ME } from '../utils/queries';
import { DELETE_SCHOLARSHIP } from '../utils/mutations'
import Auth from '../utils/auth';

const Library = () => {
  const {loading, data} = useQuery(QUERY_ME)
  const library = data?.me || {}
  const [deleteScholarship, { error }] = useMutation(DELETE_SCHOLARSHIP)

  // This function will handle the click event to delete the scholarship from the collection
  const handleDeleteScholarship = async (scholarshipId) => {
    
    if (!token) {
      return false;
    }

    try {
      const {data} = await deleteScholarship({
        variables: {scholarshipId}
      })

      deleteScholarshipId(scholarshipId);
    } catch (err) {
      console.error(err);
    }
  };

//   return (
    <div>
    {Auth.loggedIn ? (
      <div>
        <ScholarshipList
          library={collection.definedScholarships}
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

