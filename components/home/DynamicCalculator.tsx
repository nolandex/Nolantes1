"use client";

import { useEffect, useState } from "react";
import PaymentModal from "../ui/PaymentModal";

export default function DynamicCalculator() {
  const [platform, setPlatform] = useState("");
  const [layanan, setLayanan] = useState("");
  const [jumlah, setJumlah] = useState("1000");
  const [price, setPrice] = useState(0);
  const [linkTarget, setLinkTarget] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const platformData: Record<string, Record<string, number>> = {
    instagram: { followers: 15, likes: 3, views: 2 },
    tiktok: { followers: 17, likes: 3, views: 0.5, shares: 3, saves: 3 },
    telegram: { members: 15, reactions: 3, views: 3 },
    youtube: { subscribers: 25, views: 13, likes: 5 },
    facebook: { followers: 12, likes: 10, views: 1 },
  };

  useEffect(() => {
    if (platform && layanan && jumlah) {
      const jumlahNumber = parseInt(jumlah);
      const pricePerUnit = platformData[platform]?.[layanan] || 0;
      setPrice(pricePerUnit * jumlahNumber);
    } else {
      setPrice(0);
    }
  }, [platform, layanan, jumlah]);

  const handlePayment = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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
              className="w-full p-3 rounded bg-[#1A2526] text-[#FFFFFF] border border-[#B0B0B0]"
              value={platform}
              onChange={(e) => {
                setPlatform(e.target.value);
                setLayanan("");
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
            <label className="block mb-1 font-semibold text-[#FFFFFF]">Layanan</label>
            <select
              className="w-full p-3 rounded bg-[#1A2526] text-[#FFFFFF] border border-[#B0B0B0]"
              value={layanan}
              onChange={(e) => setLayanan(e.target.value)}
              disabled={!platform}
            >
              <option value="">Select layanan</option>
              {platform &&
                Object.keys(platformData[platform]).map((key) => (
                  <option key={key} value={key}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 font-semibold text-[#FFFFFF]">Jumlah</label>
            <select
              className="w-full p-3 rounded bg-[#1A2526] text-[#FFFFFF] border border-[#B0B0B0]"
              value={jumlah}
              onChange={(e) => setJumlah(e.target.value)}
            >
              {Array.from({ length: 10 }, (_, i) => (i + 1) * 1000).map((q) => (
                <option key={q} value={q}>
                  {q}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 font-semibold text-[#FFFFFF]">Link Target</label>
            <input
              type="text"
              className="w-full p-3 rounded bg-[#1A2526] text-[#FFFFFF] border border-[#B0B0B0]"
              value={linkTarget}
              onChange={(e) => setLinkTarget(e.target.value)}
            />
          </div>

          <div className="text-center font-bold text-lg text-[#00A3FF]">
            Total: Rp{price.toLocaleString("id-ID")}
          </div>

          <button
            onClick={handlePayment}
            className="w-full p-3 rounded font-bold text-[#FFFFFF] bg-[#007BFF] hover:bg-[#00A3FF] transition"
          >
            Bayar Sekarang
          </button>
        </div>
      </div>
      <PaymentModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        platform={platform}
        layanan={layanan}
        jumlah={jumlah}
        linkTarget={linkTarget}
        total={price}
      />
    </div>
  );
}
