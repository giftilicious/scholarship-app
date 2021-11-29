import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
// import { useParams, Link } from 'react-router-dom';
import { QUERY_USER } from '../utils/queries';
import { DELETE_SCHOLARSHIP } from '../utils/mutations'
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';

import Auth from '../utils/auth';


const Library = () => {

  const {loading, data} = useQuery(QUERY_USER
    ,{
    variables: { username: Auth.getUser().data.username },
  }
  );

  // 'library' will pass through the return statement below when authenticating user
  const library = data?.user || {}

  console.log(library)

  const [deleteScholarship, { error }] = useMutation(DELETE_SCHOLARSHIP)

  // This function will handle the click event to delete the scholarship from the library
  const handleDeleteScholarship = async (scholarshipId) => {
    
    try {
      const {data} = await deleteScholarship({
        variables: {username:Auth.getUser().data.username,scholarshipId}
      })
    } catch (err) {
      console.error(err);
    }
  };

  if(loading){
    return (
      <div>
        <h1>Loading ...</h1>
      </div>
    )
  }

  if (library.definedScholarships===undefined || library.definedScholarships.length===0){
    return (
      <div>
        <h2>
          You have no defined scholarships.
      </h2>
      </div>
    );
  }

  return (
    <>
      <div fluid className='text-light bg-dark'>
        <Container>
          <h1>Viewing your library</h1>
        </Container>
      </div>
      <Container>
        <Container>
          {library.definedScholarships.map((scholarship) => {
            return (
              <Card key={scholarship.scholarshipId} border='dark'>
                {scholarship.image ? <Card.Img src={scholarship.image} alt={`The image for ${scholarship.title}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>{scholarship.title}</Card.Title>
                  <p >Amount: ${scholarship.amount}</p>
                  <Card.Text>{scholarship.description}</Card.Text>
                  <Card.Text>Deadline: {scholarship.deadline}</Card.Text>
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteScholarship(scholarship._id)}>
                    Delete Scholarship
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

export default Library;

