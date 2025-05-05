import CTA from "@/components/home/CTA";
import FAQ from "@/components/home/FAQ";
import Feature from "@/components/home/Feature";
import Hero from "@/components/home/Hero";
import Pricing from "@/components/home/Pricing";
import ScrollingLogos from "@/components/home/ScrollingLogos";
import SocialProof from "@/components/home/SocialProof";
import Testimonials from "@/components/home/Testimonials";
import DynamicCalculator from "@/components/home/DynamicCalculator"; // Tambahkan ini
import { defaultLocale, getDictionary } from "@/lib/i18n";

export default async function HomeIndex({ lang }: { lang: string }) {
  const langName = lang || defaultLocale;
  const dict = await getDictionary(langName);

  return (
    <>
      {/* Hero Section */}
      <Hero locale={dict.Hero} langName={langName} CTALocale={dict.CTAButton} />
      <SocialProof locale={dict.SocialProof} />
      <ScrollingLogos />

      {/* USP (Unique Selling Proposition) */}
      <Feature id="Features" locale={dict.Feature} langName={langName} />

      {/* Pricing */}
      <Pricing id="Pricing" locale={dict.Pricing} langName={langName} />

      {/* Testimonials */}
      <Testimonials id="Testimonials" locale={dict.Testimonials} />

      {/* FAQ */}
      <FAQ id="FAQ" locale={dict.FAQ} langName={langName} />

      {/* CTA */}
      <CTA locale={dict.CTA} CTALocale={dict.CTAButton} />

      {/* Dynamic Calculator Section */}
      <DynamicCalculator />
    </>
  );
}
