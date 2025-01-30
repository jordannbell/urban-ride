import React from 'react';
import { motion } from 'framer-motion';
import { X, CreditCard, Banknote } from 'lucide-react';

interface PaymentModalProps {
  onClose: () => void;
  amount: number;
}

export function PaymentModal({ onClose, amount }: PaymentModalProps) {
  const handlePayment = (method: string) => {
    console.log(`Paiement par ${method}`);
    // Intégration du paiement ici
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-xl shadow-xl max-w-md w-full"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Paiement</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="mb-6">
            <p className="text-lg text-gray-600">Montant total :</p>
            <p className="text-3xl font-bold text-gray-900">{amount.toFixed(2)} €</p>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => handlePayment('carte')}
              className="w-full flex items-center justify-between p-4 border border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors"
            >
              <div className="flex items-center">
                <CreditCard className="h-6 w-6 text-purple-600 mr-3" />
                <span className="font-medium">Carte bancaire</span>
              </div>
              <span className="text-gray-500">Visa, Mastercard</span>
            </button>

            <button
              onClick={() => handlePayment('paypal')}
              className="w-full flex items-center justify-between p-4 border border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors"
            >
              <div className="flex items-center">
                <svg className="h-6 w-6 mr-3" viewBox="0 0 24 24" fill="none">
                  <path d="M20.5 6.5C20.5 9.77 17.77 12.5 14.5 12.5H11.5L10.5 18.5H6.5L8.5 6.5H14.5C17.77 6.5 20.5 9.23 20.5 12.5Z" fill="#002C8A"/>
                  <path d="M16.5 3.5C16.5 6.77 13.77 9.5 10.5 9.5H7.5L6.5 15.5H2.5L4.5 3.5H10.5C13.77 3.5 16.5 6.23 16.5 9.5Z" fill="#009BE1"/>
                </svg>
                <span className="font-medium">PayPal</span>
              </div>
              <span className="text-gray-500">Paiement sécurisé</span>
            </button>

            <button
              onClick={() => handlePayment('especes')}
              className="w-full flex items-center justify-between p-4 border border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors"
            >
              <div className="flex items-center">
                <Banknote className="h-6 w-6 text-purple-600 mr-3" />
                <span className="font-medium">Espèces</span>
              </div>
              <span className="text-gray-500">Paiement au chauffeur</span>
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}