import { calculatorConfig } from "@/config/calculator";
import { Dropdown } from "../ui/Dropdown";

interface PlatformSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export const PlatformSelector: React.FC<PlatformSelectorProps> = ({
  value,
  onChange,
}) => {
  const options = calculatorConfig.platforms.map((platform) => ({
    value: platform.name,
    label: platform.name,
  }));

  return (
    <Dropdown
      label="Select Platform"
      options={options}
      value={value}
      onChange={onChange}
      className="w-full"
    />
  );
};