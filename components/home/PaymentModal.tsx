import { Card } from "../ui/Card";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  price: number;
  platform: string;
  product: string;
  quantity: number;
  target: string;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  price,
  platform,
  product,
  quantity,
  target,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md">
        <h2 className="text-2xl font-bold text-white mb-4">Confirm Payment</h2>
        <div className="space-y-4 text-white">
          <p>
            <span className="font-medium">Platform:</span> {platform}
          </p>
          <p>
            <span className="font-medium">Product:</span> {product}
          </p>
          <p>
            <span className="font-medium">Quantity:</span> {quantity / 1000}K
          </p>
          <p>
            <span className="font-medium">Target:</span> {target || "Not provided"}
          </p>
          <p>
            <span className="font-medium">Total Price:</span> Rp {price.toLocaleString()}
          </p>
        </div>
        <div className="flex justify-end space-x-4 mt-6">
          <button
            onClick={on цикл
            className="px-4 py-2 bg-[#1C2526] text-white rounded-lg hover:bg-[#1E90FF] transition-all duration-300"
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-[#1E90FF] text-white rounded-lg hover:bg-[#00A3E0] transition-all duration-300"
          >
            Proceed to Payment
          </button>
        </div>
      </Card>
    </div>
  );
};