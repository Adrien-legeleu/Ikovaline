import Image from "next/image";
import { OrbitingCircles } from "../../ui/orbiting-circles";
import InstaLogo from "@/public/images/logo/insta-logo.png";
import TiktokLogo from "@/public/images/logo/tiktok-logo.jpg";

export function SkeletonTwoComponent() {
  return (
    <div className="relative flex h-[220px] w-full flex-col items-center justify-center overflow-hidden ">
      <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b z-30 from-black to-gray-300 bg-clip-text text-center text-4xl font-semibold leading-none text-transparent dark:from-white dark:to-black">
        Réseaux
      </span>

      <OrbitingCircles iconSize={40}>
        <Icons.insta />
        <Icons.tiktok />
        <Icons.linkedin />
        <Icons.insta />
        <Icons.facebook />
      </OrbitingCircles>
    </div>
  );
}

const Icons = {
  insta: () => (
    <Image
      className="rounded-full"
      src={InstaLogo}
      alt="insta-logo"
      width={40}
      height={40}
    />
  ),
  linkedin: () => (
    <svg
      width="800px"
      height="800px"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="2" y="2" width="28" height="28" rx="14" fill="#1275B1" />
      <path
        d="M12.6186 9.69215C12.6186 10.6267 11.8085 11.3843 10.8093 11.3843C9.81004 11.3843 9 10.6267 9 9.69215C9 8.7576 9.81004 8 10.8093 8C11.8085 8 12.6186 8.7576 12.6186 9.69215Z"
        fill="white"
      />
      <path d="M9.24742 12.6281H12.3402V22H9.24742V12.6281Z" fill="white" />
      <path
        d="M17.3196 12.6281H14.2268V22H17.3196C17.3196 22 17.3196 19.0496 17.3196 17.2049C17.3196 16.0976 17.6977 14.9855 19.2062 14.9855C20.911 14.9855 20.9008 16.4345 20.8928 17.5571C20.8824 19.0244 20.9072 20.5219 20.9072 22H24V17.0537C23.9738 13.8954 23.1508 12.4401 20.4433 12.4401C18.8354 12.4401 17.8387 13.1701 17.3196 13.8305V12.6281Z"
        fill="white"
      />
    </svg>
  ),
  facebook: () => (
    <svg
      fill="#0866FF"
      width="800px"
      height="800px"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      stroke="#0866FF"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0" />

      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <g id="SVGRepo_iconCarrier">
        {" "}
        <path d="M12 2.03998C6.5 2.03998 2 6.52998 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.84998C10.44 7.33998 11.93 5.95998 14.22 5.95998C15.31 5.95998 16.45 6.14998 16.45 6.14998V8.61998H15.19C13.95 8.61998 13.56 9.38998 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96C15.9164 21.5878 18.0622 20.3855 19.6099 18.57C21.1576 16.7546 22.0054 14.4456 22 12.06C22 6.52998 17.5 2.03998 12 2.03998Z" />{" "}
      </g>
    </svg>
  ),
  tiktok: () => (
    <Image
      className="rounded-full"
      src={TiktokLogo}
      alt="insta-logo"
      width={40}
      height={40}
    />
  ),
};
