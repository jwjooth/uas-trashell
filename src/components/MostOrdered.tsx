"use client";

import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";

interface DetilTransaksi {
  id: string;
  id_transaksi: string;
  id_barang: string;
  harga: number;
  jumlah: number;
}

interface MostOrderedItem {
  id_barang: string;
  total: number;
  exampleTransaksiId: string;
}

interface MostOrderedProps {
  detailSaya: DetilTransaksi[];
}

export default function MostOrdered({ detailSaya }: MostOrderedProps) {
  const [items, setItems] = useState<MostOrderedItem[]>([]);

  useEffect(() => {
    if (!detailSaya || detailSaya.length === 0) return;

    const map = new Map<string, MostOrderedItem>();

    detailSaya.forEach((item) => {
      if (map.has(item.id_barang)) {
        const existing = map.get(item.id_barang)!;
        existing.total += item.jumlah;
      } else {
        map.set(item.id_barang, {
          id_barang: item.id_barang,
          total: item.jumlah,
          exampleTransaksiId: item.id_transaksi,
        });
      }
    });

    const sorted = Array.from(map.values())
      .sort((a, b) => b.total - a.total)
      .slice(0, 5);

    setItems(sorted);
  }, [detailSaya]);

  return (
    <Paper elevation={2} className="rounded-lg overflow-hidden">
      <div className="px-4 py-4">
        <Typography variant="h6" fontWeight="bold" className="text-gray-800 mb-2">
          🔥 Pesanan Terbanyak
        </Typography>
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
                  <strong>ID Barang</strong>
                </TableCell>
                <TableCell align="right">
                  <strong>Jumlah</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.length > 0 ? (
                items.map((item, index) => (
                  <TableRow key={item.id_barang} className="hover:bg-blue-50 transition duration-150 border-b">
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.exampleTransaksiId}</TableCell>
                    <TableCell>{item.id_barang}</TableCell>
                    <TableCell align="right">{item.total.toLocaleString("id-ID")}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    Belum ada data
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Paper>
  );
}
