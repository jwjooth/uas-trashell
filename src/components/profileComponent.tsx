"use client";
import ProfileInfoComp from "./profileInfoComponent";
import { logout } from "@/app/(auth)/login/action";
import Avatar from '@mui/material/Avatar';
import { useEffect, useState } from "react";

const ProfileComp = () => {
    const [userId, setUserId] = useState<string | null>(null);
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [userNama, setUserNama] = useState<string | null>(null);
    const [userTelp, setUserTelp] = useState<string | null>(null);
    const [userAlamat, setUserAlamat] = useState<string | null>(null);

    useEffect(() => {
        fetch("/api/session")
        .then((res) => res.json())
        .then((data) => { setUserId(data.userId);})
        .catch(() => setUserId(null));
    }, []);

    useEffect(() => {
        if(!userId) return
        fetch(`/api/getUserById/${userId}`)
        .then((res) => res.json())
        .then((data) => { setUserNama(data.nama); setUserEmail(data.email); setUserTelp(data.telp); setUserAlamat(data.alamat)})
        .catch(() => { setUserNama(null); setUserEmail(null); setUserTelp(null); setUserAlamat(null)})
    }, [userId])

    function stringToColor(string: string) {
        // Tambahkan pengecekan null/undefined
        if (!string || string.length === 0) {
            return '#6b7280'; // gray-500 sebagai fallback
        }
        
        let hash = 0;
        let i;

        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }
        /* eslint-enable no-bitwise */

        return color;
    }

    function stringAvatar(name: string | null) {
        // Tambahkan pengecekan null dan fallback
        if (!name || name.trim().length === 0) {
            return {
                sx: {
                    bgcolor: '#6b7280', // gray-500
                },
                children: 'U', // U untuk User
            };
        }

        const nameParts = name.trim().split(' ');
        const initials = nameParts.length > 1 
            ? `${nameParts[0][0]}${nameParts[1][0]}` 
            : nameParts[0][0];

        return {
            sx: {
                bgcolor: stringToColor(name),
            },
            children: initials.toUpperCase(),
        };
    }

    return (
        <div className="bg-gradient-to-br from-slate-50 to-blue-100 min-h-screen font-sans text-gray-800">
            <div className="container mx-auto max-w-6xl p-5">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-5 animate-fadeInUp grid grid-cols-1 md:grid-cols-[300px_1fr] md:min-h-[500px]">
                    {/* <!-- Profile Header --> */}
                    <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-purple-600 text-white p-8 md:p-10 text-center flex flex-col justify-center items-center">
                        <Avatar {...stringAvatar(userNama) }/>
                        <div className="text-2xl md:text-3xl font-semibold mb-1 md:mb-2">
                            {userNama || 'Loading...'}
                        </div>
                        <div className="text-sm md:text-base opacity-90">Selamat datang di profil Anda</div>
                    </div>

                    {/* <!-- Profile Content --> */}
                    <div className="p-8 md:p-10">
                        {/* <!-- Info Profil Section --> */}
                        <div className="mb-8">
                            <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-5 flex items-center gap-3">
                                <div className="w-1 h-5 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full"></div>
                                Info Profil
                            </h2>
                            <div className="space-y-0">
                                <ProfileInfoComp label="nama" value={userNama || 'Loading...'}/>
                                <ProfileInfoComp label="email" value={userEmail || 'Loading...'}/>
                            </div>
                        </div>

                        {/* <!-- Divider --> */}
                        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-5"></div>

                        {/* <!-- Info Pribadi Section --> */}
                        <div className="mb-8">
                            <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-5 flex items-center gap-3">
                                <div className="w-1 h-5 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full"></div>
                                Info Pribadi
                            </h2>
                            <div className="space-y-0">
                                <ProfileInfoComp label="nomor telpon" value={userTelp || 'Loading...'}/>
                                <ProfileInfoComp label="Alamat Rumah" value={userAlamat || 'Loading...'}/>
                            </div>
                        </div>

                        {/* <!-- Action Buttons --> */}
                        {/* <div className="mt-8">
                            <ButtonSubmitComp label="edit profile"/>
                        </div> */}

                        {/* <!-- Logout and Delete Account Section --> */}
                        <div className="flex justify-between items-center mt-5 pt-5 border-t border-gray-200">
                            <button className="bg-gradient-to-r from-gray-500 to-gray-600 text-white py-2.5 md:py-3 px-5 md:px-6 rounded-lg font-medium text-sm md:text-base hover:from-gray-600 hover:to-gray-700 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300" onClick={()=>{logout()}}>
                                Logout
                            </button>
                            <button className="bg-transparent text-red-600 border border-red-600 py-2 px-4 rounded-lg font-medium text-xs md:text-sm opacity-70 hover:bg-red-600 hover:text-white hover:opacity-100 hover:-translate-y-0.5 transition-all duration-300" >
                                Hapus Akun
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ProfileComp;