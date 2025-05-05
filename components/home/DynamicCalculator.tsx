"use client";

import { useEffect, useState } from "react";

export default function DynamicCalculator() {
  const [platform, setPlatform] = useState("");
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);

  const platformData: Record<string, Record<string, number>> = {
    instagram: { followers: 15000, likes: 3000, views: 2000 },
    tiktok: { followers: 17000, likes: 3000, views: 500, shares: 3000, saves: 3000 },
    telegram: { members: 15000, reactions: 3000, views: 3000 },
    youtube: { subscribers: 25000, views: 13000, likes: 5000 },
    facebook: { followers: 12000, likes: 10000, views: 1000 },
  };

  useEffect(() => {
    if (platform && product) {
      const pricePerK = platformData[platform]?.[product] || 0;
      setPrice(pricePerK * quantity);
    } else {
      setPrice(0);
    }
  }, [platform, product, quantity]);

  const handleOrder = () => {
    const total = price.toLocaleString("id-ID");
    const waLink = `https://wa.me/6285156779923?text=Halo%20saya%20ingin%20order%20${quantity}K%20${product}%20di%20${platform}%20dengan%20total%20Rp${total}`;
    window.open(waLink, "_blank");
  };

  return (
    <section id="Calculator" className="mt-24 px-6">
      <div className="max-w-2xl mx-auto p-8 rounded-2xl bg-[#1C2526] text-white shadow-2xl backdrop-blur">
        <h2 className="text-3xl font-bold text-center mb-6 text-white">Dynamic Price Calculator</h2>

        <div className="space-y-6">
          {/* Platform */}
          <div>
            <label className="block mb-2 font-medium text-white">Platform</label>
            <select
              className="w-full p-3 rounded-lg bg-[#1A1A1A] text-white"
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

          {/* Product */}
          <div>
            <label className="block mb-2 font-medium text-white">Product</label>
            <select
              className="w-full p-3 rounded-lg bg-[#1A1A1A] text-white"
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

          {/* Quantity */}
          <div>
            <label className="block mb-2 font-medium text-white">Quantity</label>
            <select
              className="w-full p-3 rounded-lg bg-[#1A1A1A] text-white"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
            >
              {Array.from({ length: 10 }, (_, i) => i + 1).map((val) => (
                <option key={val} value={val}>
                  {val}K
                </option>
              ))}
            </select>
          </div>

          {/* Target */}
          <div>
            <label className="block mb-2 font-medium text-white">Your Link or Username</label>
            <input
              type="text"
              className="w-full p-3 rounded-lg bg-[#1A1A1A] text-white placeholder:text-gray-400"
              placeholder="e.g. @yourusername or profile link"
            />
          </div>

          {/* Total Price */}
          <div className="text-center text-lg font-semibold text-[#00A3E0]">
            Total: Rp{price.toLocaleString("id-ID")}
          </div>

          {/* Pay Now */}
          <button
            onClick={handleOrder}
            disabled={!platform || !product}
            className={`w-full p-3 rounded-lg font-bold text-white transition ${
              platform && product
                ? "bg-[#1E90FF] hover:bg-[#00A3E0]"
                : "bg-gray-600 cursor-not-allowed"
            }`}
          >
            Pay Now via WhatsApp
          </button>
        </div>
      </div>
    </section>
  );
}
