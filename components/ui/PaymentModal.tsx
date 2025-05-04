'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface Plan {
  name: string;
  product: string;
  amount: number;
}

const PaymentModal = ({
  isOpen,
  onClose,
  plan,
}: {
  isOpen: boolean;
  onClose: () => void;
  plan: Plan;
}) => {
  const [activeMethod, setActiveMethod] = useState<string | null>(null);
  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
  const [selectedRetail, setSelectedRetail] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [paymentCode, setPaymentCode] = useState('');
  const [vaNumber, setVaNumber] = useState('');

  useEffect(() => {
    if (!isOpen) {
      resetStates();
    }
  }, [isOpen]);

  const resetStates = () => {
    setActiveMethod(null);
    setSelectedBank(null);
    setSelectedWallet(null);
    setSelectedRetail(null);
    setIsProcessing(false);
    setIsSuccess(false);
    setInvoiceNumber('');
    setIsCopied(false);
    setPaymentCode('');
    setVaNumber('');
  };

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const generatePaymentCode = (method: string) => {
    if (method === 'va' && selectedBank) {
      const prefix = selectedBank === 'BCA' ? '390' : selectedBank === 'Mandiri' ? '700' : '800';
      const code = `${prefix}${Math.floor(100000000 + Math.random() * 900000000)}`;
      setVaNumber(code);
      return code;
    } else if (method === 'ewallet' && selectedWallet) {
      return `08${Math.floor(100000000 + Math.random() * 900000000)}`;
    } else if (method === 'retail' && selectedRetail) {
      return `${selectedRetail.slice(0, 4).toUpperCase()}${Math.floor(100000 + Math.random() * 900000)}`;
    }
    return '';
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const processPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setInvoiceNumber(`INV-${Date.now().toString().slice(-8)}`);
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      {/* Processing Overlay */}
      {isProcessing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6 text-center">
            <div className="mb-4">
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="loading-bar h-full bg-blue-500" 
                  style={{ width: '100%', transition: 'width 1s ease-in-out' }}
                ></div>
              </div>
            </div>
            <h3 className="text-lg font-bold mb-2">Memproses Pembayaran</h3>
            <p className="text-gray-600">Harap tunggu sebentar...</p>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {isSuccess && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6 text-center">
            <div className="text-green-500 mb-4">
              <i className="fas fa-check-circle text-5xl"></i>
            </div>
            <h2 className="text-2xl font-bold mb-2">Pembayaran Berhasil!</h2>
            <p className="text-gray-600 mb-4">Terima kasih telah melakukan pembayaran.</p>
            <div className="bg-gray-50 p-4 rounded-lg mb-4 text-left">
              <div className="flex justify-between mb-2">
                <span className="text-gray-500">Invoice</span>
                <span className="font-mono">{invoiceNumber}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-500">Metode</span>
                <span className="font-medium">
                  {activeMethod === 'qris' ? 'QRIS' : 
                   activeMethod === 'va' ? 'Virtual Account' : 
                   activeMethod === 'ewallet' ? 'E-Wallet' : 
                   activeMethod === 'retail' ? 'Retail' : 
                   activeMethod === 'cc' ? 'Kartu Kredit' : ''}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Total</span>
                <span className="font-bold text-blue-600">{formatRupiah(plan.amount)}</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold"
            >
              Selesai
            </button>
          </div>
        </div>
      )}

      {/* Main Payment Modal */}
      <div className="w-full max-w-md overflow-y-auto rounded-2xl bg-white text-gray-800 shadow-xl max-h-[90vh]">
        <div className="rounded-t-2xl bg-blue-600 p-6 text-white">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold">{plan.name}</h2>
              <p className="text-blue-100 text-sm mt-1">{plan.product}</p>
            </div>
            <button onClick={onClose} className="text-white hover:text-blue-200">
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Order Summary */}
          <div className="flex justify-between items-center mb-6 p-4 bg-gray-50 rounded-lg">
            <div>
              <h3 className="font-medium">Total Pembayaran</h3>
              <p className="text-gray-500 text-sm">Termasuk PPN 11%</p>
            </div>
            <div className="text-right">
              <p className="text-gray-500 line-through text-sm">
                {formatRupiah(plan.amount * 1.67)}
              </p>
              <p className="text-blue-600 font-bold text-xl">
                {formatRupiah(plan.amount)}
              </p>
            </div>
          </div>

          {/* Payment Methods */}
          <h3 className="text-lg font-bold mb-4">Metode Pembayaran</h3>
          
          <div className="space-y-3 mb-6">
            {/* QRIS */}
            <div className="overflow-hidden">
              <button
                onClick={() => setActiveMethod(activeMethod === 'qris' ? null : 'qris')}
                className={`w-full flex items-center justify-between p-4 rounded-lg transition-all duration-300 ${
                  activeMethod === 'qris'
                    ? 'bg-blue-50 border-l-4 border-blue-500'
                    : 'bg-white border border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 ${
                    activeMethod === 'qris' ? 'bg-blue-100' : 'bg-gray-100'
                  }`}>
                    <Image 
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QRIS_logo.svg/1200px-QRIS_logo.svg.png" 
                      alt="QRIS" 
                      width={24} 
                      height={24}
                      className="h-5"
                    />
                  </div>
                  <span className="font-medium text-sm">QRIS</span>
                </div>
                <span className={`transition-transform duration-300 text-gray-500 ${
                  activeMethod === 'qris' ? 'rotate-180' : ''
                }`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </span>
              </button>
              
              {activeMethod === 'qris' && (
                <div className="mt-1 rounded-b-lg border border-t-0 border-gray-200 bg-gray-50 p-4 text-sm text-gray-700 animate-fadeIn">
                  <div className="text-center mb-4">
                    <div className="qr-code mx-auto w-48 h-48 border-2 border-dashed border-gray-300 rounded-lg mb-3 flex items-center justify-center">
                      [QR Code]
                    </div>
                    <p className="text-sm text-gray-500">Scan QR code menggunakan aplikasi mobile banking atau e-wallet</p>
                  </div>
                  
                  <div className="bg-blue-50 p-3 rounded-lg text-sm text-blue-800 mb-4">
                    <p><i className="fas fa-info-circle mr-2"></i> QR code akan kadaluarsa dalam 24 jam</p>
                  </div>
                  
                  <button
                    onClick={processPayment}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold"
                  >
                    <i className="fas fa-check-circle mr-2"></i> Saya Sudah Bayar
                  </button>
                </div>
              )}
            </div>
            
            {/* Virtual Account */}
            <div className="overflow-hidden">
              <button
                onClick={() => setActiveMethod(activeMethod === 'va' ? null : 'va')}
                className={`w-full flex items-center justify-between p-4 rounded-lg transition-all duration-300 ${
                  activeMethod === 'va'
                    ? 'bg-blue-50 border-l-4 border-blue-500'
                    : 'bg-white border border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 ${
                    activeMethod === 'va' ? 'bg-blue-100' : 'bg-gray-100'
                  }`}>
                    <i className="fas fa-university text-blue-600"></i>
                  </div>
                  <span className="font-medium text-sm">Virtual Account</span>
                </div>
                <span className={`transition-transform duration-300 text-gray-500 ${
                  activeMethod === 'va' ? 'rotate-180' : ''
                }`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </span>
              </button>
              
              {activeMethod === 'va' && (
                <div className="mt-1 rounded-b-lg border border-t-0 border-gray-200 bg-gray-50 p-4 text-sm text-gray-700 animate-fadeIn">
                  <h4 className="font-medium mb-3 text-center">Pilih Bank</h4>
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {['BCA', 'Mandiri', 'BNI'].map((bank) => (
                      <button
                        key={bank}
                        onClick={() => {
                          setSelectedBank(bank);
                          generatePaymentCode('va');
                        }}
                        className={`flex flex-col items-center rounded-lg border p-3 transition ${
                          selectedBank === bank
                            ? 'bg-blue-100 border-blue-400 shadow-sm'
                            : 'bg-white border-gray-200 hover:border-blue-300'
                        }`}
                      >
                        <Image
                          src={`https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Bank_Central_Asia.svg/2560px-Bank_Central_Asia.svg.png`}
                          alt={bank}
                          width={36}
                          height={36}
                          className="h-8 object-contain"
                        />
                        <span className="mt-2 text-xs font-medium">{bank}</span>
                      </button>
                    ))}
                  </div>
                  
                  {selectedBank && (
                    <>
                      <div className="bg-gray-50 p-4 rounded-lg mb-4">
                        <div className="mb-3">
                          <label className="block text-gray-500 text-sm mb-1">Nomor Virtual Account</label>
                          <div className="flex items-center">
                            <span className="font-mono bg-gray-100 p-2 rounded flex-1">
                              {vaNumber}
                            </span>
                            <button 
                              onClick={() => copyToClipboard(vaNumber)}
                              className="text-blue-600 hover:text-blue-800 ml-2"
                            >
                              <i className="fas fa-copy"></i>
                            </button>
                          </div>
                        </div>
                        <div>
                          <label className="block text-gray-500 text-sm mb-1">Jumlah Transfer</label>
                          <span className="font-bold text-blue-600">{formatRupiah(plan.amount)}</span>
                        </div>
                      </div>
                      
                      <div className="bg-yellow-50 p-3 rounded-lg text-sm text-yellow-800 mb-4">
                        <p><i className="fas fa-exclamation-circle mr-2"></i> Transfer tepat sesuai nominal untuk proses otomatis</p>
                      </div>
                      
                      <button
                        onClick={processPayment}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold"
                      >
                        <i className="fas fa-check-circle mr-2"></i> Konfirmasi Pembayaran
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
            
            {/* E-Wallet */}
            <div className="overflow-hidden">
              <button
                onClick={() => setActiveMethod(activeMethod === 'ewallet' ? null : 'ewallet')}
                className={`w-full flex items-center justify-between p-4 rounded-lg transition-all duration-300 ${
                  activeMethod === 'ewallet'
                    ? 'bg-blue-50 border-l-4 border-blue-500'
                    : 'bg-white border border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 ${
                    activeMethod === 'ewallet' ? 'bg-blue-100' : 'bg-gray-100'
                  }`}>
                    <i className="fas fa-wallet text-green-600"></i>
                  </div>
                  <span className="font-medium text-sm">E-Wallet</span>
                </div>
                <span className={`transition-transform duration-300 text-gray-500 ${
                  activeMethod === 'ewallet' ? 'rotate-180' : ''
                }`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </span>
              </button>
              
              {activeMethod === 'ewallet' && (
                <div className="mt-1 rounded-b-lg border border-t-0 border-gray-200 bg-gray-50 p-4 text-sm text-gray-700 animate-fadeIn">
                  <h4 className="font-medium mb-3 text-center">Pilih E-Wallet</h4>
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {['DANA', 'GoPay', 'OVO'].map((wallet) => (
                      <button
                        key={wallet}
                        onClick={() => {
                          setSelectedWallet(wallet);
                          generatePaymentCode('ewallet');
                        }}
                        className={`flex flex-col items-center rounded-lg border p-3 transition ${
                          selectedWallet === wallet
                            ? 'bg-blue-100 border-blue-400 shadow-sm'
                            : 'bg-white border-gray-200 hover:border-blue-300'
                        }`}
                      >
                        <Image
                          src={`https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Logo_dana_blue.svg/1200px-Logo_dana_blue.svg.png`}
                          alt={wallet}
                          width={36}
                          height={36}
                          className="h-8 object-contain"
                        />
                        <span className="mt-2 text-xs font-medium">{wallet}</span>
                      </button>
                    ))}
                  </div>
                  
                  {selectedWallet && (
                    <>
                      <div className="bg-gray-50 p-4 rounded-lg mb-4">
                        <div className="mb-3">
                          <label className="block text-gray-500 text-sm mb-1">Nomor {selectedWallet}</label>
                          <div className="flex items-center">
                            <span className="font-mono bg-gray-100 p-2 rounded flex-1">
                              {paymentCode}
                            </span>
                            <button 
                              onClick={() => copyToClipboard(paymentCode)}
                              className="text-blue-600 hover:text-blue-800 ml-2"
                            >
                              <i className="fas fa-copy"></i>
                            </button>
                          </div>
                        </div>
                        <div>
                          <label className="block text-gray-500 text-sm mb-1">Jumlah Transfer</label>
                          <span className="font-bold text-blue-600">{formatRupiah(plan.amount)}</span>
                        </div>
                      </div>
                      
                      <div className="bg-blue-50 p-3 rounded-lg text-sm text-blue-800 mb-4">
                        <p><i className="fas fa-info-circle mr-2"></i> Anda akan diarahkan ke aplikasi untuk menyelesaikan pembayaran</p>
                      </div>
                      
                      <button
                        onClick={processPayment}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold"
                      >
                        <i className="fas fa-arrow-right mr-2"></i> Lanjut ke Pembayaran
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
            
            {/* Retail */}
            <div className="overflow-hidden">
              <button
                onClick={() => setActiveMethod(activeMethod === 'retail' ? null : 'retail')}
                className={`w-full flex items-center justify-between p-4 rounded-lg transition-all duration-300 ${
                  activeMethod === 'retail'
                    ? 'bg-blue-50 border-l-4 border-blue-500'
                    : 'bg-white border border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 ${
                    activeMethod === 'retail' ? 'bg-blue-100' : 'bg-gray-100'
                  }`}>
                    <i className="fas fa-store text-orange-600"></i>
                  </div>
                  <span className="font-medium text-sm">Retail</span>
                </div>
                <span className={`transition-transform duration-300 text-gray-500 ${
                  activeMethod === 'retail' ? 'rotate-180' : ''
                }`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </span>
              </button>
              
              {activeMethod === 'retail' && (
                <div className="mt-1 rounded-b-lg border border-t-0 border-gray-200 bg-gray-50 p-4 text-sm text-gray-700 animate-fadeIn">
                  <h4 className="font-medium mb-3 text-center">Pilih Retail</h4>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {['Alfamart', 'Indomaret'].map((retail) => (
                      <button
                        key={retail}
                        onClick={() => {
                          setSelectedRetail(retail);
                          generatePaymentCode('retail');
                        }}
                        className={`flex flex-col items-center rounded-lg border p-3 transition ${
                          selectedRetail === retail
                            ? 'bg-blue-100 border-blue-400 shadow-sm'
                            : 'bg-white border-gray-200 hover:border-blue-300'
                        }`}
                      >
                        <Image
                          src={`https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Alfamart_logo_2019.svg/1200px-Alfamart_logo_2019.svg.png`}
                          alt={retail}
                          width={36}
                          height={36}
                          className="h-8 object-contain"
                        />
                        <span className="mt-2 text-xs font-medium">{retail}</span>
                      </button>
                    ))}
                  </div>
                  
                  {selectedRetail && (
                    <>
                      <div className="bg-gray-50 p-4 rounded-lg mb-4">
                        <div className="mb-3">
                          <label className="block text-gray-500 text-sm mb-1">Kode Pembayaran</label>
                          <div className="flex items-center">
                            <span className="font-mono bg-gray-100 p-2 rounded flex-1">
                              {paymentCode}
                            </span>
                            <button 
                              onClick={() => copyToClipboard(paymentCode)}
                              className="text-blue-600 hover:text-blue-800 ml-2"
                            >
                              <i className="fas fa-copy"></i>
                            </button>
                          </div>
                        </div>
                        <div>
                          <label className="block text-gray-500 text-sm mb-1">Jumlah Pembayaran</label>
                          <span className="font-bold text-blue-600">{formatRupiah(plan.amount)}</span>
                        </div>
                      </div>
                      
                      <div className="bg-yellow-50 p-3 rounded-lg text-sm text-yellow-800 mb-4">
                        <p><i className="fas fa-exclamation-circle mr-2"></i> Kode pembayaran akan kadaluarsa dalam 24 jam</p>
                      </div>
                      
                      <button
                        onClick={processPayment}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold"
                      >
                        <i className="fas fa-check-circle mr-2"></i> Konfirmasi
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
            
            {/* Credit Card */}
            <div className="overflow-hidden">
              <button
                onClick={() => setActiveMethod(activeMethod === 'cc' ? null : 'cc')}
                className={`w-full flex items-center justify-between p-4 rounded-lg transition-all duration-300 ${
                  activeMethod === 'cc'
                    ? 'bg-blue-50 border-l-4 border-blue-500'
                    : 'bg-white border border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 ${
                    activeMethod === 'cc' ? 'bg-blue-100' : 'bg-gray-100'
                  }`}>
                    <i className="far fa-credit-card text-purple-600"></i>
                  </div>
                  <span className="font-medium text-sm">Kartu Kredit</span>
                </div>
                <span className={`transition-transform duration-300 text-gray-500 ${
                  activeMethod === 'cc' ? 'rotate-180' : ''
                }`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </span>
              </button>
              
              {activeMethod === 'cc' && (
                <div className="mt-1 rounded-b-lg border border-t-0 border-gray-200 bg-gray-50 p-4 text-sm text-gray-700 animate-fadeIn">
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Informasi Kartu</label>
                    <div className="space-y-3">
                      <input 
                        type="text" 
                        placeholder="Nomor Kartu" 
                        className="w-full px-4 py-2 border rounded-lg" 
                        maxLength={19}
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <input 
                          type="text" 
                          placeholder="MM/YY" 
                          className="w-full px-4 py-2 border rounded-lg" 
                          maxLength={5}
                        />
                        <input 
                          type="text" 
                          placeholder="CVV" 
                          className="w-full px-4 py-2 border rounded-lg" 
                          maxLength={3}
                        />
                      </div>
                      <input 
                        type="text" 
                        placeholder="Nama di Kartu" 
                        className="w-full px-4 py-2 border rounded-lg"
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center mb-4">
                    <input type="checkbox" id="saveCard" className="mr-2" />
                    <label htmlFor="saveCard" className="text-sm text-gray-600">
                      Simpan kartu untuk pembayaran berikutnya
                    </label>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Jumlah Pembayaran</span>
                      <span className="font-bold text-blue-600">{formatRupiah(plan.amount)}</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={processPayment}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold"
                  >
                    <i className="fas fa-lock mr-2"></i> Bayar Sekarang
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {isCopied && (
        <div className="fixed bottom-5 right-5 bg-green-500 text-white px-4 py-2 rounded-lg flex items-center z-50 animate-fadeIn">
          <i className="fas fa-copy mr-2"></i> Nomor disalin!
        </div>
      )}
    </div>
  );
};

export default PaymentModal;
