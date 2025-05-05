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
  const [error, setError] = useState("");

  const platformData: Record<string, Record<string, number>> = {
    instagram: {
      followers: 15000,
      likes: 3000,
      views: 2000,
    },
    tiktok: {
      followers: 17000,
      likes: 3000,
      views: 500,
      shares: 3000,
      saves: 3000,
    },
    telegram: {
      members: 15000,
      reactions: 3000,
      views: 3000,
    },
    youtube: {
      subscribers: 25000,
      views: 13000,
      likes: 5000,
    },
    facebook: {
      followers: 12000,
      likes: 10000,
      views: 1000,
    },
  };

  const layananNames: Record<string, string> = {
    followers: "Followers",
    likes: "Likes",
    views: "Views",
    members: "Members",
    reactions: "Reactions",
    subscribers: "Subscribers",
    shares: "Shares",
    saves: "Saves",
  };

  useEffect(() => {
    if (platform && layanan && jumlah) {
      const jumlahNumber = parseInt(jumlah);
      const pricePerUnit = platformData[platform]?.[layanan] || 0;
      setPrice(pricePerUnit * (jumlahNumber / 1000));
    } else {
      setPrice(0);
    }
  }, [platform, layanan, jumlah]);

  const handlePayment = () => {
    if (!linkTarget.trim()) {
      setError("Link Target wajib diisi!");
      return;
    }
    setError("");
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const paymentData = {
    platform,
    layanan,
    jumlah,
    linkTarget,
    total: price,
  };

  return (
    <div className="mt-20 px-4">
      <div className="max-w-xl mx-auto p-6 rounded-2xl shadow-xl bg-[#1E293B] text-[#FFFFFF]">
        <h2 className="text-2xl font-bold text-center mb-6 text-[#FFFFFF]">
          Dynamic Price Calculator
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block mb-1 font-semibold text-[#FFFFFF]">Kategori</label>
            <select
              className="w-full p-3 rounded bg-[#1E293B] text-[#FFFFFF] border border-[#3B82F6]"
              value={platform}
              onChange={(e) => {
                setPlatform(e.target.value);
                setLayanan("");
              }}
            >
              <option value="">Pilih...</option>
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
              className="w-full p-3 rounded bg-[#1E293B] text-[#FFFFFF] border border-[#3B82F6]"
              value={layanan}
              onChange={(e) => setLayanan(e.target.value)}
              disabled={!platform}
            >
              <option value="">Pilih...</option>
              {platform &&
                Object.keys(platformData[platform]).map((key) => (
                  <option key={key} value={key}>
                    {layananNames[key]} - Rp{platformData[platform][key].toLocaleString("id-ID")}/1000
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 font-semibold text-[#FFFFFF]">Jumlah</label>
            <select
              className="w-full p-3 rounded bg-[#1E293B] text-[#FFFFFF] border border-[#3B82F6]"
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
              className="w-full p-3 rounded bg-[#1E293B] text-[#FFFFFF] border border-[#3B82F6]"
              value={linkTarget}
              onChange={(e) => setLinkTarget(e.target.value)}
              required
              placeholder="Wajib diisi"
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>

          <div className="text-center font-bold text-lg text-[#3B82F6]">
            Harga: Rp{price.toLocaleString("id-ID")}
          </div>

          <button
            onClick={handlePayment}
            className="w-full p-3 rounded font-bold text-[#FFFFFF] bg-[#1E3A8A] hover:bg-[#3B82F6] transition"
            disabled={!price || !linkTarget.trim()}
          >
            Bayar Sekarang
          </button>
        </div>
      </div>
      <PaymentModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        paymentData={paymentData}
      />
    </div>
  );
}
