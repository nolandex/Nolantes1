interface PriceDisplayProps {
  price: number;
}

export const PriceDisplay: React.FC<PriceDisplayProps> = ({ price }) => {
  return (
    <div className="text-center">
      <p className="text-white text-sm">Estimated Price</p>
      <p className="text-3xl font-bold text-[#1E90FF]">
        Rp {price.toLocaleString()}
      </p>
    </div>
  );
};