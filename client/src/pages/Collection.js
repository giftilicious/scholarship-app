import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
// import { useParams, Link } from 'react-router-dom';
import { QUERY_ME } from '../utils/queries';
// import { DROP_SCHOLARSHIP } from '../utils/mutations'
import Auth from '../utils/auth';

const Collection = () => {
    const {loading, data} = useQuery(QUERY_ME)
  // 'collection' will pass through the return statement below when authenticating user
  const collection = data?.me || {}
  // const [dropScholarship, { error }] = useMutation(DROP_SCHOLARSHIP)

// This function will handle the click event to delete the scholarship from the collection
  const handleDropScholarship = async (scholarshipId) => {
  
    if (!token) {
      return false;
    }

    try {
      const {data} = await dropScholarship({
        variables: {scholarshipId}
      })

      dropScholarshipId(scholarshipId);
    } catch (err) {
      console.error(err);
    }
  };

return (
  <>
    <Jumbotron fluid className='text-light bg-dark'>
      <Container>
        <h1>Viewing your collection</h1>
      </Container>
    </Jumbotron>
    <Container>
      <h2>
        {collection.pickedScholarships.length
          ? `Viewing ${collection.pickedScholarships.length} saved ${collection.pickedScholarships.length === 1 ? 'award' : 'awards'}:`
          : 'You have no saved awards.'}
      </h2>
      <CardColumns>
        {collection.pickedScholarships.map((scholarship) => {
          return (
            <Card key={scholarship.scholarshipId} border='dark'>
              {scholarship.image ? <Card.Img src={scholarship.image} alt={`The image for ${scholarship.title}`} variant='top' /> : null}
              <Card.Body>
                <Card.Title>{scholarship.title}</Card.Title>
                <p className='small'>Awards: {scholarship.title}</p>
                <Card.Text>{scholarship.description}</Card.Text>
                <Button className='btn-block btn-danger' onClick={() => handleDropScholarship(scholarship.scholarshipId)}>
                  Delete this Award!
                </Button>
              </Card.Body>
            </Card>
          );
        })}
      </CardColumns>
    </Container>
  </>
);  
}

export default Collection;
