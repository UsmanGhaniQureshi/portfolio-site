import { Link } from "react-router-dom";
import { usePortfolio } from "../../store/PortfolioContext";
import Button from "../common/Button";
import Divider from "../common/Divider";
import ListItem from "../common/ListItem";

const About = () => {
  const { hobbies, highlights, personalInfo } = usePortfolio();
  return (
    <div className="p-4 w-[90%] md:w-3/4 mx-auto">
      <div className="text-center space-y-4">
        <h1
          id="About"
          className="text-xl md:text-3xl font-extrabold font-sans tracking-wider md:tracking-widest"
        >
          About Me
        </h1>
        <p>Why You Choose Me...</p>
        <Divider />
      </div>
      <div
        data-aos="zoom-in"
        className="flex flex-col lg:flex-row mt-4 shadow-[-3px_-1px_37px_-5px_rgba(0,0,0,0.75)]"
      >
        <div className="flex-1">
          <div className="w-full h-[400px] md:h-[40rem]">
            <img
              alt={personalInfo.name}
              src={personalInfo.imageUrl}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="flex flex-col flex-1 p-2 md:p-6">
          <p className="flex-1 antialiased text-sm md:text-base ">{personalInfo.about}</p>
          <div className="flex-1 space-y-2">
            <h1 className="font-bold md:font-extrabold text-sm md:text-lg text-orange-600">
              Here are few Highlights
            </h1>
            {highlights.map((item) => (
              <ListItem
                text={item.textString}
                key={item.id}
                textStyle="text-black"
              />
            ))}
          </div>

          <div className="flex flex-col my-1 md:my-3 md:justify-center items-center md:flex-row ">
            <Button
              btnText="Contact Me"
              classes="border-none m-2 w-36 text-white bg-black md:px-3 md:py-5"
            />
            <Link
              rel="noreferrer"
              target="_blank"
              to="/view-resume"
              className="px-4 py-2 text-center rounded-3xl  border-solid  md:m-3 w-36 border-2 border-indigo-600 md:px-3 md:py-3"
            >
              Get Resume
            </Link>
          </div>

          <div className="flex-none ">
            <h1 className="text-orange-600 font-extrabold">Hobbies</h1>
            <div className="flex justify-between px-2 flex-wrap">
              {hobbies.map((item) => (
                <ListItem
                  key={item.id}
                  text={item.textString}
                  textStyle="text-black"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
