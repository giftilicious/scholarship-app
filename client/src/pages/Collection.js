import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';
import { DROP_SCHOLARSHIP } from '../utils/mutations'
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';

import Auth from '../utils/auth';

const Collection = () => {
  const { loading, data } = useQuery(QUERY_USER
    , { variables: { username: Auth.getUser().data.username }, }
  );

  const collection = data?.user || {}


  const [dropScholarship, { error }] = useMutation(DROP_SCHOLARSHIP)

  // This function will handle the click event to delete the scholarship from the collection
  const handleDropScholarship = async (scholarshipId) => {
    try {
      const { data } = await dropScholarship({
        variables: { username: Auth.getUser().data.username, scholarshipId }
      })

    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div>
        <h1>Loading ...</h1>
      </div>
    )
  }

  if (collection.pickedScholarships === undefined || collection.pickedScholarships.length === 0) {
    return (
      <div>
        <h2>
          You have no saved awards.
        </h2>
      </div>
    );
  }

  return (
    <>
      <div fluid className='text-light bg-dark'>
        <Container>
          <h4>Hey, welcome to your Collections page</h4>
          <br></br>
          <p>View all the awards you’ve chosen below. You can apply to the awards you want or delete the ones you don’t. Easy peasy!</p>
          <p className='fst-italic'>Note: To remove an award from your list, just unclick the star.</p>
        </Container>
      </div>
      <Container>
      
        <Container>
          {collection.pickedScholarships.map((scholarship) => {
            return (
              <Card key={scholarship.scholarshipId} border='dark'>
                {scholarship.image ? <Card.Img src={scholarship.image} alt={`The image for ${scholarship.title}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>{scholarship.title}</Card.Title>
                  <p className='small'>Awards: {scholarship.title}</p>
                  <Card.Text>{scholarship.description}</Card.Text>
                  <Button className='btn-block btn-danger' onClick={() => handleDropScholarship(scholarship._id)}>
                    Delete this Award!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </Container>
      </Container>
    </>
  );
};

export default Collection;
