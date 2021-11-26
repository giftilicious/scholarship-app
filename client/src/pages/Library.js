import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useParams, Link } from 'react-router-dom';
import { QUERY_USER } from '../utils/queries';
import { DELETE_SCHOLARSHIP } from '../utils/mutations'
import Auth from '../utils/auth';

const Library = ({ definedScholarships, isLoggedInUser = false }) => {
  const { username } = useParams();
  const { loading, data } = useQuery(QUERY_USER,
    {
      variables: { username: username },
    }
  );
  const [deleteScholarship, { error }] = useMutation(DELETE_SCHOLARSHIP)

  const handleDeleteScholarship = async (scholarshipId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.name) {
    return (
      <h4>
        You need to be logged in to see your saved award list. Use the navigation
        links above to sign up or log in!
      </h4>
    );
  }

  return (
    <div>
      <div className="flex-row justify-space-between my-4">
        {definedScholarships &&
          definedScholarships.map((definedScholarships) => (
            <div key={skill} className="col-12 col-xl-6">
              <div className="card mb-3">
                <h4 className="card-header bg-dark text-light p-2 m-0 display-flex align-center">
                  <span>{definedScholarships}</span>
                  {isLoggedInUser && (
                    <button
                      className="btn btn-sm btn-danger ml-auto"
                      onClick={() => handleDeleteScholarship(definedScholarships)}
                    >
                      X
                    </button>
                  )}
                </h4>
              </div>
            </div>
          ))}
      </div>
      {error && (
        <div className="my-3 p-3 bg-danger text-white">{error.message}</div>
      )}
    </div>
  );
};

export default Library;
