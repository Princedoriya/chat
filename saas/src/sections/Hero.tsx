import Button from "@/components/Button";

export default function Hero() {
  return (
    <section
      id="hero"
      className="py-24 bg-cover bg-center bg-fixed bg-no-repeat"
      style={{
        backgroundImage: "url('/images/backhero.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        borderRadius: "1rem",
        overflow: "hidden",
      }}
    >
      <div className="container">
        <h1 className="text-6xl md:text-7xl lg:text:8xl font-medium text-center mt-6">
          Data-powered omnichannel advertising
        </h1>
        <p className="text-center text-xl text-white/50 mt-10 max-w-3xl mx-auto">
          ADmyBRAND is a tech-driven, programmatic ad-exchange powering
          omnichannel advertising across outdoor, digital, print, and broadcast
          media. Leveraging big data and analytics, we streamline ATL to BTL
          campaign management—empowering marketers to plan and execute in
          minutes.
        </p>
        <form className="flex border border-white/15 rounded-full p-2 mt-12 max-w-lg mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="bg-transparent px-4 md:flex-1"
          />
          <Button
            type="submit"
            variant="primary"
            className="whitespace-nowrap"
            size="sm"
          >
            Sign Up
          </Button>
        </form>
      </div>
    </section>
  );
}
