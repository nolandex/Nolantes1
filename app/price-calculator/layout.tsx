import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function PriceCalculatorLayout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background text-text flex flex-col">
      <main className="flex-grow">{children}</main>
    </div>
  );
}
