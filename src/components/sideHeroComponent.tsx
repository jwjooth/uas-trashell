"use client";
import Image from "next/image";

const SideHeroComp = () => {
    return (
        <div className="lg:flex items-center justify-center p-8 hidden bg-gradient-to-br from-[rgb(98,144,235)] via-[#e0e3e9] to-[#3a8dc4] min-h-screen">
                <Image
                    src="/trashell2.png"
                    alt="Trashell Logo"
                    width={500}
                    height={500}
                    className="mb-4 drop-shadow-zinc-500 saturate-150 contrast-200"
                    priority
                />
        </div>
    );
};

export default SideHeroComp;