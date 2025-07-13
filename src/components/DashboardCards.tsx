import { FaMoneyBillWave, FaClipboardList } from "react-icons/fa";

interface DashboardCardsProps {
  totalPendapatan: number;
  totalPesanan: number;
}

const DashboardCards = ({ totalPendapatan, totalPesanan }: DashboardCardsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
      {/* Kartu Pendapatan */}
      <div className="bg-white p-6 rounded-xl shadow group hover:shadow-md transition border-b-4 border-green-500 shadow-neutral-500">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-black mb-1">Pendapatan</p>
            <h3 className="text-2xl font-bold text-gray-800">Rp {(totalPendapatan ?? 0).toLocaleString("id-ID")}</h3>
            <p className="text-xs text-gray-500 mt-1">Total akumulasi saat ini</p>
          </div>
          <FaMoneyBillWave className="text-green-500 text-3xl group-hover:scale-105 transition" />
        </div>
      </div>

      {/* Kartu Pesanan */}
      <div className="bg-white p-6 rounded-xl shadow group hover:shadow-md transition border-b-4 border-red-500 shadow-neutral-500">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-black mb-1">Pesanan</p>
            <h3 className="text-2xl font-bold text-gray-800">{totalPesanan ?? 0}</h3>
            <p className="text-xs text-gray-500 mt-1">Total seluruh pesanan masuk</p>
          </div>
          <FaClipboardList className="text-red-500 text-3xl group-hover:scale-105 transition" />
        </div>
      </div>
    </div>
  );
};

export default DashboardCards;
