import { useState } from "react";
import { db } from "../../firebase.config";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";

const UploadResume = () => {
  const [fileUrl, setFileUrl] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();

    const storage = getStorage();
    const storageRef = ref(storage, "files/" + "Usman Ghani Qureshi Resume");

    const uploadTask = uploadBytesResumable(storageRef, fileUrl);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log("Upload is " + progress + "% done");
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
            resumeUrl: downloadURL,
          });
        });
      }
    );
  };
  return (
    <div className="flex flex-col justify-center items-center">
      <h1>Upload Resumse</h1>
      <form onSubmit={submitHandler}>
        <input type="file" onChange={(e) => setFileUrl(e.target.files[0])} />
        <button
          className="px-4 py-2 bg-green-500 rounded-xl text-white font-bold"
          type="submit"
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default UploadResume;
