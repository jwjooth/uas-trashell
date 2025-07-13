"use client"
// Update the import path below to the correct location of your 'register' action.
// For example, if the file is at 'src/app/(auth)/register/action.ts', use:
import { register } from "@/app/(auth)/register/action";
// Or adjust the path as needed based on your project structure.
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import InputComp from "./inputComponent";
import InputPasswordComp from "./inputPasswordComponent";
import ButtonSubmitComp from "./buttonSubmitComponent";
import Link from "next/link";
import SideHeroComp from "./sideHeroComponent";
const Registercomp = () =>{
  const [state, registerAction] = useActionState(register, undefined);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  useEffect(() => {
  if (state?.success) {
    router.push("/login");
  }
}, [state]);

  return (
  <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
    <SideHeroComp />
    <div className="flex items-center justify-center p-8 bg-white">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-600 mb-3">
            Daftar
          </h1>
          <p className="text-gray-600">
            Buat akun baru untuk memulai perjalanan Anda
          </p>
        </div>
        <form action={registerAction} className="space-y-5">
          <InputComp label="Nama" id="nama" placeholder="masukan nama anda" name="nama" error={state?.errors?.nama} defaultValue={state?.formData?.nama ? String(state.formData.nama) : ''}/>
          <InputComp label="Email" id="email" placeholder="masukan email anda" name="email" error={state?.errors?.email} defaultValue={state?.formData?.email ? String(state.formData.email) : ''}/>
          <InputPasswordComp label="Passwrod" id="password" placeholder="Password minimal 8 karakter" name="password" error={state?.errors?.password} defaultValue={state?.formData?.password ? String(state.formData.password) : ''}/>
          <InputComp label="Nomor telepon" id="telp" placeholder="Masukan nomor telepon anda" name="telp" error={state?.errors?.telp} defaultValue={state?.formData?.telp ? String(state.formData.telp) : ''}/>
          <InputComp label="Alamat Rumah" id="alamat" placeholder="masukan alamat anda" name="alamat" error={state?.errors?.alamat} defaultValue={state?.formData?.alamat ? String(state.formData.alamat) : ''}/>
          <ButtonSubmitComp label="Daftar" />
          {state?.fail && (
              <p className="text-red-500 text-xs font-medium mt-1">
                {state?.fail}
              </p>
            )}
        </form>
          <div className="text-center mt-6 pt-4 border-t border-gray-200">
            <p className="text-gray-600">
              Sudah punya akun?{' '}
              <Link 
                href="/login" 
                className="text-blue-600 font-semibold hover:text-blue-700 transition-colors"
              >
                Masuk sekarang
                </Link>
            </p>
          </div>
      </div>
    </div>
</div>
    );
} 


export default Registercomp;