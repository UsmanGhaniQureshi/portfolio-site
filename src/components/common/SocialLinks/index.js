import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaWhatsapp,
  FaGithubAlt,
} from "react-icons/fa";

const SocialLinks = ({ classes }) => {
  return (
    <div className={`flex space-x-2 ${classes}`}>
      <a rel="noreferrer" href="https://www.facebook.com/usman.ghaniqureshi" target="_blank">
        <FaFacebook className="text-[#4267B2] bg-transparent" />
      </a>
      <a rel="noreferrer" href="https://twitter.com/Usman_Ghani_Se" target="_blank">
        <FaTwitter className="text-blue-400" />
      </a>
      <a rel="noreferrer" href="https://www.instagram.com/ugq_sumi/" target="_blank">
        <FaInstagram className="text-[#fb3958]" />
      </a>
      <a rel="noreferrer" href="https://wa.me/+923351495270" target="_blank">
        <FaWhatsapp className="text-[#34B7F1]" />
      </a>
      <a rel="noreferrer" href="https://github.com/UsmanGhaniQureshi" target="_blank">
        <FaGithubAlt className="text-[#171515 ]" />
      </a>
    </div>
  );
};

export default SocialLinks;
