import React, { useState } from 'react';
// Import the `useMutation()` hook from Apollo Client
import { useMutation } from '@apollo/client';
// Import the GraphQL mutation
import { EDIT_USER } from '../../utils/mutations';

const EditUser = () => {
    const [userName, setUserName] = useState(context.user.userName);
    const [email, setEmail] = useState(context.user.email);
    const [password, setPassword] = useState(context.user.password);

    // Invoke `useMutation()` hook to return a Promise-based function and data about the EDIT_USER mutation
    const [editUser, { error }] = useMutation(EDIT_USER);

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        // Since mutation function is async, wrap in a `try...catch` to catch any network errors from throwing due to a failed request.
        try {
            // Execute mutation and pass in defined parameter data as variables
            const { data } = await editUser({
                variables: { userName, email, password },
            });

            // window.location.reload();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <div>
                <h3>Edit your username, email or password</h3>
                <form
                    className="flex-row justify-center justify-space-between-md align-center"
                    onSubmit={handleFormSubmit}
                >
                    <div className="col-12 col-lg-9">
                        <input
                            placeholder="Add your profile username..."
                            value={userName}
                            className="form-input w-100"
                            onChange={(event) => setUserName(event.target.value)}
                        />
                    </div>
                    <div className="col-12 col-lg-9">
                        <input
                            placeholder="Add your profile email..."
                            value={email}
                            className="form-input w-100"
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>
                    <div className="col-12 col-lg-9">
                        <input
                            placeholder="Add your new password..."
                            value={password}
                            className="form-input w-100"
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </div>

                    <div className="col-12 col-lg-3">
                        <button className="btn btn-info btn-block py-3" type="submit">
                            Save changes
                        </button>
                    </div>
                    {error && (
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