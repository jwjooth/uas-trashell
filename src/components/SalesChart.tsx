import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface Transaksi {
  id: string;
  tanggal_transaksi: string;
}

interface SalesChartProps {
  transaksi: Transaksi[];
}

const SalesChart = ({ transaksi }: SalesChartProps) => {
  const [data, setData] = useState<{ name: string; count: number }[]>([]);

  useEffect(() => {
    // Ambil 7 hari terakhir
    const now = new Date();
    const daily = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(now);
      date.setDate(now.getDate() - (6 - i));
      return {
        dateKey: date.toISOString().split("T")[0],
        name: date.toLocaleDateString("id-ID", { day: "2-digit", month: "short" }),
        count: 0,
      };
    });

    transaksi.forEach((t) => {
      const tgl = t.tanggal_transaksi?.split("T")[0];
      const idx = daily.findIndex((d) => d.dateKey === tgl);
      if (idx !== -1) {
        daily[idx].count += 1;
      }
    });

    setData(daily);
  }, [transaksi]);

  return (
    <div className="bg-gradient-to-b from-white to-blue-50 p-6 rounded-xl shadow">
      <h3 className="text-lg font-semibold mb-4 text-slate-800">📊 Penjualan 7 Hari Terakhir</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="count" fill="#3B82F6" name="Penjualan" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesChart;
