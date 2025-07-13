import ProductCard from "./cardProduct";

interface Product {
  href: string;
  image: string;
  title: string;
  price: number;
  rating: number;
  sold: number;
  city: string;
  cod?: boolean;
}

interface ProductListProps {
  items: Product[];
  hasSearched: boolean;
}

export default function ProductList({ items, hasSearched }: ProductListProps) {
  if (hasSearched && items.length === 0) {
    return <div className="w-full text-center text-gray-500 text-sm py-10">Produk tidak ditemukan. Coba kata kunci atau kategori lain.</div>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
      {items.map((item, idx) => (
        <div key={idx} className="w-full h-full">
          <ProductCard {...item} />
        </div>
      ))}
    </div>
  );
}
