import { cn } from "@/lib/utils";

interface DropdownProps {
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  label,
  options,
  value,
  onChange,
  className,
}) => {
  return (
    <div className={cn("space-y-2", className)}>
      <label className="text-white text-sm font-medium">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-[#1C2526]/80 text-white border border-[#1C2526] rounded-lg p-3 focus:ring-2 focus:ring-[#1E90FF] transition-all duration-300"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} className="text-white">
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};