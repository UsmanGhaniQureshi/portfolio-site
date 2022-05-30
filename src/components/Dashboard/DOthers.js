import { useRef, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { FaTrashAlt, FaEdit } from "react-icons/fa";

import { db } from "../../firebase.config";
import Divider from "../common/Divider";
import Modal from "../common/Modal";

const DOthers = ({ highlights, hobbies, typewritertext }) => {
  const [isUpdate, setIsUpdate] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [category, setCategory] = useState("highlights");
  const [updateItem, setUpdateItem] = useState(null);
  const textStringRef = useRef(null);

  const submitHandler = async (e) => {
    e.preventDefault();

    let docRef;
    const textString = textStringRef.current.value;
    if (isUpdate) {
      docRef = doc(db, category, updateItem.id);
      await updateDoc(docRef, {
        textString,
      });
      setIsUpdate(false);
      setUpdateItem(null);
    } else {
      docRef = collection(db, category);
      await addDoc(docRef, {
        textString,
      });
    }
    setCategory(null);
    setIsModalOpen(false);
  };

  const handleDelete = async (cat, id) => {
    await deleteDoc(doc(db, cat, id));
  };

  const handleUpdate = (cat, item) => {
    setCategory(cat);
    setUpdateItem(item);
    setIsUpdate(true);
    setIsModalOpen(true);
  };
  return (
    <div className="flex justify-between flex-1 p-4">
      <div className="flex-1 mx-3">
        {highlights.map((highlight) => (
          <div className="flex justify-between  p-3 items-center bg-slate-300 rounded-3xl" key={highlight.id}>
            <p> {highlight.textString}</p>
            <div className="flex space-x-2">
              <FaTrashAlt
                onClick={() => handleDelete("highlights", highlight.id)}
              />
              <FaEdit onClick={() => handleUpdate("highlights", highlight)} />
            </div>
          </div>
        ))}
        <Divider />
        {hobbies.map((hobby) => (
          <div className="flex justify-between  p-3 items-center bg-slate-300 rounded-3xl" key={hobby.id}>
            <p>{hobby.textString}</p>
            <div className="flex space-x-2">
              <FaTrashAlt onClick={() => handleDelete("hobbies", hobby.id)} />
              <FaEdit onClick={() => handleUpdate("hobbies", hobby)} />
            </div>
          </div>
        ))}
        <Divider />
        {typewritertext.map((trt) => (
          <div className="flex justify-between  p-3 items-center bg-slate-300 rounded-3xl" key={trt.id}>
            <p>{trt.textString}</p>
            <div className="flex space-x-2">
              <FaTrashAlt
                onClick={() => handleDelete("autotypestrings", trt.id)}
              />
              <FaEdit onClick={() => handleUpdate("autotypestrings", trt)} />
            </div>
          </div>
        ))}
      </div>
      <div>
        <button
          onClick={() => {
            setIsModalOpen(true);
            setIsUpdate(false);
            setUpdateItem(null);
            setCategory(null);
          }}
        >
          Add
        </button>
      </div>
      <Modal visible={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {!isUpdate && (
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="highlights">Highlights</option>
            <option value="autotypestrings">Type Writer Text</option>
            <option value="hobbies">Hobbies</option>
          </select>
        )}
        <form onSubmit={submitHandler} className="space-y-3">
          <div className="form-control p-2 space-y-2">
            <label htmlFor="programmingLang">Add Your Text</label>
            <input
              defaultValue={updateItem?.textString || ""}
              className="border rounded-xl p-2 w-96 focus:outline-1 focus:outline-blue-600"
              id="programmingLang"
              ref={textStringRef}
            />
          </div>
          <button
            className="px-4 py-2 bg-green-500 rounded-xl text-white font-bold"
            type="submit"
          >
            {isUpdate ? "Update" : "Save"}
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default DOthers;
