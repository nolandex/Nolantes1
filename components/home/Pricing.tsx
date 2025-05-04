"use client";

import { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Spacer,
  Link,
} from "@nextui-org/react";
import { siteConfig } from "@/config/site";
import { ALL_TIERS } from "@/config/tiers";
import { FaCheck } from "react-icons/fa";
import { RoughNotation } from "react-rough-notation";
import { TiersEnum } from "@/types/pricing";

// Define TypeScript interface for props
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
  const TIERS = ALL_TIERS[`TIERS_${langName.toUpperCase()}`];

  // Pilih tier berdasarkan activeTab
  const selectedTier = TIERS?.find(
    (tier: any) =>
      tier.key === (activeTab === "setup" ? TiersEnum.Free : TiersEnum.Customize)
  );

  // Fungsi untuk buka modal pembayaran dan update plan
  const openPaymentModal = () => {
    if (!selectedTier) return;

    const amount = selectedTier.price?.replace(/[^\d]/g, '') || '0'; // Hapus non-digit
    const planName = selectedTier.title || 'Plan';
    const productName = selectedTier.description || 'Service';

    // Update global variables di script HTML
    document.getElementById('modalPlan')!.textContent = planName;
    document.getElementById('modalProduct')!.textContent = productName;
    document.getElementById('modalAmount')!.textContent = `Rp ${parseInt(amount).toLocaleString('id-ID')}`;
    document.getElementById('modalOldPrice')!.textContent = `Rp ${Math.floor(parseInt(amount) * 1.67).toLocaleString('id-ID')}`;

    // Reset semua detail payment method
    document.querySelectorAll('.payment-details').forEach(detail => {
      detail.classList.remove('active');
    });
    document.querySelectorAll('.payment-method i.fa-chevron-down').forEach(icon => {
      icon.classList.remove('rotate-180');
    });

    // Tampilkan modal
    document.getElementById('paymentModal')?.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  };

  return (
    <section
      id={id}
      className="flex flex-col justify-center max-w-3xl items-center pt-12"
    >
      <div className="flex flex-col text-center max-w-lg">
        <h2 className="text-center text-white">
          <RoughNotation type="highlight" show={true} color="#2563EB">
            {locale.title}
          </RoughNotation>
        </h2>
        <h3 className="text-3xl font-medium tracking-tight mt-2">
          {locale.title2}
        </h3>
        <Spacer y={3} />
        <p className="text-medium text-default-500">{locale.description}</p>
      </div>
      <Spacer y={6} />
      <div className="w-[85%] max-w-lg">
        {selectedTier ? (
          <Card
            key={selectedTier.key}
            className="p-2 bg-gradient-to-br from-gray-900 to-gray-800 rounded-[8px]"
            shadow="md"
            radius="md"
          >
            <CardHeader className="flex flex-col items-start gap-1 pb-0">
              {/* Tab Navigation */}
              <div className="flex w-full border-b border-gray-700">
                <button
                  onClick={() => setActiveTab("setup")}
                  className={`flex-1 py-2 text-sm font-medium text-center transition-colors duration-200 ${
                    activeTab === "setup"
                      ? "text-blue-400 border-b-2 border-blue-400"
                      : "text-gray-400 hover:text-gray-200"
                  }`}
                >
                  Setup
                </button>
                <button
                  onClick={() => setActiveTab("website")}
                  className={`flex-1 py-2 text-sm font-medium text-center transition-colors duration-200 ${
                    activeTab === "website"
                      ? "text-blue-400 border-b-2 border-blue-400"
                      : "text-gray-400 hover:text-gray-200"
                  }`}
                >
                  Website
                </button>
              </div>
              {/* Tier Title and Description */}
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
            <CardBody className="gap-8">
              <p className="flex items-baseline gap-1 pt-2 pb-4">
                <span className="inline bg-gradient-to-br from-white to-gray-400 bg-clip-text text-4xl font-bold leading-7 tracking-tight text-transparent">
                  {selectedTier.price || "N/A"}
                </span>
              </p>
              <ul className="flex flex-col gap-1">
                {selectedTier.features && selectedTier.features.length > 0 ? (
                  selectedTier.features.map((feature: string) => (
                    <li key={feature} className="flex items-center gap-2">
                      <FaCheck className="text-blue-500" />
                      <p className="text-sm text-gray-400">{feature}</p>
                    </li>
                  ))
                ) : (
                  <li className="text-sm text-gray-400">
                    No features available
                  </li>
                )}
              </ul>
            </CardBody>
            <CardFooter>
              <Button
                fullWidth
                onClick={openPaymentModal}
                color={selectedTier.buttonColor || "primary"}
                variant={selectedTier.buttonVariant || "solid"}
                radius="md"
                className="bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-[8px] hover:from-blue-700 hover:to-blue-600 transition-all duration-200"
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
      <Spacer y={10} />

      {/* Payment Gateway Modal - Dari File HTML */}
      <div id="paymentModal" className="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        {/* Isi dari file HTML Anda */}
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
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QRIS_logo.svg/1200px-QRIS_logo.svg.png" alt="QRIS" className="h-5"/>
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-medium text-sm">QRIS</h3>
                  </div>
                  <i className="fas fa-chevron-down text-gray-400 transform transition-transform duration-300"></i>
                </div>
                <div className="payment-details">
                  <div className="payment-details-content">
                    <div className="text-center mb-4">
                      <div className="qr-code mx-auto w-48 h-48 border-2 border-dashed border-gray-300 rounded-lg mb-3"></div>
                      <p className="text-sm text-gray-500">Scan QR code menggunakan aplikasi mobile banking atau e-wallet</p>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg text-sm text-blue-800 mb-4">
                      <p><i className="fas fa-info-circle mr-2"></i> QR code akan kadaluarsa dalam 24 jam</p>
                    </div>
                    <button className="confirm-payment w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold">
                      <i className="fas fa-check-circle mr-2"></i> Saya Sudah Bayar
                    </button>
                  </div>
                </div>
              </div>

              {/* Virtual Account */}
              <div className="payment-method-container">
                <div className="payment-method bg-white rounded-lg p-3 flex items-center cursor-pointer shadow-sm" data-method="virtual_account">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mr-3">
                    <i className="fas fa-university text-blue-600"></i>
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-medium text-sm">Virtual Account</h3>
                  </div>
                  <i className="fas fa-chevron-down text-gray-400 transform transition-transform duration-300"></i>
                </div>
                <div className="payment-details">
                  <div className="payment-details-content">
                    <h4 className="font-medium mb-3 text-center">Pilih Bank</h4>
                    <div className="method-grid mb-4">
                      <div className="method-item bank-option" data-bank="bca">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Bank_Central_Asia.svg/2560px-Bank_Central_Asia.svg.png" alt="BCA" className="method-logo"/>
                      </div>
                      <div className="method-item bank-option" data-bank="mandiri">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Bank_Mandiri_logo_2016.svg/1200px-Bank_Mandiri_logo_2016.svg.png" alt="Mandiri" className="method-logo"/>
                      </div>
                      <div className="method-item bank-option" data-bank="bni">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/BNI_logo.svg/1200px-BNI_logo.svg.png" alt="BNI" className="method-logo"/>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg mb-4">
                      <div className="mb-3">
                        <label className="block text-gray-500 text-sm mb-1">Nomor Virtual Account</label>
                        <div className="flex items-center">
                          <span className="font-mono va-number bg-gray-100 p-2 rounded flex-1">8888801234567890</span>
                          <button className="copy-btn text-blue-600 hover:text-blue-800 ml-2" onclick="copyToClipboard('8888801234567890', 'Nomor VA')">
                            <i className="fas fa-copy"></i>
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="block text-gray-500 text-sm mb-1">Jumlah Transfer</label>
                        <span className="font-bold text-blue-600">Rp 299.000</span>
                      </div>
                    </div>
                    <div className="bg-yellow-50 p-3 rounded-lg text-sm text-yellow-800 mb-4">
                      <p><i className="fas fa-exclamation-circle mr-2"></i> Transfer tepat sesuai nominal untuk proses otomatis</p>
                    </div>
                    <button className="confirm-payment w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold">
                      <i className="fas fa-check-circle mr-2"></i> Konfirmasi Pembayaran
                    </button>
                  </div>
                </div>
              </div>

              {/* E-Wallets */}
              <div className="payment-method-container">
                <div className="payment-method bg-white rounded-lg p-3 flex items-center cursor-pointer shadow-sm" data-method="ewallet">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mr-3">
                    <i className="fas fa-wallet text-green-600"></i>
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-medium text-sm">E-Wallet</h3>
                  </div>
                  <i className="fas fa-chevron-down text-gray-400 transform transition-transform duration-300"></i>
                </div>
                <div className="payment-details">
                  <div className="payment-details-content">
                    <h4 className="font-medium mb-3 text-center">Pilih E-Wallet</h4>
                    <div className="method-grid mb-4">
                      <div className="method-item payment-option" data-wallet="dana">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Logo_dana_blue.svg/1200px-Logo_dana_blue.svg.png" alt="DANA" className="method-logo"/>
                      </div>
                      <div className="method-item payment-option" data-wallet="gopay">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Gopay_logo.svg/1200px-Gopay_logo.svg.png" alt="GoPay" className="method-logo"/>
                      </div>
                      <div className="method-item payment-option" data-wallet="ovo">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/OVO_logo.svg/1200px-OVO_logo.svg.png" alt="OVO" className="method-logo"/>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg mb-4">
                      <div className="mb-3">
                        <label className="block text-gray-500 text-sm mb-1">Nomor E-Wallet</label>
                        <div className="flex items-center">
                          <span className="font-mono ewallet-number bg-gray-100 p-2 rounded flex-1">081234567890</span>
                          <button className="copy-btn text-blue-600 hover:text-blue-800 ml-2" onclick="copyToClipboard('081234567890', 'Nomor e-wallet')">
                            <i className="fas fa-copy"></i>
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="block text-gray-500 text-sm mb-1">Jumlah Transfer</label>
                        <span className="font-bold text-blue-600">Rp 299.000</span>
                      </div>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg text-sm text-blue-800 mb-4">
                      <p><i className="fas fa-info-circle mr-2"></i> Anda akan diarahkan ke aplikasi untuk menyelesaikan pembayaran</p>
                    </div>
                    <button className="confirm-payment w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold">
                      <i className="fas fa-arrow-right mr-2"></i> Lanjut ke Pembayaran
                    </button>
                  </div>
                </div>
              </div>

              {/* Retail Outlets */}
              <div className="payment-method-container">
                <div className="payment-method bg-white rounded-lg p-3 flex items-center cursor-pointer shadow-sm" data-method="retail">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mr-3">
                    <i className="fas fa-store text-orange-600"></i>
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-medium text-sm">Retail</h3>
                  </div>
                  <i className="fas fa-chevron-down text-gray-400 transform transition-transform duration-300"></i>
                </div>
                <div className="payment-details">
                  <div className="payment-details-content">
                    <h4 className="font-medium mb-3 text-center">Pilih Retail</h4>
                    <div className="method-grid mb-4">
                      <div className="method-item payment-option" data-retail="alfamart">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Alfamart_logo_2019.svg/1200px-Alfamart_logo_2019.svg.png" alt="Alfamart" className="method-logo"/>
                      </div>
                      <div className="method-item payment-option" data-retail="indomaret">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Indomaret_logo.svg/1200px-Indomaret_logo.svg.png" alt="Indomaret" className="method-logo"/>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg mb-4">
                      <div className="mb-3">
                        <label className="block text-gray-500 text-sm mb-1">Kode Pembayaran</label>
                        <div className="flex items-center">
                          <span className="font-mono retail-code bg-gray-100 p-2 rounded flex-1">ALFA123456</span>
                          <button className="copy-btn text-blue-600 hover:text-blue-800 ml-2" onclick="copyToClipboard('ALFA123456', 'Kode pembayaran')">
                            <i className="fas fa-copy"></i>
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="block text-gray-500 text-sm mb-1">Jumlah Pembayaran</label>
                        <span className="font-bold text-blue-600">Rp 299.000</span>
                      </div>
                    </div>
                    <div className="bg-yellow-50 p-3 rounded-lg text-sm text-yellow-800 mb-4">
                      <p><i className="fas fa-exclamation-circle mr-2"></i> Kode pembayaran akan kadaluarsa dalam 24 jam</p>
                    </div>
                    <button className="confirm-payment w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold">
                      <i className="fas fa-check-circle mr-2"></i> Konfirmasi
                    </button>
                  </div>
                </div>
              </div>

              {/* Credit Card */}
              <div className="payment-method-container">
                <div className="payment-method bg-white rounded-lg p-3 flex items-center cursor-pointer shadow-sm" data-method="credit_card">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mr-3">
                    <i className="far fa-credit-card text-purple-600"></i>
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-medium text-sm">Kartu Kredit</h3>
                  </div>
                  <i className="fas fa-chevron-down text-gray-400 transform transition-transform duration-300"></i>
                </div>
                <div className="payment-details">
                  <div className="payment-details-content">
                    <div className="mb-4">
                      <label className="block text-gray-700 mb-2">Informasi Kartu</label>
                      <div className="space-y-3">
                        <input type="text" placeholder="Nomor Kartu" className="w-full px-4 py-2 border rounded-lg" maxLength={19}/>
                        <div className="grid grid-cols-2 gap-3">
                          <input type="text" placeholder="MM/YY" className="w-full px-4 py-2 border rounded-lg" maxLength={5}/>
                          <input type="text" placeholder="CVV" className="w-full px-4 py-2 border rounded-lg" maxLength={3}/>
                        </div>
                        <input type="text" placeholder="Nama di Kartu" className="w-full px-4 py-2 border rounded-lg"/>
                      </div>
                    </div>
                    <div className="flex items-center mb-4">
                      <input type="checkbox" id="saveCard" className="mr-2"/>
                      <label htmlFor="saveCard" className="text-sm text-gray-600">Simpan kartu untuk pembayaran berikutnya</label>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg mb-4">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Jumlah Pembayaran</span>
                        <span className="font-bold text-blue-600">Rp 299.000</span>
                      </div>
                    </div>
                    <button className="confirm-payment w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold">
                      <i className="fas fa-lock mr-2"></i> Bayar Sekarang
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Processing Modal */}
      <div id="processingModal" className="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
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
      <div id="successModal" className="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl max-w-md w-full p-6 text-center">
          <div className="text-green-500 mb-4">
            <i className="fas fa-check-circle text-5xl"></i>
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
              <span id="successMethod" className="font-medium">QRIS</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Total</span>
              <span id="successAmount" className="font-bold text-blue-600">Rp 299.000</span>
            </div>
          </div>
          <button id="closeSuccessModal" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold">
            Selesai
          </button>
        </div>
      </div>

      {/* Toast Notification */}
      <div id="toast" className="toast">
        <i className="fas fa-copy mr-2"></i> Nomor disalin!
      </div>

      {/* Script Section */}
      <script dangerouslySetInnerHTML={{
        __html: `
          // Global variables
          let selectedPlan = {
            name: "Layanan Premium",
            amount: "299000",
            product: "Layanan Premium 1 Bulan"
          };
          let selectedMethod = null;

          function formatRupiah(amount) {
            return 'Rp' + parseInt(amount).toLocaleString('id-ID');
          }

          document.getElementById('closeModal').addEventListener('click', () => {
            document.getElementById('paymentModal').classList.add('hidden');
            document.body.style.overflow = 'auto';
          });

          document.getElementById('closeSuccessModal').addEventListener('click', () => {
            document.getElementById('successModal').classList.add('hidden');
            document.body.style.overflow = 'auto';
          });

          document.querySelectorAll('.payment-method').forEach(method => {
            method.addEventListener('click', function() {
              const container = this.closest('.payment-method-container');
              const details = container.querySelector('.payment-details');
              const chevron = this.querySelector('i.fa-chevron-down');

              document.querySelectorAll('.payment-details').forEach(d => d.classList.remove('active'));
              document.querySelectorAll('.payment-method i.fa-chevron-down').forEach(icon => icon.classList.remove('rotate-180'));

              details.classList.toggle('active');
              chevron.classList.toggle('rotate-180');
              selectedMethod = this.getAttribute('data-method');
            });
          });

          document.addEventListener('click', function(e) {
            if (e.target.closest('.bank-option')) {
              const option = e.target.closest('.bank-option');
              const container = option.closest('.payment-details');
              const vaNumber = container.querySelector('.va-number');
              const copyBtn = container.querySelector('.copy-btn');

              container.querySelectorAll('.bank-option').forEach(opt => opt.classList.remove('bg-blue-100'));
              option.classList.add('bg-blue-100');

              const bank = option.getAttribute('data-bank');
              const vaNumbers = {
                'bca': '8888801234567890',
                'mandiri': '8888802345678901',
                'bni': '8888803456789012'
              };
              if (vaNumbers[bank]) {
                vaNumber.textContent = vaNumbers[bank];
                copyBtn.setAttribute('onclick', \`copyToClipboard('\${vaNumbers[bank]}', 'Nomor VA')\`);
              }
            }

            if (e.target.closest('.payment-option')) {
              const option = e.target.closest('.payment-option');
              const container = option.closest('.payment-details');

              if (container.querySelector('.ewallet-number')) {
                const ewalletNumber = container.querySelector('.ewallet-number');
                const copyBtn = container.querySelector('.copy-btn');

                container.querySelectorAll('.payment-option').forEach(opt => opt.classList.remove('bg-blue-100'));
                option.classList.add('bg-blue-100');

                const wallet = option.getAttribute('data-wallet');
                const numbers = {
                  'dana': '081234567890',
                  'gopay': '081987654321',
                  'ovo': '082345678901'
                };
                if (numbers[wallet]) {
                  ewalletNumber.textContent = numbers[wallet];
                  copyBtn.setAttribute('onclick', \`copyToClipboard('\${numbers[wallet]}', 'Nomor e-wallet')\`);
                }
              }

              if (container.querySelector('.retail-code')) {
                const retailCode = container.querySelector('.retail-code');
                const copyBtn = container.querySelector('.copy-btn');

                container.querySelectorAll('.payment-option').forEach(opt => opt.classList.remove('bg-blue-100'));
                option.classList.add('bg-blue-100');

                const retail = option.getAttribute('data-retail');
                const codes = {
                  'alfamart': 'ALFA' + Math.floor(100000 + Math.random() * 900000),
                  'indomaret': 'INDO' + Math.floor(100000 + Math.random() * 900000)
                };
                if (codes[retail]) {
                  retailCode.textContent = codes[retail];
                  copyBtn.setAttribute('onclick', \`copyToClipboard('\${codes[retail]}', 'Kode pembayaran')\`);
                }
              }
            }

            if (e.target.closest('.confirm-payment')) {
              processPayment();
            }
          });

          function processPayment() {
            document.getElementById('paymentModal').classList.add('hidden');
            document.getElementById('processingModal').classList.remove('hidden');
            setTimeout(() => {
              document.getElementById('loadingBar').style.width = '100%';
            }, 100);
            setTimeout(() => {
              document.getElementById('processingModal').classList.add('hidden');
              document.getElementById('successAmount').textContent = formatRupiah(selectedPlan.amount);
              document.getElementById('successMethod').textContent = getMethodName(selectedMethod);
              document.getElementById('invoiceNumber').textContent = 'INV-' + Math.floor(1000 + Math.random() * 9000);
              document.getElementById('successModal').classList.remove('hidden');
            }, 1500);
          }

          function getMethodName(method) {
            const methods = {
              'qris': 'QRIS',
              'virtual_account': 'Virtual Account',
              'bank_transfer': 'Transfer Bank',
              'ewallet': 'E-Wallet',
              'retail': 'Retail',
              'credit_card': 'Kartu Kredit'
            };
            return methods[method] || 'Pembayaran';
          }

          function copyToClipboard(text, label) {
            navigator.clipboard.writeText(text).then(() => {
              showToast(\`\${label} disalin!\`);
            }).catch(err => {
              console.error('Gagal menyalin: ', err);
            });
          }

          function showToast(message) {
            const toast = document.getElementById('toast');
            toast.innerHTML = \`<i class="fas fa-copy mr-2"></i> \${message}\`;
            toast.style.display = 'flex';
            setTimeout(() => {
              toast.style.display = 'none';
            }, 2000);
          }
        `
      }} />
    </section>
  );
};

export default Pricing;
