"use client";

import React, { useEffect, useState } from "react";
import { Button, Typography, TextField } from "@mui/material";
import Sidebar from "../../../components/Sidebar";
import Topbar from "../../../components/Topbar";
import ProductCard from "../../../components/ProductCard";
import type { Product } from "../../../components/ProductDashboard";
import { useRouter } from "next/navigation";

const AdminBarang = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/session")
      .then((res) => res.json())
      .then((data) => { 
        setUserId(data.userId);
      })
      .catch(() => setUserId(null));
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      // Jangan fetch jika userId belum tersedia
      if (!userId) return;
      
      try {
        setLoading(true);
        setError(null);
        
        const res = await fetch(`https://686d09ef14219674dcca2d9c.mockapi.io/products?id_user=${userId}`);
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const data = await res.json();
        console.log("Data produk:", data);
        
        // Pastikan data berupa array
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          console.error("Data yang diterima bukan array:", data);
          setProducts([]);
          setError("Format data tidak valid");
        }
      } catch (error) {
        console.error("Gagal memuat data produk:", error);
        setProducts([]);
        setError("Gagal memuat data produk");
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, [userId]);

  // Pastikan products selalu berupa array sebelum filter
  const filteredProducts = Array.isArray(products) 
    ? products.filter((p) => p.nama_barang.toLowerCase().includes(search.toLowerCase()))
    : [];

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-[#fbfbfb] text-white relative">
      {/* Sidebar */}
      <div
        className={`
        fixed inset-y-0 left-0 w-64 min-w-[240px] bg-white text-[#0F172A] z-40 h-screen
        transform transition-transform duration-300 ease-in-out border-r border-gray-200
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:static lg:translate-x-0 lg:z-10 shadow-xl lg:shadow-none
        flex flex-col h-screen overflow-y-auto`}
      >
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Overlay */}
      {sidebarOpen && <div className="fixed inset-0 bg-black bg-opacity-30 z-30" onClick={() => setSidebarOpen(false)} />}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar onMenuClick={() => setSidebarOpen(true)} sidebarOpen={sidebarOpen} />
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-10 overflow-y-auto">
          <div className="bg-white text-[#0F172A] rounded-2xl shadow-lg border-l-4 border-[#3B82F6] p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <Typography variant="h5" fontWeight="bold">
                🛒 Dashboard Produk
              </Typography>
              <TextField 
                label="Cari Nama Produk" 
                variant="outlined" 
                size="small" 
                value={search} 
                onChange={(e) => setSearch(e.target.value)} 
                sx={{ width: 250 }}
                disabled={loading}
              />
              <Button 
                variant="contained" 
                sx={{ backgroundColor: "#3B82F6", color: "white" }} 
                onClick={() => router.push("/dashboard/barang/tambah")}
                disabled={loading}
              >
                Tambah Produk
              </Button>
            </div>

            {/* Loading state */}
            {loading && (
              <div className="text-center py-8">
                <Typography>Memuat produk...</Typography>
              </div>
            )}

            {/* Error state */}
            {error && (
              <div className="text-center py-8">
                <Typography color="error">{error}</Typography>
              </div>
            )}

            {/* Products grid */}
            {!loading && !error && (
              <div className="w-full max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))
                ) : (
                  <div className="col-span-full text-center py-8">
                    <Typography>
                      {search ? `Tidak ada produk yang cocok dengan "${search}"` : "Tidak ada produk"}
                    </Typography>
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminBarang;