import React, { useState, useEffect } from 'react';

type PlatformType = 'instagram' | 'tiktok' | 'youtube' | 'telegram' | 'facebook';

interface ProductOption {
  label: string;
  value: string;
  pricePer1000: number;
}

const platformData: Record<PlatformType, ProductOption[]> = {
  instagram: [
    { label: 'Followers', value: 'followers', pricePer1000: 15000 },
    { label: 'Likes', value: 'likes', pricePer1000: 3000 },
    { label: 'Views', value: 'views', pricePer1000: 2000 }
  ],
  tiktok: [
    { label: 'Followers', value: 'followers', pricePer1000: 17000 },
    { label: 'Likes', value: 'likes', pricePer1000: 3000 },
    { label: 'Views', value: 'views', pricePer1000: 500 },
    { label: 'Shares', value: 'shares', pricePer1000: 3000 },
    { label: 'Saves', value: 'saves', pricePer1000: 3000 }
  ],
  telegram: [
    { label: 'Members', value: 'members', pricePer1000: 15000 },
    { label: 'Reactions', value: 'reactions', pricePer1000: 3000 },
    { label: 'Views', value: 'views', pricePer1000: 3000 }
  ],
  youtube: [
    { label: 'Subscribers', value: 'subscribers', pricePer1000: 25000 },
    { label: 'Views', value: 'views', pricePer1000: 13000 },
    { label: 'Likes', value: 'likes', pricePer1000: 5000 }
  ],
  facebook: [
    { label: 'Followers', value: 'followers', pricePer1000: 12000 },
    { label: 'Likes', value: 'likes', pricePer1000: 10000 },
    { label: 'Views', value: 'views', pricePer1000: 1000 }
  ]
};

const quantityOptions = Array.from({ length: 10 }, (_, i) => `${i + 1}K`);

const PriceCalculator = () => {
  const [platform, setPlatform] = useState<PlatformType | ''>('');
  const [jenis, setJenis] = useState('');
  const [jumlah, setJumlah] = useState('1K');
  const [linkTarget, setLinkTarget] = useState('');
  const [products, setProducts] = useState<ProductOption[]>([]);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    if (platform) {
      setProducts(platformData[platform]);
      setJenis('');
    }
  }, [platform]);

  useEffect(() => {
    if (platform && jenis) {
      const selectedProduct = products.find(p => p.value === jenis);
      const unitPrice = selectedProduct?.pricePer1000 || 0;
      const qty = parseInt(jumlah.replace('K', ''));
      setPrice(unitPrice * qty);
    }
  }, [jenis, jumlah, platform, products]);

  const handleOrder = () => {
    const message = `Halo! Saya ingin order:
Platform: ${platform}
Jenis: ${jenis}
Jumlah: ${jumlah}
Link Target: ${linkTarget}
Total: Rp${price.toLocaleString('id-ID')}`;
    const url = `https://wa.me/6285156779923?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg shadow-lg p-6 w-[85%] max-w-lg mx-auto space-y-4">
      <h2 className="text-xl font-semibold text-white text-center mb-4">Dynamic Price Calculator</h2>

      <div>
        <label className="block font-medium text-sm text-gray-300">Platform</label>
        <select
          value={platform}
          onChange={e => setPlatform(e.target.value as PlatformType)}
          className="w-full mt-1 p-2 rounded-md bg-gray-700 text-white border-gray-600"
        >
          <option value="">Pilih platform</option>
          {Object.keys(platformData).map(key => (
            <option key={key} value={key} className="bg-gray-700">
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block font-medium text-sm text-gray-300">Jenis</label>
        <select
          value={jenis}
          onChange={e => setJenis(e.target.value)}
          className="w-full mt-1 p-2 rounded-md bg-gray-700 text-white border-gray-600"
          disabled={!platform}
        >
          <option value="">Pilih jenis</option>
          {products.map(p => (
            <option key={p.value} value={p.value} className="bg-gray-700">
              {p.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block font-medium text-sm text-gray-300">Jumlah</label>
        <select
          value={jumlah}
          onChange={e => setJumlah(e.target.value)}
          className="w-full mt-1 p-2 rounded-md bg-gray-700 text-white border-gray-600"
        >
          {quantityOptions.map(q => (
            <option key={q} value={q} className="bg-gray-700">
              {q}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block font-medium text-sm text-gray-300">Link Target</label>
        <input
          value={linkTarget}
          onChange={e => setLinkTarget(e.target.value)}
          className="w-full mt-1 p-2 rounded-md bg-gray-700 text-white border-gray-600"
          placeholder="Masukkan link target"
        />
      </div>

      <div className="text-base font-semibold mt-2 text-white text-center">
        Total: <span className="text-blue-400">Rp{price.toLocaleString('id-ID')}</span>
      </div>

      <button
        onClick={handleOrder}
        disabled={!platform || !jenis || !jumlah || !linkTarget}
        className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white py-2 rounded-md font-semibold transition-all duration-200"
      >
        Bayar Sekarang via WhatsApp
      </button>
    </div>
  );
};

export default PriceCalculator;
