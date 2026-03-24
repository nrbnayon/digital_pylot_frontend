import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// Exact SVG icons matching the design image
const DesignIcon = ({ active }: { active: boolean }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_54_661)">
      <path d="M6 42.0001H14L40 16.0001C41.0609 14.9393 41.6569 13.5004 41.6569 12.0001C41.6569 10.4998 41.0609 9.06098 40 8.00012C38.9391 6.93925 37.5003 6.34326 36 6.34326C34.4997 6.34326 33.0609 6.93925 32 8.00012L6 34.0001V42.0001Z" stroke={active ? "white" : "#4640DE"} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M29 11L37 19" stroke={active ? "white" : "#4640DE"} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M24 16L14 6L6 14L16 24" stroke={active ? "white" : "#4640DE"} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M14 16L11 19" stroke={active ? "white" : "#4640DE"} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M32 24L42 34L34 42L24 32" stroke={active ? "white" : "#4640DE"} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M32 34L29 37" stroke={active ? "white" : "#4640DE"} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    </g>
    <defs>
      <clipPath id="clip0_54_661">
        <rect width="48" height="48" fill="white"/>
      </clipPath>
    </defs>
  </svg>
);

const SalesIcon = ({ active }: { active: boolean }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 22C18.4183 22 22 18.4183 22 14C22 9.58172 18.4183 6 14 6C9.58172 6 6 9.58172 6 14C6 18.4183 9.58172 22 14 22Z" stroke={active ? "white" : "#4640DE"} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 6V14H22" stroke={active ? "white" : "#4640DE"} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M18 34V42" stroke={active ? "white" : "#4640DE"} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M34 28V42" stroke={active ? "white" : "#4640DE"} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M26 26V42" stroke={active ? "white" : "#4640DE"} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M42 24V42" stroke={active ? "white" : "#4640DE"} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const MarketingIcon = ({ active }: { active: boolean }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21.9999 11.764V38.48C21.9993 39.3089 21.7062 40.1111 21.1722 40.7451C20.6382 41.3791 19.8976 41.8043 19.0808 41.9458C18.2641 42.0873 17.4236 41.936 16.7074 41.5186C15.9912 41.1012 15.4453 40.4444 15.1659 39.664L10.8719 27.364M35.9999 26C37.5912 26 39.1174 25.3679 40.2426 24.2426C41.3678 23.1174 41.9999 21.5913 41.9999 20C41.9999 18.4087 41.3678 16.8826 40.2426 15.7574C39.1174 14.6321 37.5912 14 35.9999 14V26ZM10.8719 27.366C9.17437 26.6442 7.7783 25.3581 6.91999 23.7253C6.06168 22.0925 5.79385 20.2134 6.16181 18.4058C6.52976 16.5982 7.51092 14.9733 8.93924 13.806C10.3676 12.6387 12.1553 12.0007 13.9999 12H17.6639C25.8639 12 32.9139 9.532 35.9999 6V34C32.9139 30.468 25.8659 28 17.6639 28H13.9999C12.9252 28.0016 11.8612 27.7859 10.8719 27.366Z" stroke={active ? "white" : "#4640DE"} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const FinanceIcon = ({ active }: { active: boolean }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M34 18V14C34 12.9391 33.5786 11.9217 32.8284 11.1716C32.0783 10.4214 31.0609 10 30 10H10C8.93913 10 7.92172 10.4214 7.17157 11.1716C6.42143 11.9217 6 12.9391 6 14V26C6 27.0609 6.42143 28.0783 7.17157 28.8284C7.92172 29.5786 8.93913 30 10 30H14M18 38H38C39.0609 38 40.0783 37.5786 40.8284 36.8284C41.5786 36.0783 42 35.0609 42 34V22C42 20.9391 41.5786 19.9217 40.8284 19.1716C40.0783 18.4214 39.0609 18 38 18H18C16.9391 18 15.9217 18.4214 15.1716 19.1716C14.4214 19.9217 14 20.9391 14 22V34C14 35.0609 14.4214 36.0783 15.1716 36.8284C15.9217 37.5786 16.9391 38 18 38ZM32 28C32 29.0609 31.5786 30.0783 30.8284 30.8284C30.0783 31.5786 29.0609 32 28 32C26.9391 32 25.9217 31.5786 25.1716 30.8284C24.4214 30.0783 24 29.0609 24 28C24 26.9391 24.4214 25.9217 25.1716 25.1716C25.9217 24.4214 26.9391 24 28 24C29.0609 24 30.0783 24.4214 30.8284 25.1716C31.5786 25.9217 32 26.9391 32 28Z" stroke={active ? "white" : "#4640DE"} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const TechnologyIcon = ({ active }: { active: boolean }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.5 34L18 40L16 42H32L30 40L28.5 34H19.5ZM6 26H42H6ZM10 34H38C39.0609 34 40.0783 33.5786 40.8284 32.8284C41.5786 32.0783 42 31.0609 42 30V10C42 8.93913 41.5786 7.92172 40.8284 7.17157C40.0783 6.42143 39.0609 6 38 6H10C8.93913 6 7.92172 6.42143 7.17157 7.17157C6.42143 7.92172 6 8.93913 6 10V30C6 31.0609 6.42143 32.0783 7.17157 32.8284C7.92172 33.5786 8.93913 34 10 34Z" stroke={active ? "white" : "#4640DE"} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const EngineeringIcon = ({ active }: { active: boolean }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 40L28 8M36 16L44 24L36 32M12 32L4 24L12 16" stroke={active ? "white" : "#4640DE"} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const BusinessIcon = ({ active }: { active: boolean }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M42 26.51C36.281 28.8225 30.1688 30.0075 24 30C17.634 30 11.56 28.76 6 26.51M24 24H24.02M32 12V8C32 6.93913 31.5786 5.92172 30.8284 5.17157C30.0783 4.42143 29.0609 4 28 4H20C18.9391 4 17.9217 4.42143 17.1716 5.17157C16.4214 5.92172 16 6.93913 16 8V12H32ZM10 40H38C39.0609 40 40.0783 39.5786 40.8284 38.8284C41.5786 38.0783 42 37.0609 42 36V16C42 14.9391 41.5786 13.9217 40.8284 13.1716C40.0783 12.4214 39.0609 12 38 12H10C8.93913 12 7.92172 12.4214 7.17157 13.1716C6.42143 13.9217 6 14.9391 6 16V36C6 37.0609 6.42143 38.0783 7.17157 38.8284C7.92172 39.5786 8.93913 40 10 40Z" stroke={active ? "white" : "#4640DE"} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const HRIcon = ({ active }: { active: boolean }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M24 10C22.9391 10 21.9217 10.4214 21.1716 11.1716C20.4214 11.9217 20 12.9391 20 14C20 15.0609 20.4214 16.0783 21.1716 16.8284C21.9217 17.5786 22.9391 18 24 18C25.0609 18 26.0783 17.5786 26.8284 16.8284C27.5786 16.0783 28 15.0609 28 14C28 12.9391 27.5786 11.9217 26.8284 11.1716C26.0783 10.4214 25.0609 10 24 10ZM18.3431 8.34315C19.8434 6.84285 21.8783 6 24 6C26.1217 6 28.1566 6.84285 29.6569 8.34315C31.1571 9.84344 32 11.8783 32 14C32 16.1217 31.1571 18.1566 29.6569 19.6569C28.1566 21.1571 26.1217 22 24 22C21.8783 22 19.8434 21.1571 18.3431 19.6569C16.8429 18.1566 16 16.1217 16 14C16 11.8783 16.8429 9.84344 18.3431 8.34315ZM10 18C9.46957 18 8.96086 18.2107 8.58579 18.5858C8.21071 18.9609 8 19.4696 8 20C8 20.5304 8.21071 21.0391 8.58579 21.4142C8.96086 21.7893 9.46957 22 10 22C10.5304 22 11.0391 21.7893 11.4142 21.4142C11.7893 21.0391 12 20.5304 12 20C12 19.4696 11.7893 18.9609 11.4142 18.5858C11.0391 18.2107 10.5304 18 10 18ZM5.75736 15.7574C6.88258 14.6321 8.4087 14 10 14C11.5913 14 13.1174 14.6321 14.2426 15.7574C15.3679 16.8826 16 18.4087 16 20C16 21.5913 15.3679 23.1174 14.2426 24.2426C13.1174 25.3679 11.5913 26 10 26C8.4087 26 6.88258 25.3679 5.75736 24.2426C4.63214 23.1174 4 21.5913 4 20C4 18.4087 4.63214 16.8826 5.75736 15.7574ZM38 18C37.4696 18 36.9609 18.2107 36.5858 18.5858C36.2107 18.9609 36 19.4696 36 20C36 20.5304 36.2107 21.0391 36.5858 21.4142C36.9609 21.7893 37.4696 22 38 22C38.5304 22 39.0391 21.7893 39.4142 21.4142C39.7893 21.0391 40 20.5304 40 20C40 19.4696 39.7893 18.9609 39.4142 18.5858C39.0391 18.2107 38.5304 18 38 18ZM33.7574 15.7574C34.8826 14.6321 36.4087 14 38 14C39.5913 14 41.1174 14.6321 42.2426 15.7574C43.3679 16.8826 44 18.4087 44 20C44 21.5913 43.3679 23.1174 42.2426 24.2426C41.1174 25.3679 39.5913 26 38 26C36.4087 26 34.8826 25.3679 33.7574 24.2426C32.6321 23.1174 32 21.5913 32 20C32 18.4087 32.6321 16.8826 33.7574 15.7574ZM24 27.9986C22.4005 27.9986 20.8377 28.4778 19.5132 29.3745C18.2646 30.2197 17.2817 31.3993 16.6753 32.7757L16.1931 38H31.8069L31.3247 32.7757C30.7183 31.3993 29.7354 30.2197 28.4868 29.3745C27.1623 28.4778 25.5995 27.9986 24 27.9986ZM36 38H42V36.0001C42 36.0001 42 36.0002 42 36.0001C41.9999 35.1689 41.7409 34.3582 41.2589 33.681C40.7768 33.0037 40.0957 32.4935 39.3103 32.2211C38.5249 31.9488 37.6742 31.928 36.8763 32.1615C36.4028 32.3001 35.9619 32.5242 35.5741 32.82C35.8523 33.835 36 34.902 36 36V38ZM33.8595 29.1553C33.02 27.9464 31.9607 26.8958 30.7291 26.062C28.7427 24.7173 26.3988 23.9986 24 23.9986C21.6012 23.9986 19.2573 24.7173 17.2709 26.062C16.0393 26.8958 14.98 27.9464 14.1405 29.1553C13.5515 28.799 12.9156 28.5182 12.2473 28.3226C10.6517 27.8555 8.95017 27.8972 7.37933 28.4419C5.8085 28.9865 4.44637 30.007 3.4823 31.3615C2.51823 32.716 2.00012 34.3373 2 35.9999V40C2 41.1046 2.89543 42 4 42H44C45.1046 42 46 41.1046 46 40V36C45.9999 34.3374 45.4818 32.716 44.5177 31.3615C43.5536 30.007 42.1915 28.9865 40.6207 28.4419C39.0498 27.8972 37.3483 27.8555 35.7527 28.3226C35.0844 28.5182 34.4485 28.799 33.8595 29.1553ZM12.4259 32.82C12.0381 32.5242 11.5972 32.3001 11.1237 32.1615C10.3258 31.928 9.47509 31.9488 8.68967 32.2211C7.90425 32.4935 7.22318 33.0037 6.74115 33.681C6.25914 34.3582 6.00009 35.1688 6 36C6 36 6 36 6 36V38H12V36C12 34.902 12.1477 33.835 12.4259 32.82Z" fill={active ? "white" : "#4640DE"}/>
  </svg>
);

const categories = [
  {
    id: "design",
    name: "Design",
    jobs: 235,
    icon: (active: boolean) => <DesignIcon active={active} />,
  },
  {
    id: "sales",
    name: "Sales",
    jobs: 756,
    icon: (active: boolean) => <SalesIcon active={active} />,
  },
  {
    id: "marketing",
    name: "Marketing",
    jobs: 140,
    icon: (active: boolean) => <MarketingIcon active={active} />,
  },
  {
    id: "finance",
    name: "Finance",
    jobs: 325,
    icon: (active: boolean) => <FinanceIcon active={active} />,
  },
  {
    id: "technology",
    name: "Technology",
    jobs: 436,
    icon: (active: boolean) => <TechnologyIcon active={active} />,
  },
  {
    id: "engineering",
    name: "Engineering",
    jobs: 542,
    icon: (active: boolean) => <EngineeringIcon active={active} />,
  },
  {
    id: "business",
    name: "Business",
    jobs: 211,
    icon: (active: boolean) => <BusinessIcon active={active} />,
  },
  {
    id: "hr",
    name: "Human Resource",
    jobs: 346,
    icon: (active: boolean) => <HRIcon active={active} />,
  },
];

export default function CategoriesSection() {
  const [activeId, setActiveId] = useState("marketing");

  const row1 = categories.slice(0, 4);
  const row2 = categories.slice(4, 8);

  return (
    <section className="bg-white py-16 sm:py-20 px-5 sm:px-8 lg:px-[124px]">
      <div className="max-w-[1240px] mx-auto flex flex-col gap-12">
        {/* Header */}
        <div className="flex items-end justify-between gap-4">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-clash font-semibold text-[32px] sm:text-[40px] lg:text-[48px] leading-[1.1] text-[#25324B]"
          >
            Explore by <span className="text-[#26A4FF]">category</span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link
              href="/jobs"
              className="flex items-center gap-2 text-primary font-semibold text-[15px] hover:gap-3 transition-all duration-200 whitespace-nowrap"
            >
              Show all jobs <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>

        {/* Grid */}
        <div className="flex flex-col gap-6 sm:gap-8">
          {[row1, row2].map((row, rowIdx) => (
            <div
              key={rowIdx}
              className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
            >
              {row.map((cat, i) => {
                const isActive = cat.id === activeId;
                return (
                  <motion.div
                    key={cat.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: (rowIdx * 4 + i) * 0.07 }}
                    onClick={() => setActiveId(cat.id)}
                    className={`border p-6 sm:p-8 flex flex-col gap-6 cursor-pointer transition-all duration-200 group ${
                      isActive
                        ? "bg-primary border-primary shadow-[0_8px_32px_rgba(70,64,222,0.25)]"
                        : "bg-white border-[#D6DDEB] hover:border-primary hover:shadow-[0_8px_32px_rgba(70,64,222,0.1)] hover:-translate-y-1"
                    }`}
                  >
                    <div className="w-8 h-8 flex items-center justify-center">
                      {cat.icon(isActive)}
                    </div>
                    <div>
                      <p
                        className={`font-semibold text-[18px] sm:text-[22px] leading-snug mb-2 ${
                          isActive ? "text-white" : "text-[#25324B]"
                        }`}
                      >
                        {cat.name}
                      </p>
                      <div
                        className={`flex items-center gap-2 text-[15px] ${
                          isActive ? "text-white/80" : "text-[#7C8493]"
                        }`}
                      >
                        <span>{cat.jobs} jobs available</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
