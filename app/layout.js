import "./globals.css";

export const metadata = {
  title: "MindSync | Pet grooming booking prototype",
  description: "Interactive MindSync pet grooming booking prototype for the DTI.324 project pitch.",
};

export const viewport = { width: "device-width", initialScale: 1 };

export default function RootLayout({ children }) {
  return <html lang="en"><body>{children}</body></html>;
}
