"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Star } from "lucide-react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

interface Review {
  name: string;
  message: string;
  avatar: string;
  time: string;
}

const reviews: Review[] = [
  {
    name: "Jenny Black",
    message:
      "ADmyBRAND completely changed how we handle our marketing campaigns. Instead of juggling multiple platforms and agents, we now manage everything from one dashboard. Booking ad spaces is seamless and takes minutes—not hours. Highly recommend for marketing teams who value efficiency.",
    avatar: "/images/avatar1.jpg",
    time: "2 weeks ago",
  },
  {
    name: "Jenny Berth",
    message:
      "We used to rely heavily on agencies, but ADmyBRAND gave us back control.The platform's real-time tracking and performance reports helped us optimize ad spends and justify every rupee with data. It's like having a virtual assistant for marketing!",
    avatar: "/images/avatar2.jpg",
    time: "2 weeks ago",
  },
  {
    name: "Curly Smith",
    message:
      "I no longer need to manage 10 different passwords or contact dozens of agents.With the Universal Login, campaign booking is quick and stress-free. The entire experience feels like it was built for marketers, by marketers.",
    avatar: "/images/avatar3.jpg",
    time: "2 weeks ago",
  },
  {
    name: "Rocky Johnson",
    message:
      "What impressed me most was the data-driven recommendations. ADmyBRAND’s filters and heat maps helped us choose the right ad spots, and the ROI spoke for itself. We saved both time and money—without compromising on reach or visibility.",
    avatar: "/images/avatar4.jpg",
    time: "2 weeks ago",
  },
];

export default function CustomerReviews() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      containScroll: "trimSnaps",
    },
    [Autoplay({ delay: 4000 })]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section id="reviews" className="w-full bg-black py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-white text-4xl font-bold mb-8 text-center">
          Customer Reviews
        </h2>

        <div className="relative">
          <div className="overflow-hidden rounded-lg" ref={emblaRef}>
            <div className="flex">
              {reviews.map((review, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 px-3"
                >
                  <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-xl text-white shadow-lg h-full">
                    <div className="flex items-center space-x-4 mb-4">
                      <Image
                        src={review.avatar}
                        alt={review.name}
                        width={48}
                        height={48}
                        className="rounded-full object-cover border border-white/20"
                      />
                      <div>
                        <p className="text-lg font-semibold">{review.name}</p>
                        <div className="flex text-lime-400">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-4 h-4 fill-lime-400 stroke-lime-400"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-300 mb-4">
                      {review.message}
                    </p>
                    <div className="flex items-center text-sm text-blue-400 space-x-2">
                      <span>{review.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center items-center mt-6 space-x-2">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === selectedIndex
                    ? "bg-white w-8"
                    : "bg-white/40 hover:bg-white/60"
                }`}
                aria-label={`Go to review ${index + 1}`}
              />
            ))}
          </div>

          {/* Review count indicator */}
          <div className="text-center mt-4">
            <span className="text-white/60 text-sm">
              {selectedIndex + 1} of {reviews.length} reviews
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
