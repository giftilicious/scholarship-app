import React from 'react';
import ScholarshipCard from '../ScholarshipCard';

const ScholarshipList = ({ scholarships }) => {
  if (!scholarships.length) {
    return <h3>No Scholarships</h3>;
  }

  return (
    <div>
      {scholarships &&
        scholarships.map((scholarship) => (
          <ScholarshipCard scholarship={scholarship} key={scholarship._id}/>
        ))}
    </div>
  );
};

export default ScholarshipList;
