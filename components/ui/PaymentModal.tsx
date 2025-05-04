'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Plan {
  name: string;
  product: string;
  amount: number;
}

const PaymentModal = ({ isOpen, onClose, plan }: { isOpen: boolean; onClose: () => void; plan: Plan }) => {
  const [activeMethod, setActiveMethod] = useState<string | null>(null);
  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
  const [selectedRetail, setSelectedRetail] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [invoiceNumber, setInvoiceNumber] = useState('');

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount);
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-blue-600 p-4 rounded-t-lg">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-white font-bold text-xl">{plan.name}</h2>
              <p className="text-blue-100 text-sm">{plan.product}</p>
            </div>
            <button onClick={onClose} className="text-white text-xl">
              ✕
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-4">
          {/* Order Summary */}
          <div className="flex justify-between items-center mb-4 p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="text-gray-800 font-medium">Total Pembayaran</p>
              <p className="text-gray-500 text-sm">Termasuk PPN 11%</p>
            </div>
            <div className="text-right">
              <p className="text-gray-500 line-through text-sm">{formatRupiah(plan.amount * 1.67)}</p>
              <p className="text-blue-600 font-bold text-lg">{formatRupiah(plan.amount)}</p>
            </div>
          </div>

          {/* Payment Methods */}
          <h3 className="text-gray-800 font-bold mb-3">Metode Pembayaran</h3>
          
          {/* QRIS Method */}
          <div className="mb-3">
            <div 
              className={`flex items-center justify-between p-3 rounded-lg cursor-pointer ${activeMethod === 'qris' ? 'bg-blue-50 border border-blue-200' : 'bg-white border border-gray-200'}`}
              onClick={() => setActiveMethod(activeMethod === 'qris' ? null : 'qris')}
            >
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                  <Image src="/images/qris.png" alt="QRIS" width={24} height={24} />
                </div>
                <span className="text-gray-800">QRIS</span>
              </div>
              <span className={`transform transition-transform ${activeMethod === 'qris' ? 'rotate-180' : ''}`}>▼</span>
            </div>
            
            {activeMethod === 'qris' && (
              <div className="mt-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex justify-center mb-3">
                  <div className="w-48 h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                    [QR Code Placeholder]
                  </div>
                </div>
                <p className="text-gray-600 text-sm text-center mb-3">Scan QR code menggunakan aplikasi mobile banking atau e-wallet</p>
                <button 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium"
                  onClick={processPayment}
                >
                  Saya Sudah Bayar
                </button>
              </div>
            )}
          </div>

          {/* Virtual Account Method */}
          <div className="mb-3">
            <div 
              className={`flex items-center justify-between p-3 rounded-lg cursor-pointer ${activeMethod === 'va' ? 'bg-blue-50 border border-blue-200' : 'bg-white border border-gray-200'}`}
              onClick={() => setActiveMethod(activeMethod === 'va' ? null : 'va')}
            >
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                  <i className="fas fa-university text-blue-600"></i>
                </div>
                <span className="text-gray-800">Virtual Account</span>
              </div>
              <span className={`transform transition-transform ${activeMethod === 'va' ? 'rotate-180' : ''}`}>▼</span>
            </div>
            
            {activeMethod === 'va' && (
              <div className="mt-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <h4 className="text-gray-800 font-medium mb-2">Pilih Bank:</h4>
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {['BCA', 'Mandiri', 'BNI'].map(bank => (
                    <button 
                      key={bank}
                      className={`p-2 border rounded-lg flex flex-col items-center ${selectedBank === bank ? 'bg-blue-100 border-blue-300' : 'bg-white'}`}
                      onClick={() => setSelectedBank(bank)}
                    >
                      <Image 
                        src={`/images/${bank.toLowerCase()}.png`} 
                        alt={bank} 
                        width={40} 
                        height={40} 
                        className="mb-1"
                      />
                      <span className="text-xs">{bank}</span>
                    </button>
                  ))}
                </div>
                {selectedBank && (
                  <>
                    <div className="mb-3">
                      <p className="text-gray-600 text-sm mb-1">Nomor Virtual Account</p>
                      <div className="flex">
                        <input 
                          type="text" 
                          value={`88888${Math.floor(100000000 + Math.random() * 900000000)}`} 
                          readOnly 
                          className="bg-gray-100 p-2 rounded-l-lg flex-grow font-mono text-gray-800" 
                        />
                        <button className="bg-blue-100 text-blue-600 px-3 rounded-r-lg hover:bg-blue-200">
                          Salin
                        </button>
                      </div>
                    </div>
                    <button 
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium"
                      onClick={processPayment}
                    >
                      Konfirmasi Pembayaran
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          {/* E-Wallet Method */}
          <div className="mb-3">
            <div 
              className={`flex items-center justify-between p-3 rounded-lg cursor-pointer ${activeMethod === 'ewallet' ? 'bg-blue-50 border border-blue-200' : 'bg-white border border-gray-200'}`}
              onClick={() => setActiveMethod(activeMethod === 'ewallet' ? null : 'ewallet')}
            >
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                  <i className="fas fa-wallet text-green-500"></i>
                </div>
                <span className="text-gray-800">E-Wallet</span>
              </div>
              <span className={`transform transition-transform ${activeMethod === 'ewallet' ? 'rotate-180' : ''}`}>▼</span>
            </div>
            
            {activeMethod === 'ewallet' && (
              <div className="mt-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <h4 className="text-gray-800 font-medium mb-2">Pilih E-Wallet:</h4>
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {['DANA', 'GoPay', 'OVO'].map(wallet => (
                    <button 
                      key={wallet}
                      className={`p-2 border rounded-lg flex flex-col items-center ${selectedWallet === wallet ? 'bg-blue-100 border-blue-300' : 'bg-white'}`}
                      onClick={() => setSelectedWallet(wallet)}
                    >
                      <Image 
                        src={`/images/${wallet.toLowerCase()}.png`} 
                        alt={wallet} 
                        width={40} 
                        height={40} 
                        className="mb-1"
                      />
                      <span className="text-xs">{wallet}</span>
                    </button>
                  ))}
                </div>
                {selectedWallet && (
                  <>
                    <div className="mb-3">
                      <p className="text-gray-600 text-sm mb-1">Nomor {selectedWallet}</p>
                      <div className="flex">
                        <input 
                          type="text" 
                          value={`08${Math.floor(100000000 + Math.random() * 900000000)}`} 
                          readOnly 
                          className="bg-gray-100 p-2 rounded-l-lg flex-grow font-mono text-gray-800" 
                        />
                        <button className="bg-blue-100 text-blue-600 px-3 rounded-r-lg hover:bg-blue-200">
                          Salin
                        </button>
                      </div>
                    </div>
                    <button 
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium"
                      onClick={processPayment}
                    >
                      Lanjut ke Pembayaran
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Retail Method */}
          <div className="mb-3">
            <div 
              className={`flex items-center justify-between p-3 rounded-lg cursor-pointer ${activeMethod === 'retail' ? 'bg-blue-50 border border-blue-200' : 'bg-white border border-gray-200'}`}
              onClick={() => setActiveMethod(activeMethod === 'retail' ? null : 'retail')}
            >
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                  <i className="fas fa-store text-orange-500"></i>
                </div>
                <span className="text-gray-800">Retail</span>
              </div>
              <span className={`transform transition-transform ${activeMethod === 'retail' ? 'rotate-180' : ''}`}>▼</span>
            </div>
            
            {activeMethod === 'retail' && (
              <div className="mt-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <h4 className="text-gray-800 font-medium mb-2">Pilih Gerai Retail:</h4>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {['Alfamart', 'Indomaret'].map(retail => (
                    <button 
                      key={retail}
                      className={`p-2 border rounded-lg flex flex-col items-center ${selectedRetail === retail ? 'bg-blue-100 border-blue-300' : 'bg-white'}`}
                      onClick={() => setSelectedRetail(retail)}
                    >
                      <Image 
                        src={`/images/${retail.toLowerCase()}.png`} 
                        alt={retail} 
                        width={40} 
                        height={40} 
                        className="mb-1"
                      />
                      <span className="text-xs">{retail}</span>
                    </button>
                  ))}
                </div>
                {selectedRetail && (
                  <>
                    <div className="mb-3">
                      <p className="text-gray-600 text-sm mb-1">Kode Pembayaran</p>
                      <div className="flex">
                        <input 
                          type="text" 
                          value={`${selectedRetail.slice(0,4).toUpperCase()}${Math.floor(100000 + Math.random() * 900000)}`} 
                          readOnly 
                          className="bg-gray-100 p-2 rounded-l-lg flex-grow font-mono text-gray-800" 
                        />
                        <button className="bg-blue-100 text-blue-600 px-3 rounded-r-lg hover:bg-blue-200">
                          Salin
                        </button>
                      </div>
                    </div>
                    <button 
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium"
                      onClick={processPayment}
                    >
                      Konfirmasi
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Credit Card Method */}
          <div className="mb-3">
            <div 
              className={`flex items-center justify-between p-3 rounded-lg cursor-pointer ${activeMethod === 'cc' ? 'bg-blue-50 border border-blue-200' : 'bg-white border border-gray-200'}`}
              onClick={() => setActiveMethod(activeMethod === 'cc' ? null : 'cc')}
            >
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                  <i className="far fa-credit-card text-purple-500"></i>
                </div>
                <span className="text-gray-800">Kartu Kredit</span>
              </div>
              <span className={`transform transition-transform ${activeMethod === 'cc' ? 'rotate-180' : ''}`}>▼</span>
            </div>
            
            {activeMethod === 'cc' && (
              <div className="mt-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="mb-4">
                  <label className="block text-gray-800 mb-2">Informasi Kartu</label>
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Nomor Kartu"
                      className="w-full px-3 py-2 border rounded-lg text-gray-800"
                      maxLength={19}
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full px-3 py-2 border rounded-lg text-gray-800"
                        maxLength={5}
                      />
                      <input
                        type="text"
                        placeholder="CVV"
                        className="w-full px-3 py-2 border rounded-lg text-gray-800"
                        maxLength={3}
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Nama di Kartu"
                      className="w-full px-3 py-2 border rounded-lg text-gray-800"
                    />
                  </div>
                </div>
                <div className="flex items-center mb-4">
                  <input type="checkbox" id="saveCard" className="mr-2" />
                  <label htmlFor="saveCard" className="text-sm text-gray-600">
                    Simpan kartu untuk pembayaran berikutnya
                  </label>
                </div>
                <button 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium"
                  onClick={processPayment}
                >
                  Bayar Sekarang
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Processing Modal */}
      {isProcessing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6 text-center">
            <div className="mb-4">
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 animate-progress"></div>
              </div>
            </div>
            <h3 className="text-lg font-bold mb-2 text-gray-800">Memproses Pembayaran</h3>
            <p className="text-gray-600">Harap tunggu sebentar...</p>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {isSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6 text-center">
            <div className="text-green-500 mb-4 text-5xl">
              ✓
            </div>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">Pembayaran Berhasil!</h2>
            <p className="text-gray-600 mb-4">Terima kasih telah melakukan pembayaran.</p>
            <div className="bg-gray-50 p-4 rounded-lg mb-4 text-left">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Invoice</span>
                <span className="font-mono text-gray-800">{invoiceNumber}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Metode</span>
                <span className="font-medium text-gray-800">
                  {activeMethod === 'qris' && 'QRIS'}
                  {activeMethod === 'va' && 'Virtual Account'}
                  {activeMethod === 'ewallet' && 'E-Wallet'}
                  {activeMethod === 'retail' && 'Retail'}
                  {activeMethod === 'cc' && 'Kartu Kredit'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total</span>
                <span className="font-bold text-blue-600">{formatRupiah(plan.amount)}</span>
              </div>
            </div>
            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium"
              onClick={() => {
                setIsSuccess(false);
                onClose();
              }}
            >
              Selesai
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentModal;
