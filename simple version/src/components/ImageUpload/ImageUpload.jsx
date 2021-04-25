import { useState } from "react";
import "./ImageUpload.css";
import { storage, db } from "../../firebase";
import firebase from "firebase";
//my mrakm
const ImageUpload = ({ username }) => {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    if (e.target.files[0]) setImage(e.target.files[0]);
  };
  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Progress bar
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      // Error function
      (error) => {
        console.log(error);
        alert(error.message);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            // Posting in database
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
              username: username,
            });

            setImage(null);
            setProgress(0);
            setCaption("");
          });
      }
    );
  };

  return (
    <div className="image__upload">
      {/* Heading */}
      <h1>Upload Image</h1>
      {/* File picker */}
      <input type="file" placeholder="Choose File" onChange={handleChange} />
      {/* Progress bar */}
      <progress
        className="image__upload__progress"
        value={progress}
        max="100"
      />
      {/* Captions */}
      <input
        type="text"
        placeholder="Enter your caption"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />
      {/* Post button */}
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default ImageUpload;
