import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Your Website Title',
  description: 'Your website description',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Your Website Title</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <style>
          /* Gaya CSS dari kode HTML Anda */
          .payment-method {
            transition: all 0.2s ease;
          }
          .payment-method:hover {
            transform: translateY(-3px);
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .loading-bar {
            width: 0%;
            transition: width 1s ease-in-out;
          }
          .toast {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #10b981;
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            display: none;
            z-index: 1000;
          }
          .payment-logo {
            width: 24px;
            height: 24px;
            object-fit: contain;
          }
          .bank-option {
            transition: all 0.2s ease;
          }
          .bank-option:hover {
            background-color: #f8fafc;
          }
          .payment-option {
            transition: all 0.2s ease;
          }
          .payment-option:hover {
            background-color: #f8fafc;
          }
          .payment-details {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease-out;
          }
          .payment-details.active {
            max-height: 500px;
          }
          .method-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 8px;
          }
          .method-item {
            padding: 8px;
            border-radius: 8px;
            cursor: pointer;
            text-align: center;
          }
          .method-item:hover {
            background-color: #f3f4f6;
          }
          .method-logo {
            width: 32px;
            height: 32px;
            margin: 0 auto;
            object-fit: contain;
          }
          .payment-details-content {
            padding: 12px 0;
            margin-left: 0;
            border-left: none;
          }
        </style>
      </head>
      <body className={inter.className}>
        {children}

        {/* Payment Gateway Modal HTML */}
        <div id="paymentModal" className="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="bg-blue-600 p-6 text-white">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold" id="modalPlan">Pembayaran</h2>
                  <p className="text-blue-100 text-sm mt-1" id="modalProduct">Layanan Premium</p>
                </div>
                <button id="closeModal" className="text-white hover:text-blue-200">
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
                  <p className="text-gray-500 line-through text-sm" id="modalOldPrice">Rp 500.000</p>
                  <p className="text-blue-600 font-bold text-xl" id="modalAmount">Rp 299.000</p>
                </div>
              </div>

              {/* Payment Methods */}
              <h3 className="text-lg font-bold mb-4">Metode Pembayaran</h3>

              <div className="space-y-3 mb-6">
                {/* QRIS */}
                <div className="payment-method-container">
                  <div className="payment-method bg-white rounded-lg p-3 flex items-center cursor-pointer shadow-sm" data-method="qris">
                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mr-3">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QRIS_logo.svg/1200px-QRIS_logo.svg.png" alt="QRIS" className="h-5" />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-medium text-sm">QRIS</h3>
                    </div>
                    <i className="fas fa-chevron-down text-gray-400 transform transition-transform duration-300"></i>
                  </div>

                  <div className="payment-details">
                    <div className="payment-details-content">
                      <div className="text-center mb-4">
                        <div className="qr-code mx-auto w-48 h-48 border-2 border-dashed border-gray-300 rounded-lg mb-3
