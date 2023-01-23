import React, { useState } from 'react';
// Import the `useMutation()` hook from Apollo Client
import { useMutation } from '@apollo/client';
// Import the GraphQL mutation
import { EDIT_USER } from '../../utils/mutations';
// import Auth from "../../utils/auth"
import {Alert, Button} from "react-bootstrap";

const EditUser = () => {
    // const [inputType, setInputType] = useState < string > ("")
    // const inputTypes = ["text", "radio", "checkbox", "hidden", "password"]
    // const [userName, setUserName] = useState('');
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    const [userFormData, setUserFormData] = useState({
      username: "",
      email: "",
      password: "",
    });
    // const [validated] = useState(false);
    // Invoke `useMutation()` hook to return a Promise-based function and data about the EDIT_USER mutation
    const [editUser, { error }] = useMutation(EDIT_USER);
    const [show, setShow] = useState(false);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserFormData({ ...userFormData, [name]: value });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        event.stopPropagation();
        // const form = event.currentTarget;
        // if (form.checkValidity() === false) {
        //     event.preventDefault();
        //     event.stopPropagation();
        //     }

        // Since mutation function is async, wrap in a `try...catch` to catch any network errors from throwing due to a failed request.
        try {
            // Execute mutation and pass in defined parameter data as variables
            const { data } = await editUser({
                variables: { ...userFormData },
            });
            // window.location.reload();
        } catch (err) {
            console.error(err);
        }
        setUserFormData({
          username: "",
          email: "",
          password: "",
        });
        setShow(true);
    };

    return (
      <>
        <div className='container'>
          <h3 className="green">Profile Settings</h3>
          <Alert show={show} variant="success">
            <Alert.Heading>User details successfully changed!</Alert.Heading>
            <p>Good job.</p>
            <hr />
            <div className="d-flex justify-content-end">
              <Button onClick={() => setShow(false)} variant="outline-success">
                Awesome.
              </Button>
            </div>
          </Alert>
          <form
            className="flex-row justify-center justify-space-between-md align-center m-4"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <input
                placeholder="Edit your profile username..."
                value={userFormData.username}
                className="form-input w-100"
                name="username"
                onChange={handleInputChange}
              />
            </div>
            <div className="col-12 col-lg-9">
              <input
                placeholder="Edit your profile email..."
                value={userFormData.email}
                name="email"
                className="form-input w-100"
                onChange={handleInputChange}
              />
            </div>
            <div className="col-12 col-lg-9">
              <input
                placeholder="Edit your new password..."
                value={userFormData.password}
                name="password"
                className="form-input w-100"
                onChange={handleInputChange}
              />
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-info btn-block py-3" type="submit">
                Save changes
              </button>
            </div>
            {console.log(JSON.stringify(error)) && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                Something went wrong...
              </div>
            )}
          </form>
        </div>
      </>
    );
};

export default EditUser;