"use client";
import { useActionState, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { login } from "@/app/(auth)/login/action";
import InputComp from "./inputComponent";
import InputPasswordComp from "./inputPasswordComponent";
import ButtonSubmitComp from "./buttonSubmitComponent";
import Link from "next/link";
import SideHeroComp from "./sideHeroComponent";


const Logincomp = () => {
  const [state, loginAction] = useActionState(login, undefined);
  const [showPassword, setShowPassword] = useState(false);
  const [roleUser, setRoleUser] = useState<string | null>(null);
  const router = useRouter();

  
  useEffect(() => {
    if (state?.success && state?.role === "penjual") {
      router.push("/dashboard");
    } else if (state?.success && state?.role === "pembeli") {
      router.push("/home");
    }
  }, [state?.success, roleUser])


  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Image/Element Section */}
      <SideHeroComp />

      {/* Form Section */}
      <div className="flex items-center justify-center p-8 bg-white">
          <div className="w-full max-w-md">
            {/* Header */}
              <div className="text-center mb-10">
                  <h1 className="text-4xl font-bold text-blue-600 mb-3">
                      Masuk
                  </h1>
                  <p className="text-gray-600">
                      Selamat datang kembali! Silakan masuk ke akun Anda
                  </p>
              </div>

            {/* Form */}
            <form action={loginAction} className="space-y-6">
              <InputComp label="Email" id="email" placeholder="masukan email anda" name="email" error={state?.errors?.email} defaultValue={state?.formData?.email ? String(state.formData.email) : ''}/>
              <InputPasswordComp label="Passwrod" id="password" placeholder="Password minimal 8 karakter" name="password" error={state?.errors?.password} defaultValue={state?.formData?.password ? String(state.formData.password) : ''}/>
              <ButtonSubmitComp label="Masuk"/>
            </form>

            {/* Footer */}
            <div className="text-center mt-8 pt-6 border-t border-gray-200">
              <p className="text-gray-600">
                Belum punya akun?{' '}
                <Link 
                  href="/register" 
                  className="text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                >
                  Daftar sekarang
                </Link>
              </p>
            </div>
          </div>
        </div>
    </div>
  );
}


export default Logincomp;