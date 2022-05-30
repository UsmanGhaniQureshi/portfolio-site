import { useRef, useState } from "react";
import {
  FaToggleOff,
  FaToggleOn,
  FaPlusSquare,
  FaTimes,
  FaTrashAlt,
  FaEdit,
} from "react-icons/fa";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase.config";
import Modal from "../common/Modal";
const DProject = ({ items }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateItem, setUpdateItem] = useState(null);
  const [isUpdate, setIsUpdate] = useState(null);
  const [isWebUrl, setIsWebUrl] = useState(false);
  const [technologyUsed, setTechnologyUsed] = useState([]);
  const projectNameRef = useRef(null);
  const yearRef = useRef(null);
  const techUsedRef = useRef(null);
  const detailRef = useRef(null);
  const webUrRef = useRef(null);

  const addTechHandler = () => {
    const technology = techUsedRef.current.value;
    setTechnologyUsed([...technologyUsed, technology]);
  };

  const removeTechHandler = (tech) => {
    setTechnologyUsed(
      technologyUsed.filter((technology) => technology !== tech)
    );
  };
  const submitHandler = async (e) => {
    e.preventDefault();

    let docRef;
    let data;
    if (isWebUrl) {
      data = {
        projectName: projectNameRef.current.value,
        year: yearRef.current.value,
        technologyUsed,
        isWebUrl: true,
        detail: detailRef.current.value,
        webUrl: webUrRef.current.value,
      };
    } else {
      data = {
        projectName: projectNameRef.current.value,
        year: yearRef.current.value,
        isWebUrl: false,
        technologyUsed,
        detail: detailRef.current.value,
      };
    }
    if (isUpdate) {
      docRef = doc(db, "projects", updateItem.id);
      await updateDoc(docRef, data);
      setIsUpdate(false);
      setUpdateItem(null);
    } else {
      docRef = collection(db, "projects");
      await addDoc(docRef, data);
    }
    setTechnologyUsed([]);
    setIsModalOpen(false);
  };

  const handleUpdate = (item) => {
    setIsUpdate(true);
    setUpdateItem(item);
    setTechnologyUsed(item.technologyUsed);
    setIsWebUrl(item.isWebUrl);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "projects", id));
  };
  return (
    <>
      <div className="flex flex-1 items-center self-start justify-between ">
        <div className="flex  flex-wrap">
          {items.map((project) => (
            <div
              className="flex items-center justify-between bg-slate-400 w-40 h-10 m-2  text-white p-2 rounded-lg"
              key={project.id}
            >
              <div>{project.projectName}</div>
              <div className="flex space-x-2">
                <FaTrashAlt onClick={() => handleDelete(project.id)} />
                <FaEdit onClick={() => handleUpdate(project)} />
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
          setIsWebUrl(null);
          setTechnologyUsed([]);
        }}
      >
        <form onSubmit={submitHandler} className="space-y-3">
          <div className="form-control p-2 space-y-2">
            <label htmlFor="projectTitle">Project Title</label>
            <input
              className="border rounded-xl p-2 w-96 focus:outline-1 focus:outline-blue-600"
              id="projectTitle"
              defaultValue={updateItem?.projectName || ""}
              ref={projectNameRef}
            />
          </div>
          <div className="form-control p-2 space-y-2">
            <label htmlFor="year">Year</label>
            <input
              className="border rounded-xl p-2 w-96 focus:outline-1 focus:outline-blue-600"
              id="year"
              defaultValue={updateItem?.year || ""}
              ref={yearRef}
            />
          </div>
          <div className="form-control p-2 space-y-2">
            <label htmlFor="institute">Tech Used</label>
            <div className="flex space-x-2 items-center">
              <input
                className="border rounded-xl p-2 w-96 focus:outline-1 focus:outline-blue-600"
                id="institute"
                ref={techUsedRef}
              />
              <FaPlusSquare onClick={addTechHandler} />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            Technology Used
            {technologyUsed.map((tech, index) => (
              <div
                key={index}
                className="flex bg-slate-800 text-white rounded-2xl p-2  items-center mx-2"
              >
                {tech}
                <FaTimes
                  className="mx-1"
                  onClick={() => removeTechHandler(tech)}
                />
              </div>
            ))}
          </div>
          {isWebUrl === true ? (
            <FaToggleOn
              className="h-10 w-10 text-green-600"
              onClick={() => setIsWebUrl(false)}
            />
          ) : (
            <FaToggleOff
              className="h-10 w-10 text-slate-900"
              onClick={() => setIsWebUrl(true)}
            />
          )}

          {isWebUrl && (
            <div className="form-control p-2 space-y-2">
              <label htmlFor="result">Website Url</label>
              <input
                ref={webUrRef}
                defaultValue={updateItem?.webUrl || ""}
                id="result"
                className="border rounded-xl p-2 w-96 focus:outline-1 focus:outline-blue-600"
              />
            </div>
          )}

          <div className="form-control p-2 space-y-2">
            <label htmlFor="aboutWebsite">About Website</label>
            <textarea
              ref={detailRef}
              defaultValue={updateItem?.detail || ""}
              id="aboutWebsite"
              className="border resize-none  rounded-xl p-2 w-96 focus:outline-1 focus:outline-blue-600 "
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

export default DProject;
