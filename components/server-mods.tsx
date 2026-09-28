"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type Mod = {
  name: string;
  id: string;
};

type ServerModsProps = {
  serverId: string;
};

export default function ServerMods({ serverId }: ServerModsProps) {
  const [mods, setMods] = useState<Mod[] | null | undefined>();

  useEffect(() => {
    let active = true;

    fetch(`/api/servers/${serverId}/mods`, { cache: "no-store" })
      .then((response) => {
        if (!response.ok) throw new Error("Mods query failed");
        return response.json() as Promise<{ mods: Mod[] }>;
      })
      .then((data) => {
        if (active) setMods(data.mods);
      })
      .catch(() => {
        if (active) setMods(null);
      });

    return () => {
      active = false;
    };
  }, [serverId]);

  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button
            variant="ghost"
            size="xs"
            className="h-5 px-0 font-mono text-[10px] text-foreground hover:bg-transparent"
          />
        }
      >
        [{mods === undefined ? "LOADING MODS..." : `MODS${mods ? ` ${mods.length}` : ""}`}]
      </DialogTrigger>
      <DialogContent className="flex max-h-[85dvh] flex-col gap-4 overflow-hidden sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Server mods</DialogTitle>
          <DialogDescription>
            {mods ? `${mods.length} mods installed on this server.` : "Mods installed on this server."}
          </DialogDescription>
        </DialogHeader>
        <div className="min-h-0 overflow-y-auto">
          {mods === undefined ? (
            <p className="text-muted-foreground">Loading mods...</p>
          ) : mods === null ? (
            <p className="text-muted-foreground">Mods unavailable</p>
          ) : mods.length === 0 ? (
            <p className="text-muted-foreground">No mods listed</p>
          ) : (
            <ul className="grid divide-y">
              {mods.map((mod) => (
                <li key={mod.id} className="min-w-0 py-1.5 first:pt-0 last:pb-0">
                  <a
                    href={`https://steamcommunity.com/sharedfiles/filedetails/?id=${encodeURIComponent(mod.id)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex min-w-0 items-center justify-between gap-2 text-muted-foreground hover:text-foreground"
                  >
                    <span className="truncate">{mod.name}</span>
                    <span className="flex shrink-0 items-center gap-1 font-mono text-[10px]">
                      {mod.id}
                      <ArrowUpRight className="size-3" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}