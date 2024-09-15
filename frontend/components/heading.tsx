"use client";

import { motion } from "framer-motion";
import React from "react";
import { cn } from "~/lib/utils";

interface HeadingProps {
  title: string;
  subtitle: string;
}

const Heading: React.FC<HeadingProps> = ({ title, subtitle }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeInOut", delay: 0.2 }}
      className="flex flex-col justify-center items-center mb-10 xl:mb-12 2xl:mb-14"
    >
      <h2
        className={cn(
          "text-2xl lg:text-3xl 2xl:text-4xl font-bold text-purple-950"
        )}
      >
        {title}
      </h2>
      <p className="font-light">{subtitle}</p>
    </motion.div>
  );
};

export default Heading;
