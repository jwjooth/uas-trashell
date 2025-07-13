interface WelcomeProps {
    username: string;
}

const Welcome = ({ username }: WelcomeProps) => {
    return (
        <section className="w-full px-4 py-8 sm:px-6 md:px-8 bg-gradient-to-br from-[#e0f2fe] via-white to-[#dbeafe] shadow-lg rounded-2xl animate-fade-in">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 tracking-tight flex items-center gap-2">
                    🚀 Selamat datang, <span className="text-blue-600">{username}</span>!
                </h1>
                <p className="text-sm sm:text-base text-gray-600 mt-2">
                    Semoga harimu luar biasa! Yuk, maksimalkan produktivitasmu hari ini 🌟
                </p>
            </div>
        </section>
    );
};

export default Welcome;