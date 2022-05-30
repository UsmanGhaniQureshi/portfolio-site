const Badge = ({ text }) => {
  return (
    <span className="px-2 py-1 text-[8px] md:w-24 font-bold text-center inline-block  bg-orange-600 text-white md:text-xs border-none rounded-2xl">
      {text}
    </span>
  );
};

export default Badge;
