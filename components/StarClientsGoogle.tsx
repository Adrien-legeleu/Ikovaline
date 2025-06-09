"use client";
import { IconStarFilled } from "@tabler/icons-react";
import { motion } from "framer-motion";

export default function StarClientsGoogle() {
  return (
    <div>
      <a
        target="_blank"
        className="flex z-10 items-end justify-center gap-4 cursor-pointer"
        href="https://www.google.com/search?rlz=1C1CHZN_frFR1084FR1084&q=Ikovaline%20Avis&rflfq=1&num=20&stick=H4sIAAAAAAAAAONgkxIxNDA0Mzc0NbU0MjM2MzcwtDQ3s9zAyPiKkc8zO78sMSczL1XBsSyzeBErmgAA2Poq2j0AAAA&rldimm=10167155926367019769&tbm=lcl&hl=fr&sa=X&ved=0CB8Q9fQKKABqFwoTCNDimKi_4o0DFQAAAAAdAAAAABAG&biw=1280&bih=598&dpr=1.5#lkt=LocalPoiReviews
      "
      >
        <div className="flex items-center justify-center gap-1">
          <motion.span
            initial={{ opacity: 0, scale: 0.2 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 150,
              damping: 5,
              delay: 0.2,
            }}
          >
            <IconStarFilled className="text-yellow-300" />
          </motion.span>
          <motion.span
            initial={{ opacity: 0, scale: 0.2 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 150,
              damping: 5,
              delay: 0.4,
            }}
          >
            <IconStarFilled className="text-yellow-300" />
          </motion.span>
          <motion.span
            initial={{ opacity: 0, scale: 0.2 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 150,
              damping: 5,
              delay: 0.6,
            }}
          >
            <IconStarFilled className="text-yellow-300" />
          </motion.span>
          <motion.span
            initial={{ opacity: 0, scale: 0.2 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 150,
              damping: 5,
              delay: 0.8,
            }}
          >
            <IconStarFilled className="text-yellow-300" />
          </motion.span>
          <motion.span
            initial={{ opacity: 0, scale: 0.2 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 150,
              damping: 5,
              delay: 1,
            }}
          >
            <IconStarFilled className="text-yellow-300" />
          </motion.span>
        </div>
        <motion.span
          initial={{ opacity: 0, scale: 0.2 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
            delay: 1.2,
          }}
          className="font-semibold block"
        >
          +49 avis Google
        </motion.span>
      </a>
    </div>
  );
}
// "use client";

// import dynamic from "next/dynamic";

// const Pin3D = dynamic(() => import("@/components/Pin3D"), { ssr: false });
// import { useTheme } from "next-themes";
// import Image from "next/image";
// import React, { useRef } from "react";

// export default function page() {
//   const svgRef = useRef<SVGSVGElement>(null);
//   const { theme } = useTheme();
//   const projectPoint = (lat: number, lng: number) => {
//     const minLat = 41.0;
//     const maxLat = 51.1;
//     const minLng = -5.2;
//     const maxLng = 9.6;
//     const width = 800;
//     const height = 500;

//     const x = ((lng - minLng) / (maxLng - minLng)) * width;
//     const y = ((maxLat - lat) / (maxLat - minLat)) * height;
//     return { x, y };
//   };
//   const { x, y } = projectPoint(48.4, 3.4);
//   return (
//     <div>
//       <div>
//         <h1 className="text-4xl font-bold text-center my-10">Agence Web</h1>
//         <p className="text-lg text-center max-w-2xl mx-auto">
//           Bienvenue sur la page de l'agence web. Ici, nous vous aidons à créer
//           des sites web modernes et performants.
//         </p>
//       </div>
//       <div className="w-full aspect-[1.6/1]   max-sm:scale-150 rounded-lg relative font-sans">
//         <div
//           className="absolute"
//           style={{
//             top: "38%",
//             left: "51%",
//             transform: "translate(-50%, -100%)",
//           }}
//         >
//           <Pin3D />
//         </div>
//         {theme === "dark" ? (
//           <Image
//             src="/france-dots-map-dark.svg"
//             className="h-full w-full [mask-image:linear-gradient(to_bottom,transparent,white_10%,white_90%,transparent)] pointer-events-none select-none"
//             alt="Carte pointillée France"
//             height="495"
//             width="1056"
//             draggable={false}
//           />
//         ) : (
//           <Image
//             src="/france-dots-map.svg"
//             className="h-full w-full [mask-image:linear-gradient(to_bottom,transparent,white_10%,white_90%,transparent)] pointer-events-none select-none"
//             alt="Carte pointillée France"
//             height="495"
//             width="1056"
//             draggable={false}
//           />
//         )}
//         <svg
//           ref={svgRef}
//           viewBox="0 0 800 500"
//           className="w-full h-full z-40 absolute inset-0 pointer-events-none select-none"
//         >
//           <g>
//             <g>
//               <circle cx={x} cy={y} r="3" fill={"#0ea5e9"} />
//               <circle cx={x} cy={y} r="3" fill={"#0ea5e9"} opacity="0.2">
//                 <animate
//                   attributeName="r"
//                   from="4"
//                   to="10"
//                   dur="1.5s"
//                   repeatCount="indefinite"
//                 />
//                 <animate
//                   attributeName="opacity"
//                   from="0.6"
//                   to="0"
//                   dur="1.5s"
//                   repeatCount="indefinite"
//                 />
//               </circle>
//             </g>
//           </g>
//         </svg>
//       </div>
//     </div>
//   );
// }
