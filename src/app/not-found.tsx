// app/not-found.tsx
"use client";

import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6 text-center">
      <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
      <p className="text-xl md:text-2xl font-semibold text-gray-800 mb-2">Halaman tidak ditemukan</p>
      <p className="text-gray-600 text-sm md:text-base mb-6 max-w-md">Maaf, halaman yang kamu cari tidak tersedia atau telah dipindahkan. Coba kembali ke beranda atau cari produk lain.</p>
      <button onClick={() => router.push("/")} className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">
        Kembali ke Beranda
      </button>
    </div>
  );
}
