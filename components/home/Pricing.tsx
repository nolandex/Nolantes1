"use client";

import { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Link,
  Spacer,
  Image
} from "@nextui-org/react";
import { siteConfig } from "@/config/site";
import { ALL_TIERS } from "@/config/tiers";
import { FaCheck, FaChevronDown, FaCopy, FaTimes, FaLock, FaArrowRight, FaCheckCircle, FaInfoCircle, FaExclamationCircle } from "react-icons/fa";
import { RoughNotation } from "react-rough-notation";
import { TiersEnum } from "@/types/pricing";

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
  // Hapus state modal React
  // const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  // const [isProcessingModalOpen, setIsProcessingModalOpen] = useState(false);
  // const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [activeDetails, setActiveDetails] = useState("");
  const [selectedBank, setSelectedBank] = useState("");
  const [selectedWallet, setSelectedWallet] = useState("");
  // const [invoiceNumber, setInvoiceNumber] = useState(""); // Invoice number akan dihandle di HTML
  const [selectedTierData, setSelectedTierData] = useState<{ title?: string; price?: string }>({});

  const TIERS = ALL_TIERS[`TIERS_${langName.toUpperCase()}`];
  const selectedTier = TIERS?.find(
    (tier: any) => tier.key === (activeTab === "setup" ? TiersEnum.Free : TiersEnum.Customize)
  );

  const handleMethodClick = (method: string) => {
    setActiveDetails(activeDetails === method ? "" : method);
  };

  // Fungsi processPayment dihapus dari sini dan dipindahkan ke script HTML

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  // Warna tetap (tidak terpengaruh dark mode)
  const customStyles = {
    card: "bg-gradient-to-br from-gray-900 to-gray-800 rounded-[8px]",
    modal: "bg-white text-gray-800",
    modalHeader: "bg-blue-600 text-white",
    button: "bg-blue-600 hover:bg-blue-700 text-white",
    secondaryButton: "bg-gray-200 hover:bg-gray-300 text-gray-800",
    input: "bg-white border-gray-300",
    infoBox: "bg-blue-50 text-blue-800",
    warningBox: "bg-yellow-50 text-yellow-800",
    successBox: "bg-green-50 text-green-800",
    paymentMethod: "bg-white border-gray-200",
    paymentDetails: "bg-gray-50",
    disabledButton: "bg-gray-400 text-gray-100"
  };

  const openPaymentModal = () => {
    if (selectedTier) {
      setSelectedTierData({ title: selectedTier.title, price: selectedTier.price });
      const openButton = document.getElementById('openPaymentButton');
      if (openButton) {
        openButton.click(); // Memicu klik pada tombol HTML untuk membuka modal
      }
    } else {
      console.warn("Tidak ada data tier yang dipilih.");
    }
  };

  return (
    <section id={id} className="flex flex-col justify-center max-w-3xl items-center pt-12">
      <div className="flex flex-col text-center max-w-lg">
        <h2 className="text-center text-white">
          <RoughNotation type="highlight" show={true} color="#2563EB">
            {locale.title}
          </RoughNotation>
        </h2>
        <h3 className="text-3xl font-medium tracking-tight mt-2 text-white">
          {locale.title2}
        </h3>
        <Spacer y={3} />
        <p className="text-medium text-gray-400">{locale.description}</p>
      </div>
      <Spacer y={6} />
      <div className="w-[85%] max-w-lg">
        {selectedTier ? (
          <Card className={`p-2 ${customStyles.card}`} shadow="md" radius="md">
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
                  {langName === "en" ? "Setup" : "Free"}
                </button>
                <button
                  onClick={() => setActiveTab("website")}
                  className={`flex-1 py-2 text-sm font-medium text-center transition-colors duration-200 ${
                    activeTab === "website"
                      ? "text-blue-400 border-b-2 border-blue-400"
                      : "text-gray-400 hover:text-gray-200"
                  }`}
                >
                  {langName === "en" ? "Website" : "Custom"}
                </button>
              </div>
              <div className="pt-4">
                <h2 className="text-medium font-medium text-white">
                  {selectedTier.title || "Untitled"}
                </h2>
                <p className="text-sm text-gray-400">
                  {selectedTier.description || "No description"}
                </p>
              </div>
            </CardHeader>
            <Divider className="bg-gray-700" />
            <CardBody className="gap-6">
              <p className="flex items-baseline gap-1 pt-2">
                <span className="inline bg-gradient-to-br from-white to-gray-400 bg-clip-text text-xl font-semibold leading-7 tracking-tight text-transparent">
                  {selectedTier.price || "N/A"}
                </span>
              </p>
              <ul className="flex flex-col gap-1">
                {selectedTier.features?.map((feature: string) => (
                  <li key={feature} className="flex items-center gap-2">
                    <FaCheck className="text-blue-500" />
                    <p className="text-sm text-gray-400">{feature}</p>
                  </li>
                ))}
              </ul>
            </CardBody>
            <CardFooter>
              <Button
                fullWidth
                className={`${customStyles.button} py-3 rounded-lg font-bold`}
                onClick={openPaymentModal} // Sekarang memanggil fungsi untuk membuka modal HTML
                data-product={selectedTier?.title} // Menyimpan data produk
                data-amount={selectedTier?.price} // Menyimpan data harga
              >
                {selectedTier.buttonText || "Buy"}
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
      <div className="flex py-2">
        <p className="text-gray-500 text-center">
          {locale.doYouLike}{" "}
          <Link
            color="foreground"
            href={siteConfig.authors[0].twitter}
            underline="always"
            rel="noopener noreferrer nofollow"
            className="text-blue-400"
          >
            {locale.follow}
          </Link>
        </p>
      </div>

      {/* Elemen modal HTML akan dirender di luar komponen ini, mungkin di _document.js atau layout */}
    </section>
  );
};

export default Pricing;
