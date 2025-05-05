interface TargetInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const TargetInput: React.FC<TargetInputProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-2">
      <label className="text-white text-sm font-medium">Target Link/Username</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter your target link or username"
        className="w-full bg-[#1C2526]/80 text-white border border-[#1C2526] rounded-lg p-3 focus:ring-2 focus:ring-[#1E90FF] transition-all duration-300"
      />
    </div>
  );
};