import { ArrowUpRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import DitherShader from "./ui/dither-shader";

export default function DonationSection() {


  return (
    <section id="donate" className="relative isolate flex flex-col gap-10 overflow-hidden border-x border-t px-6 py-12 md:px-8">
      <DitherShader
        src="/donations.jpg"
        gridSize={1}
        ditherMode="bayer"
        colorMode="duotone"
        primaryColor="#000000"
        secondaryColor="#333"
        threshold={0.5}
        className="absolute inset-0 -z-1 opacity-100"
      />
      <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex max-w-md flex-col gap-1">
          <h2 className="text-lg font-medium">Support the community</h2>
          <p className="max-w-xl text-xs leading-relaxed text-muted-foreground">
            Community donations help cover server hosting and upkeep, keeping our
            servers running for everyone.
          </p>
        </div>
        <a
          href="https://donate.stripe.com/4gM3cu4QW7Jj7Cg1NL1Fe00"
          target="_blank"
          rel="noreferrer"
          className={cn(buttonVariants(), "relative z-10 cursor-pointer")}
        >
          Donate <ArrowUpRight />
        </a>
      </div>
    </section>
  );
}
