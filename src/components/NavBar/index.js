import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { usePortfolio } from "../../store/PortfolioContext";

const NavBar = () => {
  const [isShown, setIsShown] = useState(false);
  const { personalInfo } = usePortfolio();
  return (
    <div className="flex bg-slate-900 text-white sticky top-0 z-50  justify-between items-center font-bold p-6 flex-wrap font-sans">
      <div className=" text-2xl">
        <Link to={"/"}>{personalInfo.name}</Link>
      </div>
      <div onClick={() => setIsShown(!isShown)}>
        <FaBars className="h-9 absolute  right-4 top-6 md:hidden " />
      </div>
      <div
        className={
          "md:flex items-center" + (isShown ? "w-full flex" : " hidden")
        }
      >
        <nav
          className={
            "flex left-0 w-52 opacity-40 md:opacity-100 mt-20 md:mt-0 flex-col h-screen space-y-3 md:space-y-0 bg-black md:h-auto md:bg-transparent top-0  md:w-auto  fixed   md:flex-row list-none md:static"
          }
        >
          {isShown && (
            <div
              className="self-end hover:text-red-600 md:hidden"
              onClick={() => setIsShown(false)}
            >
              <FaTimes />
            </div>
          )}
          <li className="px-4 py-2 hover:bg-orange-800 hover:text-white transition-all duration-500">
            <a href="#Home">Home</a>
          </li>
          <li className="px-4 py-2 hover:bg-orange-800 hover:text-white transition-all duration-500">
            <a href="#About">About</a>
          </li>
          <li className="px-4 py-2 hover:bg-orange-800 hover:text-white transition-all duration-500">
            <a href="#Resume">Resume</a>
          </li>
          <li className="px-4 py-2 hover:bg-orange-800 hover:text-white transition-all duration-500">
            <a href="#Contact">Contact</a>
          </li>
        </nav>
      </div>
    </div>
  );
};

export default NavBar;
