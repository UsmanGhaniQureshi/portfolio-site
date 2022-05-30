import { useRef, useState } from "react";
import { FaTrashAlt, FaEdit, FaPlusSquare } from "react-icons/fa";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase.config";
import Modal from "../common/Modal";

const DInterests = ({ items }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateItem, setUpdateItem] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);
  const interestInRef = useRef(null);
  const interestDetailRef = useRef(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    let docRef;

    if (isUpdate) {
      docRef = doc(db, "interests", updateItem.id);
      await updateDoc(docRef, {
        interestIn: interestInRef.current.value,
        interestDetail: interestDetailRef.current.value,
      });

      setIsUpdate(false);
      setUpdateItem(null);
    } else {
      docRef = collection(db, "interests");
      await addDoc(docRef, {
        interestIn: interestInRef.current.value,
        interestDetail: interestDetailRef.current.value,
      });
    }
    setIsModalOpen(false);
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "interests", id));
  };
  const handleUpdate = (item) => {
    setIsUpdate(true);
    setUpdateItem(item);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="flex flex-1 items-center self-start justify-between ">
        <div className="flex  flex-wrap">
          {items.map((interestItem) => (
            <div
              className="flex items-center justify-between bg-slate-400 w-40 h-10 m-2  text-white p-2 rounded-lg"
              key={interestItem.id}
            >
              <div>{interestItem.interestIn}</div>
              <div className="flex space-x-2">
                <FaTrashAlt onClick={() => handleDelete(interestItem.id)} />
                <FaEdit onClick={() => handleUpdate(interestItem)} />
              </div>
            </div>
          ))}
        </div>
        <div>
          <div className="flex-none">
            <FaPlusSquare
              onClick={() => setIsModalOpen(true)}
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
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="interestIn">Interest In</label>
            <input
              defaultValue={updateItem?.interestIn || ""}
              ref={interestInRef}
              id="interestIn"
              className="border rounded-xl p-2 w-96 focus:outline-1 focus:outline-blue-600"
            />
          </div>
          <div className="form-control">
            <label htmlFor="interestDetail">Detail About Interest</label>
            <input
              ref={interestDetailRef}
              defaultValue={updateItem?.interestDetail || ""}
              id="interestDetail"
              className="border rounded-xl p-2 w-96 focus:outline-1 focus:outline-blue-600"
            />
          </div>

          <button
            className="px-4 py-2 bg-green-500 rounded-xl text-white font-bold"
            type="submit"
          >
            {isUpdate ? "Update" : "Add"}
          </button>
        </form>
      </Modal>
    </>
  );
};

export default DInterests;
