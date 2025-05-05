import Link from "next/link";
import { Card } from "@/components/ui/Card";

export default function NotFound() {
  return (
    <section className="min-h-screen bg-background flex items-center justify-center py-12">
      <Card className="w-full max-w-md text-center">
        <h1 className="text-4xl font-bold text-white mb-4">404 - Page Not Found</h1>
        <p className="text-white mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/price-calculator"
          className="inline-block bg-primary text-white font-semibold py-2 px-4 rounded-lg hover:bg-secondary transition-all duration-300"
        >
          Back to Price Calculator
        </Link>
      </Card>
    </section>
  );
}