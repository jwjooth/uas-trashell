"use client";
import { register } from "@/app/(auth)/register/action";
import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import InputComp from "./inputComponent";
import InputPasswordComp from "./inputPasswordComponent";
import ButtonSubmitComp from "./buttonSubmitComponent";
import Link from "next/link";
import SideHeroComp from "./sideHeroComponent";

type RegisterState = {
  success?: boolean;
  fail?: string | string[];
  role?: string;
  formData?: Record<string, FormDataEntryValue>;
  errors?: Record<string, string[]>;
} | undefined;

const Registercomp = () => {
  const [state, registerAction] = useActionState<RegisterState, FormData>(register, undefined);
  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      router.push("/login");
    }
  }, [state]);

  // Helper to safely get field value
  const getField = (name: string) => {
    const value = state?.formData?.[name];
    return typeof value === "string" ? value : "";
  };

  const getError = (name: string) => {
    return state?.errors?.[name];
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <SideHeroComp />
      <div className="flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-blue-600 mb-3">Daftar</h1>
            <p className="text-gray-600">Buat akun baru untuk memulai perjalanan Anda</p>
          </div>

          <form action={registerAction} className="space-y-5">
            <InputComp label="Nama" id="nama" name="nama" placeholder="masukan nama anda" error={getError("nama")} defaultValue={getField("nama")} />
            <InputComp label="Email" id="email" name="email" placeholder="masukan email anda" error={getError("email")} defaultValue={getField("email")} />
            <InputPasswordComp label="Password" id="password" name="password" placeholder="Password minimal 8 karakter" error={getError("password")} defaultValue={getField("password")} />
            <InputComp label="Nomor Telepon" id="telp" name="telp" placeholder="Masukan nomor telepon anda" error={getError("telp")} defaultValue={getField("telp")} />
            <InputComp label="Alamat" id="alamat" name="alamat" placeholder="Masukan alamat anda" error={getError("alamat")} defaultValue={getField("alamat")} />

            <ButtonSubmitComp label="Daftar" />

            {state?.fail && (
              Array.isArray(state.fail) ? (
                state.fail.map((msg, idx) => (
                  <p key={idx} className="text-red-500 text-xs font-medium mt-1">
                    {msg}
                  </p>
                ))
              ) : (
                <p className="text-red-500 text-xs font-medium mt-1">
                  {state.fail}
                </p>
              )
            )}
          </form>

          <div className="text-center mt-6 pt-4 border-t border-gray-200">
            <p className="text-gray-600">
              Sudah punya akun?{' '}
              <Link href="/login" className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">
                Masuk sekarang
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registercomp;