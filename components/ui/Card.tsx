import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        "backdrop-blur-md bg-[#1C2526]/80 border border-[#1C2526] rounded-xl p-6 shadow-lg transition-all duration-300",
        className
      )}
    >
      {children}
    </div>
  );
};