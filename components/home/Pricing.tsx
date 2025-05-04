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
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
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
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isProcessingModalOpen, setIsProcessingModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [activeDetails, setActiveDetails] = useState("");
  const [selectedBank, setSelectedBank] = useState("");
  const [selectedWallet, setSelectedWallet] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");

  const TIERS = ALL_TIERS[`TIERS_${langName.toUpperCase()}`];
  const selectedTier = TIERS?.find(
    (tier: any) => tier.key === (activeTab === "setup" ? TiersEnum.Free : TiersEnum.Customize)
  );

  const handleMethodClick = (method: string) => {
    setActiveDetails(activeDetails === method ? "" : method);
  };

  const processPayment = () => {
    setIsPaymentModalOpen(false);
    setIsProcessingModalOpen(true);
    setInvoiceNumber(`INV-${Math.floor(1000 + Math.random() * 9000)}`);
    
    setTimeout(() => {
      setIsProcessingModalOpen(false);
      setIsSuccessModalOpen(true);
    }, 1500);
  };

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
        size="md"
        className="max-w-md"
      >
        <ModalContent className={`${customStyles.modal} rounded-t-lg`}>
          {(onClose) => (
            <>
              <ModalHeader className={`${customStyles.modalHeader} p-6 rounded-t-lg`}>
                <div className="flex justify-between items-center w-full">
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
                <div className="flex justify-between items-center mb-6 p-4 bg-gray-100 rounded-lg">
                  <div>
                    <h3 className="font-medium">Total Pembayaran</h3>
                    <p className="text-gray-500 text-sm">Termasuk PPN 11%</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-500 line-through text-sm">Rp 500.000</p>
                    <p className="text-blue-600 font-bold text-xl">{selectedTier?.price}</p>
                  </div>
                </div>

                <h3 className="text-lg font-bold mb-4">Metode Pembayaran</h3>
                
                <div className="space-y-3 mb-6">
                  {/* QRIS */}
                  <div>
                    <div 
                      className={`${customStyles.paymentMethod} rounded-lg p-3 flex items-center cursor-pointer shadow-sm border ${
                        activeDetails === 'qris' ? 'border-blue-400' : ''
                      }`}
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
                      <FaChevronDown className={`text-gray-400 transition-transform duration-300 ${
                        activeDetails === 'qris' ? 'transform rotate-180' : ''
                      }`} />
                    </div>
                    
                    {activeDetails === 'qris' && (
                      <div className={`${customStyles.paymentDetails} p-4 rounded-b-lg`}>
                        <div className="text-center mb-4">
                          <div className="qr-code mx-auto w-48 h-48 border-2 border-dashed border-gray-300 rounded-lg mb-3 flex items-center justify-center">
                            <p className="text-gray-400">QR Code Preview</p>
                          </div>
                          <p className="text-sm text-gray-500">Scan QR code menggunakan aplikasi mobile banking atau e-wallet</p>
                        </div>
                        
                        <div className={`${customStyles.infoBox} p-3 rounded-lg text-sm mb-4 flex items-center`}>
                          <FaInfoCircle className="mr-2" /> QR code akan kadaluarsa dalam 24 jam
                        </div>
                        
                        <Button 
                          fullWidth 
                          className={`${customStyles.button} py-3 rounded-lg font-bold`}
                          onPress={processPayment}
                        >
                          <FaCheckCircle className="mr-2" /> Saya Sudah Bayar
                        </Button>
                      </div>
                    )}
                  </div>
                  
                  {/* Virtual Account */}
                  <div>
                    <div 
                      className={`${customStyles.paymentMethod} rounded-lg p-3 flex items-center cursor-pointer shadow-sm border ${
                        activeDetails === 'virtual_account' ? 'border-blue-400' : ''
                      }`}
                      onClick={() => handleMethodClick('virtual_account')}
                    >
                      <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mr-3">
                        <FaCheck className="text-blue-600" />
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-medium text-sm">Virtual Account</h3>
                      </div>
                      <FaChevronDown className={`text-gray-400 transition-transform duration-300 ${
                        activeDetails === 'virtual_account' ? 'transform rotate-180' : ''
                      }`} />
                    </div>
                    
                    {activeDetails === 'virtual_account' && (
                      <div className={`${customStyles.paymentDetails} p-4 rounded-b-lg`}>
                        <h4 className="font-medium mb-3 text-center">Pilih Bank</h4>
                        <div className="grid grid-cols-3 gap-2 mb-4">
                          {['bca', 'mandiri', 'bni'].map((bank) => (
                            <div 
                              key={bank}
                              className={`p-2 rounded-lg cursor-pointer text-center ${
                                selectedBank === bank ? 'bg-blue-100' : 'bg-white'
                              }`}
                              onClick={() => setSelectedBank(bank)}
                            >
                              <Image
                                src={`https://logo.clearbit.com/${bank}.co.id`}
                                alt={bank.toUpperCase()}
                                className="h-8 mx-auto"
                              />
                            </div>
                          ))}
                        </div>
                        
                        <div className="bg-gray-100 p-4 rounded-lg mb-4">
                          <div className="mb-3">
                            <label className="block text-gray-500 text-sm mb-1">Nomor Virtual Account</label>
                            <div className="flex items-center">
                              <span className="font-mono bg-gray-200 p-2 rounded flex-1">
                                {selectedBank ? `88888${selectedBank === 'bca' ? '01234567890' : selectedBank === 'mandiri' ? '12345678901' : '23456789012'}` : 'Pilih bank terlebih dahulu'}
                              </span>
                              <Button 
                                isIconOnly 
                                variant="light" 
                                className="text-blue-600 hover:text-blue-800 ml-2"
                                onPress={() => copyToClipboard(`88888${selectedBank === 'bca' ? '01234567890' : selectedBank === 'mandiri' ? '12345678901' : '23456789012'}`)}
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
                        
                        <div className={`${customStyles.warningBox} p-3 rounded-lg text-sm mb-4 flex items-center`}>
                          <FaExclamationCircle className="mr-2" /> Transfer tepat sesuai nominal untuk proses otomatis
                        </div>
                        
                        <Button 
                          fullWidth 
                          className={`${customStyles.button} py-3 rounded-lg font-bold ${
                            !selectedBank ? customStyles.disabledButton : ''
                          }`}
                          onPress={processPayment}
                          disabled={!selectedBank}
                        >
                          <FaCheckCircle className="mr-2" /> Konfirmasi Pembayaran
                        </Button>
                      </div>
                    )}
                  </div>
                  
                  {/* Credit Card */}
                  <div>
                    <div 
                      className={`${customStyles.paymentMethod} rounded-lg p-3 flex items-center cursor-pointer shadow-sm border ${
                        activeDetails === 'credit_card' ? 'border-blue-400' : ''
                      }`}
                      onClick={() => handleMethodClick('credit_card')}
                    >
                      <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mr-3">
                        <FaCheck className="text-purple-600" />
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-medium text-sm">Kartu Kredit</h3>
                      </div>
                      <FaChevronDown className={`text-gray-400 transition-transform duration-300 ${
                        activeDetails === 'credit_card' ? 'transform rotate-180' : ''
                      }`} />
                    </div>
                    
                    {activeDetails === 'credit_card' && (
                      <div className={`${customStyles.paymentDetails} p-4 rounded-b-lg`}>
                        <div className="mb-4">
                          <label className="block text-gray-700 mb-2">Informasi Kartu</label>
                          <div className="space-y-3">
                            <Input 
                              type="text" 
                              placeholder="Nomor Kartu" 
                              maxLength={19}
                              className={customStyles.input}
                            />
                            <div className="grid grid-cols-2 gap-3">
                              <Input 
                                type="text" 
                                placeholder="MM/YY" 
                                maxLength={5}
                                className={customStyles.input}
                              />
                              <Input 
                                type="text" 
                                placeholder="CVV" 
                                maxLength={3}
                                className={customStyles.input}
                              />
                            </div>
                            <Input 
                              type="text" 
                              placeholder="Nama di Kartu"
                              className={customStyles.input}
                            />
                          </div>
                        </div>
                        
                        <div className="flex items-center mb-4">
                          <Input type="checkbox" id="saveCard" className="mr-2" />
                          <label htmlFor="saveCard" className="text-sm text-gray-600">Simpan kartu untuk pembayaran berikutnya</label>
                        </div>
                        
                        <div className="bg-gray-100 p-4 rounded-lg mb-4">
                          <div className="flex justify-between">
                            <span className="text-gray-500">Jumlah Pembayaran</span>
                            <span className="font-bold text-blue-600">{selectedTier?.price}</span>
                          </div>
                        </div>
                        
                        <Button 
                          fullWidth 
                          className={`${customStyles.button} py-3 rounded-lg font-bold`}
                          onPress={processPayment}
                        >
                          <FaLock className="mr-2" /> Bayar Sekarang
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Processing Modal */}
      <Modal 
        isOpen={isProcessingModalOpen} 
        onOpenChange={setIsProcessingModalOpen}
        placement="center"
        backdrop="blur"
        hideCloseButton
        isDismissable={false}
        className="max-w-xs"
      >
        <ModalContent className={customStyles.modal}>
          <ModalBody className="p-6 text-center">
            <div className="mb-4">
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 w-full animate-pulse"></div>
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
        className="max-w-xs"
      >
        <ModalContent className={`${customStyles.modal} rounded-lg`}>
          <ModalHeader className="flex flex-col gap-1 text-center pt-6">
            <div className="text-green-500 mb-4 mx-auto">
              <FaCheckCircle className="text-5xl" />
            </div>
            <h2 className="text-2xl font-bold">Pembayaran Berhasil!</h2>
          </ModalHeader>
          <ModalBody>
            <p className="text-gray-600 mb-4 text-center">Terima kasih telah melakukan pembayaran.</p>
            
            <div className="bg-gray-100 p-4 rounded-lg mb-4 text-left">
              <div className="flex justify-between mb-2">
                <span className="text-gray-500">Invoice</span>
                <span className="font-mono">{invoiceNumber}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-500">Metode</span>
                <span className="font-medium">
                  {activeDetails === 'qris' ? 'QRIS' : 
                   activeDetails === 'virtual_account' ? 'Virtual Account' : 
                   'Kartu Kredit'}
                </span>
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
              className={`${customStyles.button} py-3 rounded-lg font-bold`}
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
            className="text-blue-400"
          >
            {locale.follow}
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Pricing;
