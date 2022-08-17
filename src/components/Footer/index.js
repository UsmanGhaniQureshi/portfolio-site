import SocialLinks from "../common/SocialLinks";

const Footer = () => {
  return (
    <footer className="flex flex-col gap-3 items-center justify-center h-20 bg-slate-800 text-slate-100 ">
      <p className="font-bold">Designed By Usman Ghani</p>
      <div>
        <SocialLinks />
      </div>
    </footer>
  );
};

export default Footer;
