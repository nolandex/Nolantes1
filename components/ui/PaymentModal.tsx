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

  // ... rest of the component remains the same ...
  return (
    // ... existing JSX ...
  );
};

export default PaymentModal;
