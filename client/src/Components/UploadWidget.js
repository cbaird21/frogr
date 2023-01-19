import { useEffect, useRef, useState } from "react";
import { ADD_POST } from "../utils/mutations";
import { useMutation } from "@apollo/client";

const UploadWidget = () => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  const [addPost, { error }] = useMutation(ADD_POST);
  if (error) {
    console.log(JSON.stringify(error))
  }
//   const [imageId, setImageId] = useState("");
//   let imageChange = false;
  useEffect(() => {
      cloudinaryRef.current = window.cloudinary;
      widgetRef.current = cloudinaryRef.current.createUploadWidget(
          {
              cloudName: "dpfqzf6l7",
              uploadPreset: "wohj6xxg",
            },
            async function (error1, result) {
                if (error1) {
                    console.log(error1)
                }
        // console.log(result)
        if (result.event === "success") {
          console.log(result.info.url);
          const imageUrl = result.info.url
          try {
        //       setImageId(result.info.url);
              const { data } = await addPost({
                  variables: { postImage: imageUrl },
                // variables: { postImage: { imageId } },
                }); 
                console.log(data);
            } catch (err) {
                console.error(JSON.stringify(err));
            }
        }
    }
    );
}, []);

// console.log(imageId);
// const addImage = async (error, result) => {

// }
  return <button onClick={() => widgetRef.current.open()}>Upload</button>;
};

export default UploadWidget;
