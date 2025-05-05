"use client";

import { useEffect, useState } from "react";

export default function DynamicCalculator() {
  const [platform, setPlatform] = useState("");
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState("1K");
  const [price, setPrice] = useState(0);
  const [link, setLink] = useState("");

  const platformData: Record<string, Record<string, number>> = {
    instagram: { followers: 15000, likes: 3000, views: 2000 },
    tiktok: { followers: 17000, likes: 3000, views: 500, shares: 3000, saves: 3000 },
    telegram: { members: 15000, reactions: 3000, views: 3000 },
    youtube: { subscribers: 25000, views: 13000, likes: 5000 },
    facebook: { followers: 12000, likes: 10000, views: 1000 },
  };

  useEffect(() => {
    if (platform && product && quantity) {
      const quantityNumber = parseInt(quantity.replace("K", ""));
      const pricePerK = platformData[platform]?.[product] || 0;
      setPrice(pricePerK * quantityNumber);
    } else {
      setPrice(0);
    }
  }, [platform, product, quantity]);

  const handlePayment = () => {
    const text = `Halo! Saya ingin order:\nPlatform: ${platform}\nProduk: ${product}\nJumlah: ${quantity}\nLink: ${link}\nTotal: Rp${price.toLocaleString(
      "id-ID"
    )}`;
    const waLink = `https://wa.me/6285156779923?text=${encodeURIComponent(text)}`;
    window.open(waLink, "_blank");
  };

  return (
    <div className="mt-20 px-4">
      <div className="max-w-xl mx-auto p-6 rounded-2xl shadow-xl bg-[#1A2526] text-[#FFFFFF]">
        <h2 className="text-2xl font-bold text-center mb-6 text-[#FFFFFF]">
          Dynamic Price Calculator
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block mb-1 font-semibold text-[#FFFFFF]">Platform</label>
            <select
              className="w-full p-3 rounded bg-[#1A2526] text-[#FFFFFF]"
              value={platform}
              onChange={(e) => {
                setPlatform(e.target.value);
                setProduct("");
              }}
            >
              <option value="">Select platform</option>
              {Object.keys(platformData).map((key) => (
                <option key={key} value={key}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 font-semibold text-[#FFFFFF]">Product</label>
            <select
              className="w-full p-3 rounded bg-[#1A2526] text-[#FFFFFF]"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              disabled={!platform}
            >
              <option value="">Select product</option>
              {platform &&
                Object.keys(platformData[platform]).map((key) => (
                  <option key={key} value={key}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 font-semibold text-[#FFFFFF]">Quantity</label>
            <select
              className="w-full p-3 rounded bg-[#1A2526] text-[#FFFFFF]"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            >
              {Array.from({ length: 10 }, (_, i) => `${i + 1}K`).map((q) => (
                <option key={q} value={q}>
                  {q}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 font-semibold text-[#FFFFFF]">Your Link or Username</label>
            <input
              type="text"
              placeholder="e.g. @yourusername or link"
              className="w-full p-3 rounded bg-[#1A2526] text-[#FFFFFF] placeholder:text-[#B0B0B0]"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </div>

          <div className="text-center font-bold text-lg text-[#00A3FF]">
            Total: Rp{price.toLocaleString("id-ID")}
          </div>

          <button
            onClick={handlePayment}
            className="w-full p-3 rounded font-bold text-[#FFFFFF] bg-[#007BFF] hover:bg-[#00A3FF] transition"
          >
            Pay Now via WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}
