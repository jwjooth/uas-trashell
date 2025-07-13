"use server"
import Secret from "@/app/lib/secret";
import { redirect } from "next/navigation";
import { z } from "zod";

const registerSchema = z.object({
    nama: z
        .string()
        .min(1, { message: "Nama tidak boleh kosong" })
        .max(50, { message: "Nama maksimal 50 karakter" })
        .trim(),
    email: z
        .string()
        .email({ message: "Format email tidak valid" })
        .trim(),
    telp: z
        .string()
        .regex(/^[0-9]+$/, { message: "Nomor telepon hanya boleh angka" })
        .min(8, { message: "Nomor telepon minimal 8 digit" })
        .max(12, { message: "Nomor telepon maksimal 12 digit" })
        .trim(),
    alamat: z
        .string()
        .min(1, { message: "Alamat tidak boleh kosong" })
        .trim(),
    password: z
        .string()
        .min(8, { message: "Password minimal 8 karakter" })
        .trim(),
});

export async function register(prevState: any, formData: FormData){
    const secret = new Secret();
    const result = registerSchema.safeParse(Object.fromEntries(formData))

    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors,
            formData: Object.fromEntries(formData),
        };
    }
    const { nama, email, telp, alamat, password: plainPassword } = result.data;
    const encryptedPassword = secret.encrypt(plainPassword);

    try {
        console.log('📡 Trying to fetch from MockAPI...');
        const res = await fetch('https://686213cb96f0cc4e34b83a3f.mockapi.io/users');
        const users = await res.json();
        const emailExists = users.find((user: any) => user.email.toLowerCase() === email.toLowerCase());
        if (emailExists){
            return {
                errors: {
                    email: ['Email sudah terdaftar'],
                },
            };
        }
        const response = await fetch('https://686213cb96f0cc4e34b83a3f.mockapi.io/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nama, email, telp, alamat, password: encryptedPassword, role: "pembeli"
            }),
        });
        console.log('✅ Got response', response.status);
        const errorMessage = '';
        if (!response.ok){
            let errorMessage = 'Terjadi kesalahan saat register';
            try {
                const errorData = await response.json();
                if (errorData.message){
                    errorMessage = errorData.message;
                }
            } catch (e) {
                errorMessage = response.statusText || errorMessage;
            }
        }
        if (response.ok) {
            return { success: true }; // Jangan panggil redirect()
        }
    } catch (error) {
        console.error('Error during registration:', error);
        console.error('❌ Fetch failed:', error);
        return { fail: ['Terjadi kesalahan saat register. Silakan coba lagi.'], formData: Object.fromEntries(formData),};
        // throw error;
    }
}