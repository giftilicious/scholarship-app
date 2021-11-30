import React from 'react';
import ScholarshipCard from '../ScholarshipCard';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

const ScholarshipList = ({ scholarships }) => {
  if (!scholarships.length) {
    return <h3>No Scholarships</h3>;
  }

  return (
    <Row xs={1} md={2} lg={4}>
      {scholarships &&
        scholarships.map((scholarship) => (
          <ScholarshipCard scholarship={scholarship} key={scholarship._id}/>
        ))}
    </Row>
  );
};

export default ScholarshipList;
