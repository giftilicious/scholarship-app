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
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Viewing your library</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {collection.definedScholarships.length
            ? `Viewing ${collection.definedScholarships.length} saved ${collection.definedScholarships.length === 1 ? 'award' : 'awards'}:`
            : 'You have no saved awards.'}
        </h2>
        <CardColumns>
          {collection.definedScholarships.map((scholarship) => {
            return (
              <Card key={scholarship.scholarshipId} border='dark'>
                {scholarship.image ? <Card.Img src={scholarship.image} alt={`The image for ${scholarship.title}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>{scholarship.title}</Card.Title>
                  <p className='small'>Awards: {scholarship.title}</p>
                  <Card.Text>{scholarship.description}</Card.Text>
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteScholarship(scholarship.scholarshipId)}>
                    Delete Award
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );  
};

export default Library;

