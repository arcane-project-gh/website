import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SUPPORTERS } from "@/lib/supporters";
import DitherShader from "./ui/dither-shader";

export default function DonationSection() {
  const supporters = [...SUPPORTERS].sort((first, second) => second.value - first.value);

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
        <Button
          variant="default"
          className="relative z-10"
          render={
            <Link href="#">
              Donate <ArrowUpRight />
            </Link>
          }
        />
      </div>
      <div className="relative z-10 border-t border-foreground/20 pt-5">
        <h3 className="mb-4 font-mono text-xs text-muted-foreground">
          We thank our community supporters!
        </h3>
        <ol className="grid grid-cols-1 border-t border-foreground/20 sm:grid-cols-2 lg:grid-cols-3">
          {supporters.map((supporter, index) => {
            return (
              <li
                key={`${supporter.link ?? supporter.name}-${index}`}
                className="grid min-w-0 grid-cols-[2rem_minmax(0,1fr)_auto] items-center gap-3 border-b border-foreground/20 px-2 py-4 sm:px-4"
              >
                <span className="font-mono text-xs text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {supporter.link ? (
                  <a
                    href={supporter.link}
                    target="_blank"
                    rel="noreferrer"
                    className="flex min-w-0 items-center gap-2 text-foreground transition-colors hover:text-foreground/75"
                  >
                    <span className="truncate text-base font-medium sm:text-lg">
                      {supporter.name}
                    </span>
                    <ArrowUpRight className="size-4 shrink-0" aria-hidden="true" />
                    <span className="sr-only">Visit {supporter.name}</span>
                  </a>
                ) : (
                  <div className="min-w-0 truncate text-base font-medium text-foreground sm:text-lg">
                    {supporter.name}
                  </div>
                )}
                <span className="text-right font-mono text-sm text-foreground/90">
                  {new Intl.NumberFormat("en-IE", {
                    style: "currency",
                    currency: "EUR",
                    maximumFractionDigits: 0,
                  }).format(supporter.value)}
                </span>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
