import { useEffect, useRef, useState } from "react";
import { ADD_POST } from "../utils/mutations";
import { useMutation } from "@apollo/client";

const UploadWidget = () => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  const [imageId, setImageId] = useState("");
  const [addPost, {error}] = useMutation(ADD_POST);
  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dpfqzf6l7",
        uploadPreset: "wohj6xxg",
      },
      async function (error, result) {
        if (result.event === "success") {
            console.log(result.info.public_id)
            setImageId(result.info.public_id);
        }
        try {
            const {data} = await addPost({
                variables: {postImage: { ...imageId }}
            })
        } catch (err) {
            console.error(err);
        }
      }
    );
  }, []);
  return <button onClick={() => widgetRef.current.open()}>Upload</button>;
};

export default UploadWidget;
