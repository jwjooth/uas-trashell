"use client";

import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Checkbox } from "@mui/material";
import Sidebar from "../../../components/Sidebar";
import Topbar from "../../../components/Topbar";

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

interface CombinedOrder {
  id: string;
  id_transaksi: string;
  id_barang: string;
  jumlah: number;
  harga: number;
  tanggal_transaksi: string;
  id_pembeli: string;
  pembayaran: string;
  pengiriman: string;
  catatan: string;
}

type Product = {
  id: string;
  nama_barang: string;
  harga: number;
  stok: number;
  kategori: string;
  kota: string;
  deskripsi: string;
  gambar: string;
  id_user: string;
};

export default function PesananPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [orders, setOrders] = useState<CombinedOrder[]>([]);
  const id_user = "10"; // Ubah sesuai login
  const [userId, setUserId] = useState<string | null>(null);
    useEffect(() => {
        fetch("/api/session")
        .then((res) => res.json())
        .then((data) => { setUserId(data.userId);})
        .catch(() => setUserId(null));
    }, []);
  useEffect(() => {
    if (!userId) return; // Jangan fetch jika userId belum tersedia
    const fetchOrders = async () => {
      try {
        const [resTransaksi, resDetail, resProducts] = await Promise.all([
          fetch(`https://686d2258c9090c4953855525.mockapi.io/transaksi`),
          fetch(`https://686d2258c9090c4953855525.mockapi.io/detil-transaksi`),
          fetch(`https://686d09ef14219674dcca2d9c.mockapi.io/products`),
        ]);

        const transaksi: Transaksi[] = await resTransaksi.json();
        const detail: DetilTransaksi[] = await resDetail.json();
        const allProducts: Product[] = await resProducts.json();

        const produkSaya = allProducts.filter((p) => p.id_user === userId);
        const idBarangSaya = produkSaya.map((p) => p.id);
        const detailSaya = detail.filter((d) => idBarangSaya.includes(d.id_barang));

        // Ambil hanya transaksi yang belum dichecklist
        const transaksiAktif = transaksi.filter((t) => !t.catatan?.startsWith("CHECKED||"));

        const combined: CombinedOrder[] = detailSaya
          .map((d) => {
            const t = transaksiAktif.find((t) => t.id === d.id_transaksi);
            if (!t) return null;
            return {
              id: d.id,
              id_transaksi: d.id_transaksi,
              id_barang: d.id_barang,
              jumlah: d.jumlah,
              harga: d.harga,
              tanggal_transaksi: t.tanggal_transaksi,
              id_pembeli: t.id_pembeli,
              pembayaran: t.pembayaran,
              pengiriman: t.pengiriman,
              catatan: t.catatan,
            };
          })
          .filter((x): x is CombinedOrder => x !== null);

        const sorted = combined.sort((a, b) => new Date(b.tanggal_transaksi).getTime() - new Date(a.tanggal_transaksi).getTime());

        setOrders(sorted);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      }
    };

    fetchOrders();
  }, [userId]);

  const handleDone = async (id: string) => {
    const selected = orders.find((o) => o.id === id);
    if (!selected) return;

    try {
      const res = await fetch(`https://686d2258c9090c4953855525.mockapi.io/transaksi/${selected.id_transaksi}`);
      const transaksi = await res.json();

      const originalNote = transaksi.catatan?.startsWith("CHECKED||") ? transaksi.catatan.split("||")[1] : transaksi.catatan;

      const updatedCatatan = `CHECKED||${originalNote || "-"}`;

      await fetch(`https://686d2258c9090c4953855525.mockapi.io/transaksi/${selected.id_transaksi}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ catatan: updatedCatatan }),
      });

      // Hapus dari daftar pesanan setelah checklist
      setOrders((prev) => prev.filter((o) => o.id !== id));
    } catch (err) {
      console.error("Gagal update transaksi:", err);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-[#fbfbfb] text-white relative">
      <div
        className={`fixed inset-y-0 left-0 w-64 min-w-[240px] bg-white text-[#0F172A] z-40 h-screen transform transition-transform duration-300 ease-in-out border-r border-gray-200 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:static lg:translate-x-0 lg:z-10 shadow-xl lg:shadow-none flex flex-col h-screen overflow-y-auto`}
      >
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar onMenuClick={() => setSidebarOpen(true)} sidebarOpen={sidebarOpen} />
        <main className="flex-1 flex flex-col overflow-hidden px-4 py-4 sm:px-6 lg:px-10">
          <div className="bg-white text-[#0F172A] rounded-2xl shadow-lg border-l-4 border-[#3B82F6] flex-1 min-h-0 flex flex-col">
            <div className="p-6">
              <Typography variant="h5" fontWeight="bold" className="text-[#0F172A] mb-2">
                📦 Daftar Pesanan Masuk
              </Typography>
            </div>

            <div className="flex-1 overflow-y-auto px-6 pb-6">
              <TableContainer component={Paper} className="rounded-xl shadow-sm border border-gray-100">
                <Table stickyHeader>
                  <TableHead sx={{ backgroundColor: "#f9fafb" }}>
                    <TableRow>
                      <TableCell>
                        <strong>Aksi</strong>
                      </TableCell>
                      <TableCell>
                        <strong>ID Transaksi</strong>
                      </TableCell>
                      <TableCell>
                        <strong>ID Barang</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Jumlah</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Harga</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Tanggal</strong>
                      </TableCell>
                      <TableCell>
                        <strong>ID Pembeli</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Pembayaran</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Pengiriman</strong>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orders.length > 0 ? (
                      orders.map((order) => (
                        <TableRow key={order.id} hover>
                          <TableCell>
                            <Checkbox onChange={() => handleDone(order.id)} color="primary" />
                          </TableCell>
                          <TableCell>{order.id_transaksi}</TableCell>
                          <TableCell>{order.id_barang}</TableCell>
                          <TableCell>{order.jumlah}</TableCell>
                          <TableCell>
                            <span className="font-medium text-green-600">Rp{order.harga.toLocaleString("id-ID")}</span>
                          </TableCell>
                          <TableCell>
                            {new Date(order.tanggal_transaksi).toLocaleString("id-ID", {
                              weekday: "short",
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </TableCell>
                          <TableCell>{order.id_pembeli}</TableCell>
                          <TableCell>{order.pembayaran}</TableCell>
                          <TableCell>{order.pengiriman}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={9} align="center">
                          Tidak ada pesanan
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
