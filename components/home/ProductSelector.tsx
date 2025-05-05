import { calculatorConfig } from "@/config/calculator";
import { Dropdown } from "../ui/Dropdown";

interface ProductSelectorProps {
  platform: string;
  value: string;
  onChange: (value: string) => void;
}

export const ProductSelector: React.FC<ProductSelectorProps> = ({
  platform,
  value,
  onChange,
}) => {
  const selectedPlatform = calculatorConfig.platforms.find(
    (p) => p.name === platform
  );
  const options = selectedPlatform?.products.map((product) => ({
    value: product.name,
    label: product.name,
  })) || [];

  return (
    <Dropdown
      label="Select Product"
      options={options}
      value={value}
      onChange={onChange}
      className="w-full"
    />
  );
};