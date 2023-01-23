import React, { useState, useContext } from 'react';
import createId from './createId';
import Auth from '../utils/auth';

// Create our theme context using React.CreateContext()
export const CommentContext = React.createContext();

// Create a custom hook that allows easy access to our ThemeContext values
export const useComments = () => useContext(CommentContext);

// Creating our theme provider. Accepts an argument of "props", here we plucking off the "children" object.
export default function CommentsProvider({ children }) {
    const [comments, setComments] = useState([
        {
            id: 1,
            commentText: 'This is fun to learn!',
            commentAuthor: Auth.getProfile().data.username
        },
        {
            id: 2,
            commentText: 'Lets make this work!',
            commentAuthor: Auth.getProfile().data.username

        },
    ]);

    const addComment = (comment) => {
        const newID = createId(comment);
        const newComment = { ...comments, id: newID };

        setComments([...comments, newComment]);
    };

    const removeComment = (id) => {
        const updatedCommentList = comments.filter((comment) => comment.id !== id);
        setComments(updatedCommentList);
    };

    // The provider component will wrap all other components inside of it that need access to our global state
    return (
        // Dark theme and toggle theme are getting provided to the child components
        <CommentContext.Provider value={{ comments, addComment, removeComment }}>
            {children}
        </CommentContext.Provider>
    );
}

