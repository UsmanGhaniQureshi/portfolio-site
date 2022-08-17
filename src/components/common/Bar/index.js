const Bar = ({ width }) => {
  return (
    <div title={width} className="flex flex-1 h-3 ">
      <div style={{ width }} className={"bg-orange-500"} />
      <div className="flex-1 bg-black" />
    </div>
  );
};

export default Bar;
