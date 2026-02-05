"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { useInView, motion, useSpring, useTransform } from "framer-motion";
import {
  HiOutlineBriefcase,
  HiOutlineGlobeAlt,
  HiOutlineEmojiHappy,
} from "react-icons/hi";

// Number Animation Logic
const AnimatedNumber = ({ value }) => {
  const ref = useRef(null);

  const inView = useInView(ref, { once: true, margin: "-50px" });

  const springValue = useSpring(0, {
    stiffness: 50,
    damping: 20,
    restDelta: 0.001,
  });

  const displayValue = useTransform(springValue, (current) =>
    Math.round(current).toLocaleString(),
  );

  useEffect(() => {
    if (inView) {
      springValue.set(value);
    }
  }, [inView, value, springValue]);

  return <motion.span ref={ref}>{displayValue}</motion.span>;
};

const CounterSection = () => {
  const t = useTranslations("CounterSection");

  const stats = [
    {
      id: 1,
      labelKey: "projectComplete",
      value: 50,
      suffix: "+",
      icon: <HiOutlineBriefcase />,
    },
    {
      id: 2,
      labelKey: "happyClients",
      value: 40,
      suffix: "+",
      icon: <HiOutlineGlobeAlt />,
    },
    {
      id: 3,
      labelKey: "yearsExperiance",
      value: 4,
      suffix: "+",
    },
    {
      id: 4,
      labelKey: "servicesProvide",
      value: 10,
      suffix: "+",
      icon: <HiOutlineEmojiHappy />,
    },
    {
      id: 5,
      labelKey: "countries",
      value: 5,
      suffix: "+",
    },
  ];

  return (
    <section className="md:py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 md:gap-6">
          {stats.map((stat) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: stat.id * 0.1 }}
              className="flex flex-col justify-center items-center h-[180px] md:h-[220px]"
            >
              {/* Counter Value */}
              <div className="text-4xl md:text-5xl lg:text-6xl font-black text-blue-600 mb-3 flex items-center justify-center tracking-tighter">
                {stat.prefix && <span className="pr-1">{stat.prefix}</span>}
                <AnimatedNumber value={stat.value} />
                <span className="pl-2">{stat.suffix}</span>
              </div>

              {/* Label */}
              <p className="font-normal text-base dark:text-gray-600"> {t(stat.labelKey)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CounterSection;
