"use client";

import Image from "next/image";

 
const MarqueeLogos = ({ logos = [], speed = "20s", bgColor = "bg-[#2A3234]" }) => {
  
 
  if (!logos.length) return null;

 
  const tripleLogos = [...logos, ...logos, ...logos];

  return (
    <div className={`${bgColor} py-10 overflow-hidden relative w-full`}>
      <div 
        className="flex w-fit animate-marquee-infinite"
        style={{ animationDuration: speed }}  
      >
        {tripleLogos.map((src, i) => (
          <div 
            key={i} 
            className="flex-shrink-0 px-[30px]"  
          >
            <Image
              src={src}
              alt={`logo-${i}`}
              width={113}
              height={82}
              className="h-[100px] w-[170px] object-contain "
            />
          </div>
        ))}
      </div>

      <style jsx>{`
        .animate-marquee-infinite {
          display: flex;
          width: max-content;
          animation: marquee linear infinite;
        }

        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-100% / 3));
          }
        }

        .animate-marquee-infinite:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default MarqueeLogos;