import { useState } from "react";
import {
  FaGraduationCap,
  FaHistory,
  FaCode,
  FaChartBar,
  FaPalette,
} from "react-icons/fa";
import { usePortfolio } from "../../store/PortfolioContext";
import Badge from "../common/Badge";
import Bar from "../common/Bar";
import Divider from "../common/Divider";
import ListItem from "../common/ListItem";

const Resume = () => {
  const [selectedResumeArea, setSelectedResumeArea] = useState("Education");
  return (
    <div id="Resume" className="p-4 mt-5 w-[90%] mx-auto md:py-20">
      <div className="text-center space-y-2">
        <h1 className="font-extrabold text-3xl  ">Resume</h1>
        <Divider />
      </div>
      <div className="flex flex-col p-4 lg:flex-row">
        <div className="flex-none">
          <div className="flex  items-center">
            <div className="bg-black p-2 text-white">
              <FaGraduationCap className="w-8 h-8" />
            </div>
            <ResumeItem
              text="Education"
              tIndex={1}
              onClick={() => setSelectedResumeArea("Education")}
            />
          </div>
          <div className="flex items-center">
            <div className="bg-black p-2 text-white">
              <FaHistory className="w-8 h-8" />
            </div>

            <ResumeItem
              tIndex={2}
              text="Recent Work"
              onClick={() => setSelectedResumeArea("Recent Work")}
            />
          </div>

          <div className="flex items-center">
            <div className="bg-black p-2 text-white">
              <FaCode className="w-8 h-8" />
            </div>
            <ResumeItem
              text="Programming Skills"
              tIndex={3}
              onClick={() => setSelectedResumeArea("Programming Skills")}
            />
          </div>
          <div className="flex items-center">
            <div className="bg-black p-2 text-white">
              <FaChartBar className="w-8 h-8" />
            </div>
            <ResumeItem
              text="Projects"
              tIndex={4}
              onClick={() => setSelectedResumeArea("Projects")}
            />
          </div>
          <div className="flex items-center">
            <div className="bg-black p-2 text-white">
              <FaPalette className="w-8 h-8" />
            </div>
            <ResumeItem
              text="Interests"
              tIndex={5}
              onClick={() => setSelectedResumeArea("Interests")}
            />
          </div>
        </div>

        <div
          data-aos="zoom-in"
          className="flex-1 md:border-l-2 md:border-slate-900 md:shadow-[7px_0px_1px_-3px_rgba(0,0,0,0.75)]"
        >
          {selectedResumeArea === "Education" && <Education />}
          {selectedResumeArea === "Recent Work" && <RecentWork />}
          {selectedResumeArea === "Programming Skills" && <ProgrammingSkills />}
          {selectedResumeArea === "Projects" && <Projects />}
          {selectedResumeArea === "Interests" && <Interests />}
        </div>
      </div>
    </div>
  );
};

export default Resume;

const Education = () => {
  const { education } = usePortfolio();
  return (
    <div className="w-full mx-auto p-2 md:w-[90%] lg:w-[70%]">
      {education.map((item) => (
        <div key={item.id} className="flex flex-col">
          <div className="flex items-center justify-between">
            <ListItem text={item.degreeTitle} />
            <Badge text={item.year} />
          </div>
          <p className="ml-8">{item.institute}</p>
        </div>
      ))}
    </div>
  );
};

const RecentWork = () => {
  const { work } = usePortfolio();
  return (
    <div className="w-full mx-auto p-2 md:w-[90%] lg:w-[70%]">
      {work.map((w) => (
        <div key={w.id}>
          <h1 className="text-orange-600 font-extrabold">{w.workedAs}</h1>
          <div className="p-2">
            {w.points.map((point) => (
              <ListItem text={point} textStyle="text-black" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const ProgrammingSkills = () => {
  const { programmingSkills } = usePortfolio();
  return (
    <div className="w-full mx-auto p-2 md:w-[90%] lg:w-[70%]">
      {programmingSkills.map((skill) => (
        <div key={skill.id} className="flex flex-1 m-2  flex-col">
          <ListItem text={skill.language} textStyle="text-black" />
          <div className="mx-8">
            <Bar width={skill.experience} />
          </div>
        </div>
      ))}
    </div>
  );
};

const Projects = () => {
  const { projects } = usePortfolio();
  return (
    <div className="w-full text-[10px] md:text-sm mx-auto md:p-2 md:w-[90%] lg:w-[70%]">
      {projects.map((project) => (
        <div key={project.id} className="flex justify-between  border-b-2 p-2">
          <div>
            <ListItem text={project.projectName} />
            <div className="md:ml-10">
              <p>
                Technology Used :{" "}
                {project.technologyUsed.map((tech, index) =>
                  index === 0 ? " " + tech : " , " + tech
                )}
              </p>
              <p>{project.detail}</p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between">
            <Badge text={project.year} />
            {project.isWebUrl && (
              <a
                rel="noreferrer"
                target={"_blank"}
                href={project.webUrl}
                className="px-2 text-[10px]  md:w-24 font-bold text-center inline-block py-1 bg-slate-500 transition-colors duration-500 text-white md:text-xs border-none rounded-2xl hover:bg-slate-900"
              >
                Demo
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

const Interests = () => {
  const { interests } = usePortfolio();
  return (
    <div className="w-full mx-auto p-2 md:w-[90%] lg:w-[70%]">
      {interests.map((interest) => (
        <div key={interest.id}>
          <h1 className="text-orange-600 font-bold">{interest.interestIn}</h1>
          <p className="mx-10">{interest.interestDetail}</p>
        </div>
      ))}
    </div>
  );
};

const ResumeItem = ({ onClick, text, tIndex }) => {
  return (
    <div
      tabIndex={tIndex}
      className="mr-4 from-[black_50%] p-3 rounded-r-full via-[white_50%] bg-gradient-to-r w-80  transition-all duration-1000 bg-[length:200%_100%]  focus:text-white bg-right-bottom focus:bg-left-bottom"
      onClick={onClick}
    >
      {text}
    </div>
  );
};
