import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { FiPhoneCall } from "react-icons/fi";
import { GrLocation } from "react-icons/gr";
import { FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <footer className="bg-white w-full relative border-t border-gray-300">
        <div className="mx-auto max-w-screen-xl px-4 pt-16 pb-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div>
              <div className="flex justify-center text-black sm:justify-start">
                <img src="/trashell.png" alt="logo-trashell" className="h-8" />
              </div>

              <p className="mt-6 max-w-md text-center leading-relaxed text-gray-500 sm:max-w-xs sm:text-left">Temukan produk pilihan terbaik dengan harga terjangkau dan pelayanan cepat hanya di Trashell</p>

              <ul className="mt-8 flex justify-center gap-6 sm:justify-start md:gap-8">
                <li>
                  <a href="#" rel="noreferrer" target="_blank" className="text-[#1877F2] transition hover:text-[#1877F2]/75">
                    <span className="sr-only">Facebook</span>
                    <FaFacebook className="size-6" />
                  </a>
                </li>

                <li>
                  <a href="#" rel="noreferrer" target="_blank" className="text-[#E4405F] transition hover:text-[#E4405F]/75">
                    <span className="sr-only">Instagram</span>
                    <FaInstagram className="size-6" />
                  </a>
                </li>

                <li>
                  <a href="#" rel="noreferrer" target="_blank" className="text-[#1DA1F2] transition hover:text-[#1DA1F2]/75">
                    <span className="sr-only">Twitter</span>
                    <FaTwitter className="size-6" />
                  </a>
                </li>

                <li>
                  <a href="#" rel="noreferrer" target="_blank" className="text-[#25d366] transition hover:text-[#25d366]/75">
                    <span className="sr-only">WhatsApp</span>
                    <FaWhatsapp className="size-6" />
                  </a>
                </li>
              </ul>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 lg:col-span-2">
              <div className="text-center sm:text-left">
                <p className="text-lg font-medium text-gray-900">Info Trashell</p>

                <ul className="mt-8 space-y-4 text-sm">
                  <li>
                    <a className="text-gray-700 transition hover:text-[#3B82F6]/75" href="#">
                      Tentang Trashell
                    </a>
                  </li>

                  <li>
                    <a className="text-gray-700 transition hover:text-[#3B82F6]/75" href="#">
                      Karir
                    </a>
                  </li>

                  <li>
                    <a className="text-gray-700 transition hover:text-[#3B82F6]/75" href="#">
                      Blog
                    </a>
                  </li>

                  <li>
                    <a className="text-gray-700 transition hover:text-[#3B82F6]/75" href="#">
                      Promo Hari Ini
                    </a>
                  </li>
                </ul>
              </div>

              <div className="text-center sm:text-left">
                <p className="text-lg font-medium text-gray-900">Layanan</p>

                <ul className="mt-8 space-y-4 text-sm">
                  <li>
                    <a className="text-gray-700 transition hover:text-[#3B82F6]/75" href="#">
                      Belanja
                    </a>
                  </li>

                  <li>
                    <a className="text-gray-700 transition hover:text-[#3B82F6]/75" href="#">
                      Pembayaran
                    </a>
                  </li>

                  <li>
                    <a className="text-gray-700 transition hover:text-[#3B82F6]/75" href="#">
                      Pengiriman
                    </a>
                  </li>

                  <li>
                    <a className="text-gray-700 transition hover:text-[#3B82F6]/75" href="#">
                      Pengembalian
                    </a>
                  </li>
                </ul>
              </div>

              <div className="text-center sm:text-left">
                <p className="text-lg font-medium text-gray-900">Bantuan</p>

                <ul className="mt-8 space-y-4 text-sm">
                  <li>
                    <a className="text-gray-700 transition hover:text-[#3B82F6]/75" href="#">
                      {" "}
                      FAQ{" "}
                    </a>
                  </li>

                  <li>
                    <a className="text-gray-700 transition hover:text-[#3B82F6]/75" href="#">
                      {" "}
                      Kebijakan Privasi{" "}
                    </a>
                  </li>

                  <li>
                    <a className="group flex justify-center gap-1.5 ltr:sm:justify-start rtl:sm:justify-end" href="#">
                      <span className="text-gray-700 transition group-hover:text-[#3B82F6]/75">Chat Langsung</span>

                      <span className="relative flex size-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#3B82F6] opacity-75"></span>
                        <span className="relative inline-flex size-2 rounded-full bg-[#3B82F6]"></span>
                      </span>
                    </a>
                  </li>
                </ul>
              </div>

              <div className="text-center sm:text-left">
                <p className="text-lg font-medium text-gray-900">Kontak</p>

                <ul className="mt-8 space-y-4 text-sm">
                  <li>
                    <a className="flex items-center justify-center gap-1.5 ltr:sm:justify-start rtl:sm:justify-end" href="#">
                      {/* <MdOutlineMail className="size-5 shrink-0 text-gray-900 shadow-sm" /> */}

                      <span className="flex-1 text-gray-700">customer@trashell.com</span>
                    </a>
                  </li>

                  <li>
                    <a className="flex items-center justify-center gap-1.5 ltr:sm:justify-start rtl:sm:justify-end" href="#">
                      {/* <FiPhoneCall className="size-5 shrink-0 text-gray-900 shadow-sm" /> */}

                      <span className="flex-1 text-gray-700">0812-3456-789</span>
                    </a>
                  </li>

                  <li className="flex items-start justify-center gap-1.5 ltr:sm:justify-start rtl:sm:justify-end">
                    {/* <GrLocation className="size-5 shrink-0 text-gray-900 shadow-sm" /> */}

                    <address className="-mt-0.5 flex-1 text-gray-700 not-italic">Jl. Pemuda No. 21, Semarang</address>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-12 border-t border-gray-100 pt-6">
            <div className="text-center sm:flex sm:justify-between sm:text-left">
              <p className="text-sm text-gray-500">
                <span className="block sm:inline">Seluruh hak cipta dilindungi.</span>

                <a className="inline-block text-[#3B82F6] underline transition hover:text-[#3B82F6]/75" href="#">
                  Syarat & Ketentuan
                </a>

                <span>&middot;</span>

                <a className="inline-block text-[#3B82F6] underline transition hover:text-[#3B82F6]/75" href="#">
                  Kebijakan Privacy
                </a>
              </p>

              <p className="mt-4 text-sm text-gray-500 sm:order-first sm:mt-0">&copy; 2025 Trashell</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
