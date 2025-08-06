import CustomerReviews from "@/sections/CustomerReviews";
import Faqs from "@/sections/Faqs";
import Features from "@/sections/Features";
import Hero from "@/sections/Hero";
import Navbar from "@/sections/Navbar";
import Pricing from "@/sections/Pricing";
import Footer from "@/sections/Footer";


export default function Home() {
  return (
    <>
      <Navbar />
      <Hero/>
      <Features />
      <Pricing />
      <CustomerReviews />
      <Faqs />
      <Footer/>
    </>
  );
}
