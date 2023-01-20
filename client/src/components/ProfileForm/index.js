import React, { useState } from 'react';
// Import the `useMutation()` hook from Apollo Client
import { useMutation } from '@apollo/client';
// Import the GraphQL mutation
import { ADD_PROFILE } from '../../utils/mutations';

const ProfileForm = () => {
    const [name, setName] = useState('');

    // Invoke `useMutation()` hook to return a Promise-based function and data about the ADD_PROFILE mutation
    const [addProfile, { error }] = useMutation(ADD_PROFILE);

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        // Since mutation function is async, wrap in a `try...catch` to catch any network errors from throwing due to a failed request.
        try {
            // Execute mutation and pass in defined parameter data as variables
            const { data } = await addProfile({
                variables: { name },
            });

            window.location.reload();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h3>Add yourself to the list...</h3>
            <form
                className="flex-row justify-center justify-space-between-md align-center"
                onSubmit={handleFormSubmit}
            >
                <div className="col-12 col-lg-9">
                    <input
                        placeholder="Add your profile name..."
                        value={name}
                        className="form-input w-100"
                        onChange={(event) => setName(event.target.value)}
                    />
                </div>

                <div className="col-12 col-lg-3">
                    <button className="btn btn-info btn-block py-3" type="submit">
                        Add Profile
                    </button>
                </div>
                {error && (
                    <div className="col-12 my-3 bg-danger text-white p-3">
                        Something went wrong...
                    </div>
                )}
            </form>
        </div>
    );
};

export default ProfileForm;