import FeatureCard from "@/components/FeatureCard";
import {
  Store,
  LineChart,
  LayoutDashboard,
  KeyRound,
  SatelliteDish,
  Smartphone,
} from "lucide-react";

const features = [
  "Multi-User Access",
  "Advanced Analytics",
  "Automation",
  "Ad Campaign Manager",
  "Media Integration",
];

export default function Features() {
  return (
    <section id="features" className="pt-24 pb-8">
      <div className="container">
        <div className="flex justify-center border-1 max-w-sm p-2 mx-auto border-lime-400 rounded-full">
          <p>Features</p>
        </div>
        <h2 className="text-6xl font-medium text-center mt-6">
          Where power meet <span className="text-lime-400">simplicity</span>
        </h2>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 px-16 gap-8">
          <FeatureCard
            icon={Store}
            title="One-Stop Ad Marketplace"
            description="Explore over 10 million+ ad spaces in one place. From hoardings and digital screens to social media and TV, book the ideal ad space for your campaign in just a few clicks—without middlemen or multiple logins."
          />
          <FeatureCard
            icon={LineChart}
            title="Smart Analytics & Filters"
            description="Make data-driven decisions with intelligent filters, heatmaps, and ROI-focused campaign analytics. Choose the most effective ad space for your target audience and track performance effortlessly."
          />
          <FeatureCard
            icon={LayoutDashboard}
            title="End-to-End Campaign Management"
            description="Plan, book, execute, and manage all your ATL and BTL campaigns from one dashboard. ADmyBRAND simplifies your entire marketing lifecycle—from brief to delivery and analysis—across all channels and geographies."
          />
          <FeatureCard
            icon={KeyRound}
            title="Universal Login & White Label Access"
            description="Use a single login to access and manage all your campaigns, even across different brands or white-label portals. Sell or manage ads under your own identity with full privacy and ease."
          />
          <FeatureCard
            icon={SatelliteDish}
            title="Omnichannel Ad Coverage"
            description="Book ads across outdoor, digital, print, mobile, influencer, radio, and TV platforms—all from one portal. ADmyBRAND bridges the gap between programmatic efficiency and traditional media reach."
          />
          <FeatureCard
            icon={Smartphone}
            title="Mobile-First Experience"
            description="Download the ADify App to manage campaigns anytime, anywhere. Track performance, approve creatives, and receive real-time updates—all in your pocket."
          />
        </div>
        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          {features.map((feature) => (
            <div
              key={feature}
              className="bg-neutral-900 border border-white/10 inline-flex px-3 py-1.5 rounded-2xl gap-3 items-center hover:scale-105 transition duration-500 group"
            >
              <span className="bg-lime-400 text-neutral-950 size-5 rounded-full inline-flex items-center justify-center text-xl group-hover:rotate-45 transition duration-500">
                &#10038;
              </span>
              <span className="font-medium">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
