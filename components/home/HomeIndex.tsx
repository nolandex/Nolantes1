import CTA from "@/components/home/CTA";
import FAQ from "@/components/home/FAQ";
import Feature from "@/components/home/Feature";
import Hero from "@/components/home/Hero";
import Pricing from "@/components/home/Pricing";
import ScrollingLogos from "@/components/home/ScrollingLogos";
import SocialProof from "@/components/home/SocialProof";
import Testimonials from "@/components/home/Testimonials";
import { defaultLocale, getDictionary } from "@/lib/i18n";
import { useEffect } from "react";

export default async function HomeIndex({ lang }: { lang: string }) {
  const langName = lang || defaultLocale;
  const dict = await getDictionary(langName);

  return (
    <>
      {/* Hero Section */}
      <Hero locale={dict.Hero} langName={langName} CTALocale={dict.CTAButton} />
      <SocialProof locale={dict.SocialProof} />
      <ScrollingLogos />
      <Feature id="Features" locale={dict.Feature} langName={langName} />
      <Pricing id="Pricing" locale={dict.Pricing} langName={langName} />
      <Testimonials id="Testimonials" locale={dict.Testimonials} />
      <FAQ id="FAQ" locale={dict.FAQ} langName={langName} />
      <CTA locale={dict.CTA} CTALocale={dict.CTAButton} />

      {/* --- Dynamic Price Calculator --- */}
      <div className="mt-20 p-6 rounded-2xl backdrop-blur-xl bg-[#1C252699] shadow-xl text-white max-w-xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-4">Dynamic Price Calculator</h2>
        <div className="space-y-4">
          <div>
            <label>Platform</label>
            <select id="platform" className="w-full p-3 rounded bg-[#1C2526] text-white"></select>
          </div>
          <div>
            <label>Product</label>
            <select id="product" className="w-full p-3 rounded bg-[#1C2526] text-white" disabled></select>
          </div>
          <div>
            <label>Quantity (1K–10K)</label>
            <input type="range" id="quantity" min="1" max="10" defaultValue="1" className="w-full" />
            <div id="quantity-label" className="text-center">1K</div>
          </div>
          <div>
            <input
              type="text"
              id="target"
              placeholder="Enter your target link or username"
              className="w-full p-3 rounded bg-[#1C2526] text-white placeholder:text-gray-400"
            />
          </div>
          <div id="price" className="text-center font-semibold text-lg">Price: Rp0</div>
          <button
            onClick={() => alert('Payment modal would open here.')}
            className="w-full p-3 rounded font-bold text-white bg-[#1E90FF] hover:bg-[#00A3E0] transition"
          >
            Pay Now
          </button>
        </div>
      </div>
    </>
  );
}

// JS script logic for dropdown & pricing
"use client";
import { useEffectOnce } from "react-use";

useEffectOnce(() => {
  const platformData: Record<string, Record<string, number>> = {
    instagram: { followers: 15000, likes: 3000, views: 2000 },
    tiktok: { followers: 17000, likes: 3000, views: 500, shares: 3000, saves: 3000 },
    telegram: { members: 15000, reactions: 3000, views: 3000 },
    youtube: { subscribers: 25000, views: 13000, likes: 5000 },
    facebook: { followers: 12000, likes: 10000, views: 1000 },
  };

  const platformSelect = document.getElementById("platform") as HTMLSelectElement;
  const productSelect = document.getElementById("product") as HTMLSelectElement;
  const quantityInput = document.getElementById("quantity") as HTMLInputElement;
  const quantityLabel = document.getElementById("quantity-label")!;
  const priceDisplay = document.getElementById("price")!;

  if (!platformSelect) return;

  platformSelect.innerHTML =
    `<option value="">Select platform</option>` +
    Object.keys(platformData)
      .map(p => `<option value="${p}">${p.charAt(0).toUpperCase() + p.slice(1)}</option>`)
      .join("");

  platformSelect.addEventListener("change", () => {
    const platform = platformSelect.value;
    productSelect.innerHTML = "";
    if (platform && platformData[platform]) {
      productSelect.disabled = false;
      for (const product in platformData[platform]) {
        const opt = document.createElement("option");
        opt.value = product;
        opt.textContent = product.charAt(0).toUpperCase() + product.slice(1);
        productSelect.appendChild(opt);
      }
    } else {
      productSelect.disabled = true;
    }
    updatePrice();
  });

  productSelect.addEventListener("change", updatePrice);
  quantityInput.addEventListener("input", () => {
    quantityLabel.textContent = quantityInput.value + "K";
    updatePrice();
  });

  function updatePrice() {
    const platform = platformSelect.value;
    const product = productSelect.value;
    const quantity = parseInt(quantityInput.value);
    if (platform && product && platformData[platform]?.[product]) {
      const pricePerK = platformData[platform][product];
      const totalPrice = pricePerK * quantity;
      priceDisplay.textContent = `Price: Rp${totalPrice.toLocaleString("id-ID")}`;
    } else {
      priceDisplay.textContent = "Price: Rp0";
    }
  }
});
