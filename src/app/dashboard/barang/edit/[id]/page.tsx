"use client";

import { useEffect, useState } from "react";
import {
    TextField,
    Button,
    Typography,
    CircularProgress,
    Alert,
} from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import Sidebar from "../../../../../components/Sidebar";
import Topbar from "../../../../../components/Topbar";

const EditProduk = () => {
    const { id } = useParams();
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
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`https://686d09ef14219674dcca2d9c.mockapi.io/products/${id}`);
                const data = await res.json();
                setForm({
                    nama_barang: data.nama_barang || "",
                    harga: String(data.harga || ""),
                    stok: String(data.stok || ""),
                    kategori: data.kategori || "",
                    kota: data.kota || "",
                    deskripsi: data.deskripsi || "",
                    gambar: data.gambar || "",
                });
            } catch (error) {
                console.error(error);
                setError("Gagal memuat data produk.");
            }
        };

        fetchData();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async () => {
        const { nama_barang, harga, stok, kategori, kota, deskripsi, gambar} = form;
        if (!nama_barang || !harga || !stok || !kategori || !kota || !deskripsi || !gambar) {
            setError("Semua field wajib diisi.");
            return;
        }

        setError("");
        setLoading(true);

        try {
            const res = await fetch(`https://686d09ef14219674dcca2d9c.mockapi.io/products/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...form,
                    harga: parseInt(harga),
                    stok: parseInt(stok),
                }),
            });

            if (!res.ok) throw new Error("Gagal menyimpan perubahan.");
            router.push("/dashboard/barang");
        } catch (error) {
            console.error(error);
            setError("Terjadi kesalahan saat menyimpan perubahan.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col lg:flex-row h-screen bg-[#f9fafb] text-white relative">
            {/* Sidebar */}
            <div className={`
        fixed inset-y-0 left-0 w-64 min-w-[240px] bg-white text-[#0F172A] z-40 h-screen
        transform transition-transform duration-300 ease-in-out border-r border-gray-200
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:static lg:translate-x-0 lg:z-10 shadow-xl lg:shadow-none flex flex-col h-screen overflow-y-auto`}>
                <Sidebar onClose={() => setSidebarOpen(false)} />
            </div>

            {sidebarOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-30 z-30" onClick={() => setSidebarOpen(false)} />
            )}

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <Topbar onMenuClick={() => setSidebarOpen(true)} sidebarOpen={sidebarOpen} />
                <main className="flex-1 px-4 py-6 sm:px-6 lg:px-10 overflow-y-auto">
                    <div className="bg-white text-[#0F172A] rounded-2xl shadow-lg border-l-4 border-[#3B82F6] p-6 max-w-5xl mx-auto">
                        <Typography variant="h5" fontWeight="bold" className="mb-6 pb-5">
                            ✏️ Edit Produk
                        </Typography>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[
                                { label: "Nama Barang", name: "nama_barang" },
                                { label: "Harga", name: "harga", type: "number" },
                                { label: "Stok", name: "stok", type: "number" },
                                { label: "Kategori", name: "kategori" },
                                { label: "Kota", name: "kota" },
                                { label: "URL Gambar", name: "gambar" },
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
                                    />
                                </div>
                            ))}
                            <div className="sm:col-span-2">
                                <TextField
                                    label="Deskripsi"
                                    name="deskripsi"
                                    value={form.deskripsi}
                                    onChange={handleChange}
                                    fullWidth
                                    multiline
                                    rows={4}
                                    required
                                />
                            </div>
                        </div>

                        {error && (
                            <Alert severity="error" className="mt-4">
                                {error}
                            </Alert>
                        )}

                        <div className="flex justify-end gap-3 mt-6">
                            <Button variant="outlined" onClick={() => router.back()}>
                                Batal
                            </Button>
                            <Button
                                variant="contained"
                                disabled={loading}
                                onClick={handleSubmit}
                                sx={{ backgroundColor: "#2563EB", color: "white" }}
                            >
                                {loading ? <CircularProgress size={20} color="inherit" /> : "Simpan Perubahan"}
                            </Button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default EditProduk;