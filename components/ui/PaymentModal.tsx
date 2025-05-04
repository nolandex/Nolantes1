'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTimes,
  faCheckCircle,
  faCopy,
  faInfoCircle,
  faExclamationCircle,
  faUniversity,
  faWallet,
  faStore,
  faCreditCard,
  faLock,
  faArrowRight,
  faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons';

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
  const [isFailed, setIsFailed] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
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
    setIsFailed(false);
    setErrorMessage('');
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
      const code = `08${Math.floor(100000000 + Math.random() * 900000000)}`;
      setPaymentCode(code);
      return code;
    } else if (method === 'retail' && selectedRetail) {
      const code = `${selectedRetail.slice(0, 4).toUpperCase()}${Math.floor(100000 + Math.random() * 900000)}`;
      setPaymentCode(code);
      return code;
    }
    return '';
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }).catch((err) => {
      console.error('Gagal menyalin:', err);
    });
  };

  const simulatePaymentApi = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (Math.random() > 0.5) {
          resolve({ status: 'success', invoice: `INV-${Date.now().toString().slice(-8)}` });
        } else {
          resolve({ status: 'error', message: 'Pembayaran gagal: Saldo tidak cukup atau server bermasalah.' });
        }
      }, 1000);
    });
  };

  const processPayment = async () => {
    setIsProcessing(true);
    try {
      const response: any = await simulatePaymentApi();
      setIsProcessing(false);

      if (response.status === 'success') {
        setIsSuccess(true);
        setInvoiceNumber(response.invoice);
      } else {
        setIsFailed(true);
        setErrorMessage(response.message || 'Terjadi kesalahan saat memproses pembayaran.');
      }
    } catch (error) {
      setIsProcessing(false);
      setIsFailed(true);
      setErrorMessage('Gagal menghubungi server. Silakan coba lagi nanti.');
    }
  };

  const getMethodName = (method: string | null) => {
    const methods: { [key: string]: string } = {
      qris: 'QRIS',
      va: 'Virtual Account',
      ewallet: 'E-Wallet',
      retail: 'Retail',
      cc: 'Kartu Kredit',
    };
    return methods[method || ''] || 'Pembayaran';
  };

  if (!isOpen) return null;

  return (
    <>
      <style jsx>{`
        .payment-modal {
          color: #1f2937 !important; /* gray-800 */
          background-color: #ffffff !important; /* white */
        }
        .payment-modal * {
          color: inherit !important;
          background-color: inherit !important;
        }
        .payment-modal h2,
        .payment-modal h3,
        .payment-modal h4,
        .payment-modal p,
        .payment-modal span,
        .payment-modal label {
          color: #1f2937 !important; /* gray-800 untuk teks utama */
        }
        .payment-modal .text-gray-500 {
          color: #6b7280 !important; /* gray-500 */
        }
        .payment-modal .text-gray-600 {
          color: #4b5563 !important; /* gray-600 */
        }
        .payment-modal .text-blue-600 {
          color: #2563eb !important; /* blue-600 */
        }
        .payment-modal .text-blue-800 {
          color: #1e40af !important; /* blue-800 */
        }
        .payment-modal .text-yellow-800 {
          color: #92400e !important; /* yellow-800 */
        }
        .payment-modal .bg-gray-50 {
          background-color: #f9fafb !important; /* gray-50 */
        }
        .payment-modal .bg-gray-100 {
          background-color: #f3f4f6 !important; /* gray-100 */
        }
        .payment-modal .bg-blue-50 {
          background-color: #eff6ff !important; /* blue-50 */
        }
        .payment-modal .bg-yellow-50 {
          background-color: #fefce8 !important; /* yellow-50 */
        }
        .payment-modal .bg-blue-600 {
          background-color: #2563eb !important; /* blue-600 */
        }
        .payment-modal .bg-blue-700 {
          background-color: #1d4ed8 !important; /* blue-700 */
        }
        .payment-modal .text-white {
          color: #ffffff !important; /* white */
        }
        .payment-modal input {
          background-color: #ffffff !important; /* white */
          color: #1f2937 !important; /* gray-800 */
          border-color: #d1d5db !important; /* gray-300 */
        }
        .payment-modal .border-gray-300 {
          border-color: #d1d5db !important; /* gray-300 */
        }
        .payment-modal .text-green-500 {
          color: #22c55e !important; /* green-500 */
        }
        .payment-modal .text-red-500 {
          color: #ef4444 !important; /* red-500 */
        }
        .payment-modal .bg-red-600 {
          background-color: #dc2626 !important; /* red-600 */
        }
        .payment-modal .bg-red-700 {
          background-color: #b91c1c !important; /* red-700 */
        }
      `}</style>

      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
        {/* Processing Modal */}
        {isProcessing && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="payment-modal bg-white rounded-xl max-w-md w-full p-6 text-center">
              <div className="mb-4">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 transition-all duration-1000 ease-in-out"
                    style={{ width: '100%' }}
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
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="payment-modal bg-white rounded-xl max-w-md w-full p-6 text-center">
              <div className="text-green-500 mb-4">
                <FontAwesomeIcon icon={faCheckCircle} className="text-5xl" />
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
                  <span className="font-medium">{getMethodName(activeMethod)}</span>
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

        {/* Failure Modal */}
        {isFailed && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="payment-modal bg-white rounded-xl max-w-md w-full p-6 text-center">
              <div className="text-red-500 mb-4">
                <FontAwesomeIcon icon={faExclamationTriangle} className="text-5xl" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Pembayaran Gagal!</h2>
              <p className="text-gray-600 mb-4">{errorMessage}</p>
              <button
                onClick={() => setIsFailed(false)}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-bold"
              >
                Coba Lagi
              </button>
            </div>
          </div>
        )}

        {/* Main Payment Modal */}
        <div className="payment-modal w-full max-w-md overflow-y-auto rounded-xl bg-white shadow-xl max-h-[90vh]">
          <div className="bg-blue-600 p-6 text-white rounded-t-xl">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold">{plan.name}</h2>
                <p className="text-blue-100 text-sm mt-1">{plan.product}</p>
              </div>
              <button onClick={onClose} className="text-white hover:text-blue-200">
                <FontAwesomeIcon icon={faTimes} />
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
                <p className="text-gray-500 line-through text-sm">{formatRupiah(plan.amount * 1.67)}</p>
                <p className="text-blue-600 font-bold text-xl">{formatRupiah(plan.amount)}</p>
              </div>
            </div>

            {/* Payment Methods */}
            <h3 className="text-lg font-bold mb-4">Metode Pembayaran</h3>

            <div className="space-y-3 mb-6">
              {/* QRIS */}
              <div className="payment-method-container">
                <button
                  onClick={() => setActiveMethod(activeMethod === 'qris' ? null : 'qris')}
                  className="payment-method w-full bg-white rounded-lg p-3 flex items-center cursor-pointer shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-200"
                >
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mr-3">
                    <Image
                      src="/images/qris-logo.png"
                      alt="QRIS"
                      width={24}
                      height={24}
                      className="h-5"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-medium text-sm">QRIS</h3>
                  </div>
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className={`text-gray-400 transform transition-transform duration-300 ${activeMethod === 'qris' ? 'rotate-180' : ''}`}
                  />
                </button>

                {activeMethod === 'qris' && (
                  <div className={`payment-details max-h-0 overflow-hidden transition-all duration-300 ease-out ${activeMethod === 'qris' ? 'max-h-[500px]' : ''}`}>
                    <div className="payment-details-content p-3">
                      <div className="text-center mb-4">
                        <div className="qr-code mx-auto w-48 h-48 border-2 border-dashed border-gray-300 rounded-lg mb-3"></div>
                        <p className="text-sm text-gray-500">Scan QR code menggunakan aplikasi mobile banking atau e-wallet</p>
                      </div>

                      <div className="bg-blue-50 p-3 rounded-lg text-sm text-blue-800 mb-4">
                        <p>
                          <FontAwesomeIcon icon={faInfoCircle} className="mr-2" /> QR code akan kadaluarsa dalam 24 jam
                        </p>
                      </div>

                      <button
                        onClick={processPayment}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold"
                      >
                        <FontAwesomeIcon icon={faCheckCircle} className="mr-2" /> Saya Sudah Bayar
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Virtual Account */}
              <div className="payment-method-container">
                <button
                  onClick={() => setActiveMethod(activeMethod === 'va' ? null : 'va')}
                  className="payment-method w-full bg-white rounded-lg p-3 flex items-center cursor-pointer shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-200"
                >
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mr-3">
                    <FontAwesomeIcon icon={faUniversity} className="text-blue-600" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-medium text-sm">Virtual Account</h3>
                  </div>
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className={`text-gray-400 transform transition-transform duration-300 ${activeMethod === 'va' ? 'rotate-180' : ''}`}
                  />
                </button>

                {activeMethod === 'va' && (
                  <div className={`payment-details max-h-0 overflow-hidden transition-all duration-300 ease-out ${activeMethod === 'va' ? 'max-h-[500px]' : ''}`}>
                    <div className="payment-details-content p-3">
                      <h4 className="font-medium mb-3 text-center">Pilih Bank</h4>
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        {[
                          { name: 'BCA', logo: '/images/bca-logo.png' },
                          { name: 'Mandiri', logo: '/images/mandiri-logo.png' },
                          { name: 'BNI', logo: '/images/bni-logo.png' },
                        ].map((bank) => (
                          <button
                            key={bank.name}
                            onClick={() => {
                              setSelectedBank(bank.name);
                              generatePaymentCode('va');
                            }}
                            className={`method-item p-2 rounded-lg cursor-pointer text-center hover:bg-gray-100 transition-all duration-200 ${selectedBank === bank.name ? 'bg-blue-100' : ''}`}
                          >
                            <Image
                              src={bank.logo}
                              alt={bank.name}
                              width={32}
                              height={32}
                              className="method-logo mx-auto object-contain"
                            />
                          </button>
                        ))}
                      </div>

                      {selectedBank && (
                        <>
                          <div className="bg-gray-50 p-4 rounded-lg mb-4">
                            <div className="mb-3">
                              <label className="block text-gray-500 text-sm mb-1">Nomor Virtual Account</label>
                              <div className="flex items-center">
                                <span className="font-mono va-number bg-gray-100 p-2 rounded flex-1">{vaNumber}</span>
                                <button
                                  onClick={() => copyToClipboard(vaNumber)}
                                  className="text-blue-600 hover:text-blue-800 ml-2"
                                >
                                  <FontAwesomeIcon icon={faCopy} />
                                </button>
                              </div>
                            </div>
                            <div>
                              <label className="block text-gray-500 text-sm mb-1">Jumlah Transfer</label>
                              <span className="font-bold text-blue-600">{formatRupiah(plan.amount)}</span>
                            </div>
                          </div>

                          <div className="bg-yellow-50 p-3 rounded-lg text-sm text-yellow-800 mb-4">
                            <p>
                              <FontAwesomeIcon icon={faExclamationCircle} className="mr-2" /> Transfer tepat sesuai nominal untuk proses otomatis
                            </p>
                          </div>

                          <button
                            onClick={processPayment}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold"
                          >
                            <FontAwesomeIcon icon={faCheckCircle} className="mr-2" /> Konfirmasi Pembayaran
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* E-Wallet */}
              <div className="payment-method-container">
                <button
                  onClick={() => setActiveMethod(activeMethod === 'ewallet' ? null : 'ewallet')}
                  className="payment-method w-full bg-white rounded-lg p-3 flex items-center cursor-pointer shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-200"
                >
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mr-3">
                    <FontAwesomeIcon icon={faWallet} className="text-green-600" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-medium text-sm">E-Wallet</h3>
                  </div>
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className={`text-gray-400 transform transition-transform duration-300 ${activeMethod === 'ewallet' ? 'rotate-180' : ''}`}
                  />
                </button>

                {activeMethod === 'ewallet' && (
                  <div className={`payment-details max-h-0 overflow-hidden transition-all duration-300 ease-out ${activeMethod === 'ewallet' ? 'max-h-[500px]' : ''}`}>
                    <div className="payment-details-content p-3">
                      <h4 className="font-medium mb-3 text-center">Pilih E-Wallet</h4>
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        {[
                          { name: 'DANA', logo: '/images/dana-logo.png' },
                          { name: 'GoPay', logo: '/images/gopay-logo.png' },
                          { name: 'OVO', logo: '/images/ovo-logo.png' },
                        ].map((wallet) => (
                          <button
                            key={wallet.name}
                            onClick={() => {
                              setSelectedWallet(wallet.name);
                              generatePaymentCode('ewallet');
                            }}
                            className={`method-item p-2 rounded-lg cursor-pointer text-center hover:bg-gray-100 transition-all duration-200 ${selectedWallet === wallet.name ? 'bg-blue-100' : ''}`}
                          >
                            <Image
                              src={wallet.logo}
                              alt={wallet.name}
                              width={32}
                              height={32}
                              className="method-logo mx-auto object-contain"
                            />
                          </button>
                        ))}
                      </div>

                      {selectedWallet && (
                        <>
                          <div className="bg-gray-50 p-4 rounded-lg mb-4">
                            <div className="mb-3">
                              <label className="block text-gray-500 text-sm mb-1">Nomor E-Wallet</label>
                              <div className="flex items-center">
                                <span className="font-mono ewallet-number bg-gray-100 p-2 rounded flex-1">{paymentCode}</span>
                                <button
                                  onClick={() => copyToClipboard(paymentCode)}
                                  className="text-blue-600 hover:text-blue-800 ml-2"
                                >
                                  <FontAwesomeIcon icon={faCopy} />
                                </button>
                              </div>
                            </div>
                            <div>
                              <label className="block text-gray-500 text-sm mb-1">Jumlah Transfer</label>
                              <span className="font-bold text-blue-600">{formatRupiah(plan.amount)}</span>
                            </div>
                          </div>

                          <div className="bg-blue-50 p-3 rounded-lg text-sm text-blue-800 mb-4">
                            <p>
                              <FontAwesomeIcon icon={faInfoCircle} className="mr-2" /> Anda akan diarahkan ke aplikasi untuk menyelesaikan pembayaran
                            </p>
                          </div>

                          <button
                            onClick={processPayment}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold"
                          >
                            <FontAwesomeIcon icon={faArrowRight} className="mr-2" /> Lanjut ke Pembayaran
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Retail */}
              <div className="payment-method-container">
                <button
                  onClick={() => setActiveMethod(activeMethod === 'retail' ? null : 'retail')}
                  className="payment-method w-full bg-white rounded-lg p-3 flex items-center cursor-pointer shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-200"
                >
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mr-3">
                    <FontAwesomeIcon icon={faStore} className="text-orange-600" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-medium text-sm">Retail</h3>
                  </div>
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className={`text-gray-400 transform transition-transform duration-300 ${activeMethod === 'retail' ? 'rotate-180' : ''}`}
                  />
                </button>

                {activeMethod === 'retail' && (
                  <div className={`payment-details max-h-0 overflow-hidden transition-all duration-300 ease-out ${activeMethod === 'retail' ? 'max-h-[500px]' : ''}`}>
                    <div className="payment-details-content p-3">
                      <h4 className="font-medium mb-3 text-center">Pilih Retail</h4>
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        {[
                          { name: 'Alfamart', logo: '/images/alfamart-logo.png' },
                          { name: 'Indomaret', logo: '/images/indomaret-logo.png' },
                        ].map((retail) => (
                          <button
                            key={retail.name}
                            onClick={() => {
                              setSelectedRetail(retail.name);
                              generatePaymentCode('retail');
                            }}
                            className={`method-item p-2 rounded-lg cursor-pointer text-center hover:bg-gray-100 transition-all duration-200 ${selectedRetail === retail.name ? 'bg-blue-100' : ''}`}
                          >
                            <Image
                              src={retail.logo}
                              alt={retail.name}
                              width={32}
                              height={32}
                              className="method-logo mx-auto object-contain"
                            />
                          </button>
                        ))}
                      </div>

                      {selectedRetail && (
                        <>
                          <div className="bg-gray-50 p-4 rounded-lg mb-4">
                            <div className="mb-3">
                              <label className="block text-gray-500 text-sm mb-1">Kode Pembayaran</label>
                              <div className="flex items-center">
                                <span className="font-mono retail-code bg-gray-100 p-2 rounded flex-1">{paymentCode}</span>
                                <button
                                  onClick={() => copyToClipboard(paymentCode)}
                                  className="text-blue-600 hover:text-blue-800 ml-2"
                                >
                                  <FontAwesomeIcon icon={faCopy} />
                                </button>
                              </div>
                            </div>
                            <div>
                              <label className="block text-gray-500 text-sm mb-1">Jumlah Pembayaran</label>
                              <span className="font-bold text-blue-600">{formatRupiah(plan.amount)}</span>
                            </div>
                          </div>

                          <div className="bg-yellow-50 p-3 rounded-lg text-sm text-yellow-800 mb-4">
                            <p>
                              <FontAwesomeIcon icon={faExclamationCircle} className="mr-2" /> Kode pembayaran akan kadaluarsa dalam 24 jam
                            </p>
                          </div>

                          <button
                            onClick={processPayment}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold"
                          >
                            <FontAwesomeIcon icon={faCheckCircle} className="mr-2" /> Konfirmasi
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Credit Card */}
              <div className="payment-method-container">
                <button
                  onClick={() => setActiveMethod(activeMethod === 'cc' ? null : 'cc')}
                  className="payment-method w-full bg-white rounded-lg p-3 flex items-center cursor-pointer shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-200"
                >
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mr-3">
                    <FontAwesomeIcon icon={faCreditCard} className="text-purple-600" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-medium text-sm">Kartu Kredit</h3>
                  </div>
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className={`text-gray-400 transform transition-transform duration-300 ${activeMethod === 'cc' ? 'rotate-180' : ''}`}
                  />
                </button>

                {activeMethod === 'cc' && (
                  <div className={`payment-details max-h-0 overflow-hidden transition-all duration-300 ease-out ${activeMethod === 'cc' ? 'max-h-[500px]' : ''}`}>
                    <div className="payment-details-content p-3">
                      <div className="mb-4">
                        <label className="block mb-2">Informasi Kartu</label>
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
                        <FontAwesomeIcon icon={faLock} className="mr-2" /> Bayar Sekarang
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Toast Notification */}
        {isCopied && (
          <div className="fixed bottom-5 right-5 bg-green-500 text-white px-4 py-3 rounded-lg flex items-center z-[1000] animate-fade-in">
            <FontAwesomeIcon icon={faCopy} className="mr-2" /> Nomor disalin!
          </div>
        )}
      </div>
    </>
  );
};

export default PaymentModal;
