import { doc, updateDoc } from "firebase/firestore";
import { useRef, useState } from "react";
import { db } from "../../firebase.config";
import Modal from "../common/Modal";

const DPersonalInfo = ({ personalInfo }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const nameRef = useRef(null);
  const aboutRef = useRef(null);
  const heroTextRef = useRef(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const about = aboutRef.current.value;
    const heroText = heroTextRef.current.value;
    const data = {
      name,
      heroText,
      about,
    };

    const docRef = doc(db, "personal_info", "hoxRlFaed0fc7w2rZW80");
    await updateDoc(docRef, data);
    setIsModalOpen(false);
  };

  const modalCloseHandler = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="flex flex-1 justify-between">
        <div>
          <p>Name : {personalInfo.name}</p>
          <p>Hero Text : {personalInfo.heroText}</p>
          <p>About : {personalInfo.about}</p>
        </div>
        <div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-green-400 text-white px-4 py-2 rounded-3xl font-bold border-none"
          >
            Update
          </button>
        </div>
      </div>
      <Modal visible={isModalOpen} onClose={modalCloseHandler}>
        <form className="w-96" onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="name">Name</label>
            <input
              className="border rounded-xl p-2 w-96 focus:outline-1 focus:outline-blue-600"
              defaultValue={personalInfo.name}
              ref={nameRef}
              id="name"
            />
          </div>
          <div className="form-control">
            <label htmlFor="heroText">Hero Text</label>
            <input
              defaultValue={personalInfo.heroText}
              ref={heroTextRef}
              id="heroText"
              className="border rounded-xl p-2 w-96 focus:outline-1 focus:outline-blue-600"
            />
          </div>
          <div className="form-control">
            <label htmlFor="aboutMe">About Me</label>
            <textarea
              defaultValue={personalInfo.about}
              className="border rounded-xl p-2 w-96 focus:outline-1 focus:outline-blue-600 resize-none"
              ref={aboutRef}
              id="aboutMe"
            />
          </div>
          <button
            className="bg-green-400 text-white px-4 py-2 rounded-3xl font-bold border-none"
            type="submit"
          >
            Save
          </button>
        </form>
      </Modal>
    </>
  );
};

export default DPersonalInfo;
