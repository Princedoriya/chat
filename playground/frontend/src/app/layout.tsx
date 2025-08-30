import "./globals.css";
import { Poppins, Inter } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-display",
});
const inter = Inter({ subsets: ["latin"], variable: "--font-body" });

export const metadata = {
  title: "Candidate Playground",
  description: "Profile + Projects + Skills",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable}`}>
      <body
        className="relative min-h-screen"
        style={{
          backgroundImage: "url('/backhero.jpg')", 
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
        }}
      >
    
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

        {/* page content */}
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
