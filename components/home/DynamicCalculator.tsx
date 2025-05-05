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

  return (
    <div className="mt-20 p-6 rounded-2xl backdrop-blur-xl bg-[#1C252699] shadow-xl text-white max-w-xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-4">Dynamic Price Calculator</h2>
      <div className="space-y-4">
        <div>
          <label>Platform</label>
          <select
            className="w-full p-3 rounded bg-[#1C2526] text-white"
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
          <label>Product</label>
          <select
            className="w-full p-3 rounded bg-[#1C2526] text-white"
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
          <label>Quantity (1K–10K)</label>
          <input
            type="range"
            min="1"
            max="10"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            className="w-full"
          />
          <div className="text-center">{quantity}K</div>
        </div>

        <div>
          <input
            type="text"
            placeholder="Enter your target link or username"
            className="w-full p-3 rounded bg-[#1C2526] text-white placeholder:text-gray-400"
          />
        </div>

        <div className="text-center font-semibold text-lg">
          Price: Rp{price.toLocaleString("id-ID")}
        </div>

        <button
          onClick={() => alert("Payment modal would open here.")}
          className="w-full p-3 rounded font-bold text-white bg-[#1E90FF] hover:bg-[#00A3E0] transition"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
}
