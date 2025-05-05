interface PayNowButtonProps {
  onClick: () => void;
}

export const PayNowButton: React.FC<PayNowButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full bg-[#1E90FF] text-white font-semibold py-3 rounded-lg hover:bg-[#00A3E0] transition-all duration-300"
    >
      Pay Now
    </button>
  );
};