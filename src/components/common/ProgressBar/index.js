const ProgressBar = ({ percentage }) => {
  return (
    <div className="flex  justify-center items-center fixed inset-0 z-50 bg-black bg-opacity-30 backdrop-blur-sm">
      <div className="flex w-96 px-3 py-6 bg-white rounded-2xl h-2">
        <div
          className="h-full rounded-l-2xl"
          style={{
            backgroundColor: "green",
            width: percentage + "%",
            height: "8px",
          }}
        />
        <div className="bg-slate-800 flex-1 h-2 rounded-r-2xl" />
      </div>
    </div>
  );
};

export default ProgressBar;
