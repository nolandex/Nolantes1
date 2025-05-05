import { Slider } from "../ui/Slider";

interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  value,
  onChange,
}) => {
  return (
    <div className="space-y-2">
      <label className="text-white text-sm font-medium">
        Quantity: {value / 1000}K
      </label>
      <Slider
        min={1000}
        max={10000}
        step={1000}
        value={value}
        onChange={onChange}
        className="w-full"
      />
    </div>
  );
};