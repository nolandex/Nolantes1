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

          {/* Payment Method List */}
          {['qris', 'va', 'ewallet', 'retail', 'cc'].map((method) => (
            <div key={method}>
              <button
                onClick={() =>
                  setActiveMethod(activeMethod === method ? null : method)
                }
                className={`w-full flex items-center justify-between rounded-xl border p-3 transition ${
                  activeMethod === method
                    ? 'border-blue-400 bg-blue-50'
                    : 'border-gray-300 bg-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-blue-100 flex items-center justify-center">
                    {method === 'qris' && (
                      <Image src="/images/qris.png" alt="QRIS" width={24} height={24} />
                    )}
                    {method === 'va' && <i className="fas fa-university text-blue-600"></i>}
                    {method === 'ewallet' && <i className="fas fa-wallet text-green-500"></i>}
                    {method === 'retail' && <i className="fas fa-store text-orange-500"></i>}
                    {method === 'cc' && <i className="far fa-credit-card text-purple-500"></i>}
                  </div>
                  <span className="text-sm font-medium capitalize text-gray-700">
                    {method === 'va' ? 'Virtual Account' : method === 'cc' ? 'Kartu Kredit' : method}
                  </span>
                </div>
                <span
                  className={`transition-transform ${
                    activeMethod === method ? 'rotate-180' : ''
                  } text-gray-500`}
                >
                  ▼
                </span>
              </button>

              {/* Subcomponents */}
              {activeMethod === method && (
                <div className="mt-3 rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700">
                  {/* QRIS */}
                  {method === 'qris' && (
                    <>
                      <div className="flex justify-center mb-4">
                        <div className="h-48 w-48 rounded-xl bg-gray-200 flex items-center justify-center">
                          [QR Code]
                        </div>
                      </div>
                      <p className="mb-4 text-center text-gray-500">
                        Scan menggunakan e-wallet atau mobile banking
                      </p>
                      <button
                        onClick={processPayment}
                        className="w-full rounded-xl bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700"
                      >
                        Saya Sudah Bayar
                      </button>
                    </>
                  )}

                  {/* Virtual Account */}
                  {method === 'va' && (
                    <>
                      <p className="mb-2 font-medium">Pilih Bank:</p>
                      <div className="grid grid-cols-3 gap-2 mb-3">
                        {['BCA', 'Mandiri', 'BNI'].map((bank) => (
                          <button
                            key={bank}
                            onClick={() => setSelectedBank(bank)}
                            className={`flex flex-col items-center rounded-xl border p-2 ${
                              selectedBank === bank
                                ? 'bg-blue-100 border-blue-300'
                                : 'bg-white'
                            }`}
                          >
                            <Image
                              src={`/images/${bank.toLowerCase()}.png`}
                              alt={bank}
                              width={32}
                              height={32}
                            />
                            <span className="mt-1 text-xs">{bank}</span>
                          </button>
                        ))}
                      </div>
                      {selectedBank && (
                        <>
                          <p className="mb-1 text-gray-600">Nomor Virtual Account</p>
                          <div className="mb-3 flex">
                            <input
                              type="text"
                              readOnly
                              value={`88888${Math.floor(100000000 + Math.random() * 900000000)}`}
                              className="w-full rounded-l-lg bg-gray-100 p-2 font-mono text-gray-700"
                            />
                            <button className="rounded-r-lg bg-blue-100 px-3 text-blue-600 hover:bg-blue-200">
                              Salin
                            </button>
                          </div>
                          <button
                            onClick={processPayment}
                            className="w-full rounded-xl bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700"
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
                      <p className="mb-2 font-medium">Pilih E-Wallet:</p>
                      <div className="grid grid-cols-3 gap-2 mb-3">
                        {['DANA', 'GoPay', 'OVO'].map((wallet) => (
                          <button
                            key={wallet}
                            onClick={() => setSelectedWallet(wallet)}
                            className={`flex flex-col items-center rounded-xl border p-2 ${
                              selectedWallet === wallet
                                ? 'bg-blue-100 border-blue-300'
                                : 'bg-white'
                            }`}
                          >
                            <Image
                              src={`/images/${wallet.toLowerCase()}.png`}
                              alt={wallet}
                              width={32}
                              height={32}
                            />
                            <span className="mt-1 text-xs">{wallet}</span>
                          </button>
                        ))}
                      </div>
                      {selectedWallet && (
                        <>
                          <p className="mb-1 text-gray-600">Nomor {selectedWallet}</p>
                          <div className="mb-3 flex">
                            <input
                              type="text"
                              readOnly
                              value={`08${Math.floor(100000000 + Math.random() * 900000000)}`}
                              className="w-full rounded-l-lg bg-gray-100 p-2 font-mono text-gray-700"
                            />
                            <button className="rounded-r-lg bg-blue-100 px-3 text-blue-600 hover:bg-blue-200">
                              Salin
                            </button>
                          </div>
                          <button
                            onClick={processPayment}
                            className="w-full rounded-xl bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700"
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
                      <p className="mb-2 font-medium">Pilih Gerai:</p>
                      <div className="grid grid-cols-2 gap-2 mb-3">
                        {['Alfamart', 'Indomaret'].map((retail) => (
                          <button
                            key={retail}
                            onClick={() => setSelectedRetail(retail)}
                            className={`flex flex-col items-center rounded-xl border p-2 ${
                              selectedRetail === retail
                                ? 'bg-blue-100 border-blue-300'
                                : 'bg-white'
                            }`}
                          >
                            <Image
                              src={`/images/${retail.toLowerCase()}.png`}
                              alt={retail}
                              width={32}
                              height={32}
                            />
                            <span className="mt-1 text-xs">{retail}</span>
                          </button>
                        ))}
                      </div>
                      {selectedRetail && (
                        <>
                          <p className="mb-1 text-gray-600">Kode Pembayaran</p>
                          <div className="mb-3 flex">
                            <input
                              type="text"
                              readOnly
                              value={`${selectedRetail.slice(0, 4).toUpperCase()}${Math.floor(
                                100000 + Math.random() * 900000
                              )}`}
                              className="w-full rounded-l-lg bg-gray-100 p-2 font-mono text-gray-700"
                            />
                            <button className="rounded-r-lg bg-blue-100 px-3 text-blue-600 hover:bg-blue-200">
                              Salin
                            </button>
                          </div>
                          <button
                            onClick={processPayment}
                            className="w-full rounded-xl bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700"
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
                      <div className="space-y-3">
                        <input
                          type="text"
                          placeholder="Nomor Kartu"
                          className="w-full rounded-xl border p-2"
                        />
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="MM/YY"
                            className="w-1/2 rounded-xl border p-2"
                          />
                          <input
                            type="text"
                            placeholder="CVV"
                            className="w-1/2 rounded-xl border p-2"
                          />
                        </div>
                      </div>
                      <button
                        onClick={processPayment}
                        className="mt-4 w-full rounded-xl bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700"
                      >
                        Bayar Sekarang
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          ))}

          {/* Success Notification */}
          {isSuccess && (
            <div className="rounded-xl bg-green-100 p-4 text-center text-green-700">
              <p className="font-semibold">Pembayaran Berhasil!</p>
              <p className="text-sm">Invoice: {invoiceNumber}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
