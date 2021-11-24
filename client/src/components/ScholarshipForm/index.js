import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_SCHOLARSHIP } from '../../utils/mutations';

import Auth from '../../utils/auth';

const ScholarshipForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [amount, setAmount] = useState(0);
  const [deadline, setDeadline] = useState('');
  const [ethnicity, setEthnicity] = useState(['']);
  const [disability, setDisability] = useState(['']);
  const [levelofstudy, setLevelofstudy] = useState(['']);
  const [gender, setGender] = useState(['']);
  const [applink, setApplink] = useState('');
  const [appemail, setAppemail] = useState('');

  const [addScholarship, { error }] = useMutation(ADD_SCHOLARSHIP);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    

    try {

      console.log(Auth.getProfile().data.username);
      console.log(title);
      console.log(type);
      console.log(description);
      console.log(amount);
      console.log(deadline);
      const usrName = ''+Auth.getProfile().data.username;
      console.log(usrName);
      const varObj = { username:usrName,title:title, type:type, description: description, deadline: deadline, amount: amount, ethnicity: ethnicity, disability: disability,
        levelofstudy: levelofstudy,
        gender: gender,
        applink: applink,
        appemail: appemail};
      console.log(varObj)
      const { data } = await addScholarship({
        variables: { ...varObj },
      });

      setTitle('');
    } catch (err) {
      console.log("Cannot insert scholarship")
      console.error(err);

    }
  };

  const addType = (newType) => {
    const prevType = type;
    prevType.push(newType);
    setType(prevType);
  }
  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(name);
    console.log(value);

    if (name === 'description' && value.length <= 280) {
      setDescription(value);
    } else if (name === 'title') {
      setTitle(value);
    } else if (name === 'amount') {
      setAmount(Number(value));
    } else if (name === 'deadline') {
      setDeadline(value);
    } 
    setDeadline('01/01/2022');
    setType('Award');
    setEthnicity(['African']);
    setDisability(['Disabled']);
    setLevelofstudy(['Undergrad']);
    setGender(['Women']);
    setApplink('https');
    setAppemail('email@ccc.ca')
  };

  return (
    <div>
      <h4>New Scholarship</h4>

      {Auth.loggedIn() ? (
        <>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <label for="title" className="col-3 col-lg-3">Title</label>
              <input type="text" 
                    amount={title} 
                    className="col-9 col-lg-6" 
                    id="title" 
                    name="title" 
                    onChange={handleChange}
                    placeholder="The title of your scholarship..."/>
              <label for="description" className="col-3 col-lg-3">Description</label>
              <textarea
                name="description"
                placeholder="Description of the scholarship"
                amount={description}
                className="form-input w-100 col-9 col-lg-6"
                onChange={handleChange}
                style={{ lineHeight: '1.5', resize: 'vertical' }
              }
              ></textarea>
              <label for="amount" className="col-3 col-lg-3">amount</label>
              <input type="text" 
                    amount={amount} 
                    className="col-9 col-lg-6" 
                    id="amount" 
                    name="amount" 
                    onChange={handleChange}
                    placeholder="The grant amount..."/>
              
              
 
            </div>

            <div className="col-12 col-lg-9">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Add Scholarship
              </button>
            </div>
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to share your thoughts. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default ScholarshipForm;
