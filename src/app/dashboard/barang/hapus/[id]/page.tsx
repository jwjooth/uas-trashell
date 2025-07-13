"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CircularProgress, Typography, Paper } from "@mui/material";
import DoneOutline from "@mui/icons-material/DoneOutline";

const HapusProduk = () => {
    const { id } = useParams();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [deleted, setDeleted] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const deleteProduct = async () => {
            try {
                const res = await fetch(`https://686d09ef14219674dcca2d9c.mockapi.io/products/${id}`, {
                    method: "DELETE",
                });

                if (!res.ok) {
                    const msg = await res.text();
                    throw new Error(`Gagal menghapus produk: ${msg}`);
                }

                setDeleted(true);
            } catch (err) {
                console.error("Delete error:", err);
                setError(true); // ❗ tangani error secara eksplisit
            } finally {
                setLoading(false);
                setTimeout(() => {
                    router.push("/dashboard/barang");
                }, 2000);
            }
        };

        deleteProduct();
    }, [id, router]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 text-[#0F172A]">
            <Paper elevation={4} className="p-10 rounded-2xl flex flex-col items-center shadow-lg">
                {loading && (
                    <>
                        <CircularProgress size={40} color="primary" />
                        <Typography variant="h6" className="mt-4 font-semibold">
                            Menghapus produk...
                        </Typography>
                    </>
                )}

                {!loading && deleted && (
                    <>
                        <DoneOutline style={{ fontSize: 48, color: "#10B981" }} />
                        <Typography variant="h6" className="mt-4 font-semibold">
                            Produk berhasil dihapus!
                        </Typography>
                        <Typography variant="body2" className="text-gray-500 mt-1">
                            Mengarahkan kembali ke dashboard...
                        </Typography>
                    </>
                )}

                {!loading && error && (
                    <>
                        <Typography variant="h6" className="mt-4 font-semibold text-red-600">
                            Gagal menghapus produk.
                        </Typography>
                        <Typography variant="body2" className="text-gray-500 mt-1">
                            Silakan coba lagi nanti.
                        </Typography>
                    </>
                )}
            </Paper>
        </div>
    );
};

export default HapusProduk;