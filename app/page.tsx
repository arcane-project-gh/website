import DonationSection from "@/components/donation-section";
import ServerCard from "@/components/server-card";
import DitherShader from "@/components/ui/dither-shader";
import { SERVERS } from "@/lib/servers";
import { cn } from "cn";

export default function Home() {
  return (
    <main className="flex flex-col relative border-t">
      <div className="relative isolate min-h-[calc(100dvh-7rem)] flex flex-1 overflow-hidden px-8 items-center justify-center text-center border-x">
        <DitherShader
          src="/hero.jpg"
          gridSize={1}
          ditherMode="bayer"
          colorMode="duotone"
          primaryColor="#0a0a0a"
          secondaryColor="#333"
          threshold={0.5}
          className="absolute inset-0 -z-1 opacity-100"
        />
        <div className="flex flex-col gap-5 items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-medium md:max-w-3xl tracking-tight">
            Building a new standard for the DayZ experience.
          </h1>
          <p className="text-base md:text-lg text-foreground/80 md:max-w-xl">
            We build DayZ experiences built for players who want intense PvP,
            unique gameplay and servers worth coming back to.
          </p>
        </div>
      </div>
      <div className="bg-background grid grid-cols-1 md:grid-cols-2 border-t items-stretch border-x" id="servers">
        {SERVERS.map((server) => (
          <ServerCard key={server.id} {...server} className={cn("border-r")} />
        ))}
      </div>
      <DonationSection />
    </main>
  );
}
