const Button = ({ btnText, classes }) => {
  return (
    <a
      rel="noreferrer"
      href="#Contact"
      className={`px-5 py-2 text-sm font-bold text-center rounded-3xl ${classes}`}
    >
      {btnText}
    </a>
  );
};

export default Button;
