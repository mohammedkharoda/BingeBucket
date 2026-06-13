"use client";

import React from "react";
import { motion } from "framer-motion";
import { RiSparklingFill } from "react-icons/ri";

const DiscoverAboutUs = () => {
  return (
    <section className="py-20 px-6 lg:px-16 max-w-site mx-auto">
      <div className="grid items-center gap-8 lg:grid-cols-[minmax(320px,0.95fr)_minmax(460px,1.15fr)] lg:gap-12">
        {/* Left */}
        <motion.div
          className="flex flex-col gap-5 lg:max-w-[520px]"
          initial={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, x: 0 }}
        >
          <div className="eyebrow w-fit">
            <RiSparklingFill size={12} />
            Discover
          </div>
          <h1 className="text-4xl lg:text-6xl font-extrabold text-text leading-[1.04] tracking-tight">
            Unleash the <span className="text-gradient">Magic</span>
          </h1>
        </motion.div>

        {/* Right */}
        <motion.div
          className="w-full flex flex-col gap-6"
          initial={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, x: 0 }}
        >
          <p className="text-text-2 text-base md:text-[18px] leading-[1.6] lg:text-center">
            Welcome to BingeBucket, where you can explore a world of captivating
            movies and series. Our mission is to provide you with a refined and
            enhanced experience — like IMDB, but more personal. With a vast
            collection of films and shows, we bring you the best entertainment
            available.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default DiscoverAboutUs;
