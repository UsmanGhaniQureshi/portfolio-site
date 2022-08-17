import Typewriter from "typewriter-effect";

const TextAnimation = ({ strings }) => {
  return (
    <div className="font-bold text-xl md:text-2xl">
      <Typewriter
        options={{
          strings,
          autoStart: true,
          loop: true,
        }}
      />
    </div>
  );
};

export default TextAnimation;
