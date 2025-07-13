import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Avatar,
  Box,
} from "@mui/material";

// Tipe produk yang lengkap sesuai MockAPI
export type Product = {
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

// Struktur header tabel
type TableHeader = {
  title: string;
  value: keyof Product | "aksi";
  align: "left" | "center" | "right";
  width: string;
};

// Props untuk komponen
type TableCompProps = {
  tableHeaders: TableHeader[];
  tableData: Product[];
  renderCell: (row: Product, header: TableHeader) => React.ReactNode;
  onRowClick?: (row: Product) => void;
};

const TableComp: React.FC<TableCompProps> = ({
  tableHeaders,
  tableData,
  renderCell,
  onRowClick,
}) => {
  return (
    <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 2 }}>
      <Table sx={{ minWidth: 750 }} aria-label="tabel produk">
        <TableHead>
          <TableRow>
            {tableHeaders.map((header, index) => (
              <TableCell
                key={index}
                align={header.align}
                sx={{
                  fontWeight: "bold",
                  backgroundColor: "#F3F4F6",
                  minWidth: header.width,
                }}
              >
                {header.title}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {tableData.length > 0 ? (
            tableData.map((row) => (
              <TableRow
                key={row.id}
                hover
                onClick={() => onRowClick?.(row)}
                sx={{
                  transition: "background-color 0.2s",
                  cursor: onRowClick ? "pointer" : "default",
                  "&:hover": { backgroundColor: "#F9FAFB" },
                }}
              >
                {tableHeaders.map((header, colIndex) => (
                  <TableCell
                    key={colIndex}
                    align={header.align}
                    sx={{ minWidth: header.width }}
                  >
                    {header.value === "gambar" ? (
                      <Box display="flex" alignItems="center">
                        <Avatar
                          src={row.gambar}
                          variant="rounded"
                          sx={{ width: 60, height: 60, mr: 2 }}
                        />
                        <Typography variant="body2" noWrap>
                          {row.nama_barang}
                        </Typography>
                      </Box>
                    ) : (
                      renderCell(row, header)
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={tableHeaders.length}
                align="center"
                sx={{ py: 4 }}
              >
                <Typography variant="body1" color="text.secondary">
                  Tidak ada data produk yang tersedia.
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableComp;
