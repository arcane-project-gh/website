import Link from "next/link";
import { SiDiscord } from "@icons-pack/react-simple-icons";

export function Footer() {
  return (
    <footer className="mt-auto flex flex-col gap-3 px-6 py-4 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between md:px-8 border-t border-x">
      <p>© {new Date().getFullYear()} Arcane Project</p>
      <Link
        href="https://discord.gg/S4T4g6RNJZ"
        target="_blank"
        aria-label="Discord"
        className="inline-flex w-fit items-center text-foreground/80 transition-colors hover:text-foreground"
      >
        <SiDiscord className="size-4" />
      </Link>
    </footer>
  );
}