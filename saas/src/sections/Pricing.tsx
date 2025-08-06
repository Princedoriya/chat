"use client";

import React from "react";
import { CheckCircle } from "lucide-react";

interface Plan {
  title: string;
  price: string;
  description: string;
  features: string[];
  highlight?: boolean;
}

const plans: Plan[] = [
  {
    title: "Intro",
    price: "$19",
    description:
      "Ideal for startups and small teams looking to streamline marketing efforts",
    features: [
      "Access to limited ad space categories",
      "Basic analytics dashboard",
      "Chat support",
      "Optimize hashtags",
      "Unlimited users",
    ],
  },
  {
    title: "Popular",
    price: "$99",
    description:
      "Best suited for growing businesses aiming to scale marketing performance.",
    features: [
      "Access to all ad space categories",
      " Full-featured analytics platform",
      "Priority chat & email support",
      "Advanced hashtag and trend insights",
      "Unlimited team members",
    ],
    highlight: true,
  },
  {
    title: "Enterprise",
    price: "$199",
    description:
      "Designed for large teams and agencies managing end-to-end campaigns.",
    features: [
      "Unlimited access to all ad media types (ATL, BTL, OOH, Digital)",
      "Own analytics platform",
      "Dedicated account manager",
      "Hashtag & keyword optimization suite",
      "Unlimited users with team roles",
    ],
  },
];

const Pricing: React.FC = () => {
  return (
    <section
      id="pricing"
      className="w-full bg-cover bg-center bg-fixed bg-no-repeat px-4 py-16"
      style={{
        backgroundImage: "url('/images/backhero.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        borderRadius: "1rem",
        overflow: "hidden",
      }}
    >
      <div className="flex justify-center border-1 max-w-sm p-2 mx-auto border-lime-400 rounded-full">
        <p>Pricing</p>
      </div>
      <h2 className="text-5xl font-medium text-center mt-9 mb-24">
        Find the right Plan for{" "}
        <span className="text-lime-400">your project</span>
      </h2>
      <div className="max-w-7xl mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`rounded-2xl border border-white/20 bg-white/10 backdrop-blur-sm p-6 transition-transform duration-300 ${
              plan.highlight ? "-mt-4 mb-4" : ""
            }`}
          >
            <p className="text-lg font-semibold text-white">{plan.title}</p>
            <h4 className="mt-2 text-4xl font-bold text-white">
              {plan.price}
              <span className="ml-1 text-base font-medium text-gray-300">
                / Month
              </span>
            </h4>
            <p className="mt-4 text-sm text-gray-200">{plan.description}</p>

            <div className="mt-6 space-y-4">
              {plan.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-3 text-gray-300">
                  <CheckCircle className="w-5 h-5 font-bold text-lime-400" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <button className="mt-8 w-full rounded-lg bg-lime-400 px-4 py-2 text-black font-medium transition duration-300 hover:bg-lime-600">
              Choose plan
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Pricing;
