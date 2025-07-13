interface TopbarProps {
    onMenuClick?: () => void;
    title?: string;
    sidebarOpen?: boolean; // <- tambahkan ini
}

const Topbar = ({ onMenuClick, title = "Dashboard", sidebarOpen }: TopbarProps) => {
    return (
        <header className={`lg:flex justify-between items-center border-b px-4 py-3 bg-white/90 backdrop-blur shadow-sm sticky top-0 z-40 transition-all
        ${sidebarOpen ? 'hidden' : 'flex'}`}>
            {/* Hamburger menu (mobile only) */}
            <button
                onClick={onMenuClick}
                className="lg:hidden text-gray-600 hover:bg-gray-200 p-2 rounded-md transition cursor-pointer"
                aria-label="Open sidebar"
            >
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>

            {/* Title */}
            <h2 className="text-lg font-semibold text-gray-800 tracking-tight">{title}</h2>

            {/* Placeholder kanan */}
            <div className="w-6 h-6 lg:hidden" />
        </header>
    );
};

export default Topbar;