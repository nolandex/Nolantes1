"use client";

import { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Link,
  Spacer,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Select,
  SelectItem,
  Image
} from "@nextui-org/react";
import { siteConfig } from "@/config/site";
import { ALL_TIERS } from "@/config/tiers";
import { FaCheck, FaChevronDown, FaCopy, FaTimes, FaLock, FaArrowRight, FaCheckCircle, FaInfoCircle, FaExclamationCircle } from "react-icons/fa";
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
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isProcessingModalOpen, setIsProcessingModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState("");
  const [activeDetails, setActiveDetails] = useState("");
  const [selectedBank, setSelectedBank] = useState("");
  const [selectedWallet, setSelectedWallet] = useState("");
  const [selectedRetail, setSelectedRetail] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  
  const TIERS = ALL_TIERS[`TIERS_${langName.toUpperCase()}`];
  
  // Filter tier berdasarkan activeTab
  const selectedTier = TIERS?.find(
    (tier: any) =>
      tier.key === (activeTab === "setup" ? TiersEnum.Free : TiersEnum.Customize)
  );

  const handleMethodClick = (method: string) => {
    setSelectedMethod(method);
    setActiveDetails(activeDetails === method ? "" : method);
  };

  const handleBankSelect = (bank: string) => {
    setSelectedBank(bank);
  };

  const handleWalletSelect = (wallet: string) => {
    setSelectedWallet(wallet);
  };

  const handleRetailSelect = (retail: string) => {
    setSelectedRetail(retail);
  };

  const processPayment = () => {
    setIsPaymentModalOpen(false);
    setIsProcessingModalOpen(true);
    
    // Generate random invoice number
    setInvoiceNumber(`INV-${Math.floor(1000 + Math.random() * 9000)}`);
    
    setTimeout(() => {
      setIsProcessingModalOpen(false);
      setIsSuccessModalOpen(true);
    }, 1500);
  };

  const getMethodName = (method: string) => {
    const methods: Record<string, string> = {
      'qris': 'QRIS',
      'virtual_account': 'Virtual Account',
      'bank_transfer': 'Transfer Bank',
      'ewallet': 'E-Wallet',
      'retail': 'Retail',
      'credit_card': 'Kartu Kredit'
    };
    return methods[method] || 'Pembayaran';
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(() => {
      // You can add toast notification here if needed
      console.log(`${label} copied to clipboard`);
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  };

  const getVaNumber = (bank: string) => {
    const vaNumbers: Record<string, string> = {
      'bca': '8888801234567890',
      'mandiri': '8888802345678901',
      'bni': '8888803456789012'
    };
    return vaNumbers[bank] || '8888800000000000';
  };

  const getWalletNumber = (wallet: string) => {
    const numbers: Record<string, string> = {
      'dana': '081234567890',
      'gopay': '081987654321',
      'ovo': '082345678901'
    };
    return numbers[wallet] || '081200000000';
  };

  const getRetailCode = (retail: string) => {
    const codes: Record<string, string> = {
      'alfamart': `ALFA${Math.floor(100000 + Math.random() * 900000)}`,
      'indomaret': `INDO${Math.floor(100000 + Math.random() * 900000)}`
    };
    return codes[retail] || `RETAIL${Math.floor(100000 + Math.random() * 900000)}`;
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
            <CardBody className="gap-6">
              <p className="flex items-baseline gap-1 pt-2">
                <span className="inline bg-gradient-to-br from-white to-gray-400 bg-clip-text text-xl font-semibold leading-7 tracking-tight text-transparent">
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
                color={selectedTier.buttonColor || "primary"}
                variant={selectedTier.buttonVariant || "solid"}
                radius="md"
                className="bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-[8px] hover:from-blue-700 hover:to-blue-600 transition-all duration-200"
                onPress={() => setIsPaymentModalOpen(true)}
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
      
      {/* Payment Modal */}
      <Modal 
        isOpen={isPaymentModalOpen} 
        onOpenChange={setIsPaymentModalOpen}
        placement="center"
        backdrop="blur"
        size="2xl"
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 bg-blue-600 text-white p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-bold">Pembayaran</h2>
                    <p className="text-blue-100 text-sm mt-1">{selectedTier?.title}</p>
                  </div>
                  <Button isIconOnly variant="light" onPress={onClose} className="text-white">
                    <FaTimes />
                  </Button>
                </div>
              </ModalHeader>
              
              <ModalBody className="p-6">
                {/* Order Summary */}
                <div className="flex justify-between items-center mb-6 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium">Total Pembayaran</h3>
                    <p className="text-gray-500 text-sm">Termasuk PPN 11%</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-500 line-through text-sm">Rp 500.000</p>
                    <p className="text-blue-600 font-bold text-xl">{selectedTier?.price}</p>
                  </div>
                </div>

                {/* Payment Methods */}
                <h3 className="text-lg font-bold mb-4">Metode Pembayaran</h3>
                
                <div className="space-y-3 mb-6">
                  {/* QRIS */}
                  <div className="payment-method-container">
                    <div 
                      className={`payment-method bg-white rounded-lg p-3 flex items-center cursor-pointer shadow-sm ${activeDetails === 'qris' ? 'border border-blue-400' : ''}`}
                      onClick={() => handleMethodClick('qris')}
                    >
                      <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mr-3">
                        <Image
                          src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QRIS_logo.svg/1200px-QRIS_logo.svg.png"
                          alt="QRIS"
                          className="h-5"
                        />
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-medium text-sm">QRIS</h3>
                      </div>
                      <FaChevronDown className={`text-gray-400 transition-transform duration-300 ${activeDetails === 'qris' ? 'transform rotate-180' : ''}`} />
                    </div>
                    
                    <div className={`payment-details overflow-hidden transition-all duration-300 ${activeDetails === 'qris' ? 'max-h-[500px]' : 'max-h-0'}`}>
                      <div className="payment-details-content p-4">
                        <div className="text-center mb-4">
                          <div className="qr-code mx-auto w-48 h-48 border-2 border-dashed border-gray-300 rounded-lg mb-3 flex items-center justify-center">
                            <p className="text-gray-400">QR Code Preview</p>
                          </div>
                          <p className="text-sm text-gray-500">Scan QR code menggunakan aplikasi mobile banking atau e-wallet</p>
                        </div>
                        
                        <div className="bg-blue-50 p-3 rounded-lg text-sm text-blue-800 mb-4">
                          <p className="flex items-center">
                            <FaInfoCircle className="mr-2" /> QR code akan kadaluarsa dalam 24 jam
                          </p>
                        </div>
                        
                        <Button 
                          fullWidth 
                          color="primary"
                          className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold"
                          onPress={processPayment}
                        >
                          <FaCheckCircle className="mr-2" /> Saya Sudah Bayar
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Virtual Account */}
                  <div className="payment-method-container">
                    <div 
                      className={`payment-method bg-white rounded-lg p-3 flex items-center cursor-pointer shadow-sm ${activeDetails === 'virtual_account' ? 'border border-blue-400' : ''}`}
                      onClick={() => handleMethodClick('virtual_account')}
                    >
                      <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mr-3">
                        <FaCheck className="text-blue-600" />
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-medium text-sm">Virtual Account</h3>
                      </div>
                      <FaChevronDown className={`text-gray-400 transition-transform duration-300 ${activeDetails === 'virtual_account' ? 'transform rotate-180' : ''}`} />
                    </div>
                    
                    <div className={`payment-details overflow-hidden transition-all duration-300 ${activeDetails === 'virtual_account' ? 'max-h-[500px]' : 'max-h-0'}`}>
                      <div className="payment-details-content p-4">
                        <h4 className="font-medium mb-3 text-center">Pilih Bank</h4>
                        <div className="grid grid-cols-3 gap-2 mb-4">
                          {/* BCA */}
                          <div 
                            className={`method-item p-2 rounded-lg cursor-pointer text-center ${selectedBank === 'bca' ? 'bg-blue-100' : ''}`}
                            onClick={() => handleBankSelect('bca')}
                          >
                            <Image
                              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Bank_Central_Asia.svg/2560px-Bank_Central_Asia.svg.png"
                              alt="BCA"
                              className="h-8 mx-auto"
                            />
                          </div>
                          
                          {/* Mandiri */}
                          <div 
                            className={`method-item p-2 rounded-lg cursor-pointer text-center ${selectedBank === 'mandiri' ? 'bg-blue-100' : ''}`}
                            onClick={() => handleBankSelect('mandiri')}
                          >
                            <Image
                              src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Bank_Mandiri_logo_2016.svg/1200px-Bank_Mandiri_logo_2016.svg.png"
                              alt="Mandiri"
                              className="h-8 mx-auto"
                            />
                          </div>
                          
                          {/* BNI */}
                          <div 
                            className={`method-item p-2 rounded-lg cursor-pointer text-center ${selectedBank === 'bni' ? 'bg-blue-100' : ''}`}
                            onClick={() => handleBankSelect('bni')}
                          >
                            <Image
                              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/BNI_logo.svg/1200px-BNI_logo.svg.png"
                              alt="BNI"
                              className="h-8 mx-auto"
                            />
                          </div>
                        </div>
                        
                        <div className="bg-gray-50 p-4 rounded-lg mb-4">
                          <div className="mb-3">
                            <label className="block text-gray-500 text-sm mb-1">Nomor Virtual Account</label>
                            <div className="flex items-center">
                              <span className="font-mono bg-gray-100 p-2 rounded flex-1">
                                {selectedBank ? getVaNumber(selectedBank) : 'Pilih bank terlebih dahulu'}
                              </span>
                              <Button 
                                isIconOnly 
                                variant="light" 
                                className="text-blue-600 hover:text-blue-800 ml-2"
                                onPress={() => copyToClipboard(getVaNumber(selectedBank), 'Nomor VA')}
                              >
                                <FaCopy />
                              </Button>
                            </div>
                          </div>
                          <div>
                            <label className="block text-gray-500 text-sm mb-1">Jumlah Transfer</label>
                            <span className="font-bold text-blue-600">{selectedTier?.price}</span>
                          </div>
                        </div>
                        
                        <div className="bg-yellow-50 p-3 rounded-lg text-sm text-yellow-800 mb-4">
                          <p className="flex items-center">
                            <FaExclamationCircle className="mr-2" /> Transfer tepat sesuai nominal untuk proses otomatis
                          </p>
                        </div>
                        
                        <Button 
                          fullWidth 
                          color="primary"
                          className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold"
                          onPress={processPayment}
                          isDisabled={!selectedBank}
                        >
                          <FaCheckCircle className="mr-2" /> Konfirmasi Pembayaran
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  {/* E-Wallets */}
                  <div className="payment-method-container">
                    <div 
                      className={`payment-method bg-white rounded-lg p-3 flex items-center cursor-pointer shadow-sm ${activeDetails === 'ewallet' ? 'border border-blue-400' : ''}`}
                      onClick={() => handleMethodClick('ewallet')}
                    >
                      <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mr-3">
                        <FaCheck className="text-green-600" />
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-medium text-sm">E-Wallet</h3>
                      </div>
                      <FaChevronDown className={`text-gray-400 transition-transform duration-300 ${activeDetails === 'ewallet' ? 'transform rotate-180' : ''}`} />
                    </div>
                    
                    <div className={`payment-details overflow-hidden transition-all duration-300 ${activeDetails === 'ewallet' ? 'max-h-[500px]' : 'max-h-0'}`}>
                      <div className="payment-details-content p-4">
                        <h4 className="font-medium mb-3 text-center">Pilih E-Wallet</h4>
                        <div className="grid grid-cols-3 gap-2 mb-4">
                          {/* DANA */}
                          <div 
                            className={`method-item p-2 rounded-lg cursor-pointer text-center ${selectedWallet === 'dana' ? 'bg-blue-100' : ''}`}
                            onClick={() => handleWalletSelect('dana')}
                          >
                            <Image
                              src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Logo_dana_blue.svg/1200px-Logo_dana_blue.svg.png"
                              alt="DANA"
                              className="h-8 mx-auto"
                            />
                          </div>
                          
                          {/* GoPay */}
                          <div 
                            className={`method-item p-2 rounded-lg cursor-pointer text-center ${selectedWallet === 'gopay' ? 'bg-blue-100' : ''}`}
                            onClick={() => handleWalletSelect('gopay')}
                          >
                            <Image
                              src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Gopay_logo.svg/1200px-Gopay_logo.svg.png"
                              alt="GoPay"
                              className="h-8 mx-auto"
                            />
                          </div>
                          
                          {/* OVO */}
                          <div 
                            className={`method-item p-2 rounded-lg cursor-pointer text-center ${selectedWallet === 'ovo' ? 'bg-blue-100' : ''}`}
                            onClick={() => handleWalletSelect('ovo')}
                          >
                            <Image
                              src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/OVO_logo.svg/1200px-OVO_logo.svg.png"
                              alt="OVO"
                              className="h-8 mx-auto"
                            />
                          </div>
                        </div>
                        
                        <div className="bg-gray-50 p-4 rounded-lg mb-4">
                          <div className="mb-3">
                            <label className="block text-gray-500 text-sm mb-1">Nomor E-Wallet</label>
                            <div className="flex items-center">
                              <span className="font-mono bg-gray-100 p-2 rounded flex-1">
                                {selectedWallet ? getWalletNumber(selectedWallet) : 'Pilih e-wallet terlebih dahulu'}
                              </span>
                              <Button 
                                isIconOnly 
                                variant="light" 
                                className="text-blue-600 hover:text-blue-800 ml-2"
                                onPress={() => copyToClipboard(getWalletNumber(selectedWallet), 'Nomor e-wallet')}
                              >
                                <FaCopy />
                              </Button>
                            </div>
                          </div>
                          <div>
                            <label className="block text-gray-500 text-sm mb-1">Jumlah Transfer</label>
                            <span className="font-bold text-blue-600">{selectedTier?.price}</span>
                          </div>
                        </div>
                        
                        <div className="bg-blue-50 p-3 rounded-lg text-sm text-blue-800 mb-4">
                          <p className="flex items-center">
                            <FaInfoCircle className="mr-2" /> Anda akan diarahkan ke aplikasi untuk menyelesaikan pembayaran
                          </p>
                        </div>
                        
                        <Button 
                          fullWidth 
                          color="primary"
                          className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold"
                          onPress={processPayment}
                          isDisabled={!selectedWallet}
                        >
                          <FaArrowRight className="mr-2" /> Lanjut ke Pembayaran
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Credit Card */}
                  <div className="payment-method-container">
                    <div 
                      className={`payment-method bg-white rounded-lg p-3 flex items-center cursor-pointer shadow-sm ${activeDetails === 'credit_card' ? 'border border-blue-400' : ''}`}
                      onClick={() => handleMethodClick('credit_card')}
                    >
                      <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mr-3">
                        <FaCheck className="text-purple-600" />
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-medium text-sm">Kartu Kredit</h3>
                      </div>
                      <FaChevronDown className={`text-gray-400 transition-transform duration-300 ${activeDetails === 'credit_card' ? 'transform rotate-180' : ''}`} />
                    </div>
                    
                    <div className={`payment-details overflow-hidden transition-all duration-300 ${activeDetails === 'credit_card' ? 'max-h-[500px]' : 'max-h-0'}`}>
                      <div className="payment-details-content p-4">
                        <div className="mb-4">
                          <label className="block text-gray-700 mb-2">Informasi Kartu</label>
                          <div className="space-y-3">
                            <Input 
                              type="text" 
                              placeholder="Nomor Kartu" 
                              maxLength={19}
                            />
                            <div className="grid grid-cols-2 gap-3">
                              <Input 
                                type="text" 
                                placeholder="MM/YY" 
                                maxLength={5}
                              />
                              <Input 
                                type="text" 
                                placeholder="CVV" 
                                maxLength={3}
                              />
                            </div>
                            <Input 
                              type="text" 
                              placeholder="Nama di Kartu"
                            />
                          </div>
                        </div>
                        
                        <div className="flex items-center mb-4">
                          <Input type="checkbox" id="saveCard" className="mr-2" />
                          <label htmlFor="saveCard" className="text-sm text-gray-600">Simpan kartu untuk pembayaran berikutnya</label>
                        </div>
                        
                        <div className="bg-gray-50 p-4 rounded-lg mb-4">
                          <div className="flex justify-between">
                            <span className="text-gray-500">Jumlah Pembayaran</span>
                            <span className="font-bold text-blue-600">{selectedTier?.price}</span>
                          </div>
                        </div>
                        
                        <Button 
                          fullWidth 
                          color="primary"
                          className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold"
                          onPress={processPayment}
                        >
                          <FaLock className="mr-2" /> Bayar Sekarang
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Payment Processing Modal */}
      <Modal 
        isOpen={isProcessingModalOpen} 
        onOpenChange={setIsProcessingModalOpen}
        placement="center"
        backdrop="blur"
        hideCloseButton
        isDismissable={false}
      >
        <ModalContent>
          <ModalBody className="p-6 text-center">
            <div className="mb-4">
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="loading-bar h-full bg-blue-500 w-full animate-pulse"></div>
              </div>
            </div>
            <h3 className="text-lg font-bold mb-2">Memproses Pembayaran</h3>
            <p className="text-gray-600">Harap tunggu sebentar...</p>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Success Modal */}
      <Modal 
        isOpen={isSuccessModalOpen} 
        onOpenChange={setIsSuccessModalOpen}
        placement="center"
        backdrop="blur"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1 text-center">
            <div className="text-green-500 mb-4 mx-auto">
              <FaCheckCircle className="text-5xl" />
            </div>
            <h2 className="text-2xl font-bold">Pembayaran Berhasil!</h2>
          </ModalHeader>
          <ModalBody>
            <p className="text-gray-600 mb-4 text-center">Terima kasih telah melakukan pembayaran.</p>
            
            <div className="bg-gray-50 p-4 rounded-lg mb-4 text-left">
              <div className="flex justify-between mb-2">
                <span className="text-gray-500">Invoice</span>
                <span className="font-mono">{invoiceNumber}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-500">Metode</span>
                <span className="font-medium">{getMethodName(selectedMethod)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Total</span>
                <span className="font-bold text-blue-600">{selectedTier?.price}</span>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button 
              fullWidth 
              color="primary"
              className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold"
              onPress={() => setIsSuccessModalOpen(false)}
            >
              Selesai
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Spacer y={10} />
      <div className="flex py-2">
        <p className="text-gray-500 text-center">
          {locale.doYouLike}{" "}
          <Link  
            color="foreground"  
            href={siteConfig.authors[0].twitter}  
            underline="always"  
            rel="noopener noreferrer nofollow"  
          >
            {locale.follow}
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Pricing;
