import localFont from "next/font/local";

export const hindShiliguri = localFont({
  src: [
    {
      path: "./fontfiles/HindSiliguri-Regular.woff2",
      weight: "400",
    },
    {
      path: "./fontfiles/HindSiliguri-Medium.woff2",
      weight: "500",
    },
    {
      path: "./fontfiles/HindSiliguri-SemiBold.woff2",
      weight: "600",
    },
    {
      path: "./fontfiles/HindSiliguri-Bold.woff2",
      weight: "700",
    },
  ],
  variable: "--font-hind-shiliguri",
  display: "swap",
  fallback: ["sans-serif"],
});

export const poppins = localFont({
  src: [
    {
      path: "./fontfiles/Poppins-Regular.woff2",
      weight: "400",
    },
    {
      path: "./fontfiles/Poppins-Bold.woff2",
      weight: "700",
    },
  ],
  variable: "--font-poppins",
  display: "swap",
  fallback: ["sans-serif"],
});

