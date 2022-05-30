const Wave = ({ children, bg, text, clipPath }) => {
  return (
    <div
      className={`flex  flex-col w-full h-screen ${bg} ${text} `}
      style={{
        clipPath,
      }}
    >
      {children}
    </div>
  );
};

export default Wave;
