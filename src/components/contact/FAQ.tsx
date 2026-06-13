"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RiAddLine, RiSubtractLine } from "react-icons/ri";

const faqs = [
  {
    key: "signup",
    question: "How to sign up?",
    answer:
      "Signing up is simple! Just click on the \"Sign Up\" button at the top right corner of the homepage. You'll need to provide your email address or you can use the other platform for sign-up as well.",
  },
  {
    key: "search",
    question: "How to search for movies and shows?",
    answer:
      "You can search for movies, TV shows, and other content by using the search bar located at the top of every page. Type in a title or keyword, and our search engine will display relevant results instantly.",
  },
  {
    key: "watch",
    question: "How to watch content?",
    answer:
      "Once you find a movie or show you're interested in, click on it to view more details. If it's available for streaming you'll see the platforms where it's accessible.",
  },
  {
    key: "create-list",
    question: "How to create a watchlist?",
    answer:
      "After logging in, you can create a personalized watchlist by adding movies and shows to it. Simply click on the \"Add to Watchlist\" button on any movie or show's detail page.",
  },
  {
    key: "contact",
    question: "How to contact us?",
    answer:
      "If you have any questions or need support, you can contact us through the \"Contact Us\" page. Fill out the form with your inquiry, and our team will get back to you as soon as possible.",
  },
  {
    key: "rate",
    question: "Can I rate movies and shows?",
    answer:
      "At this time our platform does not support a rating system. However, we are working on adding this feature in the future. Stay tuned for updates!",
  },
];

const FAQ = () => {
  const [openKey, setOpenKey] = useState<string | null>(null);

  return (
    <section className="py-20 px-6 lg:px-16 max-w-site mx-auto">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Left */}
        <div className="lg:w-1/3">
          <div className="eyebrow mb-3">FAQ</div>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-text leading-tight mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-text-2 text-sm leading-relaxed">
            Find answers to common questions and get quick information.
          </p>
        </div>

        {/* Right — accordion */}
        <div className="lg:w-2/3 flex flex-col gap-3">
          {faqs.map((faq, idx) => (
            <motion.div
              key={faq.key}
              className="card rounded-2xl"
              initial={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.35, delay: idx * 0.05 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <button
                className="w-full flex items-center justify-between px-5 py-4 text-left cursor-pointer hover:bg-surface-2 transition-colors duration-200"
                onClick={() => setOpenKey(openKey === faq.key ? null : faq.key)}
              >
                <span className="text-sm font-semibold text-text">
                  {faq.question}
                </span>
                <span className="ml-4 flex-shrink-0 text-accent">
                  {openKey === faq.key ? (
                    <RiSubtractLine size={18} />
                  ) : (
                    <RiAddLine size={18} />
                  )}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {openKey === faq.key && (
                  <motion.div
                    animate={{ height: "auto", opacity: 1 }}
                    className="overflow-hidden"
                    exit={{ height: 0, opacity: 0 }}
                    initial={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                  >
                    <p className="px-5 pb-4 text-sm text-text-2 leading-relaxed border-t border-border pt-3">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
