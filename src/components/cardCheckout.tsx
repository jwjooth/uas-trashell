"use client";

import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { useRouter } from "next/navigation";

interface CartItemProps {
  id: string;
  image: string;
  title: string;
  price: number;
}

export default function CardCheckout({ id, image, title, price }: CartItemProps) {
  const [quantity, setQuantity] = useState(1);
  const totalPrice = price * quantity;
  const router = useRouter();

  const handleBuy = () => {
    sessionStorage.setItem("checkoutQuantity", String(quantity));
    sessionStorage.setItem("checkoutPrice", String(totalPrice));
    router.push(`/checkout/${id}`);
  };

  const handleAddToCart = () => {
    router.push("/cart");
  };

  return (
    <div className="w-full bg-white border-t border-gray-300 z-40 fixed bottom-[56px] md:bottom-0 left-0 right-0 py-4 px-4 md:px-6 border-b">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6">
        <div className="flex items-center justify-between md:hidden">
          <div className="text-sm text-gray-700">
            Total harga:
            <br />
            <span className="font-semibold">Rp{totalPrice.toLocaleString("id-ID")}</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-2 py-1 bg-gray-200 rounded text-gray-600 cursor-pointer">
              -
            </button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)} className="px-2 py-1 bg-gray-200 rounded text-gray-600 cursor-pointer">
              +
            </button>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-3 md:gap-6 flex-1">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 relative shrink-0">
              <img src={image} alt={title} className="object-contain w-full h-full" />
            </div>
            <span className="text-sm text-gray-800 line-clamp-2">{title}</span>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-2 py-1 bg-gray-200 rounded text-gray-600 cursor-pointer">
              -
            </button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)} className="px-2 py-1 bg-gray-200 rounded text-gray-600 cursor-pointer">
              +
            </button>
          </div>

          <div className="text-sm text-gray-700 text-center md:text-left">
            Total harga:
            <br />
            <span className="font-semibold">Rp{totalPrice.toLocaleString("id-ID")}</span>
          </div>
        </div>

        <div className="flex gap-4 md:gap-2 items-center flex-wrap justify-center flex-row-reverse md:justify-end md:flex-row">
          <button onClick={handleBuy} className="border border-blue-500 text-[#3B82F6] text-sm px-8 md:px-6 py-3 rounded-full hover:bg-blue-50 cursor-pointer">
            Beli sekarang
          </button>
          <button onClick={handleAddToCart} className="bg-[#3B82F6] text-white text-sm px-8 md:px-6 py-3 rounded-full hover:bg-blue-700 cursor-pointer">
            Tambah ke Bag
          </button>
          <button className="hidden md:w-12 md:h-12 rounded-full border md:flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-400 cursor-pointer">
            <FaHeart />
          </button>
        </div>
      </div>
    </div>
  );
}
