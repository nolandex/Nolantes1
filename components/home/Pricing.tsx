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
  Link,
} from "@nextui-org/react";
import { siteConfig } from "@/config/site";
import { ALL_TIERS } from "@/config/tiers";
import { FaCheck } from "react-icons/fa";
import { RoughNotation } from "react-rough-notation";
import { TiersEnum } from "@/types/pricing";

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
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showProcessingModal, setShowProcessingModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const TIERS = ALL_TIERS[`TIERS_${langName.toUpperCase()}`];

  // Mapping link berdasarkan bahasa
  const linkByLanguage: { [key: string]: string } = {
    en: "https://wa.me/6285156779923?text=Hi%2C%20I'm%20interested%20in%20your%20business%20setup%20services",
    zh: "https://wa.me/6285156779923?text=Hi%2C%20saya%20tertarik%20dengan%20layanan%20setup%20bisnis%20Anda",
    ja: "https://wa.me/6281234567891?text=こんにちは、ビジネス設定サービスに興味があります",
    ar: "https://wa.me/6281234567892?text=مرحبا، أنا مهتم بخدمات إعداد الأعمال",
    es: "https://wa.me/6281234567893?text=Hola, estoy interesado en tus servicios de configuración de negocios",
    ru: "https://wa.me/6281234567894?text=Здравствуйте, я заинтересован в ваших услугах по настройке бизнеса",
  };

  // Pilih link berdasarkan langName, fallback ke 'en' jika tidak ditemukan
  const whatsappLink = linkByLanguage[langName] || linkByLanguage.en;

  // Filter tier berdasarkan activeTab
  const selectedTier = TIERS?.find(
    (tier: any) =>
      tier.key === (activeTab === "setup" ? TiersEnum.Free : TiersEnum.Customize)
  );

  const handlePaymentClick = () => {
    setShowPaymentModal(true);
  };

  const handleClosePaymentModal = () => {
    setShowPaymentModal(false);
  };

  const handleConfirmPayment = () => {
    setShowPaymentModal(false);
    setShowProcessingModal(true);
    
    setTimeout(() => {
      setShowProcessingModal(false);
      setShowSuccessModal(true);
    }, 1500);
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };

  const handleMethodSelect = (method: string) => {
    setSelectedMethod(method);
  };

  const getMethodName = (method: string | null) => {
    const methods: Record<string, string> = {
      'qris': 'QRIS',
      'virtual_account': 'Virtual Account',
      'bank_transfer': 'Transfer Bank',
      'ewallet': 'E-Wallet',
      'retail': 'Retail',
      'credit_card': 'Kartu Kredit'
    };
    return method ? methods[method] || 'Pembayaran' : '';
  };

  const formatRupiah = (amount: string) => {
    return 'Rp' + parseInt(amount).toLocaleString('id-ID');
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
        {selectedTier ? (
          <Card
            key={selectedTier.key}
            className="p-2 bg-gradient-to-br from-gray-900 to-gray-800 rounded-[8px]"
            shadow="md"
            radius="md"
          >
            <CardHeader className="flex flex-col items-start gap-1 pb-0">
              {/* Tab Navigation */}
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
              {/* Tier Title and Description */}
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
            <CardBody className="gap-8">
              <p className="flex items-baseline gap-1 pt-2 pb-4">
                <span className="inline bg-gradient-to-br from-white to-gray-400 bg-clip-text text-4xl font-bold leading-7 tracking-tight text-transparent">
                  {selectedTier.price || "N/A"}
                </span>
              </p>
              <ul className="flex flex-col gap-1">
                {selectedTier.features && selectedTier.features.length > 0 ? (
                  selectedTier.features.map((feature: string) => (
                    <li key={feature} className="flex items-center gap-2">
                      <FaCheck className="text-blue-500" />
                      <p className="text-sm text-gray-400">{feature}</p>
                    </li>
                  ))
                ) : (
                  <li className="text-sm text-gray-400">
                    No features available
                  </li>
                )}
              </ul>
            </CardBody>
            <CardFooter>
              <Button
                fullWidth
                onClick={handlePaymentClick}
                color={selectedTier.buttonColor || "primary"}
                variant={selectedTier.buttonVariant || "solid"}
                radius="md"
                className="bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-[8px] hover:from-blue-700 hover:to-blue-600 transition-all duration-200"
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

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="bg-blue-600 p-6 text-white">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold">Pembayaran</h2>
                  <p className="text-blue-100 text-sm mt-1">Layanan Premium</p>
                </div>
                <button 
                  onClick={handleClosePaymentModal}
                  className="text-white hover:text-blue-200"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            </div>
            
            {/* Body */}
            <div className="p-6">
              {/* Order Summary */}
              <div className="flex justify-between items-center mb-6 p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium">Total Pembayaran</h3>
                  <p className="text-gray-500 text-sm">Termasuk PPN 11%</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-500 line-through text-sm">Rp 500.000</p>
                  <p className="text-blue-600 font-bold text-xl">Rp 299.000</p>
                </div>
              </div>

              {/* Payment Methods */}
              <h3 className="text-lg font-bold mb-4">Metode Pembayaran</h3>
              
              <div className="space-y-3 mb-6">
                {/* QRIS */}
                <div className="payment-method-container">
                  <div 
                    className="payment-method bg-white rounded-lg p-3 flex items-center cursor-pointer shadow-sm" 
                    onClick={() => handleMethodSelect('qris')}
                  >
                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mr-3">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QRIS_logo.svg/1200px-QRIS_logo.svg.png" alt="QRIS" className="h-5" />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-medium text-sm">QRIS</h3>
                    </div>
                    <i className="fas fa-chevron-down text-gray-400"></i>
                  </div>
                </div>
                
                {/* Virtual Account */}
                <div className="payment-method-container">
                  <div 
                    className="payment-method bg-white rounded-lg p-3 flex items-center cursor-pointer shadow-sm" 
                    onClick={() => handleMethodSelect('virtual_account')}
                  >
                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mr-3">
                      <i className="fas fa-university text-blue-600"></i>
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-medium text-sm">Virtual Account</h3>
                    </div>
                    <i className="fas fa-chevron-down text-gray-400"></i>
                  </div>
                </div>
                
                {/* E-Wallets */}
                <div className="payment-method-container">
                  <div 
                    className="payment-method bg-white rounded-lg p-3 flex items-center cursor-pointer shadow-sm" 
                    onClick={() => handleMethodSelect('ewallet')}
                  >
                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mr-3">
                      <i className="fas fa-wallet text-green-600"></i>
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-medium text-sm">E-Wallet</h3>
                    </div>
                    <i className="fas fa-chevron-down text-gray-400"></i>
                  </div>
                </div>
              </div>

              <button 
                onClick={handleConfirmPayment}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold"
              >
                <i className="fas fa-check-circle mr-2"></i> Konfirmasi Pembayaran
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Processing Modal */}
      {showProcessingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6 text-center">
            <div className="mb-4">
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="loading-bar h-full bg-blue-500 w-full animate-pulse"></div>
              </div>
            </div>
            <h3 className="text-lg font-bold mb-2">Memproses Pembayaran</h3>
            <p className="text-gray-600">Harap tunggu sebentar...</p>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6 text-center">
            <div className="text-green-500 mb-4">
              <i className="fas fa-check-circle text-5xl"></i>
            </div>
            <h2 className="text-2xl font-bold mb-2">Pembayaran Berhasil!</h2>
            <p className="text-gray-600 mb-4">Terima kasih telah melakukan pembayaran.</p>
            
            <div className="bg-gray-50 p-4 rounded-lg mb-4 text-left">
              <div className="flex justify-between mb-2">
                <span className="text-gray-500">Invoice</span>
                <span className="font-mono">INV-{Math.floor(1000 + Math.random() * 9000)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-500">Metode</span>
                <span className="font-medium">{getMethodName(selectedMethod)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Total</span>
                <span className="font-bold text-blue-600">Rp 299.000</span>
              </div>
            </div>
            
            <button 
              onClick={handleCloseSuccessModal}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold"
            >
              Selesai
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Pricing;
