'use client';
import { IconStarFilled } from '@tabler/icons-react';
import { motion } from 'framer-motion';

export default function StarClientsGoogle() {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        ease: 'easeInOut',
      }}
      viewport={{ once: true }}
      className="z-10"
    >
      <a
        target="_blank"
        className="flex   items-end justify-center gap-2 cursor-pointer"
        href="https://www.google.com/search?rlz=1C1CHZN_frFR1084FR1084&q=Ikovaline%20Avis&rflfq=1&num=20&stick=H4sIAAAAAAAAAONgkxIxNDA0Mzc0NbU0MjM2MzcwtDQ3s9zAyPiKkc8zO78sMSczL1XBsSyzeBErmgAA2Poq2j0AAAA&rldimm=10167155926367019769&tbm=lcl&hl=fr&sa=X&ved=0CB8Q9fQKKABqFwoTCNDimKi_4o0DFQAAAAAdAAAAABAG&biw=1280&bih=598&dpr=1.5#lkt=LocalPoiReviews
      "
      >
        <div className="flex items-center justify-center gap-1">
          <span>
            <IconStarFilled className="text-yellow-300 w-6 h-6 sm:w-6 sm:h-6" />
          </span>
          <span>
            <IconStarFilled className="text-yellow-300 w-6 h-6 sm:w-6 sm:h-6" />
          </span>
          <span>
            <IconStarFilled className="text-yellow-300 w-6 h-6 sm:w-6 sm:h-6" />
          </span>
          <span>
            <IconStarFilled className="text-yellow-300 w-6 h-6 sm:w-6 sm:h-6" />
          </span>
          <span>
            <IconStarFilled className="text-yellow-300 w-6 h-6 sm:w-6 sm:h-6" />
          </span>
        </div>
        <span className="font-semibold flex relative top-1 items-center gap-1 text-sm">
          <span className="text-lg  ">+49 </span>
          avis Google
        </span>
      </a>
    </motion.div>
  );
}
