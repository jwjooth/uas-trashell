"use client";

import { useRouter } from "next/navigation";
import MenuCategory from "@/components/menuCategory";

const categories = [
  { title: "Perabotan", image: "/kategori/kategori-perabotan.png" },
  { title: "Elektronik", image: "/kategori/kategori-elektronik.png" },
  { title: "Fashion", image: "/kategori/kategori-fashion.png" },
  { title: "Kecantikan", image: "/kategori/kategori-kecantikan.png" },
  { title: "Otomotif", image: "/kategori/kategori-otomotif.png" },
  { title: "Olahraga", image: "/kategori/kategori-olahraga.png" },
  { title: "Hobi", image: "/kategori/kategori-hobi.png" },
  { title: "Mainan", image: "/kategori/kategori-mainan.png" },
  { title: "Makanan", image: "/kategori/kategori-makanan.png" },
  { title: "Kesehatan", image: "/kategori/kategori-kesehatan.png" },
];

const CategoryList = () => {
  const router = useRouter();

  const handleClick = (category: string) => {
    router.push(`/home/?category=${encodeURIComponent(category)}`);
  };

  return (
    <div className="max-w-9/10 lg:max-w-4/5 mt-3 sm:mt-4 md:mt-8 mx-auto overflow-x-auto scrollbar-hide md:p-1 lg:bg-white lg:rounded-xl lg:border lg:border-[#e3e3e3]">
      <div className="flex flex-nowrap justify-between gap-2">
        {categories.map((item) => (
          <MenuCategory key={item.title} title={item.title} image={item.image} onClick={() => handleClick(item.title)} />
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
