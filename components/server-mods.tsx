"use client";

import { ArrowUpRight } from "lucide-react";
import useSWR from "swr";
import { Button } from "@/components/ui/button";
import {
  fetchJson,
  serverModsUrl,
  type ServerModsResponse,
} from "@/lib/server-api";
import { Skeleton } from "./ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type ServerModsProps = {
  serverId: string;
};

export default function ServerMods({ serverId }: ServerModsProps) {
  const {
    data: modsResponse,
    error: modsError,
    isLoading: areModsLoading,
  } = useSWR<ServerModsResponse>(serverModsUrl(serverId), fetchJson<ServerModsResponse>);
  const mods = modsResponse?.mods;
  const modsLoaded = mods !== undefined && !modsError;

  if (areModsLoading) {
    return <Skeleton className="h-5 w-20" />;
  }

  if (!modsLoaded) {
    return (
      <span className="font-mono text-[10px] text-muted-foreground">
        [MODS UNAVAILABLE]
      </span>
    );
  }

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
        [MODS {mods.length}]
      </DialogTrigger>
      <DialogContent className="flex max-h-[85dvh] flex-col gap-4 overflow-hidden sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Server mods</DialogTitle>
          <DialogDescription>
            {`${mods.length} mods installed on this server.`}
          </DialogDescription>
        </DialogHeader>
        <div className="min-h-0 overflow-y-auto">
          {mods.length === 0 ? (
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