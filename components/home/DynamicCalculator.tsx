import React, { useState, useEffect } from 'react';

type PlatformType = 'instagram' | 'tiktok' | 'youtube';

interface ProductOption {
  label: string;
  pricePer1000: number;
}

const productOptions: Record<PlatformType, ProductOption[]> = {
  instagram: [
    { label: 'Followers', pricePer1000: 25000 },
    { label: 'Likes', pricePer1000: 15000 }
  ],
  tiktok: [
    { label: 'Followers', pricePer1000: 20000 },
    { label: 'Views', pricePer1000: 10000 }
  ],
  youtube: [
    { label: 'Subscribers', pricePer1000: 30000 },
    { label: 'Views', pricePer1000: 12000 }
  ]
};

const PriceCalculator = () => {
  const [platform, setPlatform] = useState<PlatformType | ''>('');
  const [product, setProduct] = useState('');
  const [quantity, setQuantity] = useState('1000');
  const [link, setLink] = useState('');
  const [products, setProducts] = useState<ProductOption[]>([]);
  const [price, setPrice] = useState(0);

  const platformOptions = [
    { label: 'Instagram', value: 'instagram' },
    { label: 'TikTok', value: 'tiktok' },
    { label: 'YouTube', value: 'youtube' }
  ];

  useEffect(() => {
    if (platform) {
      setProducts(productOptions[platform]);
      setProduct('');
    }
  }, [platform]);

  useEffect(() => {
    if (platform && product) {
      const selectedProduct = products.find(p => p.label === product);
      const unitPrice = selectedProduct?.pricePer1000 || 0;
      const qty = parseInt(quantity.replace('K', '000'));
      setPrice(unitPrice * (qty / 1000));
    }
  }, [product, quantity, platform, products]);

  const handleOrder = () => {
    const message = `Hello, I want to order:
Platform: ${platform}
Product: ${product}
Quantity: ${quantity}
Username/Link: ${link}
Total: Rp${price.toLocaleString('id-ID')}`;
    const url = `https://wa.me/6285156779923?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg shadow-lg p-6 w-[85%] max-w-lg mx-auto space-y-4">
      <h2 className="text-xl font-semibold text-white">Dynamic Price Calculator</h2>

      <div>
        <label className="block font-medium text-sm text-gray-300">Platform</label>
        <select
          value={platform}
          onChange={e => setPlatform(e.target.value as PlatformType)}
          className="w-full mt-1 p-2 rounded-md bg-gray-700 text-white border-gray-600"
        >
          <option value="" className="bg-gray-700">Select platform</option>
          {platformOptions.map(opt => (
            <option key={opt.value} value={opt.value} className="bg-gray-700">{opt.label}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block font-medium text-sm text-gray-300">Product</label>
        <select
          value={product}
          onChange={e => setProduct(e.target.value)}
          className="w-full mt-1 p-2 rounded-md bg-gray-700 text-white border-gray-600"
          disabled={!platform}
        >
          <option value="" className="bg-gray-700">Select product</option>
          {products.map(p => (
            <option key={p.label} value={p.label} className="bg-gray-700">{p.label}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block font-medium text-sm text-gray-300">Quantity</label>
        <select
          value={quantity}
          onChange={e => setQuantity(e.target.value)}
          className="w-full mt-1 p-2 rounded-md bg-gray-700 text-white border-gray-600"
        >
          <option value="1000" className="bg-gray-700">1K</option>
          <option value="2000" className="bg-gray-700">2K</option>
          <option value="5000" className="bg-gray-700">5K</option>
          <option value="10000" className="bg-gray-700">10K</option>
        </select>
      </div>

      <div>
        <label className="block font-medium text-sm text-gray-300">Your Link or Username</label>
        <input
          value={link}
          onChange={e => setLink(e.target.value)}
          className="w-full mt-1 p-2 rounded-md bg-gray-700 text-white border-gray-600"
          placeholder="e.g. @yourusername or link"
        />
      </div>

      <div className="text-base font-semibold mt-2 text-white">
        Total: <span className="text-blue-400">Rp{price.toLocaleString('id-ID')}</span>
      </div>

      <button
        onClick={handleOrder}
        disabled={!platform || !product || !quantity || !link}
        className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white py-2 rounded-md font-semibold transition-all duration-200"
      >
        Pay Now via WhatsApp
      </button>
    </div>
  );
};

export default PriceCalculator;
