"use client";

import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableRow, Typography, TableContainer, Paper, CircularProgress } from "@mui/material";

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
  harga: number;
  jumlah: number;
}

interface TransaksiGabungan {
  id_transaksi: string;
  id_pembeli: string;
  tanggal_transaksi: string;
  pembayaran: string;
  pengiriman: string;
  catatan: string;
  barang: DetilTransaksi[];
}

interface Product {
  id: string;
  id_user: string;
}

const HistorySummary = () => {
  const [data, setData] = useState<TransaksiGabungan[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
    useEffect(() => {
        fetch("/api/session")
        .then((res) => res.json())
        .then((data) => { setUserId(data.userId);})
        .catch(() => setUserId(null));
    }, []);

//   const id_user = "7"; // Ganti sesuai user login penjual

  useEffect(() => {
    if(!userId) return
    const fetchData = async () => {
      try {
        const [resTransaksi, resDetail, resProduk] = await Promise.all([
          fetch("https://686d2258c9090c4953855525.mockapi.io/transaksi"),
          fetch("https://686d2258c9090c4953855525.mockapi.io/detil-transaksi"),
          fetch("https://686d09ef14219674dcca2d9c.mockapi.io/products"),
        ]);

        const [transaksi, detil, produk]: [Transaksi[], DetilTransaksi[], Product[]] = await Promise.all([resTransaksi.json(), resDetail.json(), resProduk.json()]);

        const produkSaya = produk.filter((p) => p.id_user === userId);
        const idBarangSaya = produkSaya.map((p) => p.id);

        const transaksiFiltered = transaksi.filter((t) => t.catatan?.startsWith("CHECKED||") && detil.some((d) => d.id_transaksi === t.id && idBarangSaya.includes(d.id_barang)));

        const sorted = transaksiFiltered.sort((a, b) => new Date(b.tanggal_transaksi).getTime() - new Date(a.tanggal_transaksi).getTime());

        const result: TransaksiGabungan[] = sorted.map((t) => ({
          id_transaksi: t.id,
          id_pembeli: t.id_pembeli,
          tanggal_transaksi: t.tanggal_transaksi,
          pembayaran: t.pembayaran,
          pengiriman: t.pengiriman,
          catatan: t.catatan?.split("||")[1] || "-",
          barang: detil.filter((d) => d.id_transaksi === t.id && idBarangSaya.includes(d.id_barang)),
        }));

        setData(result);
      } catch (error) {
        console.error("Gagal mengambil data transaksi:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <Paper elevation={2} className="rounded-lg overflow-hidden">
      <div className="px-4 py-4">
        <Typography variant="h6" fontWeight="bold" className="text-gray-800 mb-2">
          📜 Riwayat Pemesanan
        </Typography>

        {loading ? (
          <div className="py-4 text-center text-gray-500">
            <CircularProgress size={24} />
          </div>
        ) : (
          <div style={{ maxHeight: 370, overflowY: "auto" }}>
            <TableContainer>
              <Table size="small">
                <TableHead sx={{ backgroundColor: "#f3f4f6" }}>
                  <TableRow>
                    <TableCell>
                      <strong>No</strong>
                    </TableCell>
                    <TableCell>
                      <strong>ID Transaksi</strong>
                    </TableCell>
                    <TableCell>
                      <strong>ID Pembeli</strong>
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
                      <strong>Pembayaran</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Pengiriman</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Tanggal</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Catatan</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((trx, idx) =>
                    trx.barang.map((item, i) => (
                      <TableRow key={`${trx.id_transaksi}-${item.id_barang}`}>
                        {i === 0 && (
                          <>
                            <TableCell rowSpan={trx.barang.length}>{idx + 1}</TableCell>
                            <TableCell rowSpan={trx.barang.length}>{trx.id_transaksi}</TableCell>
                            <TableCell rowSpan={trx.barang.length}>{trx.id_pembeli}</TableCell>
                          </>
                        )}
                        <TableCell>{item.id_barang}</TableCell>
                        <TableCell>{item.jumlah}</TableCell>
                        <TableCell>Rp{item.harga.toLocaleString("id-ID")}</TableCell>
                        {i === 0 && (
                          <>
                            <TableCell rowSpan={trx.barang.length}>{trx.pembayaran}</TableCell>
                            <TableCell rowSpan={trx.barang.length}>{trx.pengiriman}</TableCell>
                            <TableCell rowSpan={trx.barang.length}>
                              {new Date(trx.tanggal_transaksi).toLocaleString("id-ID", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </TableCell>
                            <TableCell rowSpan={trx.barang.length}>{trx.catatan}</TableCell>
                          </>
                        )}
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}
      </div>
    </Paper>
  );
};

export default HistorySummary;
