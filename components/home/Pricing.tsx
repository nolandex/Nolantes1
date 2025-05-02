"use client";

import { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Link,
  Spacer,
} from "@nextui-org/react";
import { siteConfig } from "@/config/site";
import { ALL_TIERS } from "@/config/tiers";
import { FaCheck } from "react-icons/fa";
import { RoughNotation } from "react-rough-notation";
import { TiersEnum } from "@/types/pricing";

// Define TypeScript interface for props
interface PricingProps {
  id: string;
  locale: {
    title: string;
    title2: string;
    description: string;
    doYouLike: string;
    follow: string;
  };
  langName: string;
}

const Pricing = ({ id, locale, langName }: PricingProps) => {
  const [activeTab, setActiveTab] = useState<"setup" | "website">("setup");
  const TIERS = ALL_TIERS[`TIERS_${langName.toUpperCase()}`];
  const whatsappLink =
    "https://wa.me/6285156779923?text=Hi%2C%20I'm%20interested%20in%20your%20business%20setup%20services";

  // Filter tier berdasarkan activeTab
  const selectedTier = TIERS?.find(
    (tier: any) =>
      tier.key === (activeTab === "setup" ? TiersEnum.Free : TiersEnum.Customize)
  );

  // Debugging logs
  console.log("langName:", langName);
  console.log("activeTab:", activeTab);
  console.log("TIERS:", TIERS);
  console.log("selectedTier:", selectedTier);

  return (
    <section
      id={id}
      className="flex flex-col justify-center max-w-3xl items-center pt-12"
    >
      <div className="flex flex-col text-center max-w-lg">
        <h2 className="text-center text-white">
          <RoughNotation type="highlight" show={true} color="#2563EB">
            {locale.title}
          </RoughNotation>
        </h2>
        <h3 className="text-3xl font-medium tracking-tight mt-2">
          {locale.title2}
        </h3>
        <Spacer y={3} />
        <p className="text-medium text-default-500">{locale.description}</p>
      </div>
      <Spacer y={6} />
      <div className="w-[85%] max-w-lg">
        {selectedTier ? (
          <Card
            key={selectedTier.key}
            className="p-2 bg-gradient-to-br from-gray-900 to-gray-800 rounded-[8px]"
            shadow="md"
            radius="md"
          >
            <CardHeader className="flex flex-col items-start gap-1 pb-0">
              {/* Tab Navigation */}
              <div className="flex w-full border-b border-gray-700">
                <button
                  onClick={() => setActiveTab("setup")}
                  className={`flex-1 py-2 text-sm font-medium text-center transition-colors duration-200 ${
                    activeTab === "setup"
                      ? "text-blue-400 border-b-2 border-blue-400"
                      : "text-gray-400 hover:text-gray-200"
                  }`}
                >
                  {langName === "en" ? "Setup" : "Free"}
                </button>
                <button
                  onClick={() => setActiveTab("website")}
                  className={`flex-1 py-2 text-sm font-medium text-center transition-colors duration-200 ${
                    activeTab === "website"
                      ? "text-blue-400 border-b-2 border-blue-400"
                      : "text-gray-400 hover:text-gray-200"
                  }`}
                >
                  {langName === "en" ? "Website" : "Custom"}
                </button>
              </div>
              {/* Tier Title and Description */}
              <div className="pt-4">
                <h2 className="text-medium font-medium text-white">
                  {selectedTier.title || "Untitled"}
                </h2>
                <p className="text-sm text-gray-400">
                  {selectedTier.description || "No description"}
                </p>
              </div>
            </CardHeader>
            <Divider className="bg-gray-700" />
            <CardBody className="gap-6">
              <p className="flex items-baseline gap-1 pt-2">
                <span className="inline bg-gradient-to-br from-white to-gray-400 bg-clip-text text-xl font-semibold leading-7 tracking-tight text-transparent">
                  {selectedTier.price || "N/A"}
                </span>
              </p>
              <ul className="flex flex-col gap-1">
                {selectedTier.features && selectedTier.features.length > 0 ? (
                  selectedTier.features.map((feature: string) => (
                    <li key={feature} className="flex items-center gap-2">
                      <FaCheck className="text-blue-500" />
                      <p className="text-sm text-gray-400">{feature}</p>
                    </li>
                  ))
                ) : (
                  <li className="text-sm text-gray-400">
                    No features available
                  </li>
                )}
              </ul>
            </CardBody>
            <CardFooter>
              <Button
                fullWidth
                as={Link}
                color={selectedTier.buttonColor || "primary"}
                href={whatsappLink}
                variant={selectedTier.buttonVariant || "solid"}
                target="_blank"
                rel="noopener noreferrer nofollow"
                radius="md"
                className="bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-[8px] hover:from-blue-700 hover:to-blue-600 transition-all duration-200"
              >
                {selectedTier.buttonText || "Buy"}
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <p className="text-red-500">
            No pricing data available for {activeTab}.
          </p>
        )}
      </div>
      <Spacer y={10} />
      <div className="flex py-2">
        <p className="text-gray-500 text-center">
          {locale.doYouLike}{" "}
          <Link
            color="foreground"
            href={siteConfig.authors[0].twitter}
            underline="always"
            rel="noopener noreferrer nofollow"
          >
            {locale.follow}
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Pricing;
