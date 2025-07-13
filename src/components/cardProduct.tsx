import Link from "next/link";

interface ProductCardProps {
  href: string;
  image: string;
  title: string;
  price: number;
  rating: number;
  sold: number;
  city: string;
  cod?: boolean;
}

const formatRupiah = (value: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  })
    .format(value)
    .replace(/\s+/g, "");
};

const ProductCard = ({ href, image, title, price, rating = 4.8, sold = 100, city, cod = true }: ProductCardProps) => {
  return (
    <Link href={href} className="block w-full h-full shadow-sm transition-transform duration-200 ease-in-out hover:scale-[1.01]">
      <div className="rounded-md flex flex-col h-full">
        <div className="w-full aspect-square rounded-md overflow-hidden border border-[#dddddd]">
          <img src={image} alt={title} className="w-full h-full object-cover" />
        </div>
        <div className="p-2 flex flex-col flex-grow">
          <div className="mt-1.5 font-medium text-gray-800 text-sm truncate">{title}</div>

          <div className="mt-0.5 font-semibold text-base md:text-lg">{formatRupiah(price)}</div>

          {cod && <div className="mt-1 text-[11px] text-orange-500 font-bold">Bisa COD</div>}

          <div className="mt-auto">
            <div className="flex items-center text-xs text-gray-600 gap-1">
              <span className="text-yellow-500 text-sm">★</span>
              <span>{rating}</span>
              <span>·</span>
              <span>{sold}+ terjual</span>
            </div>
            <div className="text-xs text-gray-500">{city}</div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
