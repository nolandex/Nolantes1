import { cn } from "@/lib/utils";

interface SliderProps {
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
  className?: string;
}

export const Slider: React.FC<SliderProps> = ({
  min,
  max,
  step,
  value,
  onChange,
  className,
}) => {
  return (
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className={cn(
        "w-full h-2 bg-[#1C2526] rounded-lg appearance-none cursor-pointer accent-[#1E90FF]",
        className
      )}
    />
  );
};