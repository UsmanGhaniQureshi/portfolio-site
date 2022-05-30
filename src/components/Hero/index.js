import { Link } from "react-router-dom";
import { usePortfolio } from "../../store/PortfolioContext";
import SocialLinks from "../common/SocialLinks";
import TextAnimation from "../common/TextAnimation";

const Hero = () => {
  const { personalInfo, typeWriterStrings } = usePortfolio();
  return (
    <div
      id="Home"
      data-aos="zoom-in"
      className="flex py-20 px-5 text-white bg-slate-800 flex-1 flex-col justify-center items-center md:flex-row"
    >
      <div className="flex-1 text-center md:self-start md:my-16 order-1 md:-order-last">
        <SocialLinks classes="justify-center" />
        <div className="flex justify-center">
          A{" "}
          <TextAnimation
            strings={typeWriterStrings?.map((string) => string.textString)}
          />
        </div>
        <p>{personalInfo.heroText}</p>

        <div className="flex flex-col md:space-y-0 space-y-3  my-1 md:my-3 md:justify-center items-center md:flex-row ">
          <Link
            rel="noreferrer"
            target="_blank"
            to="/view-resume"
            className="border-solid  px-2 py-[7px] text-sm font-bold rounded-2xl md:m-3 w-40 border-2 border-indigo-600"
          >
            View Resume
          </Link>
          <a
            rel="noreferrer"
            target="_blank"
            href={personalInfo.resumeUrl}
            className="border-solid  px-2 py-[7px] text-sm font-bold rounded-2xl md:m-3 w-40 border-2 border-indigo-600"
          >
            Download Resume
          </a>
        </div>
      </div>
      <div className="flex-none my-4 md:my-0 md:self-start md:flex-1 border-none">
        <div className=" w-52 h-52 md:w-80 md:h-80 mx-auto px-2 py-1  rounded-full bg-white">
          <img
            src={personalInfo.imageUrl}
            className="w-full h-full object-cover rounded-full"
            alt={personalInfo.name}
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
