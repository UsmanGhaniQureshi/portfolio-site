import { useRef, useState } from "react";

import {
  FaToggleOff,
  FaToggleOn,
  FaTrashAlt,
  FaEdit,
  FaPlusSquare,
} from "react-icons/fa";
import {
  addDoc,
  collection,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../firebase.config";
import Modal from "../common/Modal";

const DEducation = ({ items }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteid] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);
  const [updateItem, setUpdateItem] = useState(null);
  const [isResult, setIsResult] = useState(false);
  const degreeTitleRef = useRef(null);
  const yearRef = useRef(null);
  const instituteRef = useRef(null);
  const resultRef = useRef(null);

  //============================== Add New ===================================
  const submitHandler = async (e) => {
    e.preventDefault();
    let docRef;
    let data;
    if (isResult) {
      data = {
        degreeTitle: degreeTitleRef.current.value,
        year: yearRef.current.value,
        institute: instituteRef.current.value,
        result: resultRef.current.value,
      };
    } else {
      data = {
        degreeTitle: degreeTitleRef.current.value,
        year: yearRef.current.value,
        institute: instituteRef.current.value,
      };
    }
    if (isUpdate) {
      docRef = doc(db, "education", updateItem.id);
      await updateDoc(docRef, data);
      setUpdateItem(null);
      setIsUpdate(false);
    } else {
      docRef = collection(db, "education");
      await addDoc(docRef, data);
    }
    setIsModalOpen(false);
  };
  //============================== Update ===================================
  const handleUpdate = (item) => {
    setIsUpdate(true);
    setUpdateItem(item);
    setIsModalOpen(true);
  };

  //============================== Delete ===================================
  const handleDelete = async () => {
    await deleteDoc(doc(db, "education", deleteId));
    setDeleteid(null);
  };

  //============================== Close Modal Handler ===================================

  const modalCloseHandler = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="flex flex-1 items-center self-start justify-between ">
        <div className="flex  flex-wrap">
          {items.map((educationItem) => (
            <div
              className="flex items-center justify-between bg-slate-400 w-40 h-10 m-2  text-white p-2 rounded-lg"
              key={educationItem.id}
            >
              <div>{educationItem.degreeTitle}</div>
              <div className="flex space-x-2">
                <FaTrashAlt onClick={() => setDeleteid(educationItem.id)} />
                <FaEdit
                  onClick={() => handleUpdate(educationItem)}
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
                setIsUpdate(false);
                setUpdateItem(null);
                setIsModalOpen(true);
              }}
              className=" text-slate-600 transition-all duration-70 hover:text-slate-800 "
            />
          </div>
        </div>
      </div>
      <Modal visible={isModalOpen} onClose={modalCloseHandler}>
        <form onSubmit={submitHandler} className="space-y-3">
          <div className="form-control p-2 space-y-2">
            <label htmlFor="degreeTitle">Degree Title</label>
            <input
              className="border rounded-xl p-2 w-96 focus:outline-1 focus:outline-blue-600"
              id="degreeTitle"
              ref={degreeTitleRef}
              defaultValue={updateItem?.degreeTitle || ""}
            />
          </div>
          <div className="form-control p-2 space-y-2">
            <label htmlFor="year">Year</label>
            <input
              className="border rounded-xl p-2 w-96 focus:outline-1 focus:outline-blue-600"
              id="year"
              ref={yearRef}
              defaultValue={updateItem?.year || ""}
            />
          </div>
          <div className="form-control p-2 space-y-2">
            <label htmlFor="institute">Institute</label>
            <input
              className="border rounded-xl p-2 w-96 focus:outline-1 focus:outline-blue-600"
              id="institute"
              ref={instituteRef}
              defaultValue={updateItem?.institute || ""}
            />
          </div>
          {isResult === true ? (
            <FaToggleOn
              className="h-10 w-10 text-green-600"
              onClick={() => setIsResult(false)}
            />
          ) : (
            <FaToggleOff
              className="h-10 w-10 text-slate-900"
              onClick={() => setIsResult(true)}
            />
          )}

          {isResult && (
            <div className="form-control p-2 space-y-2">
              <label htmlFor="result">Percentage / CGPA</label>
              <input
                ref={resultRef}
                defaultValue={updateItem?.result || ""}
                id="result"
                className="border rounded-xl p-2 w-96 focus:outline-1 focus:outline-blue-600"
              />
            </div>
          )}
          <button
            className="px-4 py-2 bg-green-500 rounded-xl text-white font-bold"
            type="submit"
          >
            {isUpdate ? "Update" : "ADD"}
          </button>
        </form>
      </Modal>
      <Modal visible={!!deleteId} onClose={() => setDeleteid(null)}>
        <div className="p-4">
          <h1>Are You Sure You Want to Delete ?</h1>
          <div className="flex p-2 space-x-4 items-center justify-center">
            <button
              className="bg-green-500 text-white px-4 py-2 font-bold"
              onClick={handleDelete}
            >
              Yes
            </button>
            <button
              className="bg-slate-900 text-white px-4 py-2 font-bold"
              onClick={() => setDeleteid(null)}
            >
              No
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DEducation;
