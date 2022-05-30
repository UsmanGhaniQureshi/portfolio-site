import { useState } from "react";
import { FaCamera } from "react-icons/fa";
import DWork from "../components/Dashboard/DWork";
import DEducation from "../components/Dashboard/DEducation";
import DProject from "../components/Dashboard/DProjects";
import DInterests from "../components/Dashboard/DInterests";
import UploadImage from "../components/Dashboard/UploadImage";
import UploadResume from "../components/Dashboard/UploadResume";
import DPersonalInfo from "../components/Dashboard/DPersonalInfo";
import useAuth from "../store/AuthContext";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { Navigate } from "react-router-dom";
import { usePortfolio } from "../store/PortfolioContext";
import Modal from "../components/common/Modal";
import DProgramming from "../components/Dashboard/DProgramming";
import DOthers from "../components/Dashboard/DOthers";

const DashboardPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("personalInfo");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { loading, user } = useAuth();
  const {
    personalInfo,
    loading: dataLoading,
    education,
    work,
    programmingSkills,
    interests,
    projects,
    highlights,
    hobbies,
    typeWriterStrings,
  } = usePortfolio();

  const handlePhotoUpload = () => {
    setIsModalOpen(true);
    setSelectedCategory("uploadImage");
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (loading || dataLoading) return <LoadingSpinner />;
  else if (!loading && !user) return <Navigate to="/login" />;
  else
    return (
      <div className="py-2">
        <h1 className="text-center text-4xl p-1 font-bold">Dashboard</h1>
        <div className="flex">
          <div className="h-screen font-bold bg-slate-200">
            <div
              onClick={() => setSelectedCategory("personalInfo")}
              className="px-8 py-2 hover:bg-slate-400 hover:text-white transition-all duration-500"
            >
              Personal Information
            </div>
            <div
              onClick={() => setSelectedCategory("education")}
              className="px-8 py-2 hover:bg-slate-400 hover:text-white transition-all duration-500"
            >
              Education
            </div>
            <div
              onClick={() => setSelectedCategory("work")}
              className="px-8 py-2 hover:bg-slate-400 hover:text-white transition-all duration-500"
            >
              Work
            </div>
            <div
              onClick={() => setSelectedCategory("projects")}
              className="px-8 py-2 hover:bg-slate-400 hover:text-white transition-all duration-500"
            >
              Projects
            </div>
            <div
              onClick={() => setSelectedCategory("programming")}
              className="px-8 py-2 hover:bg-slate-400 hover:text-white transition-all duration-500"
            >
              Programming Skills
            </div>
            <div
              onClick={() => setSelectedCategory("resume")}
              className="px-8 py-2 hover:bg-slate-400 hover:text-white transition-all duration-500"
            >
              Update Resume
            </div>
            <div
              onClick={() => setSelectedCategory("interests")}
              className="px-8 py-2 hover:bg-slate-400 hover:text-white transition-all duration-500"
            >
              Interests
            </div>
            <div
              onClick={() => setSelectedCategory("others")}
              className="px-8 py-2 hover:bg-slate-400 hover:text-white transition-all duration-500"
            >
              Others
            </div>
          </div>

          <div className="flex justify-between  flex-1 p-6 bg-slate-300">
            <div className="flex flex-1 bg-white rounded-3xl p-3">
              {selectedCategory === "personalInfo" && (
                <DPersonalInfo personalInfo={personalInfo} />
              )}
              {selectedCategory === "education" && (
                <DEducation items={education} />
              )}
              {selectedCategory === "work" && <DWork items={work} />}
              {selectedCategory === "projects" && <DProject items={projects} />}

              {selectedCategory === "programming" && (
                <DProgramming items={programmingSkills} />
              )}

              {selectedCategory === "interests" && (
                <DInterests items={interests} />
              )}

              {selectedCategory === "resume" && <UploadResume />}
              {selectedCategory === "others" && (
                <DOthers
                  highlights={highlights}
                  hobbies={hobbies}
                  typewritertext={typeWriterStrings}
                />
              )}

              {selectedCategory === "uploadImage" && (
                <Modal visible={isModalOpen} onClose={handleCloseModal}>
                  <UploadImage onClose={handleCloseModal} />
                </Modal>
              )}
            </div>

            <div className="flex flex-none m-2 justify-between">
              <div className="relative w-20 h-20">
                <img
                  className="w-full h-full object-cover rounded-full"
                  alt={personalInfo.name}
                  src={personalInfo.imageUrl}
                />
                <div className="flex absolute items-center top-[70%] right-[10%] z-40 overflow-hidden justify-center text-slate-700 bg-slate-200 w-8 h-8 rounded-full ">
                  <FaCamera onClick={handlePhotoUpload} className=" " />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default DashboardPage;
