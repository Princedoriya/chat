"use client";

import { twMerge } from "tailwind-merge";
import { useState } from "react";
import { AnimatePresence,motion } from "framer-motion";

const faqs = [
  {
    question: "What is the purpose of this SaaS application?",
    answer:
      "This SaaS application is designed to provide users with a platform for managing their tasks and projects efficiently, offering features like real-time collaboration, task tracking, and reporting.",
  },
  {
    question: "How do I create an account?",
    answer:
      "To create an account, click on the 'Sign Up' button on the homepage, fill in the required details, and follow the instructions to complete your registration.",
  },
  {
    question: "What are the pricing plans available?",
    answer:
      "We offer several pricing plans to suit different needs, including a free tier with basic features, and premium plans that unlock advanced functionalities. You can view the full pricing details on our 'Pricing' page.",
  },
  {
    question: "How can I reset my password?",
    answer:
      "If you forget your password, you can reset it by clicking on the 'Forgot Password?' link on the login page. Follow the instructions sent to your registered email to set a new password.",
  },
  {
    question: "Is there a mobile app available?",
    answer:
      "Yes, we have a mobile app available for both iOS and Android devices, allowing you to manage your tasks and projects on the go.",
  },
];

export default function Faqs() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <section id="faqs" className="py-24">
      <div className="container">
        <h2 className="text-6xl font-medium text-center max-w-2xl mx-auto">
          Questions? We&apos;ve got{" "}
          <span className="text-lime-400">answers</span>
        </h2>
        <div className="mt-12 flex flex-col gap-6 max-w-5xl mx-auto">
          {faqs.map((faq, faqIndex) => (
            <div
              key={faq.question}
              className="bg-neutral-900 border border-white/10 p-6 rounded-2xl"
              onClick={() => setSelectedIndex(faqIndex)}
            >
              <div className="flex justify-between items-center">
                <h3 className="font-medium">{faq.question}</h3>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  id="IconChangeColor"
                  height="24"
                  width="24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={twMerge(
                    "feather feather-plus text-lime-400 flex-shrink-0 transition duration-300",
                    selectedIndex === faqIndex && "rotate-45"
                  )}
                >
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </div>
              <AnimatePresence>
              {selectedIndex === faqIndex && (
              <motion.div
                initial={{ height: 0,marginTop: 0, }}
                animate={{ height: "auto",marginTop: 24, }}
                exit={{ height: 0,marginTop: 0, }}
                className={twMerge(
                  "overflow-hidden", 
                )}
              >
                <p className="text-white/50">{faq.answer}</p>
              </motion.div>
              )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
