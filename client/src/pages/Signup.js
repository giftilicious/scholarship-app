import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../assets/css/style.css"
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';

import Auth from '../utils/auth';

const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    usertype: '',
    email: '',
    password: '',
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;
console.log(name, value)
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className="flex-row justify-center mb-4" >
      <div className="col-12 col-lg-10">
        <div className="card" >
          <h4 className="card-header bg-dark text-light p-2" style={{fontFont:"40px"}}>Sign Up</h4>
          <div className="card-body">
            {data ? (
              <p>
                Success! You may now head{' '}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              <Form.Floating onSubmit={handleFormSubmit}>
                <FloatingLabel controlId="floatingInput" label="Username" className="mb-3">
                  <Form.Control 
                  className="form-input"
                  placeholder="Username"
                  name="username"
                  type="text"
                  value={formState.name}
                  onChange={handleChange}
                  />
                </FloatingLabel>
                <Form.Check 
                  className="form-input"
                  name="usertype"
                  type="radio"
                  id="providerRadio"
                  value="Provider"
                  label="Provider"
                  onChange={handleChange}
                />
                <Form.Check 
                  className="form-input mb-3"
                  name="usertype"
                  type="radio"
                  id="studentRadio"
                  value="Student"
                  label="Student"
                  onChange={handleChange}
                />
                <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
                  <Form.Control 
                  className="form-input"
                  placeholder="Email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                  />
                </FloatingLabel>
                <FloatingLabel controlId="signup-password" label="Password" className="mb-3">
                  <Form.Control
                    className="form-input"
                    placeholder="******"
                    name="password"
                    type="password"
                    value={formState.password}
                    onChange={handleChange}
                  />
                </FloatingLabel>
                <Button type="submit" onClick={handleFormSubmit}>Submit</Button>
              </Form.Floating>


                /* <div style={{display:"flex",alignItems:"center", justifyContent:"center"}}>
                  <div className="form-check form-check-inline" >
                      <input className="form-check-input" type="radio" name="usertype" id="providerRadio" value='Provider' onChange={handleChange} />
                      <label className="form-check-label" for="providerRadio" style={{fontFont:"25px"}}>
                        Provider
                      </label>
                    </div>
                    
                    <div className="form-check form-check-inline" >
                      <input className="form-check-input" type="radio" name="usertype" id="providerRadio" value='Student' onChange={handleChange} />
                      <label className="form-check-label" for="providerRadio" style={{fontFont:"25px"}}>
                        Student
                      </label>
                    </div>
                </div>      



          /* <form className="styled-form row"> */
            /* <div className="form-field col-lg-12">
              <input id="name" className="input-text" type="text" required onChange={handleChange}/>
              <label className="label" style={{fontFont:"35px"}} for="name">Name</label>
            </div>
            <div className="form-field col-lg-12">
              <input id="email" className="input-text" type="email" required onChange={handleChange}/>
              <label className="label" style={{fontFont:"35px"}} for="email">E-mail</label>
            </div>
            <div className="form-field col-lg-12">
              <input id="username" className="input-text" type="text" required onChange={handleChange}/>
              <label className="label" style={{fontFont:"35px"}} for="username">Username</label>
            </div>
            <div className="form-field col-lg-12">
              <input id="email" className="input-text" type="password" required onChange={handleChange}/>
              <label className="label" style={{fontFont:"35px"}} for="email">Password</label>
            </div> */
            /* <div className="form-field col-lg-12">
              <input className="submit-btn" type="submit" value="Submit" />
            </div> */
          /* </form> 
              <form onSubmit={handleFormSubmit}>

                /* <input
                  className="form-input"
                  placeholder="Provider or student"
                  name="usertype"
                  type="text"
                  value={formState.usertype}
                  onChange={handleChange}
                /> */ 
                          
                   
              // </form> */
            )}

            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Signup;
