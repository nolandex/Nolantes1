"use client";

import { useEffect, useState } from "react";
import PaymentModal from "../ui/PaymentModal";

export default function DynamicCalculator() {
  const [platform, setPlatform] = useState("");
  const [jumlah, setJumlah] = useState("1000");
  const [price, setPrice] = useState(0);
  const [linkTarget, setLinkTarget] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState("");

  // Hanya menyimpan harga per 1K untuk layanan default (misalnya followers) per platform
  const platformData: Record<string, number> = {
    instagram: 25.578, // Rp 25.578/K untuk Instagram (default: followers)
    tiktok: 17, // TikTok (default: followers)
    telegram: 15, // Telegram (default: members)
    youtube: 25, // YouTube (default: subscribers)
    facebook: 12, // Facebook (default: followers)
  };

  useEffect(() => {
    if (platform && jumlah) {
      const jumlahNumber = parseInt(jumlah);
      const pricePerUnit = platformData[platform] || 0;
      setPrice(pricePerUnit * (jumlahNumber / 1000)); // Harga per 1K
    } else {
      setPrice(0);
    }
  }, [platform, jumlah]);

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

  // Layanan default berdasarkan platform
  const getDefaultLayanan = (platform: string) => {
    const layananMap: Record<string, string> = {
      instagram: "followers",
      tiktok: "followers",
      telegram: "members",
      youtube: "subscribers",
      facebook: "followers",
    };
    return layananMap[platform] || "unknown";
  };

  const paymentData = {
    platform,
    layanan: getDefaultLayanan(platform), // Layanan default
    jumlah,
    linkTarget,
    total: price,
  };

  return (
    <div className="mt-20 px-4">
      <div className="max-w-xl mx-auto p-6 rounded-2xl shadow-xl bg-[#1A2526] text-[#FFFFFF]">
        <h2 className="text-2xl font-bold text-center mb-6 text-[#FFFFFF]">
          Dynamic Price Calculator
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block mb-1 font-semibold text-[#FFFFFF]">
              Kategori
            </label>
            <select
              className="w-full p-3 rounded bg-[#1A2526] text-[#FFFFFF] border border-[#B0B0B0]"
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
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
            <label className="block mb-1 font-semibold text-[#FFFFFF]">
              Jumlah
            </label>
            <select
              className="w-full p-3 rounded bg-[#1A2526] text-[#FFFFFF] border border-[#B0B0B0]"
              value={jumlah}
              onChange={(e) => setJumlah(e.target.value)}
            >
              {Array.from({ length: 10 }, (_, i) => (i + 1) * 1000).map(
                (q) => (
                  <option key={q} value={q}>
                    {q}
                  </option>
                )
              )}
            </select>
          </div>

          <div>
            <label className="block mb-1 font-semibold text-[#FFFFFF]">
              Link Target
            </label>
            <input
              type="text"
              className="w-full p-3 rounded bg-[#1A2526] text-[#FFFFFF] border border-[#B0B0B0]"
              value={linkTarget}
              onChange={(e) => setLinkTarget(e.target.value)}
              required
              placeholder="Wajib diisi"
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>

          <div className="text-center font-bold text-lg text-[#00A3FF]">
            Harga: Rp{price.toLocaleString("id-ID")}/K
          </div>

          <button
            onClick={handlePayment}
            className="w-full p-3 rounded font-bold text-[#FFFFFF] bg-[#007BFF] hover:bg-[#00A3FF] transition"
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
