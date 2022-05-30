import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useRef, useState } from "react";
import { FaTrashAlt, FaEdit, FaPlusSquare } from "react-icons/fa";

import { db } from "../../firebase.config";
import Modal from "../common/Modal";

const DProgramming = ({ items }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [updateItem, setUpdateItem] = useState(null);

  const programmingLangRef = useRef(null);
  const experienceRef = useRef(null);

  const submitHandler = async (e) => {
    e.preventDefault();

    let docRef;

    if (isUpdate) {
      docRef = doc(db, "programming", updateItem.id);
      updateDoc();
      setIsUpdate(false);
      setUpdateItem(null);
    } else {
      docRef = collection(db, "programming");
      addDoc(docRef, {
        language: programmingLangRef.current.value,
        experience: experienceRef.current.value + "%",
      });
    }
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "programming", id));
  };

  const handleUpdate = (item) => {
    setUpdateItem(item);
    setIsModalOpen(true);
  };
  return (
    <>
      <div className="flex flex-1 items-center self-start justify-between ">
        <div className="flex  flex-wrap">
          {items.map((programmingItem) => (
            <div
              className="flex items-center justify-between bg-slate-400 w-40 h-10 m-2  text-white p-2 rounded-lg"
              key={programmingItem.id}
            >
              <div>{programmingItem.language}</div>
              <div className="flex space-x-2">
                <FaTrashAlt onClick={() => handleDelete(programmingItem.id)} />
                <FaEdit
                  onClick={() => handleUpdate(programmingItem)}
                  className=" text-slate-600 transition-all duration-70 hover:text-slate-800 "
                />
              </div>
            </div>
          ))}
        </div>
        <div>
          <div className="flex-none">
            <FaPlusSquare
              onClick={() => {
                setIsModalOpen(true);
              }}
              className=" text-slate-600 transition-all duration-70 hover:text-slate-800 "
            />
          </div>
        </div>
      </div>

      <Modal
        visible={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setIsUpdate(false);
          setUpdateItem(null);
        }}
      >
        <form onSubmit={submitHandler} className="space-y-3">
          <div className="form-control p-2 space-y-2">
            <label htmlFor="programmingLang">Programming Language</label>
            <input
              defaultValue={updateItem?.language || ""}
              className="border rounded-xl p-2 w-96 focus:outline-1 focus:outline-blue-600"
              id="programmingLang"
              ref={programmingLangRef}
            />
          </div>
          <div className="form-control p-2 space-y-2">
            <label htmlFor="experience">Experience in %</label>
            <input
              className="border rounded-xl p-2 w-96 focus:outline-1 focus:outline-blue-600"
              id="experience"
              defaultValue={updateItem?.experience || ""}
              ref={experienceRef}
            />
          </div>
          <button
            className="px-4 py-2 bg-green-500 rounded-xl text-white font-bold"
            type="submit"
          >
            Save
          </button>
        </form>
      </Modal>
    </>
  );
};

export default DProgramming;
