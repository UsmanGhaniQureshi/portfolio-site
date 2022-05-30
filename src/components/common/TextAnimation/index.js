import Typewriter from "typewriter-effect";

const TextAnimation = ({ strings }) => {
  return (
    <span className="mx-1">
      <Typewriter
        options={{
          strings,
          autoStart: true,
          loop: true,
        }}
      />
    </span>
  );
};

export default TextAnimation;
