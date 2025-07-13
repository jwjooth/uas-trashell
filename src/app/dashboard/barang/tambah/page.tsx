"use client";

import { useState } from "react";
import {
    TextField,
    Button,
    Typography,
    Alert,
    CircularProgress,
} from "@mui/material";
import { useRouter } from "next/navigation";
import Sidebar from "../../../../components/Sidebar";
import Topbar from "../../../../components/Topbar";

const TambahProduk = () => {
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [form, setForm] = useState({
        nama_barang: "",
        harga: "",
        stok: "",
        kategori: "",
        kota: "",
        deskripsi: "",
        gambar: "",
        id_user: "USR-001", // default user ID (bisa dynamic nantinya)
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async () => {
        const { nama_barang, harga, stok, kategori, kota, deskripsi, gambar } = form;
        if (!nama_barang || !harga || !stok || !kategori || !kota || !deskripsi || !gambar) {
            setError("Semua field wajib diisi.");
            return;
        }

        setError("");
        setLoading(true);

        try {
            const res = await fetch("https://686d09ef14219674dcca2d9c.mockapi.io/products", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...form,
                    harga: parseInt(form.harga),
                    stok: parseInt(form.stok),
                }),
            });

            if (!res.ok) throw new Error("Gagal menambahkan produk.");
            router.push("/dashboard/barang");
        } catch (err) {
            console.error("Tambah produk error:", err);
            setError("Terjadi kesalahan saat menyimpan data.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col lg:flex-row h-screen bg-[#f9fafb] text-white relative">
            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 w-64 min-w-[240px] bg-white text-[#0F172A] z-40 h-screen
        transform transition-transform duration-300 ease-in-out border-r border-gray-200
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:static lg:translate-x-0 lg:z-10 shadow-xl lg:shadow-none flex flex-col overflow-y-auto`}>
                <Sidebar onClose={() => setSidebarOpen(false)} />
            </div>

            {/* Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-30 z-30 transition-opacity"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <Topbar onMenuClick={() => setSidebarOpen(true)} sidebarOpen={sidebarOpen} />
                <main className="flex-1 flex flex-col overflow-hidden px-4 py-6 sm:px-8 lg:px-12 bg-[#f1f5f9]">
                    <div className="bg-white text-[#0F172A] rounded-2xl shadow-xl border-l-[6px] border-l-[#3B82F6] p-8 max-w-5xl w-full mx-auto">
                        <Typography variant="h5" fontWeight="bold" className="mb-6 pb-4 text-[#1e293b] border-b border-gray-200">
                            ➕ Tambah Produk Baru
                        </Typography>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                            {[
                                { label: "Nama Barang", name: "nama_barang" },
                                { label: "Harga", name: "harga", type: "number" },
                                { label: "Stok", name: "stok", type: "number" },
                                { label: "Kategori", name: "kategori" },
                                { label: "Kota", name: "kota" },
                                { label: "Gambar (URL)", name: "gambar" },
                            ].map(({ label, name, type = "text" }) => (
                                <div key={name}>
                                    <TextField
                                        label={label}
                                        name={name}
                                        type={type}
                                        value={form[name as keyof typeof form]}
                                        onChange={handleChange}
                                        fullWidth
                                        required
                                        autoComplete="off"
                                        sx={{ backgroundColor: "#f8fafc", borderRadius: 1 }}
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="mb-6">
                            <TextField
                                label="Deskripsi Produk"
                                name="deskripsi"
                                value={form.deskripsi}
                                onChange={handleChange}
                                multiline
                                rows={4}
                                fullWidth
                                required
                                sx={{ backgroundColor: "#f8fafc", borderRadius: 1 }}
                            />
                        </div>

                        {error && (
                            <Alert severity="error" className="mb-6">
                                {error}
                            </Alert>
                        )}

                        <div className="flex justify-end gap-4">
                            <Button
                                variant="outlined"
                                color="secondary"
                                onClick={() => router.back()}
                                sx={{ px: 3, py: 1.5, borderRadius: 2 }}
                            >
                                Batal
                            </Button>
                            <Button
                                variant="contained"
                                disabled={loading}
                                onClick={handleSubmit}
                                sx={{
                                    px: 4,
                                    py: 1.5,
                                    borderRadius: 2,
                                    backgroundColor: "#2563EB",
                                    color: "white",
                                    textTransform: "none",
                                    "&:hover": {
                                        backgroundColor: "#1d4ed8",
                                    },
                                }}
                            >
                                {loading ? <CircularProgress size={20} color="inherit" /> : "Simpan"}
                            </Button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default TambahProduk;