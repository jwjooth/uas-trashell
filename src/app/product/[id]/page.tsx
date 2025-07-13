"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import CardCheckout from "@/components/cardCheckout";
import SimpleBottomNavigation from "@/components/bottomNavigation";
import { FaUserCircle } from "react-icons/fa";

interface Product {
  id: string;
  nama_barang: string;
  stok: number;
  deskripsi: string;
  harga: number;
  id_user: string;
  kategori: string;
  gambar: string;
  kota: string;
}

// User Penjual
interface User { //gk kepake cris
  id: string;
  nama: string;
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

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [user, setUser] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [showFullDesc, setShowFullDesc] = useState(false);

  useEffect(() => {
    if (!id) return;

    fetch(`https://686d09ef14219674dcca2d9c.mockapi.io/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Gagal fetch");
        return res.json();
      })
      .then((data) => setProduct(data))
      .catch((err) => {
        console.error(err);
        setProduct(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (!product?.id_user) return;

    fetch(`/api/getUsernameById/${product.id_user}`)
      .then((res) => {
        console.log("Fetching user data for ID:", product.id_user);
        
        if (!res.ok) throw new Error("Gagal fetch user");
        return res.json();
      })
      .then((data) => setUser(data.nama))
      .catch((err) => {
        console.error("Error user fetch:", err);
        setUser(null);
      });
  }, [product?.id_user]);

  if (loading) return <div className="p-4 text-center">Memuat produk...</div>;
  if (!product) return <div className="p-4 text-center text-red-500">Produk tidak ditemukan.</div>;

  return (
    <>
      <div className="mt-24 md:mt-28 mb-16">
        <div className="max-w-9/10 lg:max-w-4/5 mx-auto px-4 md:flex justify-center md:gap-8 mt-3 sm:mt-4 md:mt-6">
          <div className="md:w-1/3">
            <div className="aspect-square bg-gray-100 border border-[#c8c8c8] rounded overflow-hidden mb-4">
              <img src={product.gambar} alt={product.nama_barang} className="w-full h-full object-cover" />
            </div>

            <div className="mt-4 flex items-center bg-white p-3 rounded-md shadow-sm justify-between">
              <div className="flex items-center gap-3">
                <FaUserCircle className="w-8 h-8" />
                <div>
                  <div className="text-xs lg:text-sm font-semibold">{user}</div>
                  <div className="text-xs text-gray-600">{product.kota}</div>
                </div>
              </div>
              <button className="bg-[#3B82F6] text-sm px-6 py-2 rounded-md text-white cursor-pointer">Chat</button>
            </div>
          </div>

          <div className="md:w-1/2 mt-6 md:mt-0">
            <h1 className="text-lg md:text-xl lg:text-2xl font-semibold">{product.nama_barang}</h1>
            <div className="text-sm text-gray-600 mt-1">
              <span className="mr-4">Stok {product.stok}</span>
              <span className="mr-2 text-yellow-500">★</span>
              <span>4.7 · 100+ terjual</span>
            </div>

            <div className="text-2xl lg:text-3xl font-bold text-[#3B82F6] mt-3 md:mt-4">{formatRupiah(product.harga)}</div>

            <div className="mt-3 md:mt-6">
              <div className="font-semibold mb-1">Deskripsi</div>
              <div className="text-sm text-gray-700 leading-relaxed">
                {showFullDesc ? (
                  <>{product.deskripsi}</>
                ) : (
                  <>
                    {product.deskripsi.substring(0, 100)}...{" "}
                    <button onClick={() => setShowFullDesc(true)} className="text-blue-500 underline">
                      Lihat Selengkapnya
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="mt-3 md:mt-8">
              <div className="font-semibold mb-2">Ulasan Pembeli</div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold">4.7</span>
                <span className="text-gray-600">dari 5</span>
                <div className="flex text-yellow-500 ml-2">★★★★★</div>
              </div>

              <div className="flex flex-wrap gap-2 mt-4 text-sm">
                {["Semua", "5 Bintang", "4 Bintang", "3 Bintang", "2 Bintang", "1 Bintang", "Dengan Komentar", "Dengan Media"].map((label, i) => (
                  <button key={i} className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full cursor-pointer hover:bg-gray-300">
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <CardCheckout id={product.id} image={product.gambar} title={product.nama_barang} price={product.harga} />
      </div>

      <div className="block sm:hidden">
        <SimpleBottomNavigation />
      </div>
    </>
  );
}
