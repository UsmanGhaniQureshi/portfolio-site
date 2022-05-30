import { useRef, useState } from "react";
import { FaTimes, FaTrashAlt, FaEdit, FaPlusSquare } from "react-icons/fa";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase.config";
import Modal from "../common/Modal";

const DWork = ({ items }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [updateItem, setUpdateItem] = useState(null);

  const [points, setPoints] = useState([]);
  const workedAsRef = useRef(null);
  const pointRef = useRef(null);

  const addPointHandler = () => {
    const point = pointRef.current.value;
    setPoints([...points, point]);
  };

  const removePointHandler = (point) => {
    setPoints(points.filter((p) => p !== point));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const workedAs = workedAsRef.current.value;
    let docRef;
    if (isUpdate) {
      docRef = doc(db, "work", updateItem.id);

      await updateDoc(docRef, {
        workedAs,
        points,
      });
    } else {
      docRef = collection(db, "work");
      await addDoc(docRef, {
        workedAs,
        points,
      });
    }

    setPoints([]);
    setIsModalOpen(false);
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "work", id));
    setIsModalOpen(false);
  };

  const handleUpdate = (item) => {
    setIsModalOpen(true);
    setIsUpdate(true);
    setUpdateItem(item);
    setPoints(item.points);
  };

  return (
    <>
      <div className="flex flex-1 items-center self-start justify-between ">
        <div className="flex  flex-wrap">
          {items.map((workItem) => (
            <div
              className="flex items-center justify-between bg-slate-400 w-40 h-10 m-2  text-white p-2 rounded-lg"
              key={workItem.id}
            >
              <div>{workItem.workedAs}</div>
              <div className="flex space-x-2">
                <FaTrashAlt onClick={() => handleDelete(workItem.id)} />
                <FaEdit onClick={() => handleUpdate(workItem)} />
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
        <form onSubmit={submitHandler} className="space-y-3">
          <div className="form-control p-2 space-y-2">
            <label htmlFor="degreeTitle">Worked Position</label>
            <input
              className="border rounded-xl p-2 w-96 focus:outline-1 focus:outline-blue-600"
              id="degreeTitle"
              defaultValue={updateItem?.workedAs || ""}
              ref={workedAsRef}
            />
          </div>
          <div className="form-control p-2 space-y-2">
            <label htmlFor="year">Point</label>
            <div className="flex items-center space-x-2">
              <input
                className="border rounded-xl p-2 w-96 focus:outline-1 focus:outline-blue-600"
                id="year"
                ref={pointRef}
              />
              <FaPlusSquare onClick={addPointHandler} />
            </div>
          </div>
          <div className="flex  items-center">
            {points.map((point, index) => (
              <div
                className="flex items-center bg-slate-700 text-white rounded-2xl p-2 m-1"
                key={index}
              >
                <p>{point}</p>
                <FaTimes onClick={() => removePointHandler(point)} />
              </div>
            ))}
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

export default DWork;
