import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { FaPaperPlane } from "react-icons/fa";
import Divider from "../common/Divider";
import SocialLinks from "../common/SocialLinks";
import TextAnimation from "../common/TextAnimation";

const Contact = () => {
  const formRef = useRef();

  const [message, setMessage] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_wr7t9yf",
        "template_6dtyvup",
        formRef.current,
        "_TW_mvNfjF0axkGi6"
      )
      .then(
        (result) => {
          setMessage("Thanks For Contacting");
        },
        (error) => {
          console.log(error.text);
        }
      );

    setTimeout(() => setMessage(null), 3000);
  };

  return (
    <div id="Contact" className="p-4 w-[98%]  md:w-[90%] lg:w-4/5 mx-auto ">
      <div className="text-center p-3 space-y-4">
        <h1 className="text-3xl font-extrabold font-sans tracking-widest">
          Contact Me
        </h1>
        <p>Keep in Touch With me...</p>
        <Divider />
      </div>
      <div
        data-aos="zoom-in"
        className=" p-3 bg-slate-700 text-white  rounded-3xl"
      >
        <div className="flex text-2xl md:text-4xl font-bold">
          Get In Touch With Me <TextAnimation strings={[]} />
        </div>
        <div className="flex flex-col py-3  md:flex-row">
          <div className="flex flex-col flex-1">
            <SocialLinks />
            <p className="tracking-[0.1rem] md:tracking-[0.2rem] lg:tracking-[0.4rem] md:mt-[20%]">
              Send Your Email Here !
            </p>
          </div>

          <form
            ref={formRef}
            onSubmit={submitHandler}
            className="flex-1 font-bold p-3 md:p-6  text-white  bg-slate-400 rounded-3xl "
          >
            {message && <p>{message}</p>}
            <input name="to_name" type="hidden" value="Usman Ghani Qureshi" />
            <div className="form-control">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="from_name"
                type="text"
                placeholder="Your Name"
                className="border  transition-all p-2 md:p-3 text-black focus:outline focus:outline-orange-500  rounded-xl"
              />
            </div>
            <div className="form-control">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                name="from_email"
                placeholder="Your Email"
                className="border transition-all  p-2 md:p-3 text-black focus:outline focus:outline-orange-500  rounded-xl"
              />
            </div>
            <div className="form-control">
              <label htmlFor="message">Your Message</label>
              <textarea
                name="message"
                id="message"
                placeholder="Your Message"
                className="border transition-all resize-none   p-2 md:p-3 text-black focus:outline focus:outline-orange-500  rounded-xl"
              />
            </div>
            <button
              type="submit"
              className="flex items-center my-2 px-3 py-2 bg-orange-600  text-white rounded-3xl"
            >
              Send <FaPaperPlane className="mx-2" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
