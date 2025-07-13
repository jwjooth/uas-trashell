interface MenuProps {
  title: string;
  image: string;
  onClick?: () => void;
}

const MenuCategory = ({ title, image, onClick }: MenuProps) => {
  return (
    <div onClick={onClick} className="inline-block cursor-pointer w-18 sm:w-20 md:w-24 lg:w-28 shrink-0 bg-[#fbfbfb] lg:bg-white text-[#000000] text-center hover:shadow-md transition duration-200 p-2 rounded-lg">
      <div className="w-full space-y-1.5">
        <div className="w-12 md:w-14 aspect-square mx-auto p-1.5 rounded-xl">
          <img src={image} alt={`icon-${title}`} className="w-full h-full object-contain" />
        </div>
        <div className="text-xs md:text-sm font-medium">{title}</div>
      </div>
    </div>
  );
};

export default MenuCategory;
