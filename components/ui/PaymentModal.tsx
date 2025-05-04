// /components/ui/PaymentModal.tsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from '../../styles/PaymentModal.module.css'; // Asumsi CSS module

const PaymentModal = ({ isOpen, onClose, plan }) => {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [invoiceNumber, setInvoiceNumber] = useState('');

  const formatRupiah = (amount) => {
    return 'Rp' + parseInt(amount).toLocaleString('id-ID');
  };

  const getMethodName = (method) => {
    const methods = {
      qris: 'QRIS',
      virtual_account: 'Virtual Account',
      bank_transfer: 'Transfer Bank',
      ewallet: 'E-Wallet',
      retail: 'Retail',
      credit_card: 'Kartu Kredit',
    };
    return methods[method] || 'Pembayaran';
  };

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text).then(() => {
      setToastMessage(`${label} disalin!`);
      setTimeout(() => setToastMessage(''), 2000);
    }).catch((err) => {
      console.error('Gagal menyalin: ', err);
    });
  };

  const handlePaymentMethodClick = (method) => {
    setSelectedMethod(selectedMethod === method ? null : method);
  };

  const handleBankOptionClick = (bank, vaNumber) => {
    const container = document.querySelector(`[data-method="virtual_account"]`);
    if (container) {
      const vaNumberEl = container.querySelector('.va-number');
      const copyBtn = container.querySelector('.copy-btn');
      if (vaNumberEl && copyBtn) {
        vaNumberEl.textContent = vaNumber;
        copyBtn.setAttribute('onclick', `copyToClipboard('${vaNumber}', 'Nomor VA')`);
      }
      container.querySelectorAll('.bank-option').forEach((opt) => {
        opt.classList.remove('bg-blue-100');
      });
      const selectedOption = container.querySelector(`[data-bank="${bank}"]`);
      if (selectedOption) selectedOption.classList.add('bg-blue-100');
    }
  };

  const handlePaymentOptionClick = (type, value, label, section) => {
    const container = document.querySelector(`[data-method="${section}"]`);
    if (container) {
      const targetEl = container.querySelector(`.${type}-number, .retail-code`);
      const copyBtn = container.querySelector('.copy-btn');
      if (targetEl && copyBtn) {
        targetEl.textContent = value;
        copyBtn.setAttribute('onclick', `copyToClipboard('${value}', '${label}')`);
      }
      container.querySelectorAll('.payment-option').forEach((opt) => {
        opt.classList.remove('bg-blue-100');
      });
      const selectedOption = container.querySelector(`[data-${type}="${value.split(/^\D+/)[0] || value}"]`);
      if (selectedOption) selectedOption.classList.add('bg-blue-100');
    }
  };

  const processPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const loadingBar = document.getElementById('loadingBar');
      if (loadingBar) loadingBar.style.width = '100%';
    }, 100);

    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setInvoiceNumber(`INV-${Math.floor(1000 + Math.random() * 9000)}`);
    }, 1500);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.getElementById('modalPlan').textContent = plan.name;
      document.getElementById('modalProduct').textContent = plan.product;
      document.getElementById('modalAmount').textContent = formatRupiah(plan.amount);
      document.getElementById('modalOldPrice').textContent = formatRupiah(plan.amount * 1.67);
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, plan]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-blue-600 p-6 text-white">
          <div className="flex justify-between items-center">
            <div>
              <h2 id="modalPlan" className="text-xl font-bold"></h2>
              <p id="modalProduct" className="text-blue-100 text-sm mt-1"></p>
            </div>
            <button onClick={onClose} className="text-white hover:text-blue-200">
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
              <p id="modalOldPrice" className="text-gray-500 line-through text-sm"></p>
              <p id="modalAmount" className="text-blue-600 font-bold text-xl"></p>
            </div>
          </div>

          {/* Payment Methods */}
          <h3 className="text-lg font-bold mb-4">Metode Pembayaran</h3>
          <div className="space-y-3 mb-6">
            {/* QRIS */}
            <div className="payment-method-container" data-method="qris">
              <div
                className={`payment-method bg-white rounded-lg p-3 flex items-center cursor-pointer shadow-sm ${styles.paymentMethod}`}
                onClick={() => handlePaymentMethodClick('qris')}
              >
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mr-3">
                  <Image
                    src="/images/qris.png"
                    alt="QRIS"
                    width={24}
                    height={24}
                    className="h-5"
                  />
                </div>
                <div className="flex-grow">
                  <h3 className="font-medium text-sm">QRIS</h3>
                </div>
                <i
                  className={`fas fa-chevron-down text-gray-400 transform transition-transform duration-300 ${
                    selectedMethod === 'qris' ? 'rotate-180' : ''
                  }`}
                ></i>
              </div>
              <div className={`payment-details ${selectedMethod === 'qris' ? 'active' : ''} ${styles.paymentDetails}`}>
                <div className={`payment-details-content ${styles.paymentDetailsContent}`}>
                  <div className="text-center mb-4">
                    <div className="qr-code mx-auto w-48 h-48 border-2 border-dashed border-gray-300 rounded-lg mb-3"></div>
                    <p className="text-sm text-gray-500">Scan QR code menggunakan aplikasi mobile banking atau e-wallet</p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg text-sm text-blue-800 mb-4">
                    <p>
                      <i className="fas fa-info-circle mr-2"></i> QR code akan kadaluarsa dalam 24 jam
                    </p>
                  </div>
                  <button
                    className="confirm-payment w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold"
                    onClick={processPayment}
                  >
                    <i className="fas fa-check-circle mr-2"></i> Saya Sudah Bayar
                  </button>
                </div>
              </div>
            </div>

            {/* Virtual Account */}
            <div className="payment-method-container" data-method="virtual_account">
              <div
                className={`payment-method bg-white rounded-lg p-3 flex items-center cursor-pointer shadow-sm ${styles.paymentMethod}`}
                onClick={() => handlePaymentMethodClick('virtual_account')}
              >
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mr-3">
                  <i className="fas fa-university text-blue-600"></i>
                </div>
                <div className="flex-grow">
                  <h3 className="font-medium text-sm">Virtual Account</h3>
                </div>
                <i
                  className={`fas fa-chevron-down text-gray-400 transform transition-transform duration-300 ${
                    selectedMethod === 'virtual_account' ? 'rotate-180' : ''
                  }`}
                ></i>
              </div>
              <div
                className={`payment-details ${selectedMethod === 'virtual_account' ? 'active' : ''} ${styles.paymentDetails}`}
              >
                <div className={`payment-details-content ${styles.paymentDetailsContent}`}>
                  <h4 className="font-medium mb-3 text-center">Pilih Bank</h4>
                  <div className={`method-grid ${styles.methodGrid} mb-4`}>
                    <div
                      className={`method-item bank-option ${styles.methodItem}`}
                      data-bank="bca"
                      onClick={() => handleBankOptionClick('bca', '8888801234567890')}
                    >
                      <Image
                        src="/images/bca.png"
                        alt="BCA"
                        width={32}
                        height={32}
                        className={`method-logo ${styles.methodLogo}`}
                      />
                    </div>
                    <div
                      className={`method-item bank-option ${styles.methodItem}`}
                      data-bank="mandiri"
                      onClick={() => handleBankOptionClick('mandiri', '8888802345678901')}
                    >
                      <Image
                        src="/images/mandiri.png"
                        alt="Mandiri"
                        width={32}
                        height={32}
                        className={`method-logo ${styles.methodLogo}`}
                      />
                    </div>
                    <div
                      className={`method-item bank-option ${styles.methodItem}`}
                      data-bank="bni"
                      onClick={() => handleBankOptionClick('bni', '8888803456789012')}
                    >
                      <Image
                        src="/images/bni.png"
                        alt="BNI"
                        width={32}
                        height={32}
                        className={`method-logo ${styles.methodLogo}`}
                      />
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <div className="mb-3">
                      <label className="block text-gray-500 text-sm mb-1">Nomor Virtual Account</label>
                      <div className="flex items-center">
                        <span className="font-mono va-number bg-gray-100 p-2 rounded flex-1">8888801234567890</span>
                        <button
                          className="copy-btn text-blue-600 hover:text-blue-800 ml-2"
                          onClick={() => copyToClipboard('8888801234567890', 'Nomor VA')}
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
                    <p>
                      <i className="fas fa-exclamation-circle mr-2"></i> Transfer tepat sesuai nominal untuk proses otomatis
                    </p>
                  </div>
                  <button
                    className="confirm-payment w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold"
                    onClick={processPayment}
                  >
                    <i className="fas fa-check-circle mr-2"></i> Konfirmasi Pembayaran
                  </button>
                </div>
              </div>
            </div>

            {/* E-Wallet */}
            <div className="payment-method-container" data-method="ewallet">
              <div
                className={`payment-method bg-white rounded-lg p-3 flex items-center cursor-pointer shadow-sm ${styles.paymentMethod}`}
                onClick={() => handlePaymentMethodClick('ewallet')}
              >
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mr-3">
                  <i className="fas fa-wallet text-green-600"></i>
                </div>
                <div className="flex-grow">
                  <h3 className="font-medium text-sm">E-Wallet</h3>
                </div>
                <i
                  className={`fas fa-chevron-down text-gray-400 transform transition-transform duration-300 ${
                    selectedMethod === 'ewallet' ? 'rotate-180' : ''
                  }`}
                ></i>
              </div>
              <div className={`payment-details ${selectedMethod === 'ewallet' ? 'active' : ''} ${styles.paymentDetails}`}>
                <div className={`payment-details-content ${styles.paymentDetailsContent}`}>
                  <h4 className="font-medium mb-3 text-center">Pilih E-Wallet</h4>
                  <div className={`method-grid ${styles.methodGrid} mb-4`}>
                    <div
                      className={`method-item payment-option ${styles.methodItem}`}
                      data-wallet="dana"
                      onClick={() => handlePaymentOptionClick('ewallet', '081234567890', 'Nomor e-wallet', 'ewallet')}
                    >
                      <Image
                        src="/images/dana.png"
                        alt="DANA"
                        width={32}
                        height={32}
                        className={`method-logo ${styles.methodLogo}`}
                      />
                    </div>
                    <div
                      className={`method-item payment-option ${styles.methodItem}`}
                      data-wallet="gopay"
                      onClick={() => handlePaymentOptionClick('ewallet', '081987654321', 'Nomor e-wallet', 'ewallet')}
                    >
                      <Image
                        src="/images/gopay.png"
                        alt="GoPay"
                        width={32}
                        height={32}
                        className={`method-logo ${styles.methodLogo}`}
                      />
                    </div>
                    <div
                      className={`method-item payment-option ${styles.methodItem}`}
                      data-wallet="ovo"
                      onClick={() => handlePaymentOptionClick('ewallet', '082345678901', 'Nomor e-wallet', 'ewallet')}
                    >
                      <Image
                        src="/images/ovo.png"
                        alt="OVO"
                        width={32}
                        height={32}
                        className={`method-logo ${styles.methodLogo}`}
                      />
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <div className="mb-3">
                      <label className="block text-gray-500 text-sm mb-1">Nomor E-Wallet</label>
                      <div className="flex items-center">
                        <span className="font-mono ewallet-number bg-gray-100 p-2 rounded flex-1">081234567890</span>
                        <button
                          className="copy-btn text-blue-600 hover:text-blue-800 ml-2"
                          onClick={() => copyToClipboard('081234567890', 'Nomor e-wallet')}
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
                    <p>
                      <i className="fas fa-info-circle mr-2"></i> Anda akan diarahkan ke aplikasi untuk menyelesaikan
                      pembayaran
                    </p>
                  </div>
                  <button
                    className="confirm-payment w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold"
                    onClick={processPayment}
                  >
                    <i className="fas fa-arrow-right mr-2"></i> Lanjut ke Pembayaran
                  </button>
                </div>
              </div>
            </div>

            {/* Retail */}
            <div className="payment-method-container" data-method="retail">
              <div
                className={`payment-method bg-white rounded-lg p-3 flex items-center cursor-pointer shadow-sm ${styles.paymentMethod}`}
                onClick={() => handlePaymentMethodClick('retail')}
              >
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mr-3">
                  <i className="fas fa-store text-orange-600"></i>
                </div>
                <div className="flex-grow">
                  <h3 className="font-medium text-sm">Retail</h3>
                </div>
                <i
                  className={`fas fa-chevron-down text-gray-400 transform transition-transform duration-300 ${
                    selectedMethod === 'retail' ? 'rotate-180' : ''
                  }`}
                ></i>
              </div>
              <div className={`payment-details ${selectedMethod === 'retail' ? 'active' : ''} ${styles.paymentDetails}`}>
                <div className={`payment-details-content ${styles.paymentDetailsContent}`}>
                  <h4 className="font-medium mb-3 text-center">Pilih Retail</h4>
                  <div className={`method-grid ${styles.methodGrid} mb-4`}>
                    <div
                      className={`method-item payment-option ${styles.methodItem}`}
                      data-retail="alfamart"
                      onClick={() =>
                        handlePaymentOptionClick(
                          'retail',
                          `ALFA${Math.floor(100000 + Math.random() * 900000)}`,
                          'Kode pembayaran',
                          'retail'
                        )
                      }
                    >
                      <Image
                        src="/images/alfamart.png"
                        alt="Alfamart"
                        width={32}
                        height={32}
                        className={`method-logo ${styles.methodLogo}`}
                      />
                    </div>
                    <div
                      className={`method-item payment-option ${styles.methodItem}`}
                      data-retail="indomaret"
                      onClick={() =>
                        handlePaymentOptionClick(
                          'retail',
                          `INDO${Math.floor(100000 + Math.random() * 900000)}`,
                          'Kode pembayaran',
                          'retail'
                        )
                      }
                    >
                      <Image
                        src="/images/indomaret.png"
                        alt="Indomaret"
                        width={32}
                        height={32}
                        className={`method-logo ${styles.methodLogo}`}
                      />
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <div className="mb-3">
                      <label className="block text-gray-500 text-sm mb-1">Kode Pembayaran</label>
                      <div className="flex items-center">
                        <span className="font-mono retail-code bg-gray-100 p-2 rounded flex-1">ALFA123456</span>
                        <button
                          className="copy-btn text-blue-600 hover:text-blue-800 ml-2"
                          onClick={() => copyToClipboard('ALFA123456', 'Kode pembayaran')}
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
                    <p>
                      <i className="fas fa-exclamation-circle mr-2"></i> Kode pembayaran akan kadaluarsa dalam 24 jam
                    </p>
                  </div>
                  <button
                    className="confirm-payment w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold"
                    onClick={processPayment}
                  >
                    <i className="fas fa-check-circle mr-2"></i> Konfirmasi
                  </button>
                </div>
              </div>
            </div>

            {/* Credit Card */}
            <div className="payment-method-container" data-method="credit_card">
              <div
                className={`payment-method bg-white rounded-lg p-3 flex items-center cursor-pointer shadow-sm ${styles.paymentMethod}`}
                onClick={() => handlePaymentMethodClick('credit_card')}
              >
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mr-3">
                  <i className="far fa-credit-card text-purple-600"></i>
                </div>
                <div className="flex-grow">
                  <h3 className="font-medium text-sm">Kartu Kredit</h3>
                </div>
                <i
                  className={`fas fa-chevron-down text-gray-400 transform transition-transform duration-300 ${
                    selectedMethod === 'credit_card' ? 'rotate-180' : ''
                  }`}
                ></i>
              </div>
              <div
                className={`payment-details ${selectedMethod === 'credit_card' ? 'active' : ''} ${styles.paymentDetails}`}
              >
                <div className={`payment-details-content ${styles.paymentDetailsContent}`}>
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
                    className="confirm-payment w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold"
                    onClick={processPayment}
                  >
                    <i className="fas fa-lock mr-2"></i> Bayar Sekarang
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Processing Modal */}
      {isProcessing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6 text-center">
            <div className="mb-4">
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div id="loadingBar" className={`loading-bar h-full bg-blue-500 ${styles.loadingBar}`}></div>
              </div>
            </div>
            <h3 className="text-lg font-bold mb-2">Memproses Pembayaran</h3>
            <p className="text-gray-600">Harap tunggu sebentar...</p>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {isSuccess && (
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
                <span className="font-mono">{invoiceNumber}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-500">Metode</span>
                <span className="font-medium">{getMethodName(selectedMethod)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Total</span>
                <span className="font-bold text-blue-600">{formatRupiah(plan.amount)}</span>
              </div>
            </div>
            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold"
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

      {/* Toast Notification */}
      {toastMessage && (
        <div className={`toast fixed bottom-4 right-4 bg-green-500 text-white p-3 rounded-lg flex items-center z-[1000] ${styles.toast}`}>
          <i className="fas fa-copy mr-2"></i> {toastMessage}
        </div>
      )}
    </div>
  );
};

export default PaymentModal;
