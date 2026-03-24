"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const companies = [
  { name: "Vodafone", src: "/images/vodafone-c1.png" },
  { name: "Intel", src: "/images/intel-c2.png" },
  { name: "Tesla", src: "/images/tesla-c3.png" },
  { name: "AMD", src: "/images/amd-c4.png" },
  { name: "Talkit", src: "/images/talkit-c5.png" },
];

export default function CompaniesSection() {
  return (
    <section className="bg-white py-12 px-5 sm:px-8 lg:px-[124px] overflow-hidden">
      <div className="max-w-[1240px] mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-[17px] text-[#202430]/50 mb-8"
        >
          Companies we helped grow
        </motion.p>
        
        {/* Marquee Container with fade edge masks */}
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />
          
          <div className="flex overflow-hidden">
            <motion.div
              initial={{ x: 0 }}
              animate={{ x: "-50%" }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear",
              }}
              className="flex items-center gap-16 sm:gap-24 whitespace-nowrap"
            >
              {/* Double the list for seamless loop */}
              {[...companies, ...companies].map((company, i) => (
                <div
                  key={i}
                  className="flex items-center justify-center min-w-[120px] opacity-100 transition-all duration-300"
                >
                  <Image
                    src={company.src}
                    alt={company.name}
                    width={140}
                    height={48}
                    className="h-8 w-auto object-contain"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
