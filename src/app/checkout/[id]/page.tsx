"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import RadioButtonCheckout, { Plan } from "@/components/radioButtonCheckout";
import SimpleBottomNavigation from "@/components/bottomNavigation";
import CustomAlert from "@/components/alertCheckout";
import { FaCheck } from "react-icons/fa6";
import { MdErrorOutline } from "react-icons/md";

interface Product {
  id: string;
  nama_barang: string;
  stok: number;
  deskripsi: string;
  harga: number;
  id_user: string;
  kategori: string;
  gambar: string;
  kota: string;
}

interface User {
  userId: string;
  alamat: string;
}

const jasaKirim: Plan[] = [
  { name: "JNE Express", deskripsi: "Estimasi 2-3 hari kerja", image: "/pengiriman/jne.png" },
  { name: "SiCepat Reguler", deskripsi: "Estimasi 1-2 hari kerja", image: "/pengiriman/sicepat.png" },
  { name: "AnterAja", deskripsi: "Estimasi 1-3 hari kerja", image: "/pengiriman/anteraja.jpg" },
  { name: "JNT", deskripsi: "Reguler 1-3 hari kerja", image: "/pengiriman/jnt.png" },
  { name: "Pos Indonesia", deskripsi: "Reguler Ekonomi", image: "/pengiriman/posindonesia.png" },
];

const metodeBayar: Plan[] = [
  { name: "BCA", deskripsi: "Transfer Virtual Account", image: "/pembayaran/bca.jpg" },
  { name: "BNI", deskripsi: "Transfer Virtual Account", image: "/pembayaran/bni.png" },
  { name: "Mandiri", deskripsi: "Transfer Virtual Account", image: "/pembayaran/mandiri.png" },
  { name: "BRI", deskripsi: "Transfer VA", image: "/pembayaran/bri.png" },
  { name: "Gopay", deskripsi: "Dompet Digital", image: "/pembayaran/gopay.png" },
];

const formatRupiah = (value: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  })
    .format(value)
    .replace(/\s+/g, "");
};

export default function CheckoutPage() {
  const { id } = useParams();
  const [jumlah, setJumlah] = useState<number>(1);
  const [catatan, setCatatan] = useState<string>("");
  const [product, setProduct] = useState<Product | null>(null);
  const [alamatUser, setAlamatUser] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [pengiriman, setPengiriman] = useState<Plan>(jasaKirim[0]);
  const [pembayaran, setPembayaran] = useState<Plan>(metodeBayar[0]);
  const [harga, setHarga] = useState<number>(0);

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const jumlahPesanan = sessionStorage.getItem("checkoutQuantity");
    const hargaPesanan = sessionStorage.getItem("checkoutPrice");

    if (jumlahPesanan) setJumlah(parseInt(jumlahPesanan));
    if (hargaPesanan) setHarga(parseInt(hargaPesanan));
  }, []);

  useEffect(() => {
    if (!id) return;
    fetch(`https://686d09ef14219674dcca2d9c.mockapi.io/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Gagal fetch");
        return res.json();
      })
      .then((data) => setProduct(data))
      .catch((err) => {
        console.error(err);
        setProduct(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (!product?.id_user) return;
    fetch(`/api/session`)
      .then((res) => {
        if (!res.ok) throw new Error("Gagal fetch user");
        return res.json();
      })
      .then((data) => {setAlamatUser(data.alamat); setUserId(data.userId);})
      .catch((err) => {
        console.error("Error user fetch:", err);
        setAlamatUser(null);
        setUserId(null);
      });
  }, [product?.id_user]);

  if (loading) return <div className="p-4 text-center">Memuat produk...</div>;
  if (!product) return <div className="p-4 text-center text-red-500">Produk tidak ditemukan.</div>;

  const handleBayar = async () => {
    if (!product) return;

    const tanggalSekarang = new Date().toISOString();
    const sisaStok = product.stok - jumlah;

    try {
      await fetch(`https://686d09ef14219674dcca2d9c.mockapi.io/products/${product.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          stok: sisaStok,
        }),
      });

      const transaksiResponse = await fetch("https://686d2258c9090c4953855525.mockapi.io/transaksi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tanggal_transaksi: tanggalSekarang,
          id_pembeli: userId,
          pembayaran: pembayaran.name,
          pengiriman: pengiriman.name,
          catatan: catatan,
        }),
      });

      const transaksiData = await transaksiResponse.json();

      await fetch("https://686d2258c9090c4953855525.mockapi.io/detil-transaksi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_transaksi: transaksiData.id,
          id_barang: product.id,
          harga: harga,
          jumlah: jumlah,
        }),
      });

      sessionStorage.removeItem("checkoutQuantity");
      sessionStorage.removeItem("checkoutPrice");

      setSuccessMessage("Transaksi berhasil! Pesanan Anda sedang diproses.");
      setErrorMessage(null);
    } catch (error) {
      console.error("Gagal melakukan transaksi:", error);
      setErrorMessage("Terjadi kesalahan saat memproses pesanan. Mohon ulangi beberapa saat lagi.");
      setSuccessMessage(null);
    }
  };

  return (
    <>
      <div className="mt-14 md:mt-16 mb-4 md:mb-10 max-w-5xl mx-auto px-4 py-8">
        {successMessage && (
          <CustomAlert //
            icon={<FaCheck fontSize="inherit" />}
            severity="success"
            message={successMessage}
            onClose={() => setSuccessMessage(null)}
            className="mb-4"
          />
        )}

        {errorMessage && (
          <CustomAlert //
            icon={<MdErrorOutline fontSize="inherit" />}
            severity="error"
            message={errorMessage}
            onClose={() => setErrorMessage(null)}
            className="mb-4"
          />
        )}

        <h1 className="text-2xl font-semibold mb-5">Checkout</h1>
        <div className="mt-3 border border-gray-300 rounded-lg p-6 grid grid-cols-1 lg:grid-cols-3 gap-6 bg-white shadow-sm">
          <div className="space-y-4 lg:col-span-2">
            <div>
              <h2 className="font-semibold mb-2">Alamat</h2>
              <p className="text-sm text-gray-700">{alamatUser}</p>
            </div>

            <div>
              <h2 className="font-semibold mb-2">Pilih Jasa Pengiriman</h2>
              <RadioButtonCheckout plans={jasaKirim} selected={pengiriman} onChange={setPengiriman} />
            </div>

            <div>
              <label className="font-semibold">Catatan:</label>
              <textarea className="w-full border mt-2 rounded-md p-2 text-sm" placeholder="Tuliskan catatan untuk penjual" value={catatan} onChange={(e) => setCatatan(e.target.value)} />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="font-semibold mb-2">Metode Pembayaran</h2>
              <RadioButtonCheckout plans={metodeBayar} selected={pembayaran} onChange={setPembayaran} />
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between text-sm mb-2">
                <span>Total Pesanan</span>
                <span>{jumlah}</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span>Subtotal Pesanan</span>
                <span>{formatRupiah(harga * jumlah)}</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span>Subtotal Pengiriman</span>
                <span>Rp5.000</span>
              </div>
              <div className="flex justify-between font-semibold text-lg">
                <span>Total Tagihan</span>
                <span>{formatRupiah(harga * jumlah + 5000)}</span>
              </div>
            </div>

            <button className="w-full bg-[#3B82F6] hover:bg-[#3b5df6] text-white py-2 md:py-3 px-4 rounded-md transition duration-200 cursor-pointer" onClick={handleBayar}>
              Bayar Sekarang
            </button>
          </div>
        </div>
      </div>

      <div className="block sm:hidden">
        <SimpleBottomNavigation />
      </div>
    </>
  );
}
