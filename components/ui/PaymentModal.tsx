// /components/ui/PaymentModal.tsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from '../../styles/PaymentModal.module.css';

interface Plan {
  name: string;
  product: string;
  amount: number;
}

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: Plan;
}

const PaymentModal = ({ isOpen, onClose, plan }: PaymentModalProps) => {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [invoiceNumber, setInvoiceNumber] = useState('');

  const formatRupiah = (amount: number) => {
    return 'Rp' + amount.toLocaleString('id-ID');
  };

  const getMethodName = (method: string | null) => {
    const methods: Record<string, string> = {
      qris: 'QRIS',
      virtual_account: 'Virtual Account',
      bank_transfer: 'Transfer Bank',
      ewallet: 'E-Wallet',
      retail: 'Retail',
      credit_card: 'Kartu Kredit',
    };
    return methods[method || ''] || 'Pembayaran';
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setToastMessage(`${label} disalin!`);
      setTimeout(() => setToastMessage(''), 2000);
    }).catch((err) => {
      console.error('Gagal menyalin: ', err);
    });
  };

  const handlePaymentMethodClick = (method: string) => {
    setSelectedMethod(selectedMethod === method ? null : method);
  };

  const handleBankOptionClick = (bank: string, vaNumber: string) => {
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

  const handlePaymentOptionClick = (type: string, value: string, label: string, section: string) => {
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
      const modalPlan = document.getElementById('modalPlan');
      const modalProduct = document.getElementById('modalProduct');
      const modalAmount = document.getElementById('modalAmount');
      const modalOldPrice = document.getElementById('modalOldPrice');
      
      if (modalPlan) modalPlan.textContent = plan.name;
      if (modalProduct) modalProduct.textContent = plan.product;
      if (modalAmount) modalAmount.textContent = formatRupiah(plan.amount);
      if (modalOldPrice) modalOldPrice.textContent = formatRupiah(plan.amount * 1.67);
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
                      data-wallet="dana
