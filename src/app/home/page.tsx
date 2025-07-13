"use client";

import AutoCarousel from "@/components/AutoCarousel";
import CategoryList from "@/components/CategoryList";
import ProductList from "@/components/productList";
import SimpleBottomNavigation from "@/components/bottomNavigation";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface RawProduct {
  id: string;
  nama_barang: string;
  gambar: string;
  harga: number;
  kota: string;
  kategori: string;
}

export default function Home() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const category = searchParams.get("category");
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    fetch("https://686d09ef14219674dcca2d9c.mockapi.io/products")
      .then((res) => res.json())
      .then((data: RawProduct[]) => {
        let filtered = data;

        if (name) {
          filtered = filtered.filter((p) => p.nama_barang.toLowerCase().includes(name.toLowerCase()));
        }

        if (category) {
          filtered = filtered.filter((p) => p.kategori.toLowerCase() === category.toLowerCase());
        }

        const mapped = filtered.map((item) => ({
          href: `/product/${item.id}`,
          image: item.gambar,
          title: item.nama_barang,
          price: item.harga,
          rating: 4.8,
          sold: 100,
          city: item.kota,
          cod: true,
        }));

        setProducts(mapped.sort(() => Math.random() - 0.5));
      });
  }, [name, category]);

  return (
    <>
      <div className="mt-26">
        <AutoCarousel />
      </div>

      <CategoryList />

      <div className="max-w-9/10 lg:max-w-4/5 mx-auto mb-12 mt-3 sm:mt-4 md:mt-8">
        <div className="text-left text-md md:text-xl font-bold mb-6">Pilihan Produk Untukmu</div>

        <ProductList items={products} hasSearched={!!name || !!category} />
      </div>

      <div className="block sm:hidden">
        <SimpleBottomNavigation />
      </div>
    </>
  );
}
