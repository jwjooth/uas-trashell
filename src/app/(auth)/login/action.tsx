"use server";

import { z } from "zod";
import { createSession, deleteSession} from "../../lib/session"
import { redirect } from "next/navigation";
import Secret from "@/app/lib/secret";

const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }).trim(),
    password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .trim(),
});

export async function login(prevState: any, formData: FormData) {
    const result = loginSchema.safeParse(Object.fromEntries(formData));

    if (!result.success) {
        return {
        errors: result.error.flatten().fieldErrors,
        formData: Object.fromEntries(formData),
        };
    }
    const { email, password } = result.data;

    try {
        const res = await fetch('https://686213cb96f0cc4e34b83a3f.mockapi.io/users');
        const users = await res.json();
        const user = users.find((user: any) => user.email === email);
        if(!user){
            return {
                errors: {
                    email: ["Invalid Email or password"],
                },
            };
        };

        const secret = new Secret();
        // const decrypted = secret.decrypt("faaa6ca321463a419ca9ff55fff4d605087b73bc76939ea373b2f8425c855cef");
        const decryptedPassword = secret.decrypt(user.password);
        console.log("Decrypted secret:", decryptedPassword);
        if (decryptedPassword === password) {
            await createSession(user.id, user.role, user.alamat);

            return { success: true, role: user.role};
        } else {
            return {
                errors: {
                    email: ["Invalid Email or password"],
                },
            };
        }
    } catch (error) {
        return { fail: ['Terjadi kesalahan saat register. Silakan coba lagi.'], formData: Object.fromEntries(formData)};
    }
}

export async function logout() {
    await deleteSession();
    redirect("/login");
}