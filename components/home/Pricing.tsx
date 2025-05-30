"use client";

import { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Spacer,
} from "@nextui-org/react";
import { RoughNotation } from "react-rough-notation";
import { ALL_TIERS } from "@/config/tiers";
import { FaCheck } from "react-icons/fa";
import { TiersEnum } from "@/types/pricing";
import PaymentModal from "../ui/PaymentModal";

// Define TypeScript interface for props
interface PricingProps {
  id: string;
  locale: {
    title: string;
    title2: string;
    description: string;
    doYouLike: string;
    follow: string;
  };
  langName: string;
}

const Pricing = ({ id, locale, langName }: PricingProps) => {
  const [activeTab, setActiveTab] = useState<"setup" | "website">("setup");
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{
    name: string;
    amount: number;
    product: string;
  } | null>(null);

  const TIERS = ALL_TIERS[`TIERS_${langName.toUpperCase()}`];

  // Handle Payment Modal
  const openPaymentModal = (tier: any) => {
    setSelectedPlan({
      name: tier.title,
      amount: parseInt(tier.price.replace(/[^0-9]/g, "")), // Asumsi price seperti "Rp 299.000"
      product: `${tier.title} Subscription`,
    });
    setIsPaymentModalOpen(true);
  };

  const closePaymentModal = () => {
    setIsPaymentModalOpen(false);
    setSelectedPlan(null);
  };

  // Petakan data selectedPlan ke format paymentData
  const paymentData = selectedPlan
    ? {
        platform: "N/A", // Pricing tidak memiliki konteks platform
        layanan: selectedPlan.product, // Gunakan product sebagai layanan
        jumlah: "1", // Default jumlah 1, karena tidak ada input jumlah
        linkTarget: "", // Default kosong, karena tidak ada input link target
        total: selectedPlan.amount, // Total diambil dari amount
      }
    : {
        platform: "",
        layanan: "",
        jumlah: "",
        linkTarget: "",
        total: 0,
      };

  return (
    <section
      id={id}
      className="flex flex-col justify-center max-w-3xl items-center pt-12"
    >
      <div className="flex flex-col text-center max-w-lg">
        <h2 className="text-center text-white">
          <RoughNotation type="highlight" show={true} color="#2563EB">
            {locale.title}
          </RoughNotation>
        </h2>
        <h3 className="text-3xl font-medium tracking-tight mt-2">
          {locale.title2}
        </h3>
        <Spacer y={3} />
        <p className="text-medium text-default-500">{locale.description}</p>
      </div>
      <Spacer y={6} />
      <div className="w-[85%] max-w-lg">
        {TIERS?.find(
          (tier: any) =>
            tier.key === (activeTab === "setup" ? TiersEnum.Free : TiersEnum.Customize)
        ) ? (
          <Card
            key={
              TIERS.find(
                (tier: any) =>
                  tier.key ===
                  (activeTab === "setup" ? TiersEnum.Free : TiersEnum.Customize)
              )?.key
            }
            className="p-2 bg-gradient-to-br from-gray-900 to-gray-800 rounded-[8px]"
            shadow="md"
            radius="md"
          >
            <CardHeader className="flex flex-col items-start gap-1 pb-0">
              <div className="flex w-full border-b border-gray-700">
                <button
                  onClick={() => setActiveTab("setup")}
                  className={`flex-1 py-2 text-sm font-medium text-center transition-colors duration-200 ${
                    activeTab === "setup"
                      ? "text-blue-400 border-b-2 border-blue-400"
                      : "text-gray-400 hover:text-gray-200"
                  }`}
                >
                  Setup
                </button>
                <button
                  onClick={() => setActiveTab("website")}
                  className={`flex-1 py-2 text-sm font-medium text-center transition-colors duration-200 ${
                    activeTab === "website"
                      ? "text-blue-400 border-b-2 border-blue-400"
                      : "text-gray-400 hover:text-gray-200"
                  }`}
                >
                  Website
                </button>
              </div>
              <div className="pt-4">
                <h2 className="text-medium font-medium text-white">
                  {TIERS.find(
                    (tier: any) =>
                      tier.key ===
                      (activeTab === "setup" ? TiersEnum.Free : TiersEnum.Customize)
                  )?.title || "Untitled"}
                </h2>
                <p className="text-sm text-gray-400">
                  {TIERS.find(
                    (tier: any) =>
                      tier.key ===
                      (activeTab === "setup" ? TiersEnum.Free : TiersEnum.Customize)
                  )?.description || "No description"}
                </p>
              </div>
            </CardHeader>
            <Divider className="bg-gray-700" />
            <CardBody className="gap-8">
              <p className="flex items-baseline gap-1 pt-2 pb-4">
                <span className="inline bg-gradient-to-br from-white to-gray-400 bg-clip-text text-4xl font-bold leading-7 tracking-tight text-transparent">
                  {TIERS.find(
                    (tier: any) =>
                      tier.key ===
                      (activeTab === "setup" ? TiersEnum.Free : TiersEnum.Customize)
                  )?.price || "N/A"}
                </span>
              </p>
              <ul className="flex flex-col gap-1">
                {TIERS.find(
                  (tier: any) =>
                    tier.key ===
                    (activeTab === "setup" ? TiersEnum.Free : TiersEnum.Customize)
                )?.features?.map((feature: string) => (
                  <li key={feature} className="flex items-center gap-2">
                    <FaCheck className="text-blue-500" />
                    <p className="text-sm text-gray-400">{feature}</p>
                  </li>
                )) || (
                  <li className="text-sm text-gray-400">No features available</li>
                )}
              </ul>
            </CardBody>
            <CardFooter>
              <Button
                fullWidth
                onClick={() =>
                  openPaymentModal(
                    TIERS.find(
                      (tier: any) =>
                        tier.key ===
                        (activeTab === "setup" ? TiersEnum.Free : TiersEnum.Customize)
                    )
                  )
                }
                color="primary"
                variant="solid"
                radius="md"
                className="bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-[8px] hover:from-blue-700 hover:to-blue-600 transition-all duration-200"
              >
                Bayar Sekarang
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <p className="text-red-500">
            No pricing data available for {activeTab}.
          </p>
        )}
      </div>
      <Spacer y={10} />

      {/* Payment Modal */}
      {isPaymentModalOpen && (
        <PaymentModal
          isOpen={isPaymentModalOpen}
          onClose={closePaymentModal}
          paymentData={paymentData}
        />
      )}
    </section>
  );
};

export default Pricing;
