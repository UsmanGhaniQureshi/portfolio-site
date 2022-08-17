import Circle from "../Circle";

const ListItem = ({ text, textStyle }) => {
  return (
    <div className="flex text-xs md:text-base  items-center space-x-2">
      <Circle />
      <p className={textStyle || "font-bold  text-orange-600"}>
        {text.charAt(0).toUpperCase() + text.slice(1)}
      </p>
    </div>
  );
};

export default ListItem;
