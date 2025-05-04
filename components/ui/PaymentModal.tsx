'use client';

import { useState } from 'react';
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

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(amount);
  };

  const processPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setInvoiceNumber(`INV-${Math.floor(1000 + Math.random() * 9000)}`);
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-md overflow-y-auto rounded-2xl bg-white text-gray-800 shadow-xl max-h-[90vh]">
        <div className="rounded-t-2xl bg-blue-600 p-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white">{plan.name}</h2>
              <p className="text-sm text-blue-100">{plan.product}</p>
            </div>
            <button onClick={onClose} className="text-xl text-white">
              ✕
            </button>
          </div>
        </div>

        <div className="space-y-4 p-5">
          {/* Order Summary */}
          <div className="rounded-xl bg-gray-100 p-4">
            <p className="text-sm font-medium text-gray-600">Total Pembayaran</p>
            <p className="text-xs text-gray-500">Termasuk PPN 11%</p>
            <div className="mt-2 text-right">
              <p className="text-sm text-gray-400 line-through">
                {formatRupiah(plan.amount * 1.67)}
              </p>
              <p className="text-lg font-bold text-blue-600">
                {formatRupiah(plan.amount)}
              </p>
            </div>
          </div>

          {/* Payment Method Title */}
          <div className="pt-2">
            <h3 className="text-lg font-semibold text-gray-800">Metode Pembayaran</h3>
            <div className="mt-1 h-1 w-12 rounded-full bg-blue-500"></div>
          </div>

          {/* Payment Method List */}
          <div className="space-y-3">
            {['qris', 'va', 'ewallet', 'retail', 'cc'].map((method) => (
              <div key={method} className="overflow-hidden rounded-lg">
                <button
                  onClick={() =>
                    setActiveMethod(activeMethod === method ? null : method)
                  }
                  className={`w-full flex items-center justify-between p-4 transition-all duration-300 ${
                    activeMethod === method
                      ? 'bg-blue-50 border-l-4 border-blue-500'
                      : 'bg-white border border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${
                      activeMethod === method ? 'bg-blue-100' : 'bg-gray-100'
                    }`}>
                      {method === 'qris' && (
                        <Image src="/images/qris.png" alt="QRIS" width={28} height={28} />
                      )}
                      {method === 'va' && <i className="fas fa-university text-blue-600 text-xl"></i>}
                      {method === 'ewallet' && <i className="fas fa-wallet text-green-500 text-xl"></i>}
                      {method === 'retail' && <i className="fas fa-store text-orange-500 text-xl"></i>}
                      {method === 'cc' && <i className="far fa-credit-card text-purple-500 text-xl"></i>}
                    </div>
                    <span className="text-base font-medium capitalize text-gray-800">
                      {method === 'va' ? 'Virtual Account' : method === 'cc' ? 'Kartu Kredit' : method.toUpperCase()}
                    </span>
                  </div>
                  <span
                    className={`transition-transform duration-300 text-gray-500 ${
                      activeMethod === method ? 'rotate-180' : ''
                    }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </span>
                </button>

                {/* Subcomponents with animation */}
                {activeMethod === method && (
                  <div className="transition-all duration-300 ease-in-out overflow-hidden">
                    <div className="mt-1 rounded-b-lg border border-t-0 border-gray-200 bg-gray-50 p-4 text-sm text-gray-700 animate-fadeIn">
                      {/* QRIS */}
                      {method === 'qris' && (
                        <>
                          <div className="flex justify-center mb-4">
                            <div className="h-48 w-48 rounded-lg bg-gray-200 flex items-center justify-center">
                              [QR Code]
                            </div>
                          </div>
                          <p className="mb-4 text-center text-gray-500">
                            Scan menggunakan e-wallet atau mobile banking
                          </p>
                          <button
                            onClick={processPayment}
                            className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700"
                          >
                            Saya Sudah Bayar
                          </button>
                        </>
                      )}

                      {/* Virtual Account */}
                      {method === 'va' && (
                        <>
                          <p className="mb-3 font-medium text-gray-800">Pilih Bank:</p>
                          <div className="grid grid-cols-3 gap-3 mb-4">
                            {['BCA', 'Mandiri', 'BNI'].map((bank) => (
                              <button
                                key={bank}
                                onClick={() => setSelectedBank(bank)}
                                className={`flex flex-col items-center rounded-lg border p-3 transition ${
                                  selectedBank === bank
                                    ? 'bg-blue-100 border-blue-400 shadow-sm'
                                    : 'bg-white border-gray-200 hover:border-blue-300'
                                }`}
                              >
                                <Image
                                  src={`/images/${bank.toLowerCase()}.png`}
                                  alt={bank}
                                  width={36}
                                  height={36}
                                />
                                <span className="mt-2 text-xs font-medium">{bank}</span>
                              </button>
                            ))}
                          </div>
                          {selectedBank && (
                            <>
                              <p className="mb-2 text-sm font-medium text-gray-700">Nomor Virtual Account</p>
                              <div className="mb-4 flex">
                                <input
                                  type="text"
                                  readOnly
                                  value={`88888${Math.floor(100000000 + Math.random() * 900000000)}`}
                                  className="w-full rounded-l-lg bg-gray-100 p-3 font-mono text-gray-700 border border-r-0 border-gray-300"
                                />
                                <button className="rounded-r-lg bg-blue-100 px-4 text-blue-600 hover:bg-blue-200 border border-l-0 border-gray-300">
                                  Salin
                                </button>
                              </div>
                              <button
                                onClick={processPayment}
                                className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700"
                              >
                                Konfirmasi Pembayaran
                              </button>
                            </>
                          )}
                        </>
                      )}

                      {/* E-Wallet */}
                      {method === 'ewallet' && (
                        <>
                          <p className="mb-3 font-medium text-gray-800">Pilih E-Wallet:</p>
                          <div className="grid grid-cols-3 gap-3 mb-4">
                            {['DANA', 'GoPay', 'OVO'].map((wallet) => (
                              <button
                                key={wallet}
                                onClick={() => setSelectedWallet(wallet)}
                                className={`flex flex-col items-center rounded-lg border p-3 transition ${
                                  selectedWallet === wallet
                                    ? 'bg-blue-100 border-blue-400 shadow-sm'
                                    : 'bg-white border-gray-200 hover:border-blue-300'
                                }`}
                              >
                                <Image
                                  src={`/images/${wallet.toLowerCase()}.png`}
                                  alt={wallet}
                                  width={36}
                                  height={36}
                                />
                                <span className="mt-2 text-xs font-medium">{wallet}</span>
                              </button>
                            ))}
                          </div>
                          {selectedWallet && (
                            <>
                              <p className="mb-2 text-sm font-medium text-gray-700">Nomor {selectedWallet}</p>
                              <div className="mb-4 flex">
                                <input
                                  type="text"
                                  readOnly
                                  value={`08${Math.floor(100000000 + Math.random() * 900000000)}`}
                                  className="w-full rounded-l-lg bg-gray-100 p-3 font-mono text-gray-700 border border-r-0 border-gray-300"
                                />
                                <button className="rounded-r-lg bg-blue-100 px-4 text-blue-600 hover:bg-blue-200 border border-l-0 border-gray-300">
                                  Salin
                                </button>
                              </div>
                              <button
                                onClick={processPayment}
                                className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700"
                              >
                                Lanjut ke Pembayaran
                              </button>
                            </>
                          )}
                        </>
                      )}

                      {/* Retail */}
                      {method === 'retail' && (
                        <>
                          <p className="mb-3 font-medium text-gray-800">Pilih Gerai:</p>
                          <div className="grid grid-cols-2 gap-3 mb-4">
                            {['Alfamart', 'Indomaret'].map((retail) => (
                              <button
                                key={retail}
                                onClick={() => setSelectedRetail(retail)}
                                className={`flex flex-col items-center rounded-lg border p-3 transition ${
                                  selectedRetail === retail
                                    ? 'bg-blue-100 border-blue-400 shadow-sm'
                                    : 'bg-white border-gray-200 hover:border-blue-300'
                                }`}
                              >
                                <Image
                                  src={`/images/${retail.toLowerCase()}.png`}
                                  alt={retail}
                                  width={36}
                                  height={36}
                                />
                                <span className="mt-2 text-xs font-medium">{retail}</span>
                              </button>
                            ))}
                          </div>
                          {selectedRetail && (
                            <>
                              <p className="mb-2 text-sm font-medium text-gray-700">Kode Pembayaran</p>
                              <div className="mb-4 flex">
                                <input
                                  type="text"
                                  readOnly
                                  value={`${selectedRetail.slice(0, 4).toUpperCase()}${Math.floor(
                                    100000 + Math.random() * 900000
                                  )}`}
                                  className="w-full rounded-l-lg bg-gray-100 p-3 font-mono text-gray-700 border border-r-0 border-gray-300"
                                />
                                <button className="rounded-r-lg bg-blue-100 px-4 text-blue-600 hover:bg-blue-200 border border-l-0 border-gray-300">
                                  Salin
                                </button>
                              </div>
                              <button
                                onClick={processPayment}
                                className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700"
                              >
                                Konfirmasi
                              </button>
                            </>
                          )}
                        </>
                      )}

                      {/* Credit Card */}
                      {method === 'cc' && (
                        <>
                          <div className="space-y-4">
                            <div>
                              <label className="mb-1 block text-sm font-medium text-gray-700">Nomor Kartu</label>
                              <input
                                type="text"
                                placeholder="1234 5678 9012 3456"
                                className="w-full rounded-lg border border-gray-300 p-3"
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">MM/YY</label>
                                <input
                                  type="text"
                                  placeholder="MM/YY"
                                  className="w-full rounded-lg border border-gray-300 p-3"
                                />
                              </div>
                              <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">CVV</label>
                                <input
                                  type="text"
                                  placeholder="CVV"
                                  className="w-full rounded-lg border border-gray-300 p-3"
                                />
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={processPayment}
                            className="mt-4 w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700"
                          >
                            Bayar Sekarang
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Success Notification */}
          {isSuccess && (
            <div className="rounded-lg bg-green-100 p-4 text-center text-green-700 animate-fadeIn">
              <p className="font-semibold">Pembayaran Berhasil!</p>
              <p className="text-sm mt-1">Invoice: {invoiceNumber}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
