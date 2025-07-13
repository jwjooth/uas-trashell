"use client";

import { usePathname } from "next/navigation";
import { FaChartBar } from "react-icons/fa";
import { FaBox } from "react-icons/fa";
import { FaClipboardList } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";  
import { logout } from "@/app/(auth)/login/action";

interface SidebarProps {
    onClose?: () => void;
}

const Sidebar = ({ onClose }: SidebarProps) => {
    const pathname = usePathname();

    const isActive = (href: string) =>
        pathname === href
            ? "bg-gray-200 font-semibold text-blue-600"
            : "text-gray-700 hover:bg-gray-100";
    return (
        <aside className="h-full w-full max-w-[250px] bg-white p-6 space-y-8 fixed lg:relative z-50 shadow-md lg:shadow-none transition-all duration-300">
            {/* Close button for mobile */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 lg:hidden text-black hover:bg-gray-200 p-2 rounded-full cursor-pointer"
                aria-label="Close sidebar">
                ✕
            </button>

            {/* Brand */}
            <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-gray-800 tracking-wide">Trashell</h1>
            </div>

            {/* Menu */}
            <nav className="space-y-2">
                <p className="text-black text-sm mb-2">Menu</p>
                <ul className="space-y-1">
                    <li>
                        <a href="/dashboard" className={`flex items-center gap-3 py-2 px-4 rounded-lg ${isActive("/dashboard")}`}>
                            <FaChartBar className="text-black" />
                            <span className="text-sm">Laporan</span>
                        </a>
                    </li>
                    <li>
                        <a href="/dashboard/barang" className={`flex items-center gap-3 py-2 px-4 rounded-lg ${isActive("/dashboard/barang")}`}>
                            <FaBox className="text-black" />
                            <span className="text-sm">Barang</span>
                        </a>
                    </li>
                    <li>
                        <a href="/dashboard/pesanan" className={`flex items-center gap-3 py-2 px-4 rounded-lg ${isActive("/dashboard/pesanan")}`}>
                            <FaClipboardList className="text-black" />
                            <span className="text-sm">Pesanan</span>
                        </a>
                    </li>
                </ul>
            </nav>

            {/* Logout */}
            <div className="mt-auto">
                    <button className="flex items-center gap-3 w-full py-2 px-4 rounded-lg text-white bg-red-500 hover:bg-red-700 transition cursor-pointer" onClick={() => logout()}>
                        <FaSignOutAlt />
                        <span className="text-sm">Logout</span>
                    </button>
            </div>
        </aside>
    );
};

export default Sidebar;