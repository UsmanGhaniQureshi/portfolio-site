import { FaSpinner } from "react-icons/fa";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <FaSpinner className="w-52 h-52 animate-spin" />
    </div>
  );
};

export default LoadingSpinner;
