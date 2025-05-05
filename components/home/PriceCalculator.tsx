"use client";

import { useState } from "react";
import { calculatorConfig } from "@/config/calculator";
import { PlatformSelector } from "./PlatformSelector";
import { ProductSelector } from "./ProductSelector";
import { QuantitySelector } from "./QuantitySelector";
import { PriceDisplay } from "./PriceDisplay";
import { TargetInput } from "./TargetInput";
import { PayNowButton } from "./PayNowButton";
import { PaymentModal } from "./PaymentModal";
import { Card } from "../ui/Card";

export const PriceCalculator: React.FC = () => {
  const [platform, setPlatform] = useState<string>("Instagram");
  const [product, setProduct] = useState<string>("Followers");
  const [quantity, setQuantity] = useState<number>(1000);
  const [target, setTarget] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const selectedPlatform = calculatorConfig.platforms.find(
    (p) => p.name === platform
  );
  const selectedProduct = selectedPlatform?.products.find(
    (p) => p.name === product
  );

  const price = selectedProduct
    ? (selectedProduct.pricePerK * quantity) / 1000
    : 0;

  return (
    <section className="min-h-screen bg-[#1A1A1A] flex items-center justify-center py-12">
      <Card className="w-full max-w-lg">
        <h1 className="text-2xl font-bold text-white mb-6">
          Dynamic Price Calculator
        </h1>
        <div className="space-y-6">
          <PlatformSelector
            value={platform}
            onChange={(value) => {
              setPlatform(value);
              setProduct(calculatorConfig.platforms.find((p) => p.name === value)?.products[0].name || "");
            }}
          />
          <ProductSelector
            platform={platform}
            value={product}
            onChange={setProduct}
          />
          <QuantitySelector value={quantity} onChange={setQuantity} />
          <PriceDisplay price={price} />
          <TargetInput value={target} onChange={setTarget} />
          <PayNowButton onClick={() => setIsModalOpen(true)} />
        </div>
      </Card>
      <PaymentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        price={price}
        platform={platform}
        product={product}
        quantity={quantity}
        target={target}
      />
    </section>
  );
};