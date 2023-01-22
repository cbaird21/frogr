import createId from './createId';
import { useReducer } from 'react';
import { ADD_COMMENT, REMOVE_COMMENT } from '../utils/actions';

export const reducer = (state, action) => {
    switch (action.type) {
        case ADD_COMMENT: {
            const newID = createId(state.comments);
            const newComment = { ...action.payload, id: newID };

            return {
                ...state,
                comments: [...state.comments, newComment],
            };
        }
        case REMOVE_COMMENT: {
            return {
                ...state,
                comments: state.comments.filter((comment) => comment.id !== action.payload),
            };
        }
        default: {
            return state;
        }
    }
};
export function useCommentReducer(initialState) {
    return useReducer(reducer, initialState);
}