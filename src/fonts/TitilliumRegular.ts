import localFont from "next/font/local";

export const titilliumRegular = localFont({
  src: './TitilliumWeb-Regular.woff2',
  variable: "--font-titillium-regular",
  display: "swap",
  weight: "400",
  style: "normal",
  fallback: ['system-ui', 'arial'],
});
