'use client';

import { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import Topbar from '../../components/Topbar';
import DashboardCards from '../../components/DashboardCards';
import SalesChart from '../../components/SalesChart';
import MostOrdered from '../../components/MostOrdered';
import HistorySummary from '../../components/HistorySummary';
import Welcome from '../../components/Welcome';

interface Transaksi {
  id: string;
  id_pembeli: string;
  tanggal_transaksi: string;
  pembayaran: string;
  pengiriman: string;
  catatan: string;
}

interface DetilTransaksi {
  id: string;
  id_transaksi: string;
  id_barang: string;
  jumlah: number;
  harga: number;
}

interface Product {
  id: string;
  id_user: string;
}

export default function DashboardPage() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [userName, setUserName] = useState<string | null>(null);
    const [transaksiPenjual, setTransaksiPenjual] = useState<Transaksi[]>([]);
    const [detailSaya, setDetailSaya] = useState<DetilTransaksi[]>([]);
    const [totalPesanan, setTotalPesanan] = useState(0);
    const [totalPendapatan, setTotalPendapatan] = useState(0);


    const [userId, setUserId] = useState<string | null>(null);
    useEffect(() => {
        fetch("/api/session")
        .then((res) => res.json())
        .then((data) => { setUserId(data.userId);})
        .catch(() => setUserId(null));
    }, []);

    useEffect(() => {
        fetch(`/api/getUsernameById/${userId}`)
        .then((res) => res.json())
        .then((data) =>  setUserName(data.nama))
        .catch(() => setUserName(null));
    }, [userId])
    

    useEffect(() => {
        if (!userId) return; // Jangan fetch jika userId belum tersedia{
    const fetchDashboardData = async () => {
      try {
        const id_user = userId; // atau ambil dari localStorage kalau dinamis
        const [resProduk, resTransaksi, resDetail] = await Promise.all([
          fetch("https://686d09ef14219674dcca2d9c.mockapi.io/products"),
          fetch("https://686d2258c9090c4953855525.mockapi.io/transaksi"),
          fetch("https://686d2258c9090c4953855525.mockapi.io/detil-transaksi"),
        ]);

        const products: Product[] = await resProduk.json();
        const detail: DetilTransaksi[] = await resDetail.json();

        const produkSaya = products.filter((p) => p.id_user === id_user);
        const idBarangSaya = produkSaya.map((p) => p.id);
        const filteredDetail = detail.filter((d) => idBarangSaya.includes(d.id_barang));
        setDetailSaya(filteredDetail); // ✅ Simpan detail saya ke state

        const transaksi: Transaksi[] = await resTransaksi.json();
        const transaksiSaya = transaksi.filter((t) => filteredDetail.some((d) => d.id_transaksi === t.id));
        setTransaksiPenjual(transaksiSaya);

        const pendapatan = filteredDetail.reduce((total, item) => total + item.harga * item.jumlah, 0);

        setTotalPesanan(filteredDetail.length);
        setTotalPendapatan(pendapatan);
      } catch (error) {
        console.error("Gagal memuat data dashboard:", error);
      }
    };

    fetchDashboardData();
  }, [userId]);

  return (
    <div className="flex flex-col lg:flex-row h-screen min-h-screen bg-[#fbfbfb] text-white relative">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 min-w-[240px] bg-white text-[#0F172A] z-40 h-screen
                transform transition-transform duration-300 ease-in-out border-r border-gray-200
                ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
                lg:static lg:translate-x-0 lg:z-10 shadow-xl lg:shadow-none
                flex flex-col h-screen overflow-y-auto`}
      >
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Overlay */}
      {sidebarOpen && <div className="fixed inset-0 bg-black bg-opacity-30 z-30 transition-opacity" onClick={() => setSidebarOpen(false)} />}

      {/* Konten Utama */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar onMenuClick={() => setSidebarOpen(true)} sidebarOpen={sidebarOpen} />
        <main className="flex-1 overflow-y-auto px-4 py-8 sm:px-6 lg:px-10 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Kolom kiri */}
            <div className="col-span-1 md:col-span-2 space-y-8">
              <div className="bg-white text-[#0F172A] rounded-2xl shadow-lg p-6 border-l-4 border-[#3B82F6]">
                <Welcome username={userName!} />
              </div>
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#e2e8f0]">
                <DashboardCards totalPendapatan={totalPendapatan} totalPesanan={totalPesanan} />
              </div>
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#e2e8f0]">
                <SalesChart transaksi={transaksiPenjual} />
              </div>
            </div>

            {/* Kolom kanan */}
            <div className="col-span-1 space-y-8">
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#e2e8f0]">
                <MostOrdered detailSaya={detailSaya} />
              </div>
              <div className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-[#3B82F6]">
                <HistorySummary />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}