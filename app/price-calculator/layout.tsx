import { ReactNode } from "react";
import { GoogleAnalytics } from "@/config/GoogleAnalytics";
import { BaiDuAnalytics } from "@/config/BaiDuAnalytics";

interface LayoutProps {
  children: ReactNode;
}

export default function PriceCalculatorLayout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background text-text flex flex-col">
      <GoogleAnalytics />
      <BaiDuAnalytics />
      <main className="flex-grow">{children}</main>
    </div>
  );
}