import React, { useState, useEffect } from 'react';
import '../styles/PaymentModal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTimes, faUniversity, faWallet, faStore, faCreditCard, faChevronDown,
  faCopy, faCheckCircle, faArrowRight, faLock, faInfoCircle, faExclamationCircle,
} from '@fortawesome/free-solid-svg-icons';

const PaymentModal = ({ isOpen, onClose, plan }) => {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedPlan] = useState(plan || {
    name: 'Layanan Premium',
    amount: '299000',
    product: 'Layanan Premium 1 Bulan',
  });

  const formatRupiah = (amount) => 'Rp' + parseInt(amount).toLocaleString('id-ID');

  const toggleMethod = (method) => {
    setSelectedMethod(selectedMethod === method ? null : method);
  };

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text).then(() => showToast(`${label} disalin!`));
  };

  const showToast = (message) => {
    const toast = document.getElementById('toast');
    toast.innerHTML = `<i class="fas fa-copy mr-2"></i> ${message}`;
    toast.style.display = 'flex';
    setTimeout(() => (toast.style.display = 'none'), 2000);
  };

  const processPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 1500);
  };

  const closeSuccessModal = () => {
    setIsSuccess(false);
    onClose();
  };

  const getMethodName = (method) => {
    const methods = {
      qris: 'QRIS',
      virtual_account: 'Virtual Account',
      ewallet: 'E-Wallet',
      retail: 'Retail',
      credit_card: 'Kartu Kredit',
    };
    return methods[method] || 'Pembayaran';
  };

  const handleBankOptionClick = (bank, container) => {
    const vaNumber = container.querySelector('.va-number');
    const copyBtn = container.querySelector('.copy-btn');
    container.querySelectorAll('.bank-option').forEach((opt) => opt.classList.remove('bg-blue-100'));
    container.querySelector(`[data-bank="${bank}"]`).classList.add('bg-blue-100');
    const vaNumbers = {
      bca: '8888801234567890',
      mandiri: '8888802345678901',
      bni: '8888803456789012',
    };
    if (vaNumbers[bank]) {
      vaNumber.textContent = vaNumbers[bank];
      copyBtn.setAttribute('onclick', `copyToClipboard('${vaNumbers[bank]}', 'Nomor VA')`);
    }
  };

  const handlePaymentOptionClick = (option, type, container) => {
    container.querySelectorAll('.payment-option').forEach((opt) => opt.classList.remove('bg-blue-100'));
    container.querySelector(`[data-${type}="${option}"]`).classList.add('bg-blue-100');
    if (type === 'wallet' && container.querySelector('.ewallet-number')) {
      const ewalletNumber = container.querySelector('.ewallet-number');
      const copyBtn = container.querySelector('.copy-btn');
      const numbers = { dana: '081234567890', gopay: '081987654321', ovo: '082345678901' };
      if (numbers[option]) {
        ewalletNumber.textContent = numbers[option];
        copyBtn.setAttribute('onclick', `copyToClipboard('${numbers[option]}', 'Nomor e-wallet')`);
      }
    }
    if (type === 'retail' && container.querySelector('.retail-code')) {
      const retailCode = container.querySelector('.retail-code');
      const copyBtn = container.querySelector('.copy-btn');
      const codes = {
        alfamart: 'ALFA' + Math.floor(100000 + Math.random() * 900000),
        indomaret: 'INDO' + Math.floor(100000 + Math.random() * 900000),
      };
      if (codes[option]) {
        retailCode.textContent = codes[option];
        copyBtn.setAttribute('onclick', `copyToClipboard('${codes[option]}', 'Kode pembayaran')`);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div id="paymentModal" className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="bg-blue-600 p-6 text-white">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold" id="modalPlan">{selectedPlan.name}</h2>
              <p className="text-blue-100 text-sm mt-1" id="modalProduct">{selectedPlan.product}</p>
            </div>
            <button onClick={onClose} className="text-white hover:text-blue-200">
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6 p-4 bg-gray-50 rounded-lg">
            <div>
              <h3 className="font-medium">Total Pembayaran</h3>
              <p className="text-gray-500 text-sm">Termasuk PPN 11%</p>
            </div>
            <div className="text-right">
              <p className="text-gray-500 line-through text-sm" id="modalOldPrice">
                {formatRupiah(selectedPlan.amount * 1.67)}
              </p>
              <p className="text-blue-600 font-bold text-xl" id="modalAmount">
                {formatRupiah(selectedPlan.amount)}
              </p>
            </div>
          </div>
          <h3 className="text-lg font-bold mb-4">Metode Pembayaran</h3>
          <div className="space-y-3 mb-6">
            {/* QRIS */}
            <div className="payment-method-container">
              <div className="payment-method bg-white rounded-lg p-3 flex items-center cursor-pointer shadow-sm" onClick={() => toggleMethod('qris')}>
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mr-3">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QRIS_logo.svg/1200px-QRIS_logo.svg.png" alt="QRIS" className="h-5" />
                </div>
                <div className="flex-grow"><h3 className="font-medium text-sm">QRIS</h3></div>
                <FontAwesomeIcon icon={faChevronDown} className={`text-gray-400 transition-transform duration-300 ${selectedMethod === 'qris' ? 'rotate-180' : ''}`} />
              </div>
              <div className={`payment-details ${selectedMethod === 'qris' ? 'active' : ''}`}>
                <div className="payment-details-content">
                  <div className="text-center mb-4">
                    <div className="qr-code mx-auto w-48 h-48 border-2 border-dashed border-gray-300 rounded-lg mb-3"></div>
                    <p className="text-sm text-gray-500">Scan QR code menggunakan aplikasi mobile banking atau e-wallet</p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg text-sm text-blue-800 mb-4">
                    <p><FontAwesomeIcon icon={faInfoCircle} className="mr-2" /> QR code akan kadaluarsa dalam 24 jam</p>
                  </div>
                  <button className="confirm-payment w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold" onClick={processPayment}>
                    <FontAwesomeIcon icon={faCheckCircle} className="mr-2" /> Saya Sudah Bayar
                  </button>
                </div>
              </div>
            </div>
            {/* Virtual Account */}
            <div className="payment-method-container">
              <div className="payment-method bg-white rounded-lg p-3 flex items-center cursor-pointer shadow-sm" onClick={() => toggleMethod('virtual_account')}>
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mr-3">
                  <FontAwesomeIcon icon={faUniversity} className="text-blue-600" />
                </div>
                <div className="flex-grow"><h3 className="font-medium text-sm">Virtual Account</h3></div>
                <FontAwesomeIcon icon={faChevronDown} className={`text-gray-400 transition-transform duration-300 ${selectedMethod === 'virtual_account' ? 'rotate-180' : ''}`} />
              </div>
              <div className={`payment-details ${selectedMethod === 'virtual_account' ? 'active' : ''}`}>
                <div className="payment-details-content">
                  <h4 className="font-medium mb-3 text-center">Pilih Bank</h4>
                  <div className="method-grid mb-4">
                    <div className="method-item bank-option" data-bank="bca" onClick={(e) => handleBankOptionClick('bca', e.target.closest('.payment-details'))}>
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Bank_Central_Asia.svg/2560px-Bank_Central_Asia.svg.png" alt="BCA" className="method-logo" />
                    </div>
                    <div className="method-item bank-option" data-bank="mandiri" onClick={(e) => handleBankOptionClick('mandiri', e.target.closest('.payment-details'))}>
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Bank_Mandiri_logo_2016.svg/1200px-Bank_Mandiri_logo_2016.svg.png" alt="Mandiri" className="method-logo" />
                    </div>
                    <div className="method-item bank-option" data-bank="bni" onClick={(e) => handleBankOptionClick('bni', e.target.closest('.payment-details'))}>
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/BNI_logo.svg/1200px-BNI_logo.svg.png" alt="BNI" className="method-logo" />
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <div className="mb-3">
                      <label className="block text-gray-500 text-sm mb-1">Nomor Virtual Account</label>
                      <div className="flex items-center">
                        <span className="font-mono va-number bg-gray-100 p-2 rounded flex-1">8888801234567890</span>
                        <button className="copy-btn text-blue-600 hover:text-blue-800 ml-2" onClick={() => copyToClipboard('8888801234567890', 'Nomor VA')}>
                          <FontAwesomeIcon icon={faCopy} />
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-gray-500 text-sm mb-1">Jumlah Transfer</label>
                      <span className="font-bold text-blue-600">{formatRupiah(selectedPlan.amount)}</span>
                    </div>
                  </div>
                  <div className="bg-yellow-50 p-3 rounded-lg text-sm text-yellow-800 mb-4">
                    <p><FontAwesomeIcon icon={faExclamationCircle} className="mr-2" /> Transfer tepat sesuai nominal untuk proses otomatis</p>
                  </div>
                  <button className="confirm-payment w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold" onClick={processPayment}>
                    <FontAwesomeIcon icon={faCheckCircle} className="mr-2" /> Konfirmasi Pembayaran
                  </button>
                </div>
              </div>
            </div>
            {/* E-Wallet */}
            <div className="payment-method-container">
              <div className="payment-method bg-white rounded-lg p-3 flex items-center cursor-pointer shadow-sm" onClick={() => toggleMethod('ewallet')}>
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mr-3">
                  <FontAwesomeIcon icon={faWallet} className="text-green-600" />
                </div>
                <div className="flex-grow"><h3 className="font-medium text-sm">E-Wallet</h3></div>
                <FontAwesomeIcon icon={faChevronDown} className={`text-gray-400 transition-transform duration-300 ${selectedMethod === 'ewallet' ? 'rotate-180' : ''}`} />
              </div>
              <div className={`payment-details ${selectedMethod === 'ewallet' ? 'active' : ''}`}>
                <div className="payment-details-content">
                  <h4 className="font-medium mb-3 text-center">Pilih E-Wallet</h4>
                  <div className="method-grid mb-4">
                    <div className="method-item payment-option" data-wallet="dana" onClick={(e) => handlePaymentOptionClick('dana', 'wallet', e.target.closest('.payment-details'))}>
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Logo_dana_blue.svg/1200px-Logo_dana_blue.svg.png" alt="DANA" className="method-logo" />
                    </div>
                    <div className="method-item payment-option" data-wallet="gopay" onClick={(e) => handlePaymentOptionClick('gopay', 'wallet', e.target.closest('.payment-details'))}>
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Gopay_logo.svg/1200px-Gopay_logo.svg.png" alt="GoPay" className="method-logo" />
                    </div>
                    <div className="method-item payment-option" data-wallet="ovo" onClick={(e) => handlePaymentOptionClick('ovo', 'wallet', e.target.closest('.payment-details'))}>
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/OVO_logo.svg/1200px-OVO_logo.svg.png" alt="OVO" className="method-logo" />
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <div className="mb-3">
                      <label className="block text-gray-500 text-sm mb-1">Nomor E-Wallet</label>
                      <div className="flex items-center">
                        <span className="font-mono ewallet-number bg-gray-100 p-2 rounded flex-1">081234567890</span>
                        <button className="copy-btn text-blue-600 hover:text-blue-800 ml-2" onClick={() => copyToClipboard('081234567890', 'Nomor e-wallet')}>
                          <FontAwesomeIcon icon={faCopy} />
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-gray-500 text-sm mb-1">Jumlah Transfer</label>
                      <span className="font-bold text-blue-600">{formatRupiah(selectedPlan.amount)}</span>
                    </div>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg text-sm text-blue-800 mb-4">
                    <p><FontAwesomeIcon icon={faInfoCircle} className="mr-2" /> Anda akan diarahkan ke aplikasi untuk menyelesaikan pembayaran</p>
                  </div>
                  <button className="confirm-payment w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold" onClick={processPayment}>
                    <FontAwesomeIcon icon={faArrowRight} className="mr-2" /> Lanjut ke Pembayaran
                  </button>
                </div>
              </div>
            </div>
            {/* Retail */}
            <div className="payment-method-container">
              <div className="payment-method bg-white rounded-lg p-3 flex items-center cursor-pointer shadow-sm" onClick={() => toggleMethod('retail')}>
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mr-3">
                  <FontAwesomeIcon icon={faStore} className="text-orange-600" />
                </div>
                <div className="flex-grow"><h3 className="font-medium text-sm">Retail</h3></div>
                <FontAwesomeIcon icon={faChevronDown} className={`text-gray-400 transition-transform duration-300 ${selectedMethod === 'retail' ? 'rotate-180' : ''}`} />
              </div>
              <div className={`payment-details ${selectedMethod === 'retail' ? 'active' : ''}`}>
                <div className="payment-details-content">
                  <h4 className="font-medium mb-3 text-center">Pilih Retail</h4>
                  <div className="method-grid mb-4">
                    <div className="method-item payment-option" data-retail="alfamart" onClick={(e) => handlePaymentOptionClick('alfamart', 'retail', e.target.closest('.payment-details'))}>
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Alfamart_logo_2019.svg/1200px-Alfamart_logo_2019.svg.png" alt="Alfamart" className="method-logo" />
                    </div>
                    <div className="method-item payment-option" data-retail="indomaret" onClick={(e) => handlePaymentOptionClick('indomaret', 'retail', e.target.closest('.payment-details'))}>
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Indomaret_logo.svg/1200px-Indomaret_logo.svg.png" alt="Indomaret" className="method-logo" />
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <div className="mb-3">
                      <label className="block text-gray-500 text-sm mb-1">Kode Pembayaran</label>
                      <div className="flex items-center">
                        <span className="font-mono retail-code bg-gray-100 p-2 rounded flex-1">ALFA123456</span>
                        <button className="copy-btn text-blue-600 hover:text-blue-800 ml-2" onClick={() => copyToClipboard('ALFA123456', 'Kode pembayaran')}>
                          <FontAwesomeIcon icon={faCopy} />
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-gray-500 text-sm mb-1">Jumlah Pembayaran</label>
                      <span className="font-bold text-blue-600">{formatRupiah(selectedPlan.amount)}</span>
                    </div>
                  </div>
                  <div className="bg-yellow-50 p-3 rounded-lg text-sm text-yellow-800 mb-4">
                    <p><FontAwesomeIcon icon={faExclamationCircle} className="mr-2" /> Kode pembayaran akan kadaluarsa dalam 24 jam</p>
                  </div>
                  <button className="confirm-payment w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold" onClick={processPayment}>
                    <FontAwesomeIcon icon={faCheckCircle} className="mr-2" /> Konfirmasi
                  </button>
                </div>
              </div>
            </div>
            {/* Credit Card */}
            <div className="payment-method-container">
              <div className="payment-method bg-white rounded-lg p-3 flex items-center cursor-pointer shadow-sm" onClick={() => toggleMethod('credit_card')}>
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mr-3">
                  <FontAwesomeIcon icon={faCreditCard} className="text-purple-600" />
                </div>
                <div className="flex-grow"><h3 className="font-medium text-sm">Kartu Kredit</h3></div>
                <FontAwesomeIcon icon={faChevronDown} className={`text-gray-400 transition-transform duration-300 ${selectedMethod === 'credit_card' ? 'rotate-180' : ''}`} />
              </div>
              <div className={`payment-details ${selectedMethod === 'credit_card' ? 'active' : ''}`}>
                <div className="payment-details-content">
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Informasi Kartu</label>
                    <div className="space-y-3">
                      <input type="text" placeholder="Nomor Kartu" className="w-full px-4 py-2 border rounded-lg" maxLength="19" />
                      <div className="grid grid-cols-2 gap-3">
                        <input type="text" placeholder="MM/YY" className="w-full px-4 py-2 border rounded-lg" maxLength="5" />
                        <input type="text" placeholder="CVV" className="w-full px-4 py-2 border rounded-lg" maxLength="3" />
                      </div>
                      <input type="text" placeholder="Nama di Kartu" className="w-full px-4 py-2 border rounded-lg" />
                    </div>
                  </div>
                  <div className="flex items-center mb-4">
                    <input type="checkbox" id="saveCard" className="mr-2" />
                    <label htmlFor="saveCard" className="text-sm text-gray-600">Simpan kartu untuk pembayaran berikutnya</label>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Jumlah Pembayaran</span>
                      <span className="font-bold text-blue-600">{formatRupiah(selectedPlan.amount)}</span>
                    </div>
                  </div>
                  <button className="confirm-payment w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold" onClick={processPayment}>
                    <FontAwesomeIcon icon={faLock} className="mr-2" /> Bayar Sekarang
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Processing Modal */}
      <div id="processingModal" className={`fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 ${isProcessing ? '' : 'hidden'}`}>
        <div className="bg-white rounded-xl max-w-md w-full p-6 text-center">
          <div className="mb-4">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div id="loadingBar" className="loading-bar h-full bg-blue-500"></div>
            </div>
          </div>
          <h3 className="text-lg font-bold mb-2">Memproses Pembayaran</h3>
          <p className="text-gray-600">Harap tunggu sebentar...</p>
        </div>
      </div>
      {/* Success Modal */}
      <div id="successModal" className={`fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 ${isSuccess ? '' : 'hidden'}`}>
        <div className="bg-white rounded-xl max-w-md w-full p-6 text-center">
          <div className="text-green-500 mb-4">
            <FontAwesomeIcon icon={faCheckCircle} className="text-5xl" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Pembayaran Berhasil!</h2>
          <p className="text-gray-600 mb-4">Terima kasih telah melakukan pembayaran.</p>
          <div className="bg-gray-50 p-4 rounded-lg mb-4 text-left">
            <div className="flex justify-between mb-2">
              <span className="text-gray-500">Invoice</span>
              <span className="font-mono">INV-<span id="invoiceNumber">XXXX</span></span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-500">Metode</span>
              <span id="successMethod" className="font-medium">{getMethodName(selectedMethod)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Total</span>
              <span id="successAmount" className="font-bold text-blue-600">{formatRupiah(selectedPlan.amount)}</span>
            </div>
          </div>
          <button onClick={closeSuccessModal} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold">
            Selesai
          </button>
        </div>
      </div>
      {/* Toast Notification */}
      <div id="toast" className="toast">
        <FontAwesomeIcon icon={faCopy} className="mr-2" /> Nomor disalin!
      </div>
    </div>
  );
};

export default PaymentModal;
