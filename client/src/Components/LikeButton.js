import { useState, useEffect } from "react";
import { LIKED_POST } from "../utils/mutations";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { savePostIds, getSavedPostIds } from "../utils/localStorage";
import {Button} from "react-bootstrap";

const LikeButton = () => {

  // create state to hold saved bookId values
    const [savedPostIds, setSavedPostIds] = useState(getSavedPostIds());
    const [savePost, { error }] = useMutation(LIKED_POST);

    useEffect(() => {
        return ()=> savePostIds(savedPostIds)
    });

    const handleLikePost = async (postId) => {
        
        const postToLike = this._id;

        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }

        try {
            const {data} = await savePost({
                variables: { postId },
            });
            setSavedPostIds([...savedPostIds, postToLike]);
        } catch (err) {
            console.error(err);
        }
    };

    return (
      <Button
        disabled={savePostIds?.some(
          (savedPostId) => savedPostId === post.postId
        )}
        className="btn-block btn-info"
        onClick={() => handleLikePost(post.postId)}
      >
        {savedPostId?.some((savedPostId) => savedPostId === post.postId)
          ? "This post has already been liked!"
          : "Like this Post!"}
      </Button>
    );


}