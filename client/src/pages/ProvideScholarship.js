import { useQuery, useMutation } from '@apollo/client';
// import { useParams, Link } from 'react-router-dom';
import { ADD_SCHOLARSHIP } from '../utils/mutations';
import { QUERY_ME } from '../utils/queries';


const Award = () => {
  const {loading, data} = useQuery(QUERY_ME)
  const awardData = data?.me || {}
  const [addScholarship, { error }] = useMutation(ADD_SCHOLARSHIP)

  // This function will handle the click event to delete the scholarship from the collection
  const handleAddScholarship = async (scholarshipId) => {
    
    if (!token) {
      return false;
    }

    try {
      const {data} = await addScholarship({
        variables: {scholarshipId}
      })

      addScholarship(scholarshipId);
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
        You need to be logged in to add awards. Use the navigation
        links above to sign up or log in!
      </h4>
        </div>
      )}
    </div>
  );
};

export default Award;