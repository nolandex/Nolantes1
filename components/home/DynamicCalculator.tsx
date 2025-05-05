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

  const containerStyle = {
    backgroundColor: "#1C2526",
    color: "#ffffff",
    borderRadius: "1rem",
    padding: "1.5rem",
    maxWidth: "500px",
    margin: "4rem auto",
    boxShadow: "0 0 20px rgba(0,0,0,0.4)",
  };

  const inputStyle = {
    backgroundColor: "#1A1A1A",
    color: "#ffffff",
    padding: "0.75rem",
    borderRadius: "0.5rem",
    width: "100%",
    border: "none",
    marginBottom: "1rem",
  };

  const labelStyle = {
    fontWeight: 600,
    marginBottom: "0.25rem",
    display: "block",
  };

  const totalStyle = {
    textAlign: "center" as const,
    fontWeight: "bold",
    fontSize: "1.125rem",
    color: "#00A3E0",
    marginBottom: "1rem",
  };

  const buttonStyle = {
    backgroundColor: "#1E90FF",
    color: "#ffffff",
    fontWeight: "bold",
    padding: "0.75rem",
    borderRadius: "0.5rem",
    width: "100%",
    border: "none",
    cursor: "pointer",
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ textAlign: "center", fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem" }}>
        Dynamic Price Calculator
      </h2>

      <div>
        <label style={labelStyle}>Platform</label>
        <select
          style={inputStyle}
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
        <label style={labelStyle}>Product</label>
        <select
          style={inputStyle}
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
        <label style={labelStyle}>Quantity</label>
        <select
          style={inputStyle}
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
        <label style={labelStyle}>Your Link or Username</label>
        <input
          type="text"
          style={inputStyle}
          placeholder="e.g. @yourusername or link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
      </div>

      <div style={totalStyle}>Total: Rp{price.toLocaleString("id-ID")}</div>

      <button style={buttonStyle} onClick={handlePayment}>
        Pay Now via WhatsApp
      </button>
    </div>
  );
}
