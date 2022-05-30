import { useState } from "react";
import { db } from "../../firebase.config";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import ProgressBar from "../common/ProgressBar";

const UploadImage = ({ onClose }) => {
  const [image, setImage] = useState(null);
  const [percentage, setPercentage] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    const storage = getStorage();
    const storageRef = ref(storage, "images/" + "UsmanProfile");

    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        if (progress !== 100) setPercentage(progress);
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const docRef = doc(db, "personal_info", "hoxRlFaed0fc7w2rZW80");

          updateDoc(docRef, {
            imageUrl: downloadURL,
          });
        });
        setIsUploading(false);
        onClose();
      }
    );
  };

  if (isUploading) return <ProgressBar percentage={percentage} />;
  return (
    <form onSubmit={submitHandler}>
      <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      <button
        className="px-4 py-2 bg-green-500 rounded-xl text-white font-bold"
        type="submit"
      >
        Upload
      </button>
    </form>
  );
};

export default UploadImage;
