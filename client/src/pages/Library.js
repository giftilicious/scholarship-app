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

  return (
    <div>
      {/* Conditional (ternary) operator is checking to see if loggedIn is true. If so render the following: */}
      {Auth.loggedIn ? (
        <div>
         {/* Define elements that will render on screen if condition for user loggedin is true */}
        </div>
      ) : (
        // If we are logged out, render this:
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


///////
// return (
  //   <div>
  //     <div className="flex-row justify-space-between my-4">
  //       {definedScholarships &&
  //         definedScholarships.map((definedScholarships) => (
  //           <div key={skill} className="col-12 col-xl-6">
  //             <div className="card mb-3">
  //               <h4 className="card-header bg-dark text-light p-2 m-0 display-flex align-center">
  //                 <span>{definedScholarships}</span>
  //                 {isLoggedInUser && (
  //                   <button
  //                     className="btn btn-sm btn-danger ml-auto"
  //                     onClick={() => handleDeleteScholarship(definedScholarships)}
  //                   >
  //                     X
  //                   </button>
  //                 )}
  //               </h4>
  //             </div>
  //           </div>
  //         ))}
  //     </div>
  //     {error && (
  //       <div className="my-3 p-3 bg-danger text-white">{error.message}</div>
  //     )}
  //   </div>
  // );