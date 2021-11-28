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

  const [dropScholarship, { error }] = useMutation(DROP_SCHOLARSHIP)

  // This function will handle the click event to delete the scholarship from the collection
  const handleDropScholarship = async (scholarshipId) => {

    if (!token) {
      return false;
    }

    try {
      await dropScholarship({
        variables: { scholarshipId } 
      })

    } catch (err) {
      console.error(err);
    }
  };

  return (
  //   <div>
  //     {Auth.loggedIn ? (
  //     <div>
  //   <Jumbotron fluid className='text-light bg-dark'>
  //     <Container>
  //       <h1>Viewing your collection</h1>
  //     </Container>
  //   </Jumbotron>
  //   <Container>
  //     <h2>
  //       {collection.pickedScholarships.length
  //         ? `Viewing ${collection.pickedScholarships.length} saved ${collection.pickedScholarships.length === 1 ? 'award' : 'awards'}:`
  //         : 'You have no saved awards.'}
  //     </h2>
  //     <CardColumns>
  //       {collection.pickedScholarships.map((scholarship) => {
  //         return (
  //           <Card key={scholarship.scholarshipId} border='dark'>
  //             {scholarship.image ? <Card.Img src={scholarship.image} alt={`The image for ${scholarship.title}`} variant='top' /> : null}
  //             <Card.Body>
  //               <Card.Title>{scholarship.title}</Card.Title>
  //               <p className='small'>Awards: {scholarship.title}</p>
  //               <Card.Text>{scholarship.description}</Card.Text>
  //               <Button className='btn-block btn-danger' onClick={() => handleDropScholarship(scholarship.scholarshipId)}>
  //                 Delete this Award!
  //               </Button>
  //             </Card.Body>
  //           </Card>
  //         );
  //       })}
  //     </CardColumns>
  //   </Container>
  //   </div>
  //     ) : (
  //       <div>
  //         {/* Define elements that will render on the screen if user is not logged in */}
  //         <h4>
  //           You need to be logged in to see your saved award list. Use the navigation
  //           links above to sign up or log in!
  //         </h4>
  //       </div>
  //     )}
  //   </div>
  // );
};

export default Collection;

////////
return (
  <div>
    {/* Conditional (ternary) operator is checking to see if loggedIn is true. If so render the following: */}
    {Auth.loggedIn ? (
      <div>
       {/* Define elements that will render on screen if condition for user loggedin is true */}
       <ScholarshipList/>
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

//////
return (
  <div>
    <h2 className="card-header">
      {profileId ? `${profile.name}'s` : 'Your'} friends have endorsed these
      skills...
    </h2>

    {profile.skills?.length > 0 && (
      <SkillsList
        skills={profile.skills}
        isLoggedInUser={!profileId && true}
      />
    )}

    <div className="my-4 p-4" style={{ border: '1px dotted #1a1a1a' }}>
      <SkillForm profileId={profile._id} />
    </div>
  </div>
);

